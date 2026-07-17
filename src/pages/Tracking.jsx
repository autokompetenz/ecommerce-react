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

export default function Tracking() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true); setError(null); setOrder(null); setSearched(true);

    let data = null, fetchError = null;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (uuidRegex.test(query.trim())) {
      const result = await supabase.from("orders").select("*, order_items(*, products(name, image, price))").eq("id", query.trim()).single();
      data = result.data; fetchError = result.error;
    }
    if (!data && !fetchError) {
      const result = await supabase.from("orders").select("*, order_items(*, products(name, image, price))").ilike("customer_email", query.trim()).order("created_at", { ascending: false }).limit(1).maybeSingle();
      data = result.data; fetchError = result.error;
    }
    if (!data && !fetchError) {
      const result = await supabase.from("orders").select("*, order_items(*, products(name, image, price))").ilike("id", `%${query.trim()}%`).order("created_at", { ascending: false }).limit(1).maybeSingle();
      data = result.data; fetchError = result.error;
    }

    setLoading(false);
    if (fetchError || !data) setError("Commande non trouvée.");
    else setOrder(data);
  };

  const currentStep = order ? (statusIndex[order.status] ?? -1) : -1;
  const isCancelled = order?.status === "cancelled";

  return (
    <>
      <Breadcrumb title="Suivi de commande" links={[{ label: "Suivi" }]} />
      <div className="section" style={{ background: "var(--bg-alt)", minHeight: "60vh" }}>
        <div className="container">
          {/* Search */}
          <div style={{ maxWidth: 600, margin: "0 auto 40px" }}>
            <div className="tracking-card">
              <h3 style={{ textAlign: "center", marginBottom: 8, fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase", letterSpacing: "0.5px" }}>Suivi de commande</h3>
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

          {order && (
            <div className="tracking-card">
              <div className="tracking-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Commande</h3>
                  <p style={{ margin: "4px 0 0", color: "var(--text-muted)", fontSize: 13, fontFamily: "var(--font-mono)" }}>
                    N° {order.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{order.total.toFixed(2)} €</p>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--text-muted)" }}>
                    {new Date(order.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
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
                  <p><strong>Client :</strong> {order.customer_name}</p>
                  <p><strong>Email :</strong> {order.customer_email}</p>
                  {order.customer_phone && <p><strong>Tél :</strong> {order.customer_phone}</p>}
                </div>
                <div>
                  <p><strong>Adresse :</strong> {order.customer_address}</p>
                  <p><strong>Statut :</strong>{" "}
                    <span style={{
                      background: order.status === "delivered" ? "rgba(5,150,105,0.1)" : order.status === "shipped" ? "var(--cut-amber-light)" : order.status === "confirmed" ? "var(--cut-amber-light)" : "var(--signal-red-light)",
                      color: order.status === "delivered" ? "var(--success)" : order.status === "shipped" ? "var(--cut-amber)" : order.status === "confirmed" ? "var(--cut-amber)" : "var(--signal-red)",
                      padding: "2px 10px", borderRadius: 3, fontSize: 12, fontWeight: 600,
                      fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px",
                    }}>
                      {order.status === "pending" ? "En attente" : order.status === "confirmed" ? "Confirmée" : order.status === "shipped" ? "Expédiée" : order.status === "delivered" ? "Livrée" : order.status}
                    </span>
                  </p>
                </div>
              </div>

              {order.order_items && order.order_items.length > 0 && (
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.5px" }}>Produits commandés</h4>
                  {order.order_items.map((item) => (
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
          )}

          {!searched && !order && (
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
