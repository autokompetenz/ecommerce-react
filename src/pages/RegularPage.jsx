import Breadcrumb from "../components/Breadcrumb";

export default function RegularPage() {
  return (
    <>
      <Breadcrumb title="À propos" links={[{ label: "À propos" }]} />
      <div className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 20, textTransform: "uppercase", letterSpacing: "1px" }}>
            POWER Tools GmbH
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 24 }}>
            Développement, fabrication et distribution d'outils de coupe haute
            performance pour machines industrielles de broyage et industrie
            agroalimentaire.
          </p>

          <blockquote style={{ borderLeft: "3px solid var(--cut-amber)", padding: "14px 20px", background: "var(--bg-alt)", marginBottom: 28 }}>
            <p style={{ fontStyle: "italic", fontSize: 15, color: "var(--text)", margin: "0 0 6px" }}>
              « La précision allemande au service de vos machines industrielles. »
            </p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>— Oliver Haack, Geschäftsführer</span>
          </blockquote>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Informations Légales
          </h3>
          <div style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 28 }}>
            <p><strong style={{ color: "var(--text)" }}>Nom légal :</strong> POWER Tools GmbH</p>
            <p><strong style={{ color: "var(--text)" }}>Forme juridique :</strong> GmbH (Société à responsabilité limitée)</p>
            <p><strong style={{ color: "var(--text)" }}>N° d'immatriculation :</strong> HRB 11523 FF</p>
            <p><strong style={{ color: "var(--text)" }}>Tribunal :</strong> Amtsgericht Frankfurt (Oder)</p>
            <p><strong style={{ color: "var(--text)" }}>N° de TVA :</strong> DE232530007</p>
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Adresse
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 28 }}>
            Am Winkel 4, 15528 Spreenhagen, Allemagne<br />
            Adresse enregistrée : Am Winkel 2d, 15528 Spreenhagen
          </p>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Activité
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 12 }}>
            Outils de coupe industriels de haute précision pour :
          </p>
          <ul style={{ listStyle: "disc", marginLeft: 24, marginBottom: 28, fontSize: 13, lineHeight: 2, color: "var(--text-sec)" }}>
            <li>Industrie agroalimentaire</li>
            <li>Broyage industriel</li>
            <li>Agriculture et paillage</li>
            <li>Recyclage</li>
            <li>Travail du bois</li>
          </ul>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            L'Équipe
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-sec)" }}>
            <strong style={{ color: "var(--text)" }}>Directeur :</strong> Oliver Haack<br />
            <strong style={{ color: "var(--text)" }}>Effectif :</strong> 10 à 19 employés<br />
            <strong style={{ color: "var(--text)" }}>Statut :</strong> Entreprise active
          </p>
        </div>
      </div>
    </>
  );
}
