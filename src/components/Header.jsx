import { Link } from "react-router-dom";

export default function Header({ cartCount = 3, onCartToggle }) {
  return (
    <header className="header_area">
      <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
        <nav className="classy-navbar" id="essenceNav">
          <Link className="nav-brand" to="/">
            <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "#333", letterSpacing: "1px" }}>POWER Tools</span>
          </Link>
          <div className="classy-navbar-toggler">
            <span className="navbarToggler">
              <span></span><span></span><span></span>
            </span>
          </div>
          <div className="classy-menu">
            <div className="classycloseIcon">
              <div className="cross-wrap">
                <span className="top"></span><span className="bottom"></span>
              </div>
            </div>
            <div className="classynav">
              <ul>
                <li>
                  <a href="#">Produits</a>
                  <div className="megamenu">
                    <ul className="single-mega cn-col-4">
                      <li className="title">Tournevis</li>
                      <li><Link to="/shop?cat=Tournevis">Tournevis sans fil</Link></li>
                      <li><Link to="/shop?cat=Tournevis">Tournevis à cliquets</Link></li>
                      <li><Link to="/shop?cat=Tournevis">Tournevis de construction</Link></li>
                      <li><Link to="/shop?cat=Tournevis">Tournevis articulé</Link></li>
                      <li><Link to="/shop?cat=Tournevis">Tournevis à dégagement rapide</Link></li>
                    </ul>
                    <ul className="single-mega cn-col-4">
                      <li className="title">Clés & Perceuses</li>
                      <li><Link to="/shop?cat=Clés à choc">Clé à choc sans fil</Link></li>
                      <li><Link to="/shop?cat=Clés à choc">Clé à choc rotative</Link></li>
                      <li><Link to="/shop?cat=Perceuses">Perceuse à fil</Link></li>
                      <li><Link to="/shop?cat=Perceuses">Marteau de forage</Link></li>
                      <li><Link to="/shop?cat=Perceuses">Ensemble de forage</Link></li>
                    </ul>
                    <ul className="single-mega cn-col-4">
                      <li className="title">Rivets & Meulage</li>
                      <li><Link to="/shop?cat=Rivets">Pistolet à rivet sans fil</Link></li>
                      <li><Link to="/shop?cat=Rivets">Pistolet de rivet batterie</Link></li>
                      <li><Link to="/shop?cat=Meulage">Meuleuse d'angle</Link></li>
                      <li><Link to="/shop?cat=Accessoires">Cliquets de batterie</Link></li>
                      <li><Link to="/shop?cat=Tournevis">Tournevis à angle</Link></li>
                    </ul>
                    <div className="single-mega cn-col-4">
                      <img src="/img/bg-img/bg-6.jpg" alt="" />
                    </div>
                  </div>
                </li>
                <li>
                  <a href="#">Pages</a>
                  <ul className="dropdown">
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/shop">Boutique</Link></li>
                    <li><Link to="/product/1">Détail Produit</Link></li>
                    <li><Link to="/checkout">Commande</Link></li>
                    <li><Link to="/blog">Actualités</Link></li>
                    <li><Link to="/blog/1">Article</Link></li>
                    <li><Link to="/regular-page">À propos</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/tracking">Suivi de commande</Link></li>
                  </ul>
                </li>
                <li><Link to="/blog">Actualités</Link></li>
                <li><Link to="/contact">Contact</Link></li>
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
          <div className="favourite-area">
            <a href="#"><img src="/img/core-img/heart.svg" alt="" /></a>
          </div>
          <div className="user-login-info">
            <a href="#"><img src="/img/core-img/user.svg" alt="" /></a>
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
