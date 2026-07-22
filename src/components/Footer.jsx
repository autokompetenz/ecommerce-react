import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h6 className="footer-title">POWER Tools</h6>
            <p className="footer-desc">
              Entwicklung, Fertigung und Vertrieb von Hochleistungsschneidwerkzeugen
              für industrielle Zerkleinerungsmaschinen und die Lebensmittelindustrie.
            </p>
            <p className="footer-company">
              <strong>POWER Tools GmbH</strong><br />
              Am Winkel 4, 15528 Spreenhagen<br />
              HRB 11523 FF — Amtsgericht Frankfurt (Oder)<br />
              USt-IdNr.: DE232530007
            </p>
          </div>
          <div>
            <h6 className="footer-title">Katalog</h6>
            <ul className="footer-links">
              <li><Link to="/shop">Alle Produkte</Link></li>
              <li><Link to="/shop?cat=Schraubenzieher">Schraubenzieher</Link></li>
              <li><Link to="/shop?cat=Bohrmaschinen">Bohrmaschinen</Link></li>
              <li><Link to="/shop?cat=Schlagschlüssel">Schlagschlüssel</Link></li>
              <li><Link to="/shop?cat=Nieten">Nieten</Link></li>
              <li><Link to="/shop?cat=Schleifen">Schleifen</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="footer-title">Informationen</h6>
            <ul className="footer-links">
              <li><Link to="/regular-page">Über uns</Link></li>
              <li><Link to="/contact">Kontakt</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/tracking">Bestellverfolgung</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="footer-title">Rechtliches</h6>
            <ul className="footer-links">
              <li><Link to="/legal/mentions">Impressum</Link></li>
              <li><Link to="/legal/cgv">Allgemeine Geschäftsbedingungen</Link></li>
              <li><Link to="/legal/confidentialite">Datenschutz</Link></li>
              <li><Link to="/legal/retractation">Widerrufsrecht</Link></li>
              <li><Link to="/legal/expedition">Versand und Lieferung</Link></li>
              <li><Link to="/legal/retour">Rückgabebedingungen</Link></li>
              <li><Link to="/legal/cookies">Cookie-Richtlinie</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="footer-title">Kontakt</h6>
            <p className="footer-contact-item"><i className="fa-solid fa-envelope"></i> kontakt@powertoolsgmbh.com</p>
            <p className="footer-contact-item"><i className="fa-solid fa-clock"></i> Mo–Fr: 8–17 Uhr</p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} POWER Tools GmbH — Oliver Haack. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
