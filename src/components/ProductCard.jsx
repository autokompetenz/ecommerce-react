import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const rating = product.rating ?? 4.5;
  const reviews = product.reviews ?? 24;
  const moq = product.moq ?? 1;

  const renderBadge = () => {
    if (!product.badge) return null;
    if (product.badge === "Verified") {
      return (
        <span className="product-card-badge verified">
          <i className="fa-solid fa-shield-halved" /> Verified
        </span>
      );
    }
    if (product.badge === "Discount") {
      const pct = product.old_price
        ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
        : 0;
      return (
        <span className="product-card-badge promo">-{pct}%</span>
      );
    }
    if (product.badge === "New") {
      return <span className="product-card-badge new">New</span>;
    }
    return <span className="product-card-badge">{product.badge}</span>;
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-img">
          {renderBadge()}
          <img
            src={product.image || "/img/product-img/product-1.jpg"}
            alt={product.name}
          />
        </div>

        <div className="product-card-body">
          <div className="product-card-supplier">
            POWER Tools{" "}
            <i className="fa-solid fa-circle-check" style={{ color: "var(--orange)" }} />
          </div>

          <h3 className="product-card-title">{product.name}</h3>

          <div className="product-card-rating">
            <span className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <i
                  key={i}
                  className={`${i < Math.round(rating) ? "fa-solid" : "fa-regular"} fa-star`}
                />
              ))}
            </span>
            <span>{rating}</span>
            <span>({reviews})</span>
          </div>

          <div className="product-card-price">
            {product.old_price && (
              <span className="old">{product.old_price.toFixed(2)} €</span>
            )}
            <span className="sale">{product.price.toFixed(2)} €</span>
          </div>

          <div className="product-card-moq">
            {moq} Pièces <span>(Min. Order)</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
