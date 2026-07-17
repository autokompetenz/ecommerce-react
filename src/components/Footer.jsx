import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h6>POWER Tools</h6>
            <p>
              Développement, fabrication et distribution d'outils de coupe haute
              performance pour machines industrielles de broyage et industrie
              agroalimentaire.
            </p>
            <p style={{ marginTop: 12 }}>
              <strong style={{ color: "#fff", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                POWER Tools GmbH
              </strong><br />
              Am Winkel 4, 15528 Spreenhagen<br />
              HRB 11523 FF — Amtsgericht Frankfurt (Oder)<br />
              TVA : DE232530007
            </p>
          </div>
          <div>
            <h6>Catalogue</h6>
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
            <h6>Informations</h6>
            <ul className="footer-links">
              <li><Link to="/regular-page">À propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Actualités</Link></li>
              <li><Link to="/tracking">Suivi de commande</Link></li>
              <li><a href="#">Conditions générales</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
            </ul>
          </div>
          <div>
            <h6>Contact</h6>
            <p><i className="fa-solid fa-phone" style={{ color: "var(--cut-amber)", marginRight: 8 }}></i> +49 (0) 33652 / 45 0</p>
            <p><i className="fa-solid fa-envelope" style={{ color: "var(--cut-amber)", marginRight: 8 }}></i> info@powertools.de</p>
            <p><i className="fa-solid fa-clock" style={{ color: "var(--cut-amber)", marginRight: 8 }}></i> Lun–Ven : 8h–17h</p>
            <h6 style={{ marginTop: 16 }}>Newsletter</h6>
            <div className="footer-newsletter">
              <input type="email" placeholder="Votre email" />
              <button className="btn btn-brand btn-sm btn-block">S'abonner</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} POWER Tools GmbH — Geschäftsführer : Oliver Haack — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
