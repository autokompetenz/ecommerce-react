import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { products as localProducts } from "../data/products";
import { useCart } from "../context/CartContext";

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

  if (loading) return <div style={{ padding: "80px", textAlign: "center" }}><p>Chargement...</p></div>;
  if (!product) return <div style={{ padding: "80px", textAlign: "center" }}><p>Produit non trouvé.</p><Link to="/shop">Retour à la boutique</Link></div>;

  const images = [product.image, product.hover_image].filter(Boolean);
  const stockStatus = product.stock > 10 ? "available" : product.stock > 0 ? "low" : "out";
  const stockLabel = product.stock > 10 ? "En stock" : product.stock > 0 ? `Plus que ${product.stock} en stock` : "Rupture de stock";

  const relatedProducts = localProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ background: "#fff" }}>
      <div className="container" style={{ padding: "30px 15px" }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: "13px", color: "#888", marginBottom: "24px" }}>
          <Link to="/" style={{ color: "#888", textDecoration: "none" }}>Accueil</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link to="/shop" style={{ color: "#888", textDecoration: "none" }}>Boutique</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link to={`/shop?cat=${product.category}`} style={{ color: "#888", textDecoration: "none" }}>{product.category}</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#333" }}>{product.name}</span>
        </nav>

        {/* Main product section */}
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>

          {/* Images */}
          <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
            <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "20px", textAlign: "center", marginBottom: "12px" }}>
              <img
                src={images[activeImage] || "/img/product-img/product-1.jpg"}
                alt={product.name}
                style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
            {images.length > 1 && (
              <div style={{ display: "flex", gap: "8px" }}>
                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      width: "70px", height: "70px", border: `2px solid ${activeImage === i ? "#e57e25" : "#eee"}`,
                      borderRadius: "6px", overflow: "hidden", cursor: "pointer", padding: "4px",
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ flex: "1 1 400px" }}>
            <p style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
              {product.brand} — Réf: {product.ref || "N/A"}
            </p>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#222", marginBottom: "12px", lineHeight: "1.3" }}>
              {product.name}
            </h1>

            {product.badge && (
              <span style={{
                display: "inline-block", padding: "3px 10px", borderRadius: "4px",
                fontSize: "12px", fontWeight: 600, marginBottom: "12px",
                background: product.badge === "New" ? "#e57e25" : "#c0392b", color: "#fff",
              }}>
                {product.badge}
              </span>
            )}

            {/* Price */}
            <div style={{ marginBottom: "16px" }}>
              {product.old_price && (
                <span style={{ textDecoration: "line-through", color: "#999", fontSize: "16px", marginRight: "10px" }}>
                  {product.old_price.toFixed(2)} €
                </span>
              )}
              <span style={{ fontSize: "28px", fontWeight: 700, color: product.old_price ? "#c0392b" : "#222" }}>
                {product.price.toFixed(2)} €
              </span>
              <span style={{ fontSize: "13px", color: "#888", marginLeft: "6px" }}>TTC</span>
            </div>

            {/* Stock */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <span style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background: stockStatus === "available" ? "#27ae60" : stockStatus === "low" ? "#e67e22" : "#e74c3c",
              }} />
              <span style={{ fontSize: "14px", color: stockStatus === "available" ? "#27ae60" : stockStatus === "low" ? "#e67e22" : "#e74c3c", fontWeight: 500 }}>
                {stockLabel}
              </span>
            </div>

            {/* Delivery */}
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px", padding: "12px", background: "#f8f9fa", borderRadius: "6px" }}>
              <strong>Livraison :</strong> Livré sous 24-48h. Livraison gratuite dès 100 € d'achat.
            </p>

            {/* Quantity + Cart */}
            <form onSubmit={handleAddToCart} style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <label style={{ fontSize: "14px", fontWeight: 600 }}>Quantité :</label>
                <div style={{ display: "flex", border: "1px solid #ddd", borderRadius: "6px", overflow: "hidden" }}>
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: "36px", height: "36px", border: "none", background: "#f5f5f5", cursor: "pointer", fontSize: "16px" }}>−</button>
                  <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: "50px", height: "36px", border: "none", textAlign: "center", fontSize: "14px", outline: "none" }} />
                  <button type="button" onClick={() => setQuantity(quantity + 1)} style={{ width: "36px", height: "36px", border: "none", background: "#f5f5f5", cursor: "pointer", fontSize: "16px" }}>+</button>
                </div>
              </div>
              <button type="submit" className="btn essence-btn" style={{ width: "100%", padding: "14px", fontSize: "15px", fontWeight: 600 }}>
                {added ? "Ajouté au panier !" : "Ajouter au panier"}
              </button>
            </form>

            {/* Return policy */}
            <p style={{ fontSize: "12px", color: "#888", textAlign: "center" }}>
              14 jours de retour inclus
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: "40px" }}>
          <div className="tabs-scroll" style={{ display: "flex", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", borderBottom: "2px solid #eee" }}>
            {[
              { key: "description", label: "Description" },
              { key: "features", label: "Caractéristiques" },
              { key: "specs", label: "Données techniques" },
              { key: "delivery", label: "Livraison" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flexShrink: 0, padding: "12px 20px", border: "none", background: "none", cursor: "pointer",
                  fontSize: "14px", whiteSpace: "nowrap", fontWeight: activeTab === tab.key ? 700 : 400,
                  color: activeTab === tab.key ? "#e57e25" : "#666",
                  borderBottom: activeTab === tab.key ? "2px solid #e57e25" : "2px solid transparent",
                  marginBottom: "-2px", transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: "24px 0" }}>
            {activeTab === "description" && (
              <div>
                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#444" }}>{product.description}</p>
              </div>
            )}

            {activeTab === "features" && product.features && (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {product.features.map((f, i) => (
                  <li key={i} style={{ padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: "14px", color: "#444" }}>
                    <span style={{ color: "#27ae60", marginRight: "10px" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "specs" && product.specs && (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <tbody>
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <tr key={key} style={{ background: i % 2 === 0 ? "#f8f9fa" : "#fff" }}>
                      <td style={{ padding: "10px 16px", fontWeight: 600, color: "#333", width: "40%" }}>{key}</td>
                      <td style={{ padding: "10px 16px", color: "#555" }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "delivery" && (
              <div>
                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#444", marginBottom: "16px" }}>
                  {product.delivery || "Livraison sous 24-48h ouvrées. Livraison gratuite dès 100 € d'achat."}
                </p>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div style={{ padding: "16px", background: "#f8f9fa", borderRadius: "8px", flex: "1 1 200px" }}>
                    <strong style={{ fontSize: "13px" }}>🚚 Livraison standard</strong>
                    <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0" }}>2-3 jours ouvrés — Gratuite dès 100 €</p>
                  </div>
                  <div style={{ padding: "16px", background: "#f8f9fa", borderRadius: "8px", flex: "1 1 200px" }}>
                    <strong style={{ fontSize: "13px" }}>⚡ Livraison express</strong>
                    <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0" }}>Sous 24h — 9,90 €</p>
                  </div>
                  <div style={{ padding: "16px", background: "#f8f9fa", borderRadius: "8px", flex: "1 1 200px" }}>
                    <strong style={{ fontSize: "13px" }}>🔄 Retour gratuit</strong>
                    <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0" }}>14 jours pour changer d'avis</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "32px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>Produits similaires</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", transition: "box-shadow 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                  >
                    <div style={{ padding: "16px", textAlign: "center", background: "#fafafa" }}>
                      <img src={p.image} alt={p.name} style={{ maxHeight: "140px", objectFit: "contain" }} />
                    </div>
                    <div style={{ padding: "12px" }}>
                      <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>{p.brand}</p>
                      <h4 style={{ fontSize: "14px", fontWeight: 600, margin: "4px 0 8px", color: "#333" }}>{p.name}</h4>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#222", margin: 0 }}>
                        {p.price.toFixed(2)} €
                      </p>
                    </div>
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
