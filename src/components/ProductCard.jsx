import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const badgeClass = product.badge === "New" ? "new" : "promo";

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-img">
        <img src={product.image || "/img/product-img/product-1.jpg"} alt={product.name} />
        {product.badge && (
          <div className={`product-badge ${badgeClass}`}>
            {product.badge === "New" ? "Nouveau" : product.badge}
          </div>
        )}
        <div className="product-fav">
          <i className="fa-regular fa-heart"></i>
        </div>
      </Link>
      <div className="product-card-body">
        <div className="product-card-brand">{product.brand}</div>
        <Link to={`/product/${product.id}`} className="product-card-name" style={{ textDecoration: "none" }}>
          {product.name}
        </Link>
        <div className="product-card-price">
          {product.old_price && <span className="old">{product.old_price.toFixed(2)} €</span>}
          {product.price.toFixed(2)} €
        </div>
        <button className="product-card-add" onClick={(e) => { e.preventDefault(); addItem(product); }}>
          <i className="fa-solid fa-cart-plus" style={{ marginRight: 6 }}></i> Ajouter au panier
        </button>
      </div>
    </div>
  );
}
