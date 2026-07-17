export default function Contact() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "100%", minHeight: "300px", background: "#e5e5e5" }}>
        <div style={{ width: "100%", height: "100%", minHeight: "300px", background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
          <p>POWER Tools GmbH — Am Winkel 4, 15528 Spreenhagen</p>
        </div>
      </div>
      <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#333", marginBottom: "12px" }}>Nous Contacter</h2>
        <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.7, marginBottom: "24px" }}>
          Nous serions ravis de répondre à vos questions concernant nos outils de
          coupe industriels, nos services ou tout autre sujet.
        </p>
        <div style={{ lineHeight: 2, color: "#555", fontSize: "14px" }}>
          <p><strong>Adresse :</strong> Am Winkel 4, 15528 Spreenhagen, Allemagne</p>
          <p><strong>Téléphone :</strong> +49 (0)33652 499 888 0</p>
          <p><a href="mailto:info@powertools-gmbh.de" style={{ color: "#e57e25" }}>info@powertools-gmbh.de</a></p>
        </div>
      </div>
    </div>
  );
}
