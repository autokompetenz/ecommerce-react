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
              <li><a href="#">Mentions légales</a></li>
              <li><a href="#">Conditions générales de vente</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Droit de rétractation</a></li>
              <li><a href="#">Conditions d'expédition et de livraison</a></li>
              <li><a href="#">Politique de retour et de remboursement</a></li>
              <li><a href="#">Politique en matière de cookies</a></li>
            </ul>
          </div>
          <div>
            <h6 className="footer-title">Contact</h6>
            <p className="footer-contact-item"><i className="fa-solid fa-phone"></i> +49 (0) 33652 / 45 0</p>
            <p className="footer-contact-item"><i className="fa-solid fa-envelope"></i> info@powertools.de</p>
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
