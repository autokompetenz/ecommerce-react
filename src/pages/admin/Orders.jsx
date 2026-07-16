import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(name, image))")
      .order("created_at", { ascending: false });
    if (!error) setOrders(data || []);
    setLoading(false);
  };

  const updateStatus = async (orderId, status) => {
    setUpdating(orderId);
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (!error) {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    }
    setUpdating(null);
  };

  const statusColors = {
    pending: { bg: "#fff3cd", text: "#856404" },
    confirmed: { bg: "#d1ecf1", text: "#0c5460" },
    shipped: { bg: "#d4edda", text: "#155724" },
    delivered: { bg: "#cce5ff", text: "#004085" },
    cancelled: { bg: "#f8d7da", text: "#721c24" },
  };

  const statusLabels = {
    pending: "En attente",
    confirmed: "Confirmée",
    shipped: "Expédiée",
    delivered: "Livrée",
    cancelled: "Annulée",
  };

  return (
    <div>
      <h1 style={{ fontSize: "24px", color: "#333", marginBottom: "24px" }}>Commandes ({orders.length})</h1>

      {loading ? (
        <p style={{ color: "#888" }}>Chargement...</p>
      ) : orders.length === 0 ? (
        <div style={{ background: "#fff", padding: "40px", borderRadius: "8px", textAlign: "center", border: "1px solid #e5e5e5" }}>
          <p style={{ color: "#888" }}>Aucune commande pour le moment.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {orders.map((order) => {
            const sc = statusColors[order.status] || statusColors.pending;
            return (
              <div key={order.id} style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e5e5e5", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #f0f0f0", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <strong style={{ fontSize: "15px" }}>{order.customer_name}</strong>
                    <span style={{ marginLeft: "12px", color: "#888", fontSize: "13px" }}>{new Date(order.created_at).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ background: sc.bg, color: sc.text, padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                      {statusLabels[order.status] || order.status}
                    </span>
                    <strong>${order.total.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.8" }}>
                    <p><strong>Email :</strong> {order.customer_email}</p>
                    <p><strong>Téléphone :</strong> {order.customer_phone || "-"}</p>
                    <p><strong>Adresse :</strong> {order.customer_address}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>Produits :</p>
                    {order.order_items?.map((item) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", fontSize: "13px" }}>
                        <img src={item.products?.image || ""} alt="" style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px" }} />
                        <span>{item.products?.name || "Produit supprimé"}</span>
                        <span style={{ color: "#888" }}>x{item.quantity}</span>
                        <span style={{ fontWeight: "600" }}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status update */}
                <div style={{ padding: "12px 20px", borderTop: "1px solid #f0f0f0", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus(order.id, key)}
                      disabled={updating === order.id || order.status === key}
                      style={{
                        padding: "6px 14px", fontSize: "12px", border: order.status === key ? "2px solid #333" : "1px solid #ddd",
                        borderRadius: "20px", cursor: order.status === key ? "default" : "pointer",
                        background: order.status === key ? "#333" : "#fff",
                        color: order.status === key ? "#fff" : "#555",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
