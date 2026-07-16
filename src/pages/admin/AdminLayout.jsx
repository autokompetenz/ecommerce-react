import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 20px",
    color: isActive ? "#fff" : "#555",
    background: isActive ? "#333" : "transparent",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: isActive ? "600" : "400",
    marginBottom: "4px",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f5f7" }}>
      {/* Sidebar */}
      <aside style={{ width: "240px", background: "#fff", borderRight: "1px solid #e5e5e5", padding: "24px 16px", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>POWER Tools</h3>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#999" }}>Admin Panel</p>
        </div>

        <nav style={{ flex: 1 }}>
          <NavLink to="/admin" end style={linkStyle}>
            <i className="fa fa-th-large" style={{ marginRight: "8px", width: "16px" }}></i>Produits
          </NavLink>
          <NavLink to="/admin/orders" style={linkStyle}>
            <i className="fa fa-shopping-bag" style={{ marginRight: "8px", width: "16px" }}></i>Commandes
          </NavLink>
          <NavLink to="/admin/add" style={linkStyle}>
            <i className="fa fa-plus-circle" style={{ marginRight: "8px", width: "16px" }}></i>Ajouter
          </NavLink>
        </nav>

        <div>
          <a href="/" style={{ display: "block", padding: "12px 20px", color: "#555", textDecoration: "none", fontSize: "14px", marginBottom: "4px" }}>
            <i className="fa fa-home" style={{ marginRight: "8px", width: "16px" }}></i>Voir le site
          </a>
          <button onClick={handleLogout} style={{ display: "block", width: "100%", padding: "12px 20px", color: "#e74c3c", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: "14px" }}>
            <i className="fa fa-sign-out" style={{ marginRight: "8px", width: "16px" }}></i>Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "32px", overflow: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
