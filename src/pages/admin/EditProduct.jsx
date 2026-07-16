import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error || !data) {
        navigate("/admin");
      } else {
        setForm({
          name: data.name || "",
          brand: data.brand || "",
          price: data.price || "",
          old_price: data.old_price || "",
          image: data.image || "",
          hover_image: data.hover_image || "",
          badge: data.badge || "",
          category: data.category || "",
          description: data.description || "",
        });
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await supabase.from("products").update({
      name: form.name,
      brand: form.brand,
      price: Number(form.price) || 0,
      old_price: form.old_price ? Number(form.old_price) : null,
      image: form.image,
      hover_image: form.hover_image,
      badge: form.badge,
      category: form.category,
      description: form.description,
    }).eq("id", id);

    setSaving(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Produit mis à jour !" });
      setTimeout(() => navigate("/admin"), 1500);
    }
  };

  if (loading) return <p style={{ color: "#888" }}>Chargement...</p>;

  return (
    <div style={{ maxWidth: "600px" }}>
      <h1 style={{ fontSize: "24px", color: "#333", marginBottom: "24px" }}>Modifier le produit</h1>

      {message && (
        <div style={{ padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", background: message.type === "error" ? "#fdecea" : "#e8f5e9", color: message.type === "error" ? "#c62828" : "#2e7d32" }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #e5e5e5" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Nom du produit *</label>
            <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Marque</label>
            <input name="brand" value={form.brand} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Prix ($) *</label>
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Ancien prix ($)</label>
            <input name="old_price" type="number" step="0.01" value={form.old_price} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Badge</label>
            <select name="badge" value={form.badge} onChange={handleChange} style={inputStyle}>
              <option value="">Aucun</option>
              <option value="New">New</option>
              <option value="-10%">-10%</option>
              <option value="-20%">-20%</option>
              <option value="-30%">-30%</option>
              <option value="-50%">-50%</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Catégorie</label>
          <input name="category" value={form.category} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>URL Image principale</label>
          <input name="image" value={form.image} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>URL Image secondaire (hover)</label>
          <input name="hover_image" value={form.hover_image} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button type="submit" disabled={saving} style={{ padding: "12px 24px", background: "#333", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
          <button type="button" onClick={() => navigate("/admin")} style={{ padding: "12px 24px", background: "#f0f0f0", color: "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" };
const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" };
