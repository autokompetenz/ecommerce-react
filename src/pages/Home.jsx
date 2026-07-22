import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import { supabase } from "../lib/supabase";

const CATEGORIES = [
  { name: "Schraubenzieher", icon: "fa-screwdriver-wrench", link: "/shop?cat=Schraubenzieher", desc: "Akkuschrauber, Ratschen, Gelenk" },
  { name: "Schlagschlüssel", icon: "fa-wrench", link: "/shop?cat=Schlagschlüssel", desc: "Akkuschrauber, drehend, pneumatisch" },
  { name: "Bohrmaschinen", icon: "fa-bolt", link: "/shop?cat=Bohrmaschinen", desc: "Elektro, Akku, Schlag" },
  { name: "Nieten", icon: "fa-link", link: "/shop?cat=Nieten", desc: "Akkur-Nietenpistolen" },
  { name: "Schleifen", icon: "fa-gear", link: "/shop?cat=Schleifen", desc: "Winkelschleifer, Trennscheiben" },
];

const WHY_US = [
  { icon: "fa-certificate", title: "Normenkonform", desc: "Alle unsere Werkzeuge entspreden den geltenden europäischen Normen." },
  { icon: "fa-industry", title: "Deutsche Fertigung", desc: "Entwicklung und Fertigung in Deutschland, zertifizierte Qualität." },
  { icon: "fa-boxes-stacked", title: "Ständiger Vorrat", desc: "Große Produktpalette verfügbar, Versand innerhalb von 24–48 Stunden." },
  { icon: "fa-headset", title: "Technischer Support", desc: "Ein Expertenteam berät Sie bei der Auswahl Ihrer Werkzeuge." },
];

function Hero() {
  return (
    <section className="hero-b2b">
      <div className="container">
        <div className="hero-grid">
          {/* Left Sidebar */}
          <ScrollReveal direction="left">
            <div className="hero-sidebar">
              <h4>Kategorien</h4>
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
                <h1>Industrieschneidwerkzeuge<br />&nbsp;</h1>
                <p>Schraubendreher, Bohrmaschinen, Schlagschrauber, Nietpistolen und Hochleistungsschleifer für Profis.</p>
                <Link to="/shop" className="btn btn-brand btn-lg">Katalog ansehen</Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Widget */}
          <ScrollReveal direction="right" delay={200}>
            <div className="hero-right">
              <div className="hero-trust">
                <div className="hero-trust-item">
                  <i className="fa-solid fa-truck-fast"></i>
                  <span>Lieferung 24–48 h</span>
                </div>
                <div className="hero-trust-item">
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  <span>Rückgabe 14 Tage</span>
                </div>
                <div className="hero-trust-item">
                  <i className="fa-solid fa-headset"></i>
                  <span>Technischer Support</span>
                </div>
                <div className="hero-trust-item">
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>Sichere Zahlung</span>
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
          <div className="trust-item"><i className="fa-solid fa-building-columns"></i> GmbH — Deutschland</div>
          <div className="trust-item"><i className="fa-solid fa-map-pin"></i> Spreenhagen, DE</div>
          <div className="trust-item"><i className="fa-solid fa-truck-fast"></i> Lieferung 24–48 h</div>
          <div className="trust-item"><i className="fa-solid fa-shield-halved"></i> Sichere Zahlung</div>
          <div className="trust-item"><i className="fa-solid fa-clock-rotate-left"></i> Rückgabe 14 Tage</div>
        </div>
      </div>

      {/* Categories */}
      <div className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <h2>Unsere Kategorien</h2>
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
                <h2>Industrielle Leistung</h2>
                <p>Hochleistungs-Schneidwerkzeuge für die industrielle und lebensmittelverarbeitende Zerkleinerung.</p>
                <Link to="/shop" className="btn btn-white btn-lg">Katalog ansehen</Link>
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
              <h2>Produkte im Highlight</h2>
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
              <p>Fügen Sie Produkte über das <Link to="/admin">Admin</Link>-Panel hinzu, um sie hier anzuzeigen.</p>
            </div>
          )}
          {products.length > 0 && (
            <ScrollReveal>
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <Link to="/shop" className="btn btn-outline btn-lg">Ganzen Katalog ansehen</Link>
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
              <h2>Warum POWER Tools ?</h2>
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
