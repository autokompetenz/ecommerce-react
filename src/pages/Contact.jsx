export default function Contact() {
  return (
    <div className="contact-area d-flex align-items-center">
      <div className="google-map">
        <div id="googleMap"></div>
      </div>
      <div className="contact-info">
        <h2>Nous Contacter</h2>
        <p>
          Nous serions ravis de répondre à vos questions concernant nos outils de
          coupe industriels, nos services ou tout autre sujet.
        </p>
        <div className="contact-address mt-50">
          <p>
            <span>Adresse :</span> Am Winkel 4, 15528 Spreenhagen, Allemagne
          </p>
          <p>
            <span>Téléphone :</span> +49 (0)33652 499 888 0
          </p>
          <p>
            <a href="mailto:info@powertools-gmbh.de">
              info@powertools-gmbh.de
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
