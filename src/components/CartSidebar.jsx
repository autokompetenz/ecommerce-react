import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartSidebar({ isOpen, onClose }) {
  const { items, removeItem, subtotal, discount, total, count } = useCart();

  return (
    <>
      <div className={`cart-bg-overlay ${isOpen ? "active" : ""}`} onClick={onClose}></div>
      <div className={`right-side-cart-area ${isOpen ? "active" : ""}`}>
        <div className="cart-button">
          <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>
            <img src="/img/core-img/bag.svg" alt="" /> <span>{count}</span>
          </a>
        </div>

        <div className="cart-content d-flex">
          <div className="cart-list">
            {items.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#888" }}>
                <p>Votre panier est vide</p>
              </div>
            ) : (
              items.map((item) => (
                <div className="single-cart-item" key={item.id}>
                  <a href="#" className="product-image">
                    <img src={item.image} className="cart-thumb" alt="" />
                    <div className="cart-item-desc">
                      <span className="product-remove" onClick={(e) => { e.preventDefault(); removeItem(item.id); }}>
                        <i className="fa fa-close" aria-hidden="true"></i>
                      </span>
                      <span className="badge">{item.brand}</span>
                      <h6>{item.name}</h6>
                      <p className="price">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  </a>
                </div>
              ))
            )}
          </div>

          <div className="cart-amount-summary">
            <h2>Résumé</h2>
            <ul className="summary-table">
              <li><span>sous-total:</span> <span>{subtotal.toFixed(2)} €</span></li>
              <li><span>livraison:</span> <span>Gratuite</span></li>
              <li><span>remise:</span> <span>-{discount}%</span></li>
              <li><span>total:</span> <span>{total.toFixed(2)} €</span></li>
            </ul>
            <div className="checkout-btn mt-100">
              <Link to="/checkout" className="btn essence-btn" onClick={onClose}>Commander</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
