import { useState } from "react";
import { supabase } from "../lib/supabase";

const steps = [
  { key: "pending", label: "Commande reçue", icon: "fa-shopping-cart" },
  { key: "confirmed", label: "Confirmée", icon: "fa-check-circle" },
  { key: "shipped", label: "Expédiée", icon: "fa-truck" },
  { key: "delivered", label: "Livrée", icon: "fa-home" },
];

const statusIndex = {
  pending: 0,
  confirmed: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
};

export default function Tracking() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);
    setSearched(true);

    // Search by order ID (UUID) or by email
    let data = null;
    let fetchError = null;

    // Try by ID first (UUID format)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(query.trim())) {
      const result = await supabase
        .from("orders")
        .select("*, order_items(*, products(name, image, price))")
        .eq("id", query.trim())
        .single();
      data = result.data;
      fetchError = result.error;
    }

    // If not found by ID, try by email
    if (!data && !fetchError) {
      const result = await supabase
        .from("orders")
        .select("*, order_items(*, products(name, image, price))")
        .ilike("customer_email", query.trim())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      data = result.data;
      fetchError = result.error;
    }

    // Try partial ID match
    if (!data && !fetchError) {
      const result = await supabase
        .from("orders")
        .select("*, order_items(*, products(name, image, price))")
        .ilike("id", `%${query.trim()}%`)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      data = result.data;
      fetchError = result.error;
    }

    setLoading(false);
    if (fetchError || !data) {
      setError("Commande non trouvée. Vérifiez votre numéro de commande ou email.");
    } else {
      setOrder(data);
    }
  };

  const currentStep = order ? (statusIndex[order.status] ?? -1) : -1;
  const isCancelled = order?.status === "cancelled";

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcumb_area bg-img" style={{ backgroundImage: "url(/img/bg-img/breadcumb.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="page-title text-center">
                <h2>Suivi de commande</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding-80" style={{ background: "#f8f9fa", minHeight: "60vh" }}>
        <div className="container">
          {/* Search Form */}
          <div style={{ maxWidth: "600px", margin: "0 auto 40px" }}>
            <div style={{ background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h3 style={{ textAlign: "center", marginBottom: "8px", fontSize: "20px", color: "#333" }}>Rechercher votre commande</h3>
              <p style={{ textAlign: "center", color: "#888", fontSize: "14px", marginBottom: "24px" }}>
                Entrez votre numéro de commande ou l'email utilisé lors de la commande.
              </p>
              <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="N° de commande ou email..."
                  style={{
                    flex: 1, padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px",
                    fontSize: "14px", outline: "none",
                  }}
                />
                <button type="submit" disabled={loading} style={{
                  padding: "12px 24px", background: "#333", color: "#fff", border: "none",
                  borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600",
                  whiteSpace: "nowrap",
                }}>
                  {loading ? "Recherche..." : "Rechercher"}
                </button>
              </form>
            </div>
          </div>

          {/* Error */}
          {error && searched && (
            <div style={{ maxWidth: "600px", margin: "0 auto 24px", padding: "16px", background: "#fdecea", borderRadius: "8px", color: "#c62828", textAlign: "center", fontSize: "14px" }}>
              {error}
            </div>
          )}

          {/* Order Result */}
          {order && (
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              {/* Order Info Card */}
              <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden", marginBottom: "24px" }}>
                {/* Header */}
                <div style={{ padding: "24px 28px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>Commande confirmée</h3>
                    <p style={{ margin: "4px 0 0", color: "#888", fontSize: "13px" }}>
                      Commande n° <strong style={{ color: "#555", fontFamily: "monospace" }}>{order.id.slice(0, 8).toUpperCase()}</strong>
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#333" }}>${order.total.toFixed(2)}</p>
                    <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#888" }}>
                      {new Date(order.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>

                {/* Progress Steps */}
                {isCancelled ? (
                  <div style={{ padding: "32px 28px", textAlign: "center" }}>
                    <i className="fa fa-times-circle" style={{ fontSize: "48px", color: "#e74c3c", marginBottom: "12px" }}></i>
                    <p style={{ fontSize: "16px", color: "#e74c3c", fontWeight: "600" }}>Commande annulée</p>
                  </div>
                ) : (
                  <div style={{ padding: "32px 28px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                      {/* Progress line background */}
                      <div style={{ position: "absolute", top: "20px", left: "40px", right: "40px", height: "3px", background: "#e5e5e5", zIndex: 0 }}></div>
                      {/* Progress line filled */}
                      <div style={{
                        position: "absolute", top: "20px", left: "40px",
                        width: currentStep >= 0 ? `${(currentStep / (steps.length - 1)) * (100 - (80 / steps.length * 2 / 7))}%` : "0%",
                        height: "3px", background: "#27ae60", zIndex: 1, transition: "width 0.5s ease",
                      }}></div>

                      {steps.map((step, i) => {
                        const isActive = i <= currentStep;
                        const isCurrent = i === currentStep;
                        return (
                          <div key={step.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2, flex: 1 }}>
                            <div style={{
                              width: "42px", height: "42px", borderRadius: "50%",
                              background: isActive ? "#27ae60" : "#e5e5e5",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              boxShadow: isCurrent ? "0 0 0 4px rgba(39,174,96,0.2)" : "none",
                              transition: "all 0.3s ease",
                            }}>
                              <i className={`fa ${step.icon}`} style={{ color: isActive ? "#fff" : "#aaa", fontSize: "16px" }}></i>
                            </div>
                            <p style={{
                              marginTop: "10px", fontSize: "12px", fontWeight: isCurrent ? "700" : "500",
                              color: isActive ? "#27ae60" : "#aaa", textAlign: "center",
                            }}>
                              {step.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Customer Info */}
                <div style={{ padding: "20px 28px", borderTop: "1px solid #f0f0f0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "13px", color: "#666" }}>
                  <div>
                    <p><strong>Client :</strong> {order.customer_name}</p>
                    <p><strong>Email :</strong> {order.customer_email}</p>
                    {order.customer_phone && <p><strong>Tél :</strong> {order.customer_phone}</p>}
                  </div>
                  <div>
                    <p><strong>Adresse :</strong> {order.customer_address}</p>
                    <p><strong>Statut :</strong> <span style={{
                      background: order.status === "delivered" ? "#d4edda" : order.status === "shipped" ? "#d1ecf1" : order.status === "confirmed" ? "#cce5ff" : "#fff3cd",
                      color: order.status === "delivered" ? "#155724" : order.status === "shipped" ? "#0c5460" : order.status === "confirmed" ? "#004085" : "#856404",
                      padding: "2px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "600",
                    }}>
                      {order.status === "pending" ? "En attente" : order.status === "confirmed" ? "Confirmée" : order.status === "shipped" ? "Expédiée" : order.status === "delivered" ? "Livrée" : order.status}
                    </span></p>
                  </div>
                </div>
              </div>

              {/* Products */}
              {order.order_items && order.order_items.length > 0 && (
                <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                  <div style={{ padding: "20px 28px", borderBottom: "1px solid #f0f0f0" }}>
                    <h4 style={{ margin: 0, fontSize: "16px", color: "#333" }}>Produits commandés</h4>
                  </div>
                  <div style={{ padding: "16px 28px" }}>
                    {order.order_items.map((item) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                        <img src={item.products?.image || "/img/product-img/product-1.jpg"} alt="" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", color: "#333" }}>{item.products?.name || "Produit"}</p>
                          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#888" }}>Qté: {item.quantity}</p>
                        </div>
                        <p style={{ margin: 0, fontWeight: "600", fontSize: "14px" }}>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty state */}
          {!searched && !order && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
              <i className="fa fa-search" style={{ fontSize: "48px", marginBottom: "16px", display: "block" }}></i>
              <p>Entrez vos informations de commande pour suivre son état.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
