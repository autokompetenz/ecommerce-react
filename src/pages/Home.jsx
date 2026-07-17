import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabase";

const CATEGORIES = [
  { name: "Tournevis", icon: "\uD83D\uDD27", link: "/shop?cat=Tournevis", desc: "Sans fil, à cliquets, articulés" },
  { name: "Clés à choc", icon: "\u26A1", link: "/shop?cat=Clés à choc", desc: "Sans fil, rotatives, pneumatiques" },
  { name: "Perceuses", icon: "\uD83D\uDD29", link: "/shop?cat=Perceuses", desc: "À fil, sans fil, marteau de forage" },
  { name: "Rivets", icon: "\uD83D\uDD17", link: "/shop?cat=Rivets", desc: "Pistolets à rivets batterie" },
  { name: "Meulage", icon: "\u2699\uFE0F", link: "/shop?cat=Meulage", desc: "Meuleuses d'angle, disques" },
];

const WHY_US = [
  { icon: "fa-certificate", title: "Certification Industrielle", desc: "Tous nos outils respectent les normes CE et DIN pour une utilisation professionnelle." },
  { icon: "fa-star", title: "Marques Premium", desc: "Distributeur agréé des plus grandes marques : Bosch, Makita, Hilti, DeWalt, Festool." },
  { icon: "fa-boxes-stacked", title: "Stock Permanent", desc: "Plus de 5000 références disponibles en stock, expédiées sous 24h." },
  { icon: "fa-headset", title: "Conseil Technique", desc: "Une équipe d'experts à votre écoute pour le choix des outils adaptés à vos projets." },
];

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
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: "url(/img/bg-img/bg-1.jpg)" }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">POWER Tools GmbH — Spreenhagen, Allemagne</div>
            <h1>Outils de Coupe<br />Industriels</h1>
            <p>Tournevis, perceuses, clés à choc, riveteurs et meuleuses haute performance pour professionnels de l'industrie.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-brand btn-lg">Voir le catalogue</Link>
              <Link to="/contact" className="btn btn-white btn-lg">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-item"><i className="fa-solid fa-truck-fast"></i> Livraison 24-48h</div>
          <div className="trust-item"><i className="fa-solid fa-shield-halved"></i> Paiement sécurisé</div>
          <div className="trust-item"><i className="fa-solid fa-rotate-left"></i> Retour gratuit 14j</div>
          <div className="trust-item"><i className="fa-solid fa-headset"></i> Support technique</div>
        </div>
      </div>

      {/* Categories */}
      <div className="section" style={{ background: "var(--bg)" }}>
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
          <div className="cta-banner" style={{ backgroundImage: "url(/img/bg-img/bg-5.jpg)" }}>
            <div className="cta-banner-content">
              <h2>Haute Performance</h2>
              <p>Découvrez notre gamme complète d'outils industriels pour les professionnels les plus exigeants.</p>
              <Link to="/shop" className="btn btn-brand">Découvrir le catalogue</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Produits Populaires</h2>
          </div>
          {products.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
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
            <div style={{ textAlign: "center", marginTop: 32 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
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
