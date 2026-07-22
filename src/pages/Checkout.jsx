import { useState, useEffect } from "react";
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
  const [confirmedItems, setConfirmedItems] = useState([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [bankInfo, setBankInfo] = useState({});
  const [form, setForm] = useState({
    firstName: "", lastName: "", company: "", country: "Allemagne",
    address: "", postcode: "", city: "", phone: "", email: "",
    terms: false, newsletter: false,
  });

  useEffect(() => {
    const fetchBank = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        const map = {};
        data.forEach((r) => { map[r.key] = r.value; });
        setBankInfo(map);
      }
    };
    fetchBank();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms) { setMessage({ type: "error", text: "Bitte akzeptieren Sie die Bedingungen." }); return; }
    if (items.length === 0) { setMessage({ type: "error", text: "Ihr Warenkorb ist leer." }); return; }

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
      setConfirmedItems([...items]);
      setConfirmedTotal(total);
      clearCart();
      setOrderId(order.id);
      setMessage({ type: "success" });

      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: order.id,
          email: form.email,
          customerName: `${form.firstName} ${form.lastName}`,
          customerAddress: fullAddress,
          customerPhone: form.phone,
          customerEmail: form.email,
          total: total,
          items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
        }),
      }).catch(() => {});
    }
  };

  // ---- CONFIRMATION SCREEN ----
  if (orderId) {
    return (
      <>
        <Breadcrumb title="Bestellung bestätigt" links={[{ label: "Bestellung" }, { label: "Bestätigt" }]} />
        <div className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <div className="checkout-confirm">
              <div className="checkout-confirm-header">
                <i className="fa-solid fa-circle-check"></i>
                <h1>Bestellung bestätigt!</h1>
                <p>Referenz: <strong>#{orderId.slice(0, 8).toUpperCase()}</strong></p>
              </div>

              <div className="checkout-confirm-section">
                <h2><i className="fa-solid fa-box"></i> Bestellübersicht</h2>
                <table className="checkout-confirm-table">
                  <thead>
                    <tr>
                      <th>Produkt</th>
                      <th>Menge</th>
                      <th>Preis</th>
                      <th>Gesamt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedItems.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right">{Number(item.price).toFixed(2)} €</td>
                        <td className="text-right font-semibold">{(Number(item.price) * item.quantity).toFixed(2)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="checkout-confirm-total">
                  <span>Gesamtbetrag</span>
                  <span>{confirmedTotal.toFixed(2)} € inkl. MwSt.</span>
                </div>
              </div>

              <div className="checkout-confirm-section checkout-confirm-bank">
                <h2><i className="fa-solid fa-university"></i> Banküberweisungsinformationen</h2>
                <p className="checkout-confirm-bank-note">
                  Bitte überweisen Sie den Betrag unter Angabe der untenstehenden Referenz.
                </p>
                <div className="checkout-confirm-bank-grid">
                  <div className="checkout-confirm-bank-row">
                    <span className="checkout-confirm-bank-label">Kontoinhaber</span>
                    <span className="checkout-confirm-bank-value">{bankInfo.bank_holder || "—"}</span>
                  </div>
                  <div className="checkout-confirm-bank-row">
                    <span className="checkout-confirm-bank-label">IBAN</span>
                    <span className="checkout-confirm-bank-value checkout-confirm-iban">{bankInfo.bank_iban || "—"}</span>
                  </div>
                  <div className="checkout-confirm-bank-row">
                    <span className="checkout-confirm-bank-label">BIC / SWIFT</span>
                    <span className="checkout-confirm-bank-value">{bankInfo.bank_bic || "—"}</span>
                  </div>
                  <div className="checkout-confirm-bank-row">
                    <span className="checkout-confirm-bank-label">Bank</span>
                    <span className="checkout-confirm-bank-value">{bankInfo.bank_bank || "—"}</span>
                  </div>
                  <div className="checkout-confirm-bank-row">
                    <span className="checkout-confirm-bank-label">Referenz anzugeben</span>
                    <span className="checkout-confirm-bank-value checkout-confirm-ref">
                      #{orderId.slice(0, 8).toUpperCase()}
                    </span>
                  </div>
                </div>
                {bankInfo.bank_note && (
                  <p className="checkout-confirm-bank-footnote">{bankInfo.bank_note}</p>
                )}
              </div>

              <div className="checkout-confirm-section">
                <h2><i className="fa-solid fa-envelope"></i> Und danach?</h2>
                <p>Eine Bestätigungs-E-Mail mit der Zusammenfassung Ihrer Bestellung wurde an <strong>{form.email}</strong> gesendet.</p>
                <p>Sie können den Status Ihrer Bestellung auf der Verfolgungsseite einsehen.</p>
              </div>

              <div className="checkout-confirm-actions">
                <button className="btn btn-primary btn-lg" onClick={() => navigate("/tracking")}>
                  <i className="fa-solid fa-truck"></i> Meine Bestellung verfolgen
                </button>
                <button className="btn btn-outline btn-lg" onClick={() => navigate("/shop")}>
                  <i className="fa-solid fa-bag-shopping"></i> Weiter einkaufen
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ---- CHECKOUT FORM ----
  return (
    <>
      <Breadcrumb title="Bestellung" links={[{ label: "Bestellung" }]} />
      <div className="section">
        <div className="container">
          <div className="checkout-layout">
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Rechnungsadresse</h3>
              {message && (
                <div className={`alert ${message.type === "error" ? "alert-error" : "alert-success"}`}>
                  {message.text}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>Vorname *</label>
                    <input type="text" id="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="checkout-form-group">
                    <label>Name *</label>
                    <input type="text" id="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="checkout-form-group">
                  <label>Unternehmen</label>
                  <input type="text" id="company" value={form.company} onChange={handleChange} />
                </div>
                <div className="checkout-form-group">
                  <label>Land *</label>
                  <select id="country" value={form.country} onChange={handleChange}>
                    <option>Deutschland</option><option>Frankreich</option><option>Belgien</option>
                    <option>Schweiz</option><option>Luxemburg</option><option>Österreich</option><option>Niederlande</option>
                  </select>
                </div>
                <div className="checkout-form-group">
                  <label>Adresse *</label>
                  <input type="text" id="address" value={form.address} onChange={handleChange} required />
                </div>
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>PLZ *</label>
                    <input type="text" id="postcode" value={form.postcode} onChange={handleChange} required />
                  </div>
                  <div className="checkout-form-group">
                    <label>Stadt *</label>
                    <input type="text" id="city" value={form.city} onChange={handleChange} required />
                  </div>
                </div>
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>Telefon *</label>
                    <input type="tel" id="phone" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className="checkout-form-group">
                    <label>E-Mail *</label>
                    <input type="email" id="email" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                    <input type="checkbox" id="terms" checked={form.terms} onChange={handleChange} /> Ich akzeptiere die AGB
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                    <input type="checkbox" id="newsletter" checked={form.newsletter} onChange={handleChange} /> Newsletter
                  </label>
                </div>
              </form>
            </div>

            <div className="order-summary">
              <h3>Ihre Bestellung</h3>
              {items.map((item) => (
                <div key={item.id} className="order-line">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
              <div className="order-line"><span>Zwischensumme</span><span>{subtotal.toFixed(2)} €</span></div>
              <div className="order-line"><span>Lieferung</span><span>Kostenlos</span></div>
              <div className="order-line"><span>Rabatt</span><span>-{discount}%</span></div>
              <div className="order-line total"><span>Gesamt</span><span>{total.toFixed(2)} €</span></div>
              <button onClick={handleSubmit} disabled={loading} className="btn btn-brand btn-block btn-lg" style={{ marginTop: 20 }}>
                {loading ? "Wird gesendet..." : "Bestellung aufgeben"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
