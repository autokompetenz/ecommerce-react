import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ cartCount = 0, onCartToggle, theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <>
      {/* Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-left">
            <span><i className="fa-solid fa-truck-fast"></i> Livraison gratuite dès 100 €</span>
            <span><i className="fa-solid fa-phone"></i> +49 (0) 33652 / 45 0</span>
          </div>
          <div className="header-top-right">
            <Link to="/tracking"><i className="fa-solid fa-location-dot"></i> Suivi de commande</Link>
            <Link to="/contact"><i className="fa-solid fa-headset"></i> Support</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <Link to="/" className="header-logo">
            <span>POWER</span> Tools
          </Link>

          <div className="header-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" placeholder="Rechercher un produit..." />
          </div>

          <nav className="header-nav">
            <Link to="/" className={isActive("/")}>Accueil</Link>
            <Link to="/shop" className={isActive("/shop")}>Boutique</Link>
            <Link to="/blog" className={isActive("/blog")}>Actualités</Link>
            <Link to="/contact" className={isActive("/contact")}>Contact</Link>
          </nav>

          <div className="header-actions">
            <button className="theme-toggle-btn" onClick={onToggleTheme} title={theme === "dark" ? "Mode clair" : "Mode sombre"}>
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

      {/* Mobile Nav */}
      <div className={`mobile-nav-overlay ${mobileOpen ? "active" : ""}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-nav ${mobileOpen ? "active" : ""}`}>
        <div className="mobile-nav-header">
          <h3>Menu</h3>
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="mobile-nav-links">
          <Link to="/" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-house"></i> Accueil</Link>
          <Link to="/shop" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-store"></i> Boutique</Link>
          <Link to="/blog" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-newspaper"></i> Actualités</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-envelope"></i> Contact</Link>
          <Link to="/tracking" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-truck"></i> Suivi de commande</Link>
          <Link to="/regular-page" onClick={() => setMobileOpen(false)}><i className="fa-solid fa-circle-info"></i> À propos</Link>
        </div>
        <div className="mobile-nav-footer">
          <a href="tel:+4933652450"><i className="fa-solid fa-phone"></i> +49 (0) 33652 / 45 0</a>
          <a href="mailto:info@powertools.de"><i className="fa-solid fa-envelope"></i> info@powertools.de</a>
        </div>
      </div>
    </>
  );
}
