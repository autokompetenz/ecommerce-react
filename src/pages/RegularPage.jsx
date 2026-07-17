import Breadcrumb from "../components/Breadcrumb";

export default function RegularPage() {
  return (
    <>
      <Breadcrumb title="À propos" links={[{ label: "À propos" }]} />
      <div className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>POWER Tools GmbH</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 24 }}>
            POWER Tools GmbH est une entreprise allemande spécialisée dans le développement, la fabrication et la distribution d'outils de coupe haute performance, destinés principalement aux machines industrielles de broyage et à l'industrie agroalimentaire.
          </p>

          <blockquote style={{ borderLeft: "4px solid var(--brand)", padding: "16px 24px", background: "var(--bg-alt)", borderRadius: "0 var(--radius) var(--radius) 0", marginBottom: 32 }}>
            <p style={{ fontStyle: "italic", fontSize: 16, color: "var(--text)", margin: "0 0 8px" }}>
              "La précision allemande au service de vos machines industrielles."
            </p>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>— Oliver Haack, Geschäftsführer</span>
          </blockquote>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Informations Légales</h3>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 32 }}>
            <p><strong style={{ color: "var(--text)" }}>Nom légal :</strong> POWER Tools GmbH</p>
            <p><strong style={{ color: "var(--text)" }}>Forme juridique :</strong> GmbH</p>
            <p><strong style={{ color: "var(--text)" }}>N° d'immatriculation :</strong> HRB 11523 FF</p>
            <p><strong style={{ color: "var(--text)" }}>Tribunal :</strong> Amtsgericht Frankfurt (Oder)</p>
            <p><strong style={{ color: "var(--text)" }}>N° de TVA :</strong> DE232530007</p>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Adresse</h3>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 32 }}>
            Am Winkel 4, 15528 Spreenhagen, Allemagne<br />
            Adresse enregistrée : Am Winkel 2d, 15528 Spreenhagen
          </p>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Notre Activité</h3>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 12 }}>
            Nous concevons et fabriquons des outils de coupe industriels de haute précision pour :
          </p>
          <ul style={{ listStyle: "disc", marginLeft: 24, marginBottom: 32, fontSize: 14, lineHeight: 2, color: "var(--text-sec)" }}>
            <li>Industrie agroalimentaire</li>
            <li>Broyage industriel</li>
            <li>Agriculture et paillage</li>
            <li>Recyclage</li>
            <li>Travail du bois</li>
          </ul>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>L'Équipe</h3>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-sec)" }}>
            <strong style={{ color: "var(--text)" }}>Directeur :</strong> Oliver Haack<br />
            <strong style={{ color: "var(--text)" }}>Effectif :</strong> 10 à 19 employés<br />
            <strong style={{ color: "var(--text)" }}>Statut :</strong> Entreprise active
          </p>
        </div>
      </div>
    </>
  );
}
