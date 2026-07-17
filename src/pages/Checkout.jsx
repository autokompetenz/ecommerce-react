import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, subtotal, discount, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", company: "", country: "Allemagne",
    address: "", postcode: "", city: "", phone: "", email: "",
    terms: false, newsletter: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms) { setMessage({ type: "error", text: "Veuillez accepter les conditions." }); return; }
    if (items.length === 0) { setMessage({ type: "error", text: "Votre panier est vide." }); return; }

    setLoading(true);
    setMessage(null);

    const fullAddress = `${form.address}, ${form.postcode} ${form.city}, ${form.country}`;

    // Create order
    const { data: order, error: orderError } = await supabase.from("orders").insert([{
      customer_name: `${form.firstName} ${form.lastName}`,
      customer_email: form.email,
      customer_address: fullAddress,
      customer_phone: form.phone,
      total: total,
      status: "pending",
    }]).select().single();

    if (orderError) {
      setLoading(false);
      setMessage({ type: "error", text: orderError.message });
      return;
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    setLoading(false);
    if (itemsError) {
      setMessage({ type: "error", text: itemsError.message });
    } else {
      clearCart();
      setOrderId(order.id);
      setMessage({ type: "success", text: `Commande passée avec succès ! Votre numéro de suivi : ${order.id.slice(0, 8).toUpperCase()}` });
    }
  };

  return (
    <div className="checkout_area section-padding-80">
      <div className="container">
        <div className="row">
          {/* Billing Address */}
          <div className="col-12 col-md-6">
            <div className="checkout_details_area mt-50 clearfix">
              <div className="cart-page-heading mb-30">
                <h5>Adresse de facturation</h5>
              </div>

              {message && (
                <div style={{ padding: "16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", background: message.type === "error" ? "#fdecea" : "#e8f5e9", color: message.type === "error" ? "#c62828" : "#2e7d32" }}>
                  {message.text}
                  {orderId && (
                    <div style={{ marginTop: "12px" }}>
                      <button onClick={() => navigate(`/tracking`)} style={{ padding: "8px 16px", background: "#27ae60", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>
                        Suivre ma commande
                      </button>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">Prénom <span>*</span></label>
                    <input type="text" className="form-control" id="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Nom <span>*</span></label>
                    <input type="text" className="form-control" id="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="company">Société</label>
                    <input type="text" className="form-control" id="company" value={form.company} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="country">Pays <span>*</span></label>
                    <select className="w-100" id="country" value={form.country} onChange={handleChange}>
                      <option value="Allemagne">Allemagne</option>
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Autriche">Autriche</option>
                      <option value="Pays-Bas">Pays-Bas</option>
                    </select>
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="address">Adresse <span>*</span></label>
                    <input type="text" className="form-control" id="address" value={form.address} onChange={handleChange} required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="postcode">Code postal <span>*</span></label>
                    <input type="text" className="form-control" id="postcode" value={form.postcode} onChange={handleChange} required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="city">Ville <span>*</span></label>
                    <input type="text" className="form-control" id="city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="phone">Téléphone <span>*</span></label>
                    <input type="tel" className="form-control" id="phone" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className="col-12 mb-4">
                    <label htmlFor="email">Email <span>*</span></label>
                    <input type="email" className="form-control" id="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <div className="custom-control custom-checkbox d-block mb-2">
                      <input type="checkbox" className="custom-control-input" id="terms" checked={form.terms} onChange={handleChange} />
                      <label className="custom-control-label" htmlFor="terms">J'accepte les conditions générales</label>
                    </div>
                    <div className="custom-control custom-checkbox d-block">
                      <input type="checkbox" className="custom-control-input" id="newsletter" checked={form.newsletter} onChange={handleChange} />
                      <label className="custom-control-label" htmlFor="newsletter">Newsletter</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
            <div className="order-details-confirmation">
              <div className="cart-page-heading">
                <h5>Votre commande</h5>
                <p>Détails</p>
              </div>
              <ul className="order-details-form mb-4">
                <li><span>Produit</span> <span>Total</span></li>
                {items.map((item) => (
                  <li key={item.id}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                  </li>
                ))}
                <li><span>Sous-total</span> <span>{subtotal.toFixed(2)} €</span></li>
                <li><span>Livraison</span> <span>Gratuite</span></li>
                <li><span>Remise</span> <span>-{discount}%</span></li>
                <li><span>Total</span> <span>{total.toFixed(2)} €</span></li>
              </ul>

              <button onClick={handleSubmit} disabled={loading} className="btn essence-btn" style={{ width: "100%" }}>
                {loading ? "Envoi en cours..." : "Passer la commande"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
