import { useState } from "react";
import { supabase } from "../lib/supabase";
import Breadcrumb from "../components/Breadcrumb";

const steps = [
  { key: "pending", label: "Commande reçue", icon: "fa-shopping-cart" },
  { key: "confirmed", label: "Confirmée", icon: "fa-check-circle" },
  { key: "shipped", label: "Expédiée", icon: "fa-truck" },
  { key: "delivered", label: "Livrée", icon: "fa-house" },
];
const statusIndex = { pending: 0, confirmed: 1, shipped: 2, delivered: 3, cancelled: -1 };
const statusLabels = { pending: "En attente", confirmed: "Confirmée", shipped: "Expédiée", delivered: "Livrée", cancelled: "Annulée" };
const statusColors = {
  pending: { bg: "#fff3cd", text: "#856404" },
  confirmed: { bg: "#d1ecf1", text: "#0c5460" },
  shipped: { bg: "#d4edda", text: "#155724" },
  delivered: { bg: "#cce5ff", text: "#004085" },
  cancelled: { bg: "#f8d7da", text: "#721c24" },
};

export default function Tracking() {
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const enrichOrder = async (orderData) => {
    const { data: itemsData } = await supabase.from("order_items").select("*").eq("order_id", orderData.id);
    const { data: productsData } = await supabase.from("products").select("id, name, image, price");
    const productsMap = {};
    (productsData || []).forEach((p) => { productsMap[p.id] = p; });
    return {
      ...orderData,
      order_items: (itemsData || []).map((item) => ({ ...item, products: productsMap[item.product_id] || null })),
    };
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true); setError(null); setOrders([]); setSelected(null); setSearched(true);

    const q = query.trim();
    let results = [];
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (uuidRegex.test(q)) {
      const result = await supabase.from("orders").select("*").eq("id", q).single();
      if (result.data) results = [result.data];
    } else if (q.includes("@")) {
      const result = await supabase.from("orders").select("*").ilike("customer_email", q).order("created_at", { ascending: false });
      if (result.data) results = result.data;
    } else {
      const result = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(100);
      const match = (result.data || []).find((o) => o.id.toLowerCase().startsWith(q.toLowerCase()));
      if (match) results = [match];
    }

    setLoading(false);
    if (results.length === 0) { setError("Commande non trouvée."); return; }
    setOrders(results);
    if (results.length === 1) {
      const enriched = await enrichOrder(results[0]);
      setSelected(enriched);
    }
  };

  const selectOrder = async (orderData) => {
    setLoading(true);
    const enriched = await enrichOrder(orderData);
    setSelected(enriched);
    setLoading(false);
  };

  const currentStep = selected ? (statusIndex[selected.status] ?? -1) : -1;
  const isCancelled = selected?.status === "cancelled";

  return (
    <>
      <Breadcrumb title="Suivi de commande" links={[{ label: "Suivi" }]} />
      <div className="section" style={{ background: "var(--bg-alt)", minHeight: "60vh" }}>
        <div className="container">
          {/* Search */}
          <div style={{ maxWidth: 600, margin: "0 auto 40px" }}>
            <div className="tracking-card">
              <h3 style={{ textAlign: "center", marginBottom: 8, fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "0.5px" }}>Suivi de commande</h3>
              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>
                Entrez votre numéro de commande ou l'email utilisé.
              </p>
              <form onSubmit={handleSearch} className="search-form">
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="N° de commande ou email..." />
                <button type="submit" disabled={loading} className="btn btn-brand">
                  {loading ? "..." : "Rechercher"}
                </button>
              </form>
            </div>
          </div>

          {error && searched && <div className="alert alert-error" style={{ maxWidth: 600, margin: "0 auto 24px" }}>{error}</div>}

          {/* Order list (multiple results) */}
          {orders.length > 1 && !selected && (
            <div style={{ maxWidth: 700, margin: "0 auto 24px" }}>
              <div className="tracking-card">
                <h3 style={{ marginBottom: 16, fontSize: 16, fontFamily: "var(--font-display)" }}>
                  {orders.length} commandes trouvées
                </h3>
                {orders.map((o) => {
                  const sc = statusColors[o.status] || statusColors.pending;
                  return (
                    <div
                      key={o.id}
                      onClick={() => selectOrder(o)}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "14px 16px", marginBottom: 8, borderRadius: 8,
                        background: "var(--bg)", border: "1px solid var(--border)", cursor: "pointer",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--brand)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                    >
                      <div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600 }}>
                          #{o.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span style={{ margin: "0 8px", color: "var(--text-muted)" }}>·</span>
                        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                          {new Date(o.created_at).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ background: sc.bg, color: sc.text, padding: "2px 10px", borderRadius: 3, fontSize: 12, fontWeight: 600 }}>
                          {statusLabels[o.status] || o.status}
                        </span>
                        <strong style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>{Number(o.total).toFixed(2)} €</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Single order detail */}
          {selected && (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              {orders.length > 1 && (
                <button
                  onClick={() => setSelected(null)}
                  className="btn btn-outline"
                  style={{ marginBottom: 16, fontSize: 13 }}
                >
                  <i className="fa-solid fa-arrow-left"></i> Retour à la liste
                </button>
              )}
              <div className="tracking-card">
                <div className="tracking-header">
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18, fontFamily: "var(--font-display)", letterSpacing: "0.5px" }}>Commande</h3>
                    <p style={{ margin: "4px 0 0", color: "var(--text-muted)", fontSize: 13, fontFamily: "var(--font-mono)" }}>
                      N° {selected.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{selected.total.toFixed(2)} €</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--text-muted)" }}>
                      {new Date(selected.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>

                {isCancelled ? (
                  <div style={{ padding: 32, textAlign: "center" }}>
                    <i className="fa-solid fa-circle-xmark" style={{ fontSize: 48, color: "var(--danger)", marginBottom: 12, display: "block" }}></i>
                    <p style={{ color: "var(--danger)", fontWeight: 600 }}>Commande annulée</p>
                  </div>
                ) : (
                  <div style={{ padding: "32px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                      <div style={{ position: "absolute", top: 20, left: 40, right: 40, height: 3, background: "var(--border)", zIndex: 0 }}></div>
                      <div style={{ position: "absolute", top: 20, left: 40, width: currentStep >= 0 ? `${(currentStep / (steps.length - 1)) * 100}%` : "0%", height: 3, background: "var(--success)", zIndex: 1, transition: "width 0.5s" }}></div>
                      {steps.map((step, i) => {
                        const isActive = i <= currentStep;
                        const isCurrent = i === currentStep;
                        return (
                          <div key={step.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2, flex: 1 }}>
                            <div style={{ width: 42, height: 42, borderRadius: "50%", background: isActive ? "var(--success)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isCurrent ? "0 0 0 4px rgba(5,150,105,0.2)" : "none", transition: "all 0.3s" }}>
                              <i className={`fa-solid ${step.icon}`} style={{ color: isActive ? "#fff" : "#aaa", fontSize: 16 }}></i>
                            </div>
                            <p style={{ marginTop: 10, fontSize: 12, fontWeight: isCurrent ? 700 : 500, color: isActive ? "var(--success)" : "var(--text-muted)", textAlign: "center" }}>{step.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="tracking-info-grid">
                  <div>
                    <p><strong>Client :</strong> {selected.customer_name}</p>
                    <p><strong>Email :</strong> {selected.customer_email}</p>
                    {selected.customer_phone && <p><strong>Tél :</strong> {selected.customer_phone}</p>}
                  </div>
                  <div>
                    <p><strong>Adresse :</strong> {selected.customer_address}</p>
                    <p><strong>Statut :</strong>{" "}
                      <span style={{
                        background: statusColors[selected.status]?.bg || statusColors.pending.bg,
                        color: statusColors[selected.status]?.text || statusColors.pending.text,
                        padding: "2px 10px", borderRadius: 3, fontSize: 12, fontWeight: 600,
                        fontFamily: "var(--font-mono)", letterSpacing: "0.5px",
                      }}>
                        {statusLabels[selected.status] || selected.status}
                      </span>
                    </p>
                  </div>
                </div>

                {selected.order_items && selected.order_items.length > 0 && (
                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, marginBottom: 16, letterSpacing: "0.5px" }}>Produits commandés</h4>
                    {selected.order_items.map((item) => (
                      <div key={item.id} className="tracking-item-row">
                        <img src={item.products?.image || "/img/product-img/product-1.jpg"} alt="" />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>{item.products?.name || "Produit"}</p>
                          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "2px 0 0" }}>Qté: {item.quantity}</p>
                        </div>
                        <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>{(item.price * item.quantity).toFixed(2)} €</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {!searched && !selected && (
            <div className="empty-state">
              <i className="fa-solid fa-magnifying-glass"></i>
              <p>Entrez vos informations de commande pour suivre son état.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
