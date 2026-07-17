import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";

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

    const { data: order, error: orderError } = await supabase.from("orders").insert([{
      customer_name: `${form.firstName} ${form.lastName}`,
      customer_email: form.email,
      customer_address: fullAddress,
      customer_phone: form.phone,
      total: total,
      status: "pending",
    }]).select().single();

    if (orderError) { setLoading(false); setMessage({ type: "error", text: orderError.message }); return; }

    const orderItems = items.map((item) => ({ order_id: order.id, product_id: item.product_id, quantity: item.quantity, price: item.price }));
    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    setLoading(false);
    if (itemsError) {
      setMessage({ type: "error", text: itemsError.message });
    } else {
      clearCart();
      setOrderId(order.id);
      setMessage({ type: "success", text: `Commande passée ! N° de suivi : ${order.id.slice(0, 8).toUpperCase()}` });
    }
  };

  return (
    <>
      <Breadcrumb title="Commande" links={[{ label: "Commande" }]} />
      <div className="section">
        <div className="container">
          <div className="checkout-layout">
            {/* Form */}
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Adresse de facturation</h3>
              {message && (
                <div className={`alert ${message.type === "error" ? "alert-error" : "alert-success"}`}>
                  {message.text}
                  {orderId && (
                    <div style={{ marginTop: 12 }}>
                      <button className="btn btn-brand btn-sm" onClick={() => navigate("/tracking")}>Suivre ma commande</button>
                    </div>
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>Prénom *</label>
                    <input type="text" id="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="checkout-form-group">
                    <label>Nom *</label>
                    <input type="text" id="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="checkout-form-group">
                  <label>Société</label>
                  <input type="text" id="company" value={form.company} onChange={handleChange} />
                </div>
                <div className="checkout-form-group">
                  <label>Pays *</label>
                  <select id="country" value={form.country} onChange={handleChange}>
                    <option>Allemagne</option><option>France</option><option>Belgique</option>
                    <option>Suisse</option><option>Luxembourg</option><option>Autriche</option><option>Pays-Bas</option>
                  </select>
                </div>
                <div className="checkout-form-group">
                  <label>Adresse *</label>
                  <input type="text" id="address" value={form.address} onChange={handleChange} required />
                </div>
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>Code postal *</label>
                    <input type="text" id="postcode" value={form.postcode} onChange={handleChange} required />
                  </div>
                  <div className="checkout-form-group">
                    <label>Ville *</label>
                    <input type="text" id="city" value={form.city} onChange={handleChange} required />
                  </div>
                </div>
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>Téléphone *</label>
                    <input type="tel" id="phone" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className="checkout-form-group">
                    <label>Email *</label>
                    <input type="email" id="email" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                    <input type="checkbox" id="terms" checked={form.terms} onChange={handleChange} /> J'accepte les conditions générales
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                    <input type="checkbox" id="newsletter" checked={form.newsletter} onChange={handleChange} /> Newsletter
                  </label>
                </div>
              </form>
            </div>

            {/* Summary */}
            <div className="order-summary">
              <h3>Votre commande</h3>
              {items.map((item) => (
                <div key={item.id} className="order-line">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
              <div className="order-line"><span>Sous-total</span><span>{subtotal.toFixed(2)} €</span></div>
              <div className="order-line"><span>Livraison</span><span>Gratuite</span></div>
              <div className="order-line"><span>Remise</span><span>-{discount}%</span></div>
              <div className="order-line total"><span>Total</span><span>{total.toFixed(2)} €</span></div>
              <button onClick={handleSubmit} disabled={loading} className="btn btn-brand btn-block btn-lg" style={{ marginTop: 20 }}>
                {loading ? "Envoi..." : "Passer la commande"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
