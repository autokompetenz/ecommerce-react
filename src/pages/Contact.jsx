import Breadcrumb from "../components/Breadcrumb";
import ScrollReveal from "../components/ScrollReveal";

export default function Contact() {
  return (
    <>
      <Breadcrumb title="Contact" links={[{ label: "Contact" }]} />
      <div className="section">
        <div className="container">
          <ScrollReveal>
            <div className="contact-layout">
              <div className="contact-map">
                <div style={{ textAlign: "center", padding: 40 }}>
                  <i className="fa-solid fa-location-dot" style={{ fontSize: 48, color: "var(--cut-amber)", marginBottom: 16, display: "block" }}></i>
                  <p>Am Winkel 4<br />15528 Spreenhagen, Allemagne</p>
                </div>
              </div>
              <div className="contact-form-area">
                <h2>Contact</h2>
                <p>
                  Questions sur nos outils de coupe, demandes de devis ou
                  renseignements techniques — nous répondons sous 24 h.
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
                      <a href="tel:+4933652450">+49 (0) 33652 / 45 0</a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="fa-solid fa-envelope"></i>
                    <div>
                      <strong>Email</strong>
                      <a href="mailto:info@powertools.de">info@powertools.de</a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="fa-solid fa-clock"></i>
                    <div>
                      <strong>Horaires</strong>
                      <span>Lun–Ven : 8 h–17 h</span>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="fa-solid fa-building-columns"></i>
                    <div>
                      <strong>POWER Tools GmbH</strong>
                      <span>HRB 11523 FF — Geschäftsführer : Oliver Haack</span>
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
