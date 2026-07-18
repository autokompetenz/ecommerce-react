import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h6 className="footer-title">POWER Tools</h6>
            <p className="footer-desc">
              Développement, fabrication et distribution d'outils de coupe haute
              performance pour machines industrielles de broyage et industrie
              agroalimentaire.
            </p>
            <p className="footer-company">
              <strong>POWER Tools GmbH</strong><br />
              Am Winkel 4, 15528 Spreenhagen<br />
              HRB 11523 FF — Amtsgericht Frankfurt (Oder)<br />
              TVA : DE232530007
            </p>
          </div>
          <div>
            <h6 className="footer-title">Catalogue</h6>
            <ul className="footer-links">
              <li><Link to="/shop">Tous les produits</Link></li>
              <li><Link to="/shop?cat=Tournevis">Tournevis</Link></li>
              <li><Link to="/shop?cat=Perceuses">Perceuses</Link></li>
              <li><Link to="/shop?cat=Clés à choc">Clés à choc</Link></li>
              <li><Link to="/shop?cat=Rivets">Rivets</Link></li>
              <li><Link to="/shop?cat=Meulage">Meulage</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="footer-title">Informations</h6>
            <ul className="footer-links">
              <li><Link to="/regular-page">À propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Actualités</Link></li>
              <li><Link to="/tracking">Suivi de commande</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="footer-title">Mentions légales</h6>
            <ul className="footer-links">
              <li><Link to="/legal/mentions">Mentions légales</Link></li>
              <li><Link to="/legal/cgv">Conditions générales de vente</Link></li>
              <li><Link to="/legal/confidentialite">Politique de confidentialité</Link></li>
              <li><Link to="/legal/retractation">Droit de rétractation</Link></li>
              <li><Link to="/legal/expedition">Conditions d'expédition et de livraison</Link></li>
              <li><Link to="/legal/retour">Politique de retour et de remboursement</Link></li>
              <li><Link to="/legal/cookies">Politique en matière de cookies</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="footer-title">Contact</h6>
            <p className="footer-contact-item"><i className="fa-solid fa-envelope"></i> kontakt@powertoolsgmbh.com</p>
            <p className="footer-contact-item"><i className="fa-solid fa-clock"></i> Lun–Ven : 8h–17h</p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} POWER Tools GmbH — Oliver Haack. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
