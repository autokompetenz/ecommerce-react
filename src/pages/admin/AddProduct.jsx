import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ImageUpload from "../../components/ImageUpload";

const emptyProduct = {
  name: "", brand: "", price: "", old_price: "", image: "", hover_image: "",
  badge: "", category: "", description: "", ean: "", part_number: "",
  features_text: "", specs_text: "", delivery: "",
};

function parseSpecs(text) {
  if (!text.trim()) return {};
  const obj = {};
  text.split("\n").forEach((line) => {
    const sep = line.indexOf(":");
    if (sep === -1) return;
    const key = line.slice(0, sep).trim();
    const val = line.slice(sep + 1).trim();
    if (key) obj[key] = val;
  });
  return obj;
}

export default function AddProduct() {
  const [form, setForm] = useState(emptyProduct);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const features = form.features_text.split("\n").map((l) => l.trim()).filter(Boolean);
    const specs = parseSpecs(form.specs_text);

    const { error } = await supabase.from("products").insert([{
      name: form.name,
      brand: form.brand,
      price: Number(form.price) || 0,
      old_price: form.old_price ? Number(form.old_price) : null,
      image: form.image || "/img/product-img/product-1.jpg",
      hover_image: form.hover_image || "",
      badge: form.badge,
      category: form.category,
      description: form.description,
      features: features.length ? JSON.stringify(features) : "[]",
      specs: Object.keys(specs).length ? JSON.stringify(specs) : "{}",
      delivery: form.delivery || "",
      ean: form.ean || null,
      part_number: form.part_number || null,
    }]);

    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Produit ajouté !" });
      setForm(emptyProduct);
      setTimeout(() => navigate("/admin"), 1500);
    }
  };

  return (
    <div className="admin-form-wrap">
      <h1 className="admin-page-title">Ajouter un produit</h1>

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
          <input name="category" value={form.category} onChange={handleChange} placeholder="ex: Tournevis, Clés à choc, Perceuses..." className="admin-input" />
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

        <div>
          <label className="admin-label">Caractéristiques (une par ligne)</label>
          <textarea
            name="features_text" value={form.features_text} onChange={handleChange}
            rows="5" className="admin-input admin-textarea"
            placeholder={"Moteur brushless sans charbon\nCouple max 35 Nm\n2 vitesses mécaniques\nÉclairage LED intégré"}
          />
        </div>

        <div>
          <label className="admin-label">Données techniques (une par ligne, format Clé: Valeur)</label>
          <textarea
            name="specs_text" value={form.specs_text} onChange={handleChange}
            rows="5" className="admin-input admin-textarea"
            placeholder={"Couple max: 35 Nm\nVitesse: 0 - 1 700 tr/min\nMandrin: 6.35 mm\nTension batterie: 20 V Li-Ion\nPoids: 1.2 kg"}
          />
        </div>

        <div>
          <label className="admin-label">Livraison / Contenu du coffret</label>
          <textarea
            name="delivery" value={form.delivery} onChange={handleChange}
            rows="2" className="admin-input admin-textarea"
            placeholder="Livré avec 1 tournevis, 1 batterie 2.0Ah, 1 chargeur rapide, coffret de transport"
          />
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
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Envoi..." : "Ajouter le produit"}
          </button>
          <button type="button" onClick={() => navigate("/admin")} className="btn btn-outline">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
