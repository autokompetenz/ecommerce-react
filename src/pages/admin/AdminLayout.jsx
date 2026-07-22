import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* Mobile top bar */}
      <div className="admin-topbar">
        <button className="admin-hamburger" onClick={() => setSidebarOpen(true)}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <span className="admin-topbar-title">POWER Tools — Admin</span>
        <button className="admin-topbar-cart" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>

      {/* Sidebar overlay */}
      <div className={`admin-sidebar-overlay ${sidebarOpen ? "active" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="admin-sidebar-header">
          <div>
            <h3>POWER Tools</h3>
            <p>Admin Panel</p>
          </div>
          <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`} onClick={() => setSidebarOpen(false)}>
            <i className="fa-solid fa-grid-2"></i> Tableau de bord
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`} onClick={() => setSidebarOpen(false)}>
            <i className="fa-solid fa-box-open"></i> Produits
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`} onClick={() => setSidebarOpen(false)}>
            <i className="fa-solid fa-bag-shopping"></i> Commandes
          </NavLink>
          <NavLink to="/admin/add" className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`} onClick={() => setSidebarOpen(false)}>
            <i className="fa-solid fa-circle-plus"></i> Ajouter
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`} onClick={() => setSidebarOpen(false)}>
            <i className="fa-solid fa-gear"></i> Paramètres
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" className="admin-nav-link">
            <i className="fa-solid fa-house"></i> Voir le site
          </a>
          <button onClick={handleLogout} className="admin-nav-link admin-logout">
            <i className="fa-solid fa-right-from-bracket"></i> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
