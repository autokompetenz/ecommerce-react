import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer_area clearfix">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="single_widget_area d-flex mb-30">
              <div className="footer-logo mr-50">
                <Link to="/" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#333", textDecoration: "none" }}>POWER Tools</Link>
              </div>
              <div className="footer_menu">
                <ul>
                  <li><Link to="/shop">Boutique</Link></li>
                  <li><Link to="/blog">Actualités</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="single_widget_area mb-30">
              <ul className="footer_widget_menu">
                <li><Link to="/tracking">Suivi de Commande</Link></li>
                <li><a href="#">Options de Paiement</a></li>
                <li><a href="#">Livraison</a></li>
                <li><a href="#">Guides Techniques</a></li>
                <li><a href="#">Politique de Confidentialité</a></li>
                <li><a href="#">Conditions Générales</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row align-items-end">
          <div className="col-12 col-md-6">
            <div className="single_widget_area">
              <div className="footer_heading mb-30">
                <h6>POWER Tools GmbH</h6>
              </div>
              <div className="footer_address_text">
                <p style={{ lineHeight: "1.8", marginBottom: "5px" }}>
                  <strong>Adresse :</strong><br />
                  Am Winkel 4<br />
                  15528 Spreenhagen, Allemagne
                </p>
                <p style={{ lineHeight: "1.8", marginBottom: "5px" }}>
                  <strong>Téléphone :</strong> +49 (0) 33652 / 45 0
                </p>
                <p style={{ lineHeight: "1.8" }}>
                  <strong>Email :</strong>{" "}
                  <a href="mailto:info@powertools.de">info@powertools.de</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="single_widget_area">
              <div className="subscribtion_form">
                <div className="footer_heading mb-30">
                  <h6>Newsletter</h6>
                </div>
                <form>
                  <input type="email" name="mail" className="mail" placeholder="Votre email" />
                  <button type="submit" className="submit">
                    <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12 text-center">
            <p>
              &copy; {new Date().getFullYear()} POWER Tools GmbH | HRB 11523 FF | Amtsgericht Frankfurt (Oder) | TVA : DE232530007 | Geschäftsführer : Oliver Haack
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
