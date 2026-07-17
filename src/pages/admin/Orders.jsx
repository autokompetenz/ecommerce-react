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
      <h1 className="admin-page-title">Commandes ({orders.length})</h1>

      {loading ? (
        <p className="admin-loading">Chargement...</p>
      ) : orders.length === 0 ? (
        <div className="admin-empty">
          <p>Aucune commande pour le moment.</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => {
            const sc = statusColors[order.status] || statusColors.pending;
            return (
              <div key={order.id} className="admin-order-card">
                {/* Header */}
                <div className="admin-order-header">
                  <div>
                    <strong>{order.customer_name}</strong>
                    <span className="admin-order-date">{new Date(order.created_at).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="admin-order-header-right">
                    <span className="admin-order-status" style={{ background: sc.bg, color: sc.text }}>
                      {statusLabels[order.status] || order.status}
                    </span>
                    <strong>${order.total.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Details */}
                <div className="admin-order-details">
                  <div className="admin-order-info">
                    <p><strong>Email :</strong> {order.customer_email}</p>
                    <p><strong>Tél :</strong> {order.customer_phone || "-"}</p>
                    <p><strong>Adresse :</strong> {order.customer_address}</p>
                  </div>
                  <div className="admin-order-products">
                    <p className="admin-order-products-label">Produits :</p>
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="admin-order-product-item">
                        <img src={item.products?.image || ""} alt="" />
                        <span>{item.products?.name || "Produit supprimé"}</span>
                        <span className="text-muted">x{item.quantity}</span>
                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status buttons */}
                <div className="admin-order-status-bar">
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus(order.id, key)}
                      disabled={updating === order.id || order.status === key}
                      className={`admin-status-btn ${order.status === key ? "active" : ""}`}
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
