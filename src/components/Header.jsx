import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ cartCount = 0, onCartToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header_area">
      <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
        <nav className="classy-navbar" id="essenceNav">
          <Link className="nav-brand" to="/">
            <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "#333", letterSpacing: "1px" }}>POWER Tools</span>
          </Link>
          <div className="classy-navbar-toggler" onClick={() => setMenuOpen(true)}>
            <span className="navbarToggler">
              <span></span><span></span><span></span>
            </span>
          </div>
          <div className={`classy-menu ${menuOpen ? "active" : ""}`}>
            <div className="classycloseIcon" onClick={() => setMenuOpen(false)}>
              <div className="cross-wrap">
                <span className="top"></span><span className="bottom"></span>
              </div>
            </div>
            <div className="classynav">
              <ul>
                <li>
                  <a href="/shop">Produits</a>
                  <div className="megamenu">
                    <ul className="single-mega cn-col-4">
                      <li className="title">Tournevis</li>
                      <li><Link to="/shop?cat=Tournevis" onClick={() => setMenuOpen(false)}>Tournevis sans fil</Link></li>
                      <li><Link to="/shop?cat=Tournevis" onClick={() => setMenuOpen(false)}>Tournevis à cliquets</Link></li>
                      <li><Link to="/shop?cat=Tournevis" onClick={() => setMenuOpen(false)}>Tournevis de construction</Link></li>
                    </ul>
                    <ul className="single-mega cn-col-4">
                      <li className="title">Clés & Perceuses</li>
                      <li><Link to="/shop?cat=Clés à choc" onClick={() => setMenuOpen(false)}>Clé à choc sans fil</Link></li>
                      <li><Link to="/shop?cat=Perceuses" onClick={() => setMenuOpen(false)}>Perceuse à fil</Link></li>
                      <li><Link to="/shop?cat=Perceuses" onClick={() => setMenuOpen(false)}>Marteau de forage</Link></li>
                    </ul>
                    <ul className="single-mega cn-col-4">
                      <li className="title">Rivets & Meulage</li>
                      <li><Link to="/shop?cat=Rivets" onClick={() => setMenuOpen(false)}>Pistolet à rivet</Link></li>
                      <li><Link to="/shop?cat=Meulage" onClick={() => setMenuOpen(false)}>Meuleuse d'angle</Link></li>
                      <li><Link to="/shop?cat=Accessoires" onClick={() => setMenuOpen(false)}>Cliquets de batterie</Link></li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#">Pages</a>
                  <ul className="dropdown">
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
                    <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Boutique</Link></li>
                    <li><Link to="/checkout" onClick={() => setMenuOpen(false)}>Commande</Link></li>
                    <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Actualités</Link></li>
                    <li><Link to="/regular-page" onClick={() => setMenuOpen(false)}>À propos</Link></li>
                    <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                    <li><Link to="/tracking" onClick={() => setMenuOpen(false)}>Suivi de commande</Link></li>
                  </ul>
                </li>
                <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Actualités</Link></li>
                <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="header-meta d-flex clearfix justify-content-end">
          <div className="search-area">
            <form>
              <input type="search" name="search" placeholder="Rechercher un produit..." />
              <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
            </form>
          </div>
          <div className="cart-area">
            <a href="#" onClick={(e) => { e.preventDefault(); onCartToggle(); }}>
              <img src="/img/core-img/bag.svg" alt="" /> <span>{cartCount}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
