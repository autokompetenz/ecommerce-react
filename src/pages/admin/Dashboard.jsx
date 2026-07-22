import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const STATUS_LABELS = {
  pending: "Ausstehend",
  confirmed: "Bestätigt",
  shipped: "Versandt",
  delivered: "Zugestellt",
  cancelled: "Storniert",
};
const STATUS_COLORS = {
  pending: "#d97706",
  confirmed: "#3b82f6",
  shipped: "#8b5cf6",
  delivered: "#059669",
  cancelled: "#dc2626",
};

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, pending: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [productsRes, ordersRes] = await Promise.all([
        supabase.from("products").select("id, name, brand, price, image, category, created_at").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
      ]);

      const products = productsRes.data || [];
      const orders = ordersRes.data || [];

      const revenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
      const pending = orders.filter((o) => o.status === "pending").length;

      setStats({
        products: products.length,
        orders: orders.length,
        revenue,
        pending,
      });
      setRecentOrders(orders.slice(0, 5));
      setRecentProducts(products.slice(0, 5));
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <p className="admin-loading">Wird geladen...</p>;

  return (
    <div>
      <div className="admin-header-row">
        <h1>Dashboard</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to="/admin/add" className="btn btn-primary admin-add-btn">
            <i className="fa-solid fa-plus"></i> Produkt hinzufügen
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card admin-stat-products">
          <div className="admin-stat-icon"><i className="fa-solid fa-box-open"></i></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats.products}</span>
            <span className="admin-stat-label">Produkte</span>
          </div>
        </div>
        <div className="admin-stat-card admin-stat-orders">
          <div className="admin-stat-icon"><i className="fa-solid fa-bag-shopping"></i></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats.orders}</span>
            <span className="admin-stat-label">Bestellungen</span>
          </div>
        </div>
        <div className="admin-stat-card admin-stat-revenue">
          <div className="admin-stat-icon"><i className="fa-solid fa-euro-sign"></i></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats.revenue.toFixed(2)} €</span>
            <span className="admin-stat-label">Umsatz</span>
          </div>
        </div>
        <div className="admin-stat-card admin-stat-pending">
          <div className="admin-stat-icon"><i className="fa-solid fa-clock"></i></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats.pending}</span>
            <span className="admin-stat-label">Ausstehend</span>
          </div>
        </div>
      </div>

      {/* Two columns: Recent Orders + Quick Actions */}
      <div className="admin-dash-grid">
        {/* Recent Orders */}
        <div className="admin-dash-card">
          <div className="admin-dash-card-header">
            <h2><i className="fa-solid fa-clock-rotate-left"></i> Letzte Bestellungen</h2>
            <Link to="/admin/orders" className="admin-dash-link">Alle ansehen <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="admin-dash-empty">Noch keine Bestellungen.</p>
          ) : (
            <div className="admin-dash-orders">
              {recentOrders.map((order) => (
                <div key={order.id} className="admin-dash-order-row">
                  <div className="admin-dash-order-info">
                    <span className="admin-dash-order-id">#{order.id.slice(0, 8).toUpperCase()}</span>
                    <span className="admin-dash-order-name">{order.customer_name}</span>
                  </div>
                  <div className="admin-dash-order-meta">
                    <span className="admin-dash-order-total">{Number(order.total).toFixed(2)} €</span>
                    <span
                      className="admin-dash-order-status"
                      style={{ color: STATUS_COLORS[STATUS_LABELS[order.status] ? order.status : "pending"] }}
                    >
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>
                  <span className="admin-dash-order-date">
                    {new Date(order.created_at).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="admin-dash-card">
          <div className="admin-dash-card-header">
            <h2><i className="fa-solid fa-bolt"></i> Schnellaktionen</h2>
          </div>
          <div className="admin-dash-actions">
            <Link to="/admin/add" className="admin-dash-action">
              <i className="fa-solid fa-circle-plus"></i>
              <span>Produkt hinzufügen</span>
            </Link>
            <Link to="/admin/orders" className="admin-dash-action">
              <i className="fa-solid fa-bag-shopping"></i>
              <span>Bestellungen verwalten</span>
            </Link>
            <Link to="/admin/settings" className="admin-dash-action">
              <i className="fa-solid fa-gear"></i>
              <span>Website-Einstellungen</span>
            </Link>
            <Link to="/shop" className="admin-dash-action" target="_blank">
              <i className="fa-solid fa-eye"></i>
              <span>Shop ansehen</span>
            </Link>
            <Link to="/" className="admin-dash-action" target="_blank">
              <i className="fa-solid fa-house"></i>
              <span>Startseite ansehen</span>
            </Link>
          </div>

          <div className="admin-dash-card-header" style={{ marginTop: 20 }}>
            <h2><i className="fa-solid fa-star"></i> Neueste Produkte</h2>
          </div>
          {recentProducts.length > 0 && (
            <div className="admin-dash-recent-products">
              {recentProducts.map((p) => (
                <Link key={p.id} to={`/admin/edit/${p.id}`} className="admin-dash-product-row">
                  <img src={p.image || "/img/product-img/product-1.jpg"} alt="" />
                  <div>
                    <span className="admin-dash-product-name">{p.name}</span>
                    <span className="admin-dash-product-cat">{p.category || "—"}</span>
                  </div>
                  <span className="admin-dash-product-price">{Number(p.price).toFixed(2)} €</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
