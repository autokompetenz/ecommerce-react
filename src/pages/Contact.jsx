import Breadcrumb from "../components/Breadcrumb";

export default function Contact() {
  return (
    <>
      <Breadcrumb title="Contact" links={[{ label: "Contact" }]} />
      <div className="section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-map">
              <div style={{ textAlign: "center", padding: 40 }}>
                <i className="fa-solid fa-location-dot" style={{ fontSize: 48, color: "var(--brand)", marginBottom: 16, display: "block" }}></i>
                <p>Am Winkel 4<br />15528 Spreenhagen, Allemagne</p>
              </div>
            </div>
            <div className="contact-form-area">
              <h2>Nous Contacter</h2>
              <p>
                Nous serions ravis de répondre à vos questions concernant nos outils de
                coupe industriels, nos services ou tout autre sujet.
              </p>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <i className="fa-solid fa-location-dot"></i>
                  <div>
                    <strong>Adresse</strong>
                    <span>Am Winkel 4, 15528 Spreenhagen, Allemagne</span>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="fa-solid fa-phone"></i>
                  <div>
                    <strong>Téléphone</strong>
                    <a href="tel:+49336524990">+49 (0) 33652 499 888 0</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="fa-solid fa-envelope"></i>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:info@powertools-gmbh.de">info@powertools-gmbh.de</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="fa-solid fa-clock"></i>
                  <div>
                    <strong>Horaires</strong>
                    <span>Lundi - Vendredi : 8h00 - 17h00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
