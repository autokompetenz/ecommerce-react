import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer" style={{ background: "#1a1a2e", color: "#d1d5db" }}>
      <div className="container">
        <div className="footer-grid">
          <div>
            <h6 style={{ color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12, fontSize: 14 }}>POWER Tools</h6>
            <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
              Développement, fabrication et distribution d'outils de coupe haute
              performance pour machines industrielles de broyage et industrie
              agroalimentaire.
            </p>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: "#9ca3af" }}>
              <strong style={{ color: "#fff", fontFamily: "var(--font-display)" }}>
                POWER Tools GmbH
              </strong><br />
              Am Winkel 4, 15528 Spreenhagen<br />
              HRB 11523 FF — Amtsgericht Frankfurt (Oder)<br />
              TVA : DE232530007
            </p>
          </div>
          <div>
            <h6 style={{ color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12, fontSize: 14 }}>Catalogue</h6>
            <ul className="footer-links" style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: 8 }}><Link to="/shop" style={{ fontSize: 13, color: "#d1d5db" }}>Tous les produits</Link></li>
              <li style={{ marginBottom: 8 }}><Link to="/shop?cat=Tournevis" style={{ fontSize: 13, color: "#d1d5db" }}>Tournevis</Link></li>
              <li style={{ marginBottom: 8 }}><Link to="/shop?cat=Perceuses" style={{ fontSize: 13, color: "#d1d5db" }}>Perceuses</Link></li>
              <li style={{ marginBottom: 8 }}><Link to="/shop?cat=Clés à choc" style={{ fontSize: 13, color: "#d1d5db" }}>Clés à choc</Link></li>
              <li style={{ marginBottom: 8 }}><Link to="/shop?cat=Rivets" style={{ fontSize: 13, color: "#d1d5db" }}>Rivets</Link></li>
              <li style={{ marginBottom: 8 }}><Link to="/shop?cat=Meulage" style={{ fontSize: 13, color: "#d1d5db" }}>Meulage</Link></li>
            </ul>
          </div>
          <div>
            <h6 style={{ color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12, fontSize: 14 }}>Informations</h6>
            <ul className="footer-links" style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: 8 }}><Link to="/regular-page" style={{ fontSize: 13, color: "#d1d5db" }}>À propos</Link></li>
              <li style={{ marginBottom: 8 }}><Link to="/contact" style={{ fontSize: 13, color: "#d1d5db" }}>Contact</Link></li>
              <li style={{ marginBottom: 8 }}><Link to="/blog" style={{ fontSize: 13, color: "#d1d5db" }}>Actualités</Link></li>
              <li style={{ marginBottom: 8 }}><Link to="/tracking" style={{ fontSize: 13, color: "#d1d5db" }}>Suivi de commande</Link></li>
            </ul>
          </div>
          <div>
            <h6 style={{ color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12, fontSize: 14 }}>Mentions légales</h6>
            <ul className="footer-links" style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ fontSize: 13, color: "#d1d5db" }}>Mentions légales</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ fontSize: 13, color: "#d1d5db" }}>Conditions générales de vente</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ fontSize: 13, color: "#d1d5db" }}>Politique de confidentialité</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ fontSize: 13, color: "#d1d5db" }}>Droit de rétractation</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ fontSize: 13, color: "#d1d5db" }}>Conditions d'expédition et de livraison</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ fontSize: 13, color: "#d1d5db" }}>Politique de retour et de remboursement</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ fontSize: 13, color: "#d1d5db" }}>Politique en matière de cookies</a></li>
            </ul>
          </div>
          <div>
            <h6 style={{ color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12, fontSize: 14 }}>Contact</h6>
            <p style={{ fontSize: 13, marginBottom: 10 }}><i className="fa-solid fa-phone" style={{ color: "var(--amber)", marginRight: 8 }}></i> +49 (0) 33652 / 45 0</p>
            <p style={{ fontSize: 13, marginBottom: 10 }}><i className="fa-solid fa-envelope" style={{ color: "var(--amber)", marginRight: 8 }}></i> info@powertools.de</p>
            <p style={{ fontSize: 13, marginBottom: 10 }}><i className="fa-solid fa-clock" style={{ color: "var(--amber)", marginRight: 8 }}></i> Lun–Ven : 8h–17h</p>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 32, paddingTop: 20, textAlign: "center", fontSize: 12, color: "#6b7280" }}>
          &copy; {new Date().getFullYear()} POWER Tools GmbH — Oliver Haack. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
