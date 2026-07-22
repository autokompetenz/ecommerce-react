import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartSidebar({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, subtotal, discount, total, count } = useCart();

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "active" : ""}`} onClick={onClose} />
      <div className={`cart-sidebar ${isOpen ? "active" : ""}`}>
        <div className="cart-sidebar-header">
          <h3>Warenkorb <span className="item-count">({count} Artikel{count > 1 ? "" : ""})</span></h3>
          <button className="cart-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <i className="fa-solid fa-bag-shopping"></i>
              <p>Ihr Warenkorb ist leer</p>
              <Link to="/shop" className="btn btn-brand btn-sm" style={{ marginTop: 16 }} onClick={onClose}>Shop durchstöbern</Link>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img">
                  <img src={item.image || "/img/product-img/product-1.jpg"} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-brand">{item.brand}</div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-bottom">
                    <div className="cart-item-qty-controls">
                      <div className="cart-item-qty">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                    <div className="cart-item-price">{(item.price * item.quantity).toFixed(2)} €</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-summary-row">
              <span>Zwischensumme</span><span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="cart-summary-row">
              <span>Lieferung</span><span>Kostenlos</span>
            </div>
            {discount > 0 && (
              <div className="cart-summary-row">
                <span>Rabatt</span><span>-{discount}%</span>
              </div>
            )}
            <div className="cart-summary-row">
              <span>Gesamt</span><span>{total.toFixed(2)} €</span>
            </div>
            <Link to="/checkout" className="btn btn-brand btn-block" onClick={onClose}>
              Bestellung aufgeben
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
