import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const badgeClass = product.badge === "New" ? "new-badge" : "offer-badge";

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="single-product-wrapper">
      <div className="product-img">
        <img src={product.image || "/img/product-img/product-1.jpg"} alt={product.name} />
        {product.hover_image && <img className="hover-img" src={product.hover_image} alt={product.name} />}
        {product.badge && (
          <div className={`product-badge ${badgeClass}`}>
            <span>{product.badge}</span>
          </div>
        )}
        <div className="product-favourite">
          <a href="#" className="favme fa fa-heart"></a>
        </div>
      </div>
      <div className="product-description">
        <span>{product.brand}</span>
        <Link to={`/product/${product.id}`}>
          <h6>{product.name}</h6>
        </Link>
        <p className="product-price">
          {product.old_price && <span className="old-price">{product.old_price.toFixed(2)} €</span>} {product.price.toFixed(2)} €
        </p>
        <div className="hover-content">
          <div className="add-to-cart-btn">
            <a href="#" className="btn essence-btn" onClick={handleAddToCart}>Ajouter au panier</a>
          </div>
        </div>
      </div>
    </div>
  );
}
