import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ImageUpload from "../../components/ImageUpload";

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
          ean: data.ean || "",
          part_number: data.part_number || "",
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
      ean: form.ean || null,
      part_number: form.part_number || null,
    }).eq("id", id);

    setSaving(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Produit mis à jour !" });
      setTimeout(() => navigate("/admin"), 1500);
    }
  };

  if (loading) return <p className="admin-loading">Chargement...</p>;

  return (
    <div className="admin-form-wrap">
      <h1 className="admin-page-title">Modifier le produit</h1>

      {message && (
        <div className={`admin-alert ${message.type === "error" ? "error" : "success"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid admin-form-grid-2">
          <div>
            <label className="admin-label">Nom du produit *</label>
            <input name="name" value={form.name} onChange={handleChange} required className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Marque</label>
            <input name="brand" value={form.brand} onChange={handleChange} className="admin-input" />
          </div>
        </div>

        <div className="admin-form-grid admin-form-grid-3">
          <div>
            <label className="admin-label">Prix (€) *</label>
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Ancien prix (€)</label>
            <input name="old_price" type="number" step="0.01" value={form.old_price} onChange={handleChange} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Badge</label>
            <select name="badge" value={form.badge} onChange={handleChange} className="admin-input">
              <option value="">Aucun</option>
              <option value="New">New</option>
              <option value="-10%">-10%</option>
              <option value="-15%">-15%</option>
              <option value="-20%">-20%</option>
              <option value="-30%">-30%</option>
            </select>
          </div>
        </div>

        <div>
          <label className="admin-label">Catégorie</label>
          <input name="category" value={form.category} onChange={handleChange} className="admin-input" />
        </div>

        <div className="admin-form-grid admin-form-grid-2">
          <ImageUpload
            label="Image principale"
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
          />
          <ImageUpload
            label="Image secondaire (hover)"
            value={form.hover_image}
            onChange={(url) => setForm((prev) => ({ ...prev, hover_image: url }))}
          />
        </div>

        <div>
          <label className="admin-label">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="admin-input admin-textarea" />
        </div>

        <div className="admin-form-grid admin-form-grid-2">
          <div>
            <label className="admin-label">EAN</label>
            <input name="ean" value={form.ean} onChange={handleChange} placeholder="ex: 7392248567205" className="admin-input" />
          </div>
          <div>
            <label className="admin-label">N° de pièce</label>
            <input name="part_number" value={form.part_number} onChange={handleChange} placeholder="ex: MT320B, WR14-125" className="admin-input" />
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
          <button type="button" onClick={() => navigate("/admin")} className="btn btn-outline">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
