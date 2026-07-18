import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const FIELDS = [
  { key: "bank_holder", label: "Titulaire du compte", placeholder: "POWER Tools GmbH" },
  { key: "bank_iban", label: "IBAN", placeholder: "DE89 3704 0044 0532 0130 00" },
  { key: "bank_bic", label: "BIC / SWIFT", placeholder: "COBADEFFXXX" },
  { key: "bank_bank", label: "Nom de la banque", placeholder: "Commerzbank AG" },
  { key: "bank_reference", label: "Référence / Motif", placeholder: "POWER-TOOLS" },
  { key: "bank_note", label: "Note pour le client", placeholder: "Veuillez indiquer le numéro de commande en référence du virement." },
];

export default function Settings() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      const map = {};
      if (data) data.forEach((row) => { map[row.key] = row.value; });
      setForm(map);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const rows = FIELDS.map((f) => ({
      key: f.key,
      value: form[f.key] || "",
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });

    setSaving(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Paramètres enregistrés !" });
    }
  };

  if (loading) return <p className="admin-loading">Chargement...</p>;

  return (
    <div className="admin-form-wrap">
      <h1 className="admin-page-title">Paramètres du site</h1>

      {message && (
        <div className={`admin-alert ${message.type === "error" ? "error" : "success"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <h2 className="admin-settings-section-title">Coordonnées bancaires (virement)</h2>
        <p className="admin-settings-hint">
          Ces informations s'affichent au client après la commande. Modifiez-les à tout moment.
        </p>

        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="admin-label">{f.label}</label>
            {f.key === "bank_note" ? (
              <textarea
                value={form[f.key] || ""}
                onChange={(e) => handleChange(f.key, e.target.value)}
                placeholder={f.placeholder}
                rows="2"
                className="admin-input admin-textarea"
              />
            ) : (
              <input
                value={form[f.key] || ""}
                onChange={(e) => handleChange(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="admin-input"
              />
            )}
          </div>
        ))}

        <div className="admin-form-actions">
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
          <button type="button" onClick={() => navigate("/admin")} className="btn btn-outline">
            Retour
          </button>
        </div>
      </form>
    </div>
  );
}
