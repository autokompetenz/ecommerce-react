import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const CATEGORIES = [
  { value: "", label: "Toutes catégories" },
  { value: "tournevis", label: "Tournevis" },
  { value: "cles-a-choc", label: "Clés à choc" },
  { value: "perceuses", label: "Perceuses" },
  { value: "rivets", label: "Rivets" },
  { value: "meulage", label: "Meulage" },
];

export default function Header({ cartCount = 0, onCartToggle, theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (q) {
      navigate(`/shop?q=${encodeURIComponent(q)}`);
      setSearchTerm("");
    }
  };

  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
    setCategoryOpen(false);
  };

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-left">
            <span className="header-brand-text">
              <i className="fa-solid fa-industry"></i>
              POWER Tools — Outils Industriels
            </span>
          </div>
          <div className="header-top-right">
            <Link to="/help"><i className="fa-solid fa-circle-question"></i> Aide</Link>
            <Link to="/tracking"><i className="fa-solid fa-truck-fast"></i> Suivi de commande</Link>
            <button className="header-top-selector" type="button">
              <i className="fa-solid fa-globe"></i> FR
            </button>
            <button className="header-top-selector" type="button">
              <i className="fa-solid fa-euro-sign"></i> EUR
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <div className="header-main">
        <div className="container">

          {/* Logo */}
          <Link to="/" className="header-logo">
            <span>POWER</span> Tools
          </Link>

          {/* Mega Search */}
          <form className="mega-search" onSubmit={handleSearch}>
            <div className={`mega-search-category ${categoryOpen ? "open" : ""}`}>
              <button
                type="button"
                className="mega-search-category-btn"
                onClick={() => setCategoryOpen((o) => !o)}
              >
                {CATEGORIES.find((c) => c.value === selectedCategory)?.label || "Toutes catégories"}
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              {categoryOpen && (
                <ul className="mega-search-dropdown">
                  {CATEGORIES.map((cat) => (
                    <li
                      key={cat.value}
                      className={selectedCategory === cat.value ? "selected" : ""}
                      onClick={() => handleCategorySelect(cat.value)}
                    >
                      {cat.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              type="search"
              className="mega-search-input"
              placeholder="Rechercher des outils industriels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="mega-search-btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          {/* Action Buttons */}
          <div className="header-actions">
            <button
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === "dark" ? "Mode clair" : "Mode sombre"}
            >
              <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
            </button>

            <button className="header-cart-btn" onClick={onCartToggle}>
              <i className="fa-solid fa-bag-shopping cart-icon"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button className="hamburger" onClick={() => setMobileOpen(true)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Nav Bar ── */}
      <div className="header-nav">
        <div className="container">
          <nav className="header-nav-links">
            <Link to="/" className={isActive("/")}>
              <i className="fa-solid fa-house"></i> Accueil
            </Link>
            <Link to="/shop" className={isActive("/shop")}>
              <i className="fa-solid fa-store"></i> Boutique
            </Link>

            <div className="nav-dropdown">
              <button type="button" className="nav-dropdown-trigger">
                <i className="fa-solid fa-layer-group"></i> Catégories
                <i className="fa-solid fa-chevron-down nav-chevron"></i>
              </button>
              <ul className="nav-dropdown-menu">
                {CATEGORIES.filter((c) => c.value !== "").map((cat) => (
                  <li key={cat.value}>
                    <Link to={`/shop?category=${cat.value}`}>{cat.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/blog" className={isActive("/blog")}>
              <i className="fa-solid fa-newspaper"></i> Actualités
            </Link>
            <Link to="/contact" className={isActive("/contact")}>
              <i className="fa-solid fa-envelope"></i> Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* ── Mobile Nav Overlay ── */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile Nav Drawer ── */}
      <div className={`mobile-nav ${mobileOpen ? "active" : ""}`}>
        <div className="mobile-nav-header">
          <h3>Menu</h3>
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="mobile-nav-links">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-house"></i> Accueil
          </Link>
          <Link to="/shop" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-store"></i> Boutique
          </Link>
          {CATEGORIES.filter((c) => c.value !== "").map((cat) => (
            <Link
              key={cat.value}
              to={`/shop?category=${cat.value}`}
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-wrench"></i> {cat.label}
            </Link>
          ))}
          <Link to="/blog" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-newspaper"></i> Actualités
          </Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-envelope"></i> Contact
          </Link>
          <Link to="/tracking" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-truck"></i> Suivi de commande
          </Link>
          <Link to="/help" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-circle-info"></i> Aide
          </Link>
        </div>

        <div className="mobile-nav-footer">
          <a href="tel:+4933652450"><i className="fa-solid fa-phone"></i> +49 (0) 33652 / 45 0</a>
          <a href="mailto:info@powertools.de"><i className="fa-solid fa-envelope"></i> info@powertools.de</a>
        </div>
      </div>
    </>
  );
}
