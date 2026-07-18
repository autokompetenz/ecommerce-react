const nodemailer = require("nodemailer");

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "kontakt@powertoolsgmbh.com";

function makeTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function customerHTML(order) {
  const items = order.items
    .map((i) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${i.name}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${Number(i.price).toFixed(2)} €</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:600">${(Number(i.price) * i.quantity).toFixed(2)} €</td></tr>`)
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;font-family:'IBM Plex Sans',Arial,sans-serif;background:#f4f4f4">
<div style="max-width:600px;margin:0 auto;padding:32px 20px">
  <div style="background:#1a1a2e;padding:24px 32px;border-radius:8px 8px 0 0">
    <h1 style="margin:0;color:#fff;font-family:'Barlow Condensed',Arial,sans-serif;font-size:24px;letter-spacing:0.5px">POWER Tools GmbH</h1>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.5);font-size:13px">Confirmation de commande</p>
  </div>
  <div style="background:#fff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
    <h2 style="margin:0 0 8px;font-size:20px;color:#1a1a2e">Merci pour votre commande !</h2>
    <p style="margin:0 0 20px;color:#6b7280;font-size:14px;line-height:1.6">
      Votre commande <strong style="color:#FF6600">#${order.id.slice(0, 8).toUpperCase()}</strong> a bien été enregistrée.
    </p>

    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
      <thead><tr style="background:#f4f4f4">
        <th style="padding:8px 12px;text-align:left;font-size:12px;text-transform:uppercase;color:#6b7280">Produit</th>
        <th style="padding:8px 12px;text-align:center;font-size:12px;text-transform:uppercase;color:#6b7280">Qté</th>
        <th style="padding:8px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#6b7280">Prix</th>
        <th style="padding:8px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#6b7280">Total</th>
      </tr></thead>
      <tbody>${items}</tbody>
    </table>

    <div style="text-align:right;margin-bottom:24px">
      <span style="font-size:18px;font-weight:700;color:#1a1a2e">Total : ${Number(order.total).toFixed(2)} € TTC</span>
    </div>

    <div style="background:#f9fafb;padding:16px;border-radius:6px;margin-bottom:20px">
      <h3 style="margin:0 0 8px;font-size:14px;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.5px">Adresse de livraison</h3>
      <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6">
        ${order.customerName}<br/>${order.customerAddress}<br/>
        ${order.customerPhone ? `Tél : ${order.customerPhone}<br/>` : ""}Email : ${order.customerEmail}
      </p>
    </div>

    <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6">
      Vous pouvez suivre votre commande avec le numéro <strong>#${order.id.slice(0, 8).toUpperCase()}</strong> sur notre site.
    </p>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:11px;padding:16px 0">
    © ${new Date().getFullYear()} POWER Tools GmbH — Am Winkel 4, 15528 Spreenhagen
  </p>
</div></body></html>`;
}

function adminHTML(order) {
  const items = order.items
    .map((i) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${i.name}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${Number(i.price).toFixed(2)} €</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:600">${(Number(i.price) * i.quantity).toFixed(2)} €</td></tr>`)
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;font-family:'IBM Plex Sans',Arial,sans-serif;background:#f4f4f4">
<div style="max-width:600px;margin:0 auto;padding:32px 20px">
  <div style="background:#FF6600;padding:24px 32px;border-radius:8px 8px 0 0">
    <h1 style="margin:0;color:#fff;font-family:'Barlow Condensed',Arial,sans-serif;font-size:22px;letter-spacing:0.5px">Nouvelle commande reçue</h1>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px">#${order.id.slice(0, 8).toUpperCase()}</p>
  </div>
  <div style="background:#fff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
      <thead><tr style="background:#f4f4f4">
        <th style="padding:8px 12px;text-align:left;font-size:12px;text-transform:uppercase;color:#6b7280">Produit</th>
        <th style="padding:8px 12px;text-align:center;font-size:12px;text-transform:uppercase;color:#6b7280">Qté</th>
        <th style="padding:8px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#6b7280">Prix</th>
        <th style="padding:8px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#6b7280">Total</th>
      </tr></thead>
      <tbody>${items}</tbody>
    </table>

    <div style="text-align:right;margin-bottom:24px">
      <span style="font-size:18px;font-weight:700;color:#FF6600">Total : ${Number(order.total).toFixed(2)} € TTC</span>
    </div>

    <div style="background:#f9fafb;padding:16px;border-radius:6px;margin-bottom:16px">
      <h3 style="margin:0 0 8px;font-size:14px;color:#1a1a2e;text-transform:uppercase;letter-spacing:0.5px">Client</h3>
      <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6">
        <strong>${order.customerName}</strong><br/>
        ${order.customerAddress}<br/>
        Tél : ${order.customerPhone || "—"}<br/>
        Email : ${order.customerEmail}
      </p>
    </div>

    <a href="https://ecommerce-react-dun-zeta.vercel.app/admin/orders" style="display:inline-block;padding:12px 24px;background:#FF6600;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px">Voir dans l'admin</a>
  </div>
  <p style="text-align:center;color:#9ca3af;font-size:11px;padding:16px 0">
    © ${new Date().getFullYear()} POWER Tools GmbH
  </p>
</div></body></html>`;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP vars missing:", { SMTP_HOST: !!SMTP_HOST, SMTP_USER: !!SMTP_USER, SMTP_PASS: !!SMTP_PASS });
    return res.status(500).json({ error: "SMTP non configuré. Ajoutez SMTP_HOST, SMTP_USER, SMTP_PASS dans les variables Vercel." });
  }

  const order = req.body;
  if (!order || !order.id || !order.items || !order.email) {
    return res.status(400).json({ error: "Données de commande invalides." });
  }

  const transporter = makeTransport();

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: order.email,
      subject: `POWER Tools — Confirmation de commande #${order.id.slice(0, 8).toUpperCase()}`,
      html: customerHTML(order),
    });

    await transporter.sendMail({
      from: SMTP_FROM,
      to: ADMIN_EMAIL,
      subject: `Nouvelle commande #${order.id.slice(0, 8).toUpperCase()} — ${Number(order.total).toFixed(2)} €`,
      html: adminHTML(order),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err.message || err);
    return res.status(500).json({ error: "Erreur lors de l'envoi des emails: " + (err.message || "unknown") });
  }
};
