import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabase";

const CATEGORIES = [
  { name: "Tournevis", icon: "🔧", link: "/shop?cat=Tournevis", desc: "Sans fil, à cliquets, articulés" },
  { name: "Clés à choc", icon: "⚡", link: "/shop?cat=Clés à choc", desc: "Sans fil, rotatives, pneumatiques" },
  { name: "Perceuses", icon: "🔩", link: "/shop?cat=Perceuses", desc: "À fil, sans fil, marteau de forage" },
  { name: "Rivets", icon: "🔗", link: "/shop?cat=Rivets", desc: "Pistolets à rivets batterie" },
  { name: "Meulage", icon: "⚙️", link: "/shop?cat=Meulage", desc: "Meuleuses d'angle, disques" },
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
      {/* Hero Area */}
      <section className="welcome_area bg-img background-overlay" style={{ backgroundImage: "url(/img/bg-img/bg-1.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="hero-content">
                <h6>POWER Tools GmbH — Spreenhagen, Allemagne</h6>
                <h2>Outils de Coupe<br />Industriels</h2>
                <p style={{ color: "#fff", fontSize: "16px", marginBottom: "28px", maxWidth: "480px", lineHeight: 1.7, textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}>
                  Tournevis, perceuses, clés à choc, riveteurs et meuleuses haute performance pour professionnels de l'industrie.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <a href="/shop" className="btn essence-btn">Voir le catalogue</a>
                  <a href="/contact" className="btn" style={{ padding: "12px 28px", background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "6px", fontSize: "14px", fontWeight: 600, backdropFilter: "blur(4px)" }}>
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div style={{ background: "#1a1a2e", padding: "18px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "16px", textAlign: "center" }}>
            {[
              { icon: "fa-truck-fast", text: "Livraison 24-48h" },
              { icon: "fa-shield-halved", text: "Paiement sécurisé" },
              { icon: "fa-rotate-left", text: "Retour gratuit 14j" },
              { icon: "fa-headset", text: "Support technique" },
            ].map((item) => (
              <div key={item.icon} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ccc", fontSize: "13px", fontWeight: 500 }}>
                <i className={`fa-solid ${item.icon}`} style={{ color: "#e57e25", fontSize: "18px" }}></i>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="section-padding-80" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-heading text-center" style={{ marginBottom: "32px" }}>
            <h2>Nos Catégories</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} to={cat.link} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#f8f9fa", borderRadius: "12px", padding: "28px 20px", textAlign: "center",
                  border: "1px solid #eee", transition: "all 0.25s", cursor: "pointer",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e57e25"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(229,126,37,0.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>{cat.icon}</div>
                  <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#333", margin: "0 0 6px" }}>{cat.name}</h4>
                  <p style={{ fontSize: "12px", color: "#888", margin: 0, lineHeight: 1.4 }}>{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Area */}
      <div className="cta-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cta-content bg-img background-overlay" style={{ backgroundImage: "url(/img/bg-img/bg-5.jpg)" }}>
                <div className="h-100 d-flex align-items-center justify-content-end">
                  <div className="cta--text">
                    <h6>Precision</h6>
                    <h2>Haute Performance</h2>
                    <a href="/shop" className="btn essence-btn">Découvrir</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <section className="new_arrivals_area section-padding-80 clearfix">
        <div className="container">
          <div className="section-heading text-center" style={{ marginBottom: "32px" }}>
            <h2>Produits Populaires</h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="popular-products-slides">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "40px", width: "100%" }}>
                    <p style={{ color: "#888" }}>Ajoutez des produits depuis l'<a href="/admin">admin</a> pour les afficher ici.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {products.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "28px" }}>
              <a href="/shop" className="btn essence-btn" style={{ padding: "12px 36px" }}>Voir tout le catalogue</a>
            </div>
          )}
        </div>
      </section>

      {/* Why POWER Tools */}
      <div style={{ background: "#f8f9fa", padding: "60px 0" }}>
        <div className="container">
          <div className="section-heading text-center" style={{ marginBottom: "32px" }}>
            <h2>Pourquoi POWER Tools ?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {WHY_US.map((item) => (
              <div key={item.title} style={{
                background: "#fff", borderRadius: "12px", padding: "28px 24px", textAlign: "center",
                border: "1px solid #eee", transition: "box-shadow 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%", background: "rgba(229,126,37,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
                }}>
                  <i className={`fa-solid ${item.icon}`} style={{ fontSize: "22px", color: "#e57e25" }}></i>
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#333", marginBottom: "8px" }}>{item.title}</h4>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
