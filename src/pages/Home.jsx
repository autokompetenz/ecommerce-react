import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabase";

const CATEGORIES = [
  { name: "Tournevis", icon: "\uD83D\uDD27", link: "/shop?cat=Tournevis", desc: "Sans fil, à cliquets, articulés" },
  { name: "Clés à choc", icon: "\u26A1", link: "/shop?cat=Clés à choc", desc: "Sans fil, rotatives, pneumatiques" },
  { name: "Perceuses", icon: "\uD83D\uDD29", link: "/shop?cat=Perceuses", desc: "À fil, sans fil, marteau" },
  { name: "Rivets", icon: "\uD83D\uDD17", link: "/shop?cat=Rivets", desc: "Pistolets à rivets batterie" },
  { name: "Meulage", icon: "\u2699\uFE0F", link: "/shop?cat=Meulage", desc: "Meuleuses d'angle, disques" },
];

const WHY_US = [
  { icon: "fa-certificate", title: "Normes CE / DIN", desc: "Tous nos outils certifiés pour une utilisation industrielle conforme." },
  { icon: "fa-star", title: "Marques de référence", desc: "Bosch, Makita, Hilti, DeWalt, Festool — distributeur agréé." },
  { icon: "fa-boxes-stacked", title: "Stock permanent", desc: "5 000+ références en stock, expédiées sous 24 h." },
  { icon: "fa-headset", title: "Conseil technique", desc: "Experts dédiés pour le choix des outils adaptés à vos procédés." },
];

function TechnicalHero() {
  return (
    <section className="hero">
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
        <div className="hero-content" style={{ flex: 1 }}>
          <div className="hero-badge">POWER Tools GmbH — Spreenhagen, DE</div>
          <h1>Outils de Coupe<br /><span>Industriels</span></h1>
          <p>
            Tournevis, perceuses, clés à choc, riveteurs et meuleuses haute
            performance. Conçus pour les professionnels de l'industrie.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-brand btn-lg">Voir le catalogue</Link>
            <Link to="/contact" className="btn btn-white btn-lg">Demander un devis</Link>
          </div>
        </div>
        <div style={{ flex: "0 0 auto", opacity: 0.6 }}>
          <svg width="320" height="280" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* End mill line art */}
            <line x1="160" y1="20" x2="160" y2="200" stroke="#e2861f" strokeWidth="2" strokeDasharray="4 4"/>
            <rect x="140" y="20" width="40" height="60" rx="2" stroke="#e2861f" strokeWidth="1.5" fill="none"/>
            <rect x="145" y="80" width="30" height="120" rx="1" stroke="#e2861f" strokeWidth="1.5" fill="none"/>
            {/* Flutes */}
            <line x1="145" y1="100" x2="155" y2="95" stroke="#e2861f" strokeWidth="1" opacity="0.6"/>
            <line x1="145" y1="120" x2="155" y2="115" stroke="#e2861f" strokeWidth="1" opacity="0.6"/>
            <line x1="145" y1="140" x2="155" y2="135" stroke="#e2861f" strokeWidth="1" opacity="0.6"/>
            <line x1="145" y1="160" x2="155" y2="155" stroke="#e2861f" strokeWidth="1" opacity="0.6"/>
            <line x1="145" y1="180" x2="155" y2="175" stroke="#e2861f" strokeWidth="1" opacity="0.6"/>
            {/* Dimension lines */}
            <line x1="120" y1="20" x2="120" y2="200" stroke="#c8cdd2" strokeWidth="0.8"/>
            <line x1="115" y1="20" x2="125" y2="20" stroke="#c8cdd2" strokeWidth="0.8"/>
            <line x1="115" y1="200" x2="125" y2="200" stroke="#c8cdd2" strokeWidth="0.8"/>
            <text x="108" y="115" fill="#c8cdd2" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="middle" transform="rotate(-90 108 115)">Ø 12mm</text>
            {/* Tolerance */}
            <line x1="190" y1="80" x2="240" y2="80" stroke="#c8cdd2" strokeWidth="0.8" strokeDasharray="2 2"/>
            <text x="245" y="84" fill="#c8cdd2" fontSize="9" fontFamily="IBM Plex Mono">±0.02</text>
            {/* Title */}
            <text x="160" y="245" fill="#e2861f" fontSize="11" fontFamily="Barlow Condensed" textAnchor="middle" letterSpacing="2">FRAISE À BOIS DUR</text>
            <text x="160" y="260" fill="#c8cdd2" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="middle" opacity="0.6">HSS-E · DIN 842</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false }).limit(8);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <TechnicalHero />

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-item"><i className="fa-solid fa-building-columns"></i> GmbH — HRB 11523 FF</div>
          <div className="trust-item"><i className="fa-solid fa-map-pin"></i> Spreenhagen, Allemagne</div>
          <div className="trust-item"><i className="fa-solid fa-users"></i> 10–19 employés</div>
          <div className="trust-item"><i className="fa-solid fa-truck-fast"></i> Livraison 24–48 h</div>
          <div className="trust-item"><i className="fa-solid fa-shield-halved"></i> Paiement sécurisé</div>
        </div>
      </div>

      {/* Categories */}
      <div className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Nos Catégories</h2>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} to={cat.link} className="cat-card" style={{ textDecoration: "none" }}>
                <div className="cat-card-icon">{cat.icon}</div>
                <h4>{cat.name}</h4>
                <p>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2>Performance Industrielle</h2>
              <p>Outils de coupe haute performance pour broyage industriel et agroalimentaire.</p>
              <Link to="/shop" className="btn btn-brand">Voir le catalogue</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Produits Vedettes</h2>
          </div>
          {products.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-box-open"></i>
              <p>Ajoutez des produits depuis l'<Link to="/admin">admin</Link> pour les afficher ici.</p>
            </div>
          )}
          {products.length > 0 && (
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <Link to="/shop" className="btn btn-outline btn-lg">Voir tout le catalogue</Link>
            </div>
          )}
        </div>
      </div>

      {/* Why Us */}
      <div className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Pourquoi POWER Tools ?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {WHY_US.map((item) => (
              <div key={item.title} className="why-card">
                <div className="why-card-icon"><i className={`fa-solid ${item.icon}`}></i></div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
