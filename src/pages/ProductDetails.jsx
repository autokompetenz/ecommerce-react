import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { products as localProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import ScrollReveal from "../components/ScrollReveal";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await supabase.from("products").select("*").eq("id", id).single();
      if (data) {
        setProduct(data);
      } else {
        const local = localProducts.find((p) => p.id === Number(id));
        setProduct(local || null);
      }
      setLoading(false);
    };
    fetchProduct();
    setActiveImage(0);
    setQuantity(1);
    setActiveTab("description");
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="empty-state"><p>Chargement...</p></div>;
  if (!product) return <div className="empty-state"><p>Produit non trouvé.</p><Link to="/shop" className="btn btn-brand" style={{ marginTop: 16 }}>Retour à la boutique</Link></div>;

  const images = [product.image, product.hover_image].filter(Boolean);
  const stockStatus = product.stock > 10 ? "available" : product.stock > 0 ? "low" : "out";
  const stockLabel = product.stock > 10 ? "En stock" : product.stock > 0 ? `Plus que ${product.stock} en stock` : "Rupture de stock";

  const relatedProducts = localProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const TABS = [
    { key: "description", label: "Description" },
    { key: "features", label: "Caractéristiques" },
    { key: "specs", label: "Données techniques" },
    { key: "delivery", label: "Livraison" },
  ];

  return (
    <div className="section pd-section">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <Link to="/">Accueil</Link>
          <span className="sep">/</span>
          <Link to="/shop">Boutique</Link>
          <span className="sep">/</span>
          <Link to={`/shop?cat=${product.category}`}>{product.category}</Link>
          <span className="sep">/</span>
          <span className="current">{product.name}</span>
        </nav>

        {/* Main */}
        <div className="pd-layout">
          {/* Images */}
          <ScrollReveal direction="left">
            <div>
              <div className="pd-images-main">
                <img src={images[activeImage] || "/img/product-img/product-1.jpg"} alt={product.name} />
              </div>
              {images.length > 1 && (
                <div className="pd-thumbnails">
                  {images.map((img, i) => (
                    <div key={i} className={`pd-thumb ${activeImage === i ? "active" : ""}`} onClick={() => setActiveImage(i)}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal direction="right">
            <div>
              <div className="pd-brand">{product.brand} — Réf: {product.ref || "N/A"}</div>
              <h1 className="pd-title">{product.name}</h1>

              {product.badge && (
                <span className={`pd-badge-tag ${product.badge === "New" ? "shipping" : "moq"}`} style={{ marginBottom: 12 }}>
                  {product.badge === "New" ? "Nouveau" : product.badge}
                </span>
              )}

              <div className="pd-price-block">
                {product.old_price && (
                  <span className="pd-price old">
                    {product.old_price.toFixed(2)} €
                  </span>
                )}
                <span className={`pd-price ${product.old_price ? "pd-price-sale" : ""}`}>
                  {product.price.toFixed(2)} €
                </span>
                <span className="ttc">TTC</span>
              </div>

              <div className={`pd-stock`}>
                <span className={`pd-stock-dot ${stockStatus}`}></span>
                <span className={`pd-stock-text ${stockStatus}`}>{stockLabel}</span>
              </div>

              <div className="pd-badges">
                <span className="pd-badge-tag shipping">
                  <i className="fa-solid fa-truck-fast"></i> Expédié sous 24h
                </span>
                <span className="pd-badge-tag verified">
                  <i className="fa-solid fa-shield-halved"></i> Vendeur vérifié
                </span>
                {product.moq && (
                  <span className="pd-badge-tag moq">
                    <i className="fa-solid fa-boxes-stacked"></i> MOQ : {product.moq} pièces
                  </span>
                )}
              </div>

              <div className="pd-identifiers">
                {product.ean && (
                  <div className="pd-identifier-row">
                    <span className="pd-id-label"><i className="fa-solid fa-barcode"></i> EAN</span>
                    <span className="pd-id-value">{product.ean}</span>
                  </div>
                )}
                {product.part_number && (
                  <div className="pd-identifier-row">
                    <span className="pd-id-label"><i className="fa-solid fa-hashtag"></i> N° de pièce</span>
                    <span className="pd-id-value">{product.part_number}</span>
                  </div>
                )}
              </div>

              <div className="pd-supplier-box">
                <p className="pd-supplier-box-label">Fournisseur</p>
                <p className="pd-supplier-box-name">
                  POWER Tools <i className="fa-solid fa-circle-check" style={{ color: "var(--success)", fontSize: 13 }}></i>
                </p>
              </div>

              <div className="pd-delivery">
                <strong>Livraison :</strong> Expédié sous 24–48 h. Livraison gratuite dès 100 €.
              </div>

              <form onSubmit={handleAddToCart}>
                <div className="pd-qty-row">
                  <span className="pd-qty-label">Quantité :</span>
                  <div className="pd-qty">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                    <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                    <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>
                <button type="submit" className="btn btn-brand btn-lg btn-block">
                  {added ? <><i className="fa-solid fa-check"></i> Ajouté !</> : <><i className="fa-solid fa-cart-plus"></i> Ajouter au panier</>}
                </button>
              </form>

              <p className="pd-return-note">
                14 jours de retour inclus
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Tabs */}
        <ScrollReveal>
          <div className="pd-tabs">
            <div className="pd-tabs-header">
              {TABS.map((tab) => (
                <button key={tab.key} className={`pd-tab-btn ${activeTab === tab.key ? "active" : ""}`} onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pd-tab-content">
              {activeTab === "description" && <p>{product.description}</p>}
              {activeTab === "features" && product.features && (
                <ul className="pd-features-list">
                  {product.features.map((f, i) => (
                    <li key={i}><span>✓</span> {f}</li>
                  ))}
                </ul>
              )}
              {activeTab === "specs" && product.specs && (
                <table className="pd-specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key}><td>{key}</td><td>{val}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === "delivery" && (
                <div>
                  <p style={{ marginBottom: 16 }}>{product.delivery || "Expédition sous 24–48 h ouvrées. Livraison gratuite dès 100 €."}</p>
                  <div className="pd-delivery-cards">
                    <div className="pd-delivery-card">
                      <strong><i className="fa-solid fa-truck" style={{ marginRight: 6, color: "var(--orange)" }}></i> Standard</strong>
                      <p>2–3 jours ouvrés — Gratuit dès 100 €</p>
                    </div>
                    <div className="pd-delivery-card">
                      <strong><i className="fa-solid fa-bolt" style={{ marginRight: 6, color: "var(--orange)" }}></i> Express</strong>
                      <p>Sous 24 h — 9,90 €</p>
                    </div>
                    <div className="pd-delivery-card">
                      <strong><i className="fa-solid fa-rotate" style={{ marginRight: 6, color: "var(--orange)" }}></i> Retour</strong>
                      <p>14 jours pour retourner</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="pd-related">
            <h3>Produits similaires</h3>
            <div className="pd-related-grid">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="product-card pd-related-card">
                  <div className="product-card-img">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="product-card-body">
                    <div className="product-card-brand">{p.brand}</div>
                    <div className="product-card-name">{p.name}</div>
                    <div className="product-card-price">{p.price.toFixed(2)} €</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
