import Breadcrumb from "../components/Breadcrumb";
import ScrollReveal from "../components/ScrollReveal";

export default function Contact() {
  return (
    <>
      <Breadcrumb title="Kontakt" links={[{ label: "Kontakt" }]} />
      <div className="section">
        <div className="container">
          <ScrollReveal>
            <div className="contact-layout">
              <div className="contact-map">
                <div style={{ textAlign: "center", padding: 40 }}>
                  <i className="fa-solid fa-location-dot" style={{ fontSize: 48, color: "var(--amber)", marginBottom: 16, display: "block" }}></i>
                  <p>Am Winkel 4<br />15528 Spreenhagen, Deutschland</p>
                </div>
              </div>
              <div className="contact-form-area">
                <h2>Kontakt</h2>
                <p>
                  Fragen zu unseren Schneidwerkzeugen, Angebotsanfragen oder
                  technische Informationen — wir antworten innerhalb von 24 Stunden.
                </p>
                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <i className="fa-solid fa-location-dot"></i>
                    <div>
                      <strong>Adresse</strong>
                      <span>Am Winkel 4, 15528 Spreenhagen, Deutschland</span>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="fa-solid fa-envelope"></i>
                    <div>
                      <strong>E-Mail</strong>
                       <a href="mailto:kontakt@powertoolsgmbh.com">kontakt@powertoolsgmbh.com</a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="fa-solid fa-clock"></i>
                    <div>
                      <strong>Öffnungszeiten</strong>
                      <span>Mo–Fr: 8–17 Uhr</span>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="fa-solid fa-building-columns"></i>
                    <div>
                      <strong>POWER Tools GmbH</strong>
                      <span>HRB 11523 FF — Geschäftsführer: Oliver Haack</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
