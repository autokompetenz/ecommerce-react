import { useState, useRef } from "react";
import { supabase } from "../lib/supabase";

export default function ImageUpload({ label, value, onChange, folder = "products" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const uploadFile = async (file) => {
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file, { contentType: file.type, upsert: true });

    if (error) {
      console.error("Upload error:", error);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    const publicUrl = data.publicUrl;

    setPreview(publicUrl);
    onChange(publicUrl);
    setUploading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      uploadFile(file);
    }
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? "#e57e25" : "#ddd"}`,
          borderRadius: "8px",
          padding: preview ? "8px" : "24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragOver ? "#fff8f0" : "#fafafa",
          transition: "all 0.2s",
          position: "relative",
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {uploading ? (
          <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>Upload en cours...</p>
        ) : preview ? (
          <div style={{ position: "relative" }}>
            <img
              src={preview}
              alt="Aperçu"
              style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "contain", borderRadius: "4px" }}
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setPreview(null); onChange(""); }}
              style={{
                position: "absolute", top: "4px", right: "4px",
                width: "24px", height: "24px", borderRadius: "50%",
                background: "rgba(0,0,0,0.6)", color: "#fff", border: "none",
                cursor: "pointer", fontSize: "14px", lineHeight: "24px",
              }}
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: "14px", color: "#666", margin: "0 0 4px" }}>
              📷 Cliquez ou glissez une image ici
            </p>
            <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>JPG, PNG, WebP — max 5 Mo</p>
          </>
        )}
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" };
