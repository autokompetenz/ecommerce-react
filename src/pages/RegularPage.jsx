import Breadcrumb from "../components/Breadcrumb";
import ScrollReveal from "../components/ScrollReveal";

export default function RegularPage() {
  return (
    <>
      <Breadcrumb title="Über uns" links={[{ label: "Über uns" }]} />
      <div className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 20, letterSpacing: "0.5px" }}>
            POWER Tools GmbH
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 24 }}>
            Entwicklung, Fertigung und Vertrieb von Hochleistungs-Schneidwerkzeugen
            für industrielle Zerkleinerungsmaschinen und die Lebensmittelindustrie.
          </p>

          <blockquote style={{ borderLeft: "3px solid var(--amber)", padding: "14px 20px", background: "var(--bg-alt)", marginBottom: 28 }}>
            <p style={{ fontStyle: "italic", fontSize: 15, color: "var(--text)", margin: "0 0 6px" }}>
              « Deutsche Präzision im Dienste Ihrer Industriemaschinen. »
            </p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>— Oliver Haack, Geschäftsführer</span>
          </blockquote>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "0.5px" }}>
            Rechtliche Informationen
          </h3>
          <div style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 28 }}>
            <p><strong style={{ color: "var(--text)" }}>Firmenname:</strong> POWER Tools GmbH</p>
            <p><strong style={{ color: "var(--text)" }}>Rechtsform:</strong> GmbH (Gesellschaft mit beschränkter Haftung)</p>
            <p><strong style={{ color: "var(--text)" }}>Handelsregisternummer:</strong> HRB 11523 FF</p>
            <p><strong style={{ color: "var(--text)" }}>Gericht:</strong> Amtsgericht Frankfurt (Oder)</p>
            <p><strong style={{ color: "var(--text)" }}>USt-IdNr.:</strong> DE232530007</p>
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "0.5px" }}>
            Adresse
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 28 }}>
            Am Winkel 4, 15528 Spreenhagen, Deutschland<br />
            Eingetragene Adresse: Am Winkel 2d, 15528 Spreenhagen
          </p>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "0.5px" }}>
            Tätigkeit
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-sec)", marginBottom: 12 }}>
            Hochpräzise Industrieschneidwerkzeuge für:
          </p>
          <ul style={{ listStyle: "disc", marginLeft: 24, marginBottom: 28, fontSize: 13, lineHeight: 2, color: "var(--text-sec)" }}>
            <li>Lebensmittelindustrie</li>
            <li>Industrielle Zerkleinerung</li>
            <li>Landwirtschaft und Mulchung</li>
            <li>Recycling</li>
            <li>Holzbearbeitung</li>
          </ul>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "0.5px" }}>
            Das Team
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-sec)" }}>
            <strong style={{ color: "var(--text)" }}>Geschäftsführer:</strong> Oliver Haack<br />
            <strong style={{ color: "var(--text)" }}>Mitarbeiterzahl:</strong> 10 bis 19<br />
            <strong style={{ color: "var(--text)" }}>Status:</strong> Aktives Unternehmen
          </p>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
