export default function RegularPage() {
  return (
    <div className="single-blog-wrapper">
      <div className="single-blog-post-thumb">
        <img src="/img/bg-img/bg-8.jpg" alt="" />
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="regular-page-content-wrapper section-padding-80">
              <div className="regular-page-text">
                <h2>POWER Tools GmbH</h2>
                <p>
                  POWER Tools GmbH est une entreprise allemande spécialisée dans le développement, la fabrication et la distribution d'outils de coupe haute performance, destinés principalement aux machines industrielles de broyage et à l'industrie agroalimentaire.
                </p>

                <blockquote>
                  <h6><i className="fa fa-quote-left" aria-hidden="true"></i> La précision allemande au service de vos machines industrielles.</h6>
                  <span>Oliver Haack, Geschäftsführer</span>
                </blockquote>

                <h3>Informations Légales</h3>
                <p>
                  <strong>Nom légal :</strong> POWER Tools GmbH<br />
                  <strong>Forme juridique :</strong> GmbH (Société à responsabilité limitée)<br />
                  <strong>N° d'immatriculation :</strong> HRB 11523 FF<br />
                  <strong>Tribunal du registre :</strong> Amtsgericht Frankfurt (Oder)<br />
                  <strong>N° de TVA :</strong> DE232530007
                </p>

                <h3>Adresse</h3>
                <p>
                  <strong>Adresse :</strong> Am Winkel 4, 15528 Spreenhagen, Allemagne<br />
                  <strong>Adresse enregistrée :</strong> Am Winkel 2d, 15528 Spreenhagen, Allemagne
                </p>

                <h3>Notre Activité</h3>
                <p>
                  Nous concevons et fabriquons des outils de coupe industriels de haute précision pour les secteurs suivants :
                </p>
                <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
                  <li>Industrie agroalimentaire</li>
                  <li>Broyage industriel</li>
                  <li>Agriculture et paillage</li>
                  <li>Recyclage</li>
                  <li>Travail du bois</li>
                </ul>

                <h3>L'Équipe</h3>
                <p>
                  <strong>Directeur (Geschäftsführer) :</strong> Oliver Haack<br />
                  <strong>Effectif :</strong> Environ 10 à 19 employés<br />
                  <strong>Statut :</strong> Entreprise active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
