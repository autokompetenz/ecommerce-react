import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import { supabase } from "../lib/supabase";

const CATEGORIES = [
  { name: "Tournevis", icon: "fa-screwdriver-wrench", link: "/shop?cat=Tournevis", desc: "Sans fil, à cliquets, articulés" },
  { name: "Clés à choc", icon: "fa-wrench", link: "/shop?cat=Clés à choc", desc: "Sans fil, rotatives, pneumatiques" },
  { name: "Perceuses", icon: "fa-bolt", link: "/shop?cat=Perceuses", desc: "À fil, sans fil, marteau" },
  { name: "Rivets", icon: "fa-link", link: "/shop?cat=Rivets", desc: "Pistolets à rivets batterie" },
  { name: "Meulage", icon: "fa-gear", link: "/shop?cat=Meulage", desc: "Meuleuses d'angle, disques" },
];

const WHY_US = [
  { icon: "fa-certificate", title: "Conforme aux normes", desc: "Tous nos outils répondent aux normes européennes en vigueur." },
  { icon: "fa-industry", title: "Fabrication allemande", desc: "Développement et fabrication en Allemagne, qualité certifiée." },
  { icon: "fa-boxes-stacked", title: "Stock permanent", desc: "Large gamme de produits disponibles, expédition sous 24–48 h." },
  { icon: "fa-headset", title: "Support technique", desc: "Une équipe d'experts pour vous conseiller sur le choix de vos outils." },
];

function Hero() {
  return (
    <section className="hero-b2b">
      <div className="container">
        <div className="hero-grid">
          {/* Left Sidebar */}
          <ScrollReveal direction="left">
            <div className="hero-sidebar">
              <h4>Catégories</h4>
              <ul>
                {CATEGORIES.map((cat) => (
                  <li key={cat.name}>
                    <Link to={cat.link}>
                      <i className={`fa-solid ${cat.icon}`}></i>
                      <span>{cat.name}</span>
                      <i className="fa-solid fa-chevron-right cat-chevron"></i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Center Banner */}
          <ScrollReveal direction="up" delay={100}>
            <div
              className="hero-banner"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1745921204896-c2011440a4e2?w=1400&q=80&auto=format&fit=crop')" }}
            >
              <div className="hero-banner-overlay"></div>
              <div className="hero-banner-content">
                <h1>Outils de Coupe<br />Industriels</h1>
                <p>Tournevis, perceuses, clés à choc, riveteurs et meuleuses haute performance pour professionnels.</p>
                <Link to="/shop" className="btn btn-brand btn-lg">Voir le catalogue</Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Widget */}
          <ScrollReveal direction="right" delay={200}>
            <div className="hero-right">
              <div className="hero-welcome">
                <h3>Bienvenue sur POWER Tools</h3>
                <p>Accédez à votre espace pour gérer vos commandes et devis.</p>
                <div className="hero-auth-btns">
                  <Link to="/login" className="btn btn-brand btn-block">Connexion</Link>
                  <Link to="/register" className="btn btn-outline btn-block">Créer un compte</Link>
                </div>
              </div>
              <div className="hero-trust">
                <div className="hero-trust-item">
                  <i className="fa-solid fa-truck-fast"></i>
                  <span>Livraison 24-48h</span>
                </div>
                <div className="hero-trust-item">
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  <span>Retour 14 jours</span>
                </div>
                <div className="hero-trust-item">
                  <i className="fa-solid fa-headset"></i>
                  <span>Support technique</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Hero />

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-item"><i className="fa-solid fa-building-columns"></i> GmbH — Allemagne</div>
          <div className="trust-item"><i className="fa-solid fa-map-pin"></i> Spreenhagen, DE</div>
          <div className="trust-item"><i className="fa-solid fa-truck-fast"></i> Livraison 24–48 h</div>
          <div className="trust-item"><i className="fa-solid fa-shield-halved"></i> Paiement sécurisé</div>
          <div className="trust-item"><i className="fa-solid fa-clock-rotate-left"></i> Retour 14 jours</div>
        </div>
      </div>

      {/* Categories */}
      <div className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <h2>Nos Catégories</h2>
            </div>
          </ScrollReveal>
          <div className="cat-grid">
            {CATEGORIES.map((cat, i) => (
              <ScrollReveal key={cat.name} direction="up" delay={i * 60} inline>
                <Link to={cat.link} className="cat-card">
                  <div className="cat-card-icon">
                    <i className={`fa-solid ${cat.icon}`}></i>
                  </div>
                  <h4>{cat.name}</h4>
                  <p>{cat.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="section-sm">
        <div className="container">
          <ScrollReveal>
            <div className="cta-banner">
              <div className="cta-banner-content">
                <h2>Performance Industrielle</h2>
                <p>Outils de coupe haute performance pour broyage industriel et agroalimentaire.</p>
                <Link to="/shop" className="btn btn-white btn-lg">Voir le catalogue</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Products Grid */}
      <div className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <h2>Produits Vedettes</h2>
            </div>
          </ScrollReveal>
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product, i) => (
                <ScrollReveal key={product.id} direction="up" delay={i * 50} inline>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-box-open"></i>
              <p>Ajoutez des produits depuis l'<Link to="/admin">admin</Link> pour les afficher ici.</p>
            </div>
          )}
          {products.length > 0 && (
            <ScrollReveal>
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <Link to="/shop" className="btn btn-outline btn-lg">Voir tout le catalogue</Link>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Why Us */}
      <div className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <h2>Pourquoi POWER Tools ?</h2>
            </div>
          </ScrollReveal>
          <div className="home-why-grid">
            {WHY_US.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 80} inline>
                <div className="why-card">
                  <div className="why-card-icon"><i className={`fa-solid ${item.icon}`}></i></div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
