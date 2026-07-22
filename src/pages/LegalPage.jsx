import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ScrollReveal from "../components/ScrollReveal";

const COMPANY = {
  name: "POWER Tools GmbH",
  address: "Am Winkel 4, 15528 Spreenhagen, Deutschland",
  registeredAddress: "Am Winkel 2d, 15528 Spreenhagen, Deutschland",
  hrNumber: "HRB 11523 FF",
  court: "Amtsgericht Frankfurt (Oder)",
  vat: "DE232530007",
  director: "Oliver Haack",
  phone: "",
  email: "kontakt@powertoolsgmbh.com",
  website: "https://ecommerce-react-dun-zeta.vercel.app",
  activity: "Entwicklung, Fertigung und Vertrieb von Hochleistungsschneidewerkzeugen für industrielle Mahl- und Lebensmittelverarbeitungsmaschinen.",
  sector: "Fertigung von Industriewerkzeugen und Schneidemaschinen",
  employees: "10 bis 19 Beschäftigte",
  status: "Aktives Unternehmen",
  host: "Vercel Inc., 349 S Bernal Ave, San Francisco, CA 94103, USA",
};

const DOCS = {
  mentions: {
    title: "Impressum",
    breadcrumb: "Impressum",
    lastUpdated: "18. Juli 2026",
    sections: [
      {
        heading: "1. Verantwortlicher für den Inhalt",
        content: [
          `Die Website ${COMPANY.website} wird betrieben von:`,
          `• Firmenname: ${COMPANY.name}`,
          `• Rechtsform: GmbH (Gesellschaft mit beschränkter Haftung nach deutschem Recht)`,
          `• Geschäftsführer: ${COMPANY.director} (Geschäftsführer)`,
          `• Sitz: ${COMPANY.address}`,
          `• Eingetragene Adresse: ${COMPANY.registeredAddress}`,
          `• Handelsregisternummer: ${COMPANY.hrNumber} — ${COMPANY.court}`,
          `• USt-IdNr.: ${COMPANY.vat}`,
          `• E-Mail: ${COMPANY.email}`,
        ],
      },
      {
        heading: "2. Tätigkeit",
        content: [
          COMPANY.activity,
          `Branche: ${COMPANY.sector}`,
          `Mitarbeiterzahl: ${COMPANY.employees}`,
          `Status: ${COMPANY.status}`,
        ],
      },
      {
        heading: "3. Hosting-Anbieter",
        content: [
          `Diese Website wird gehostet von:`,
          `• ${COMPANY.host}`,
          `• Website: https://vercel.com`,
        ],
      },
      {
        heading: "4. Urheberrecht",
        content: [
          `Die gesamte Website (Texte, Bilder, Videos, Logos, Marken, grafische Elemente, Software) ist ausschließliches Eigentum von ${COMPANY.name} oder seiner Partner und ist durch die Urheberrechtsgesetze Deutschlands und des internationalen Rechts geschützt.`,
          `Jede Vervielfältigung, Darstellung, Änderung, Veröffentlichung, Übermittlung oder Verfälschung der Website oder ihrer Inhalte, gleich welches Verfahrens, ist ohne vorherige schriftliche Genehmigung von ${COMPANY.name} untersagt.`,
          `Die Marken und Logos auf der Website sind eingetragene Marken von ${COMPANY.name} oder seinen Partnern. Jede Vervielfältigung ohne Genehmigung ist untersagt.`,
        ],
      },
      {
        heading: "5. Personenbezogene Daten",
        content: [
          `Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung, die über die Fußzeile der Website erreichbar ist.`,
        ],
      },
      {
        heading: "6. Haftungsausschluss",
        content: [
          `${COMPANY.name} bemüht sich, auf dieser Website möglichst genaue und aktuelle Informationen bereitzustellen. Dennoch kann sie keine Verantwortung für Auslassungen, Ungenauigkeiten und Aktualisierungsdefizite übernehmen, gleich ob diese durch eigenes Versagen oder durch Dritte entstehen.`,
          `Der Nutzer trägt die alleinige Verantwortung für die Nutzung der Website und ihrer Daten. ${COMPANY.name} haftet nicht für Schäden, die aus der Nutzung der Website entstehen.`,
          `Auf der Website können Hyperlinks zu anderen Websites vorhanden sein. ${COMPANY.name} übernimmt keine Verantwortung für den Inhalt dieser Drittanbieter-Websites.`,
        ],
      },
      {
        heading: "7. Anwendbares Recht",
        content: [
          `Dieses Impressum unterliegt dem deutschen Recht. Bei Streitigkeiten sind die Gerichte in Frankfurt (Oder), Deutschland, zuständig, sofern keine zwingende gesetzliche Regelung entgegensteht.`,
        ],
      },
    ],
  },
  cgv: {
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    breadcrumb: "AGB",
    lastUpdated: "18. Juli 2026",
    sections: [
      {
        heading: "§ 1 — Gegenstand",
        content: [
          `Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die vertraglichen Beziehungen zwischen ${COMPANY.name} und jedem Käufer (nachfolgend „der Kunde"), der einen Einkauf auf der Website ${COMPANY.website} tätigt.`,
          `Jede über die Website erteilte Bestellung setzt die vorbehaltlose Annahme dieser AGB voraus.`,
        ],
      },
      {
        heading: "§ 2 — Produkte",
        content: [
          `Die zum Verkauf angebotenen Produkte sind auf der Website ${COMPANY.website} aufgeführt. Die Fotografien und Produktbeschreibungen dienen nur zur Information und stellen kein verbindliches Angebot von ${COMPANY.name} dar.`,
          `Die Produkte entsprechen den in Deutschland und der Europäischen Union geltenden Vorschriften. ${COMPANY.name} behält sich das Recht vor, sein Produktkatalog jederzeit zu ändern.`,
        ],
      },
      {
        heading: "§ 3 — Preise",
        content: [
          `Die Preise werden in Euro (€) inklusive aller Steuern (inkl. MwSt.) angegeben, einschließlich der deutschen Mehrwertsteuer zum jeweils geltenden Steuersatz.`,
          `${COMPANY.name} behält sich das Recht vor, seine Preise jederzeit zu ändern, wobei der zum Zeitpunkt der Bestellbestätigung durch den Kunden geltende Preis maßgeblich ist.`,
          `Die Versandkosten sind nicht im angegebenen Preis enthalten und werden dem Kunden vor der Bestellbestätigung mitgeteilt.`,
        ],
      },
      {
        heading: "§ 4 — Bestellung",
        content: [
          `Die Bestellung ist gültig, wenn der Kunde alle Schritte des Bestellprozesses abgeschlossen hat:`,
          `1. Hinzufügen der Produkte in den Warenkorb`,
          `2. Überprüfung des Warenkorbs`,
          `3. Eingabe der Liefer- und Rechnungsinformationen`,
          `4. Annahme dieser AGB`,
          `5. Bestätigung der Zahlung`,
          `Eine Bestätigungs-E-Mail wird an die bei der Bestellung angegebene E-Mail-Adresse des Kunden gesendet.`,
        ],
      },
      {
        heading: "§ 5 — Zahlung",
        content: [
          `Die Zahlung ist bei Bestellung fällig. Akzeptierte Zahlungsmittel sind:`,
          `• Kreditkarte (Visa, Mastercard, American Express)`,
          `• Banküberweisung`,
          `• PayPal`,
          `Die Zahlung wird über SSL/TLS-Verschlüsselungsprotokolle gesichert. ${COMPANY.name} speichert keine Kreditkartendaten.`,
        ],
      },
      {
        heading: "§ 6 — Lieferung",
        content: [
          `Lieferungen erfolgen in Frankreich (Festland), in der Europäischen Union und in folgenden Ländern: Deutschland, Belgien, Niederlande, Luxemburg, Österreich, Italien, Spanien, Polen.`,
          `Indikative Lieferzeiten:`,
          `• Standardlieferung: 2 bis 5 Werktage`,
          `• Expresslieferung: 1 bis 2 Werktage`,
          `Diese Fristen beginnen mit der Bestellbestätigung. ${COMPANY.name} haftet nicht für Lieferverzögerungen, die auf den Frachtführer oder höhere Gewalt (z. B. Wetterbedingungen) zurückzuführen sind.`,
          `Die Lieferung ist für Bestellungen ab 100 € inkl. MwSt. free. Darunter werden Versandkosten von 9,90 € inkl. MwSt. berechnet.`,
        ],
      },
      {
        heading: "§ 7 — Widerrufsrecht",
        content: [
          `Gemäß den geltenden gesetzlichen Bestimmungen hat der Kunde innerhalb von 14 Tagen nach Erhalt der Bestellung das Recht, den Vertrag ohne Angabe von Gründen zu widerrufen.`,
          `Um dieses Recht auszuüben, muss der Kunde ${COMPANY.name} eine schriftliche Erklärung (E-Mail an ${COMPANY.email}) zukommen lassen mit Angabe von:`,
          `• Name und Vorname`,
          `• Bestellnummer`,
          `• Betreffende Produkte`,
          `• Datum des Erhalts`,
          `Der Kunde muss die Produkte im Originalzustand und in einwandfreiem Zustand auf eigene Kosten an folgende Adresse zurücksenden: ${COMPANY.address}.`,
          `Die Rückerstattung erfolgt innerhalb von 14 Tagen nach Eingang der Rücksendung bei ${COMPANY.name}, auf demselben Zahlungsweg, der bei der Bestellung verwendet wurde.`,
          `Das Widerrufsrecht kann nicht für nach Kundenspezifikation angefertigte oder deutlich personalisierte Produkte ausgeübt werden.`,
        ],
      },
      {
        heading: "§ 8 — Gesetzliche Gewährleistung",
        content: [
          `Alle auf der Website verkauften Produkte unterliegen der gesetzlichen Gewährleistung (§ 434 ff. BGB) und der Gewährleistung für versteckte Mängel (§ 435 ff. BGB).`,
          `Bei Mangelhaftigkeit oder Mängeln kann der Kunde verlangen:`,
          `• Austausch des Produkts`,
          `• Reparatur des Produkts`,
          `• Rückerstattung des Kaufpreises`,
          `Der Kunde muss jeden Mangel innerhalb von 2 Jahren nach Lieferung des Produkts melden.`,
        ],
      },
      {
        heading: "§ 9 — Haftung",
        content: [
          `${COMPANY.name} haftet nicht für Schäden, die aus einer nicht vorschriftsmäßigen Verwendung der Produkte oder aus einer fehlerhaften Nutzung durch den Kunden entstehen.`,
          `Die Haftung von ${COMPANY.name} ist auf den Wert der betreffenden Bestellung beschränkt.`,
        ],
      },
      {
        heading: "§ 10 — Anwendbares Recht und Gerichtsstand",
        content: [
          `Diese AGB unterliegen dem deutschen Recht. Bei Streitigkeiten verpflichten sich die Parteien, zunächst eine einvernehmliche Lösung zu suchen, bevor sie gerichtliche Schritte einleiten.`,
          `Andernfalls sind die Gerichte in Frankfurt (Oder), Deutschland, zuständig, sofern keine zwingende gesetzliche Regelung entgegensteht.`,
        ],
      },
    ],
  },
  confidentialite: {
    title: "Datenschutzerklärung",
    breadcrumb: "Datenschutzerklärung",
    lastUpdated: "18. Juli 2026",
    sections: [
      {
        heading: "1. Verantwortlicher für die Datenverarbeitung",
        content: [
          `Der Verantwortliche für die Verarbeitung personenbezogener Daten ist:`,
          `• ${COMPANY.name}`,
          `• ${COMPANY.director}, Geschäftsführer`,
          `• ${COMPANY.address}`,
          `• ${COMPANY.email}`,
        ],
      },
      {
        heading: "2. Erhobene Daten",
        content: [
          `Im Rahmen der Nutzung der Website kann ${COMPANY.name} folgende Daten erheben:`,
          `• Identifikationsdaten: Name, Vorname, E-Mail-Adresse, Telefonnummer`,
          `• Lieferdaten: Postadresse, Stadt, Postleitzahl, Land`,
          `• Rechnungsdaten: Rechnungsinformationen`,
          `• Bestelldaten: Bestellhistorie, gekaufte Produkte, Beträge`,
          `• Nutzungsdaten: IP-Adresse, Browsertyp, besuchte Seiten, Dauer der Verbindung`,
          `• Zahlungsdaten: Kreditkartendaten werden von ${COMPANY.name} nicht gespeichert`,
        ],
      },
      {
        heading: "3. Zwecke der Verarbeitung",
        content: [
          `Personenbezogene Daten werden zu folgenden Zwecken erhoben:`,
          `• Bearbeitung und Nachverfolgung von Bestellungen`,
          `• Lieferung der Produkte`,
          `• Abrechnung und Buchhaltung`,
          `• Kundenbetreuung (Beantwortung von Anfragen, Kundendienst)`,
          `• Versand von Newsletters und Werbeangeboten (mit vorheriger Zustimmung)`,
          `• Verbesserung der Website und des Nutzererlebnisses`,
          `• Einhaltung gesetzlicher Pflichten`,
          `• Betrugsprävention`,
        ],
      },
      {
        heading: "4. Rechtsgrundlage der Verarbeitung",
        content: [
          `Personenbezogene Daten werden auf folgenden Rechtsgrundlagen verarbeitet:`,
          `• Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO): Erforderlich zur Erfüllung der Bestellung`,
          `• Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO): Verbesserung des Services, Betrugsprävention`,
          `• Einwilligung (Art. 6 Abs. 1 lit. a DSGVO): Versand von Newsletters und Werbemitteilungen`,
          `• Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO): Aufbewahrung von Buchhaltungsdaten`,
        ],
      },
      {
        heading: "5. Speicherdauer",
        content: [
          `Personenbezogene Daten werden für folgende Dauer gespeichert:`,
          `• Bestelldaten: 10 Jahre (buchhalterische Pflichten)`,
          `• Kundendaten: bis zur Löschung des Kontos oder 3 Jahre Inaktivität`,
          `• Nutzungsdaten: maximal 13 Monate`,
          `• Einwilligungsdaten (Newsletter): bis zum Widerruf der Einwilligung`,
        ],
      },
      {
        heading: "6. Empfänger der Daten",
        content: [
          `Personenbezogene Daten können an folgende Empfänger weitergegeben werden:`,
          `• Die internen Abteilungen von ${COMPANY.name}`,
          `• Die Lieferdienstleister (DHL, DPD, UPS, GLS)`,
          `• Die Zahlungsanbieter (Stripe, PayPal)`,
          `• Der Hosting-Anbieter der Website (${COMPANY.host})`,
          `• Die zuständigen Behörden bei rechtlicher Verpflichtung`,
        ],
      },
      {
        heading: "7. Datenübermittlungen in Drittländer",
        content: [
          `Einige Dienstleister (Stripe, Vercel, PayPal) befinden sich außerhalb der Europäischen Union. Diese Übermittlungen erfolgen im Rahmen der Standardvertragsklauseln der Europäischen Kommission oder von Angemessenheitsbeschlüssen gemäß der DSGVO.`,
        ],
      },
      {
        heading: "8. Rechte der Nutzer",
        content: [
          `Gemäß der DSGVO (Datenschutz-Grundverordnung) stehen dem Kunden folgende Rechte zu:`,
          `• Auskunftsrecht (Art. 15): Erhalt einer Kopie seiner Daten`,
          `• Berichtigungsrecht (Art. 16): Korrektur unrichtiger Daten`,
          `• Löschrecht (Art. 17): Löschung seiner Daten`,
          `• Recht auf Einschränkung (Art. 18): Einschränkung der Verarbeitung`,
          `• Recht auf Datenübertragbarkeit (Art. 20): Erhalt seiner Daten in strukturiertem Format`,
          `• Widerspruchsrecht (Art. 21): Widerspruch gegen die Verarbeitung aus berechtigten Gründen`,
          `• Recht auf Widerruf der Einwilligung jederzeit`,
          `Um seine Rechte auszuüben, kann der Kunde ${COMPANY.name} unter folgender Adresse kontaktieren: ${COMPANY.email}.`,
          `Der Kunde hat auch das Recht, eine Beschwerde bei der zuständigen Datenschutzbehörde einzulegen: Bundesbeauftragter für den Datenschutz und die Informationsfreiheit (BfDI), Friedrichstraße 219, 10969 Berlin, Deutschland.`,
        ],
      },
      {
        heading: "9. Sicherheit",
        content: [
          `${COMPANY.name} setzt folgende technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten ein:`,
          `• SSL/TLS-Verschlüsselung der Kommunikation`,
          `• Verschlüsselung sensibler Daten in der Datenbank`,
          `• Strenges Zugangskontrollsystem für Daten`,
          `• Protokollierung der Zugriffe`,
          `• Regelmäßige Sicherheitsupdates`,
        ],
      },
      {
        heading: "10. Cookies",
        content: [
          `Informationen zur Nutzung von Cookies finden Sie in unserer Cookie-Richtlinie.`,
        ],
      },
    ],
  },
  retractation: {
    title: "Widerrufsrecht",
    breadcrumb: "Widerrufsrecht",
    lastUpdated: "18. Juli 2026",
    sections: [
      {
        heading: "1. Widerrufsfrist",
        content: [
          `Gemäß den geltenden gesetzlichen Bestimmungen (§ 355 ff. BGB) haben Sie ein Widerrufsrecht von 14 Tagen, ohne Angabe von Gründen.`,
          `Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie (oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist) die Ware in Besitz nehmen.`,
          `Bei Bestellungen mit mehreren getrennt gelieferten Waren läuft die Frist 14 Tage ab dem Tag, an dem Sie die letzte Ware in Besitz nehmen.`,
        ],
      },
      {
        heading: "2. Ausübung des Widerrufsrechts",
        content: [
          `Um Ihr Widerrufsrecht auszuüben, teilen Sie uns Ihre Entscheidung zum Widerruf mit einer schriftlichen Erklärung (E-Mail oder Post) mit unter:`,
          `• ${COMPANY.name}`,
          `• ${COMPANY.address}`,
          `• E-Mail: ${COMPANY.email}`,
          `Sie können das nachstehende Muster-Widerrufsformular verwenden, dies ist jedoch nicht verpflichtend.`,
        ],
      },
      {
        heading: "3. Muster-Widerrufsformular",
        content: [
          `An: ${COMPANY.name}`,
          `${COMPANY.address}`,
          `E-Mail: ${COMPANY.email}`,
          ``,
          `Hiermit widerrufe(n) ich/wir den von mir/uns geschlossenen Vertrag über folgende Ware(n):`,
          `• Bestellnummer: _______________`,
          `• Name der Ware(n): _______________`,
          `• Datum der Bestellung: _______________`,
          `• Datum des Erhalts: _______________`,
          `• Name des Verbrauchers: _______________`,
          `• Adresse des Verbrauchers: _______________`,
          `• Datum: _______________`,
          `• Unterschrift des Verbrauchers: _______________`,
        ],
      },
      {
        heading: "4. Folgen des Widerrufs",
        content: [
          `Im Falle des Widerrufs erstattet ${COMPANY.name} Ihnen alle von Ihnen geleisteten Zahlungen einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich aus der Wahl einer anderen Lieferart als dem günstigsten Standardversand ergeben) innerhalb von 14 Tagen ab dem Tag, an dem wir über Ihren Widerruf informiert werden.`,
          `${COMPANY.name} wird die Rückerstattung auf demselben Zahlungsweg vornehmen, der für die ursprüngliche Transaktion verwendet wurde, es sei denn, Sie vereinbaren ausdrücklich etwas anderes.`,
          `${COMPANY.name} kann die Rückerstattung bis zum Eingang der zurückgesandten Ware oder bis zum Nachweis des Versands der Ware zurückhalten, wobei der frühere Zeitpunkt maßgeblich ist.`,
        ],
      },
      {
        heading: "5. Rücksendung der Ware",
        content: [
          `Sie müssen die Ware unverzüglich und in jedem Fall spätestens innerhalb von 14 Tagen nach Mitteilung Ihres Widerrufs an ${COMPANY.name} zurücksenden oder übergeben.`,
          `Sie tragen die unmittelbaren Kosten der Rücksendung, es sei denn, ${COMPANY.name} übernimmt diese Kosten.`,
          `Sie müssen für einen etwaigen Wertverlust der Ware nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Ware nicht notwendigen Umgang mit ihr zurückzuführen ist.`,
        ],
      },
      {
        heading: "6. Ausnahmen vom Widerrufsrecht",
        content: [
          `Das Widerrufsrecht kann für folgende Produkte nicht ausgeübt werden:`,
          `• Nach Kundenspezifikation angefertigte oder deutlich personalisierte Waren`,
          `• Versiegelte Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur Rückgabe geeignet sind, sofern ihre Versiegelung nach der Lieferung entfernt wurde`,
          `• Waren, die aufgrund ihrer Beschaffenheit nach Lieferung untrennbar mit anderen Gütern vermischt wurden`,
        ],
      },
    ],
  },
  expedition: {
    title: "Versand- und Lieferbedingungen",
    breadcrumb: "Versand & Lieferung",
    lastUpdated: "18. Juli 2026",
    sections: [
      {
        heading: "1. Liefergebiete",
        content: [
          `${COMPANY.name} liefert in folgende Länder:`,
          `• Frankreich (Festland)`,
          `• Deutschland`,
          `• Belgien`,
          `• Niederlande`,
          `• Luxemburg`,
          `• Österreich`,
          `• Italien`,
          `• Spanien`,
          `• Polen`,
          `Für Lieferungen außerhalb dieser Gebiete wenden Sie sich bitte an ${COMPANY.email} für ein individuelles Angebot.`,
        ],
      },
      {
        heading: "2. Bearbeitungszeiten",
        content: [
          `Bestellungen werden innerhalb von 24 bis 48 Stunden nach Zahlungsbestätigung bearbeitet und versandt.`,
          `Bestellungen, die am Freitag nach 14 Uhr, am Wochenende oder an Feiertagen aufgegeben werden, werden am nächsten Werktag bearbeitet.`,
        ],
      },
      {
        heading: "3. Lieferzeiten",
        content: [
          `• Standardlieferung: 5 bis 7 Werktage je nach Bestimmungsort`,
          `• Expresslieferung: 1 bis 2 Werktage (verfügbar in Frankreich und Deutschland)`,
          `Diese Angaben dienen nur als Richtwerte und beginnen ab dem Versanddatum. ${COMPANY.name} haftet nicht für Verzögerungen, die auf den Frachtführer zurückzuführen sind.`,
        ],
      },
      {
        heading: "4. Versandkosten",
        content: [
          `• Frankreich (Festland) und Deutschland: Versandkostenfrei ab 100 € inkl. MwSt. — ansonsten 9,90 €`,
          `• Belgien, Niederlande, Luxemburg: Versandkostenfrei ab 150 € inkl. MwSt. — ansonsten 12,90 €`,
          `• Österreich, Italien, Spanien, Polen: Versandkostenfrei ab 200 € inkl. MwSt. — ansonsten 16,90 €`,
          `Die Versandkosten werden dem Kunden vor der Bestellbestätigung mitgeteilt.`,
        ],
      },
      {
        heading: "5. Bestellverfolgung",
        content: [
          `Eine Sendungsverfolgungsnummer wird dem Kunden per E-Mail nach Versand der Bestellung mitgeteilt. Die Nachverfolgung kann über die hierfür vorgesehene Seite der Website oder direkt auf der Website des Frachtführers erfolgen.`,
        ],
      },
      {
        heading: "6. Empfang und Prüfung",
        content: [
          `Bei Empfang ist der Kunde verpflichtet, den Zustand des Pakets und die Übereinstimmung der bestellten Produkte zu prüfen. Bei Beschädigungen oder Unstimmigkeiten muss der Kunde:`,
          `• Ausdrückliche Vorbehalte gegenüber dem Frachtführer erheben`,
          `• ${COMPANY.name} innerhalb von 48 Stunden unter ${COMPANY.email} kontaktieren`,
          `• Fotos des beschädigten Pakets vorlegen`,
        ],
      },
      {
        heading: "7. Lieferverzögerung oder Ausbleiben der Lieferung",
        content: [
          `Bei einer Lieferverzögerung von mehr als 7 Tagen gegenüber dem angekündigten Datum kann der Kunde ${COMPANY.name} kontaktieren, um ein Nachforschungsverfahren beim Frachtführer einzuleiten.`,
          `Sollte die Lieferung durch Verschulden des Frachtführers nicht möglich sein, wird ${COMPANY.name} die Versandkosten erstatten oder eine Neuzustellung gemäß der Wahl des Kunden vornehmen.`,
        ],
      },
    ],
  },
  retour: {
    title: "Rückgabe- und Erstattungsbedingungen",
    breadcrumb: "Rückgabe & Erstattung",
    lastUpdated: "18. Juli 2026",
    sections: [
      {
        heading: "1. Rückgabefrist",
        content: [
          `Sie haben innerhalb von 14 Tagen nach Erhalt Ihrer Bestellung die Möglichkeit, einen Teil oder alle bestellten Artikel an uns zurückzusenden, ohne Angabe von Gründen (gemäß dem Widerrufsrecht).`,
          `Nach Ablauf von 14 Tagen werden Rücksendungen nicht akzeptiert, es sei denn, es liegt ein Mangel oder ein versteckter Defekt vor, der durch die gesetzliche Gewährleistung abgedeckt wird.`,
        ],
      },
      {
        heading: "2. Rückgabebedingungen",
        content: [
          `Die Produkte müssen zurückgesendet werden:`,
          `• Im Originalzustand und Originalverpackung`,
          `• In einwandfreiem Zustand (unbenutzt, unbeschädigt)`,
          `• Mit allen Originalzubehörteilen und Unterlagen`,
          `• Mit dem Rücksendebeleg (von ${COMPANY.name} bereitgestellt)`,
          `Unvollständige, beschädigte oder Produkte mit geöffneter Verpackung werden nicht zur Erstattung akzeptiert.`,
        ],
      },
      {
        heading: "3. Rückgabeprozess",
        content: [
          `Schritt 1: Kontaktieren Sie ${COMPANY.name} unter ${COMPANY.email} und teilen Sie Ihre Bestellnummer und die betreffende(n) Ware(n) mit.`,
          `Schritt 2: Sie erhalten einen Rücksendebeleg mit Anweisungen und Versandadresse.`,
          `Schritt 3: Verpacken Sie die Ware(n) sorgfältig und senden Sie sie an die auf dem Rücksendebeleg angegebene Adresse.`,
          `Schritt 4: ${COMPANY.name} prüft den ordnungsgemäßen Zustand der zurückgesendeten Ware und nimmt die Erstattung innerhalb von 14 Tagen vor.`,
        ],
      },
      {
        heading: "4. Rücksendekosten",
        content: [
          `Die Rücksendekosten trägt der Kunde, ausgenommen:`,
          `• Wenn das Produkt mangelhaft oder nicht wie bestellt ist`,
          `• Wenn ${COMPANY.name} einen Versandfehler begangen hat`,
          `• Wenn das Produkt während des Transports beschädigt wurde`,
          `In diesen Fällen übernimmt ${COMPANY.name} die Rücksendekosten nach vorheriger Zustimmung.`,
        ],
      },
      {
        heading: "5. Erstattung",
        content: [
          `Die Erstattung erfolgt innerhalb von 14 Tagen nach Eingang der Rücksendung bei ${COMPANY.name}.`,
          `Die Erstattung umfasst den Kaufpreis der zurückgesandten Ware(n) und die ursprünglichen Versandkosten (bis zum Betrag der Standardlieferung).`,
          `Die Erstattung erfolgt über denselben Zahlungsweg, der bei der Bestellung verwendet wurde, sofern nicht anders vereinbart.`,
        ],
      },
      {
        heading: "6. Mangelhafte oder nicht conforme Produkte",
        content: [
          `Bei mangelhaften, beschädigten oder nicht wie bestellten Produkten kann der Kunde verlangen:`,
          `• Austausch des Produkts`,
          `• Reparatur des Produkts`,
          `• Vollständige Erstattung des Kaufpreises`,
          `Der Kunde muss den Mangel innerhalb von 2 Jahren nach Lieferung des Produkts melden, gemäß der gesetzlichen Gewährleistung (§ 434 ff. BGB).`,
          `${COMPANY.name} übernimmt die Kosten für Rücksendung und Neuzustellung bei mangelhaften Produkten.`,
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie-Richtlinie",
    breadcrumb: "Cookies",
    lastUpdated: "18. Juli 2026",
    sections: [
      {
        heading: "1. Was ist ein Cookie?",
        content: [
          `Ein Cookie ist eine kleine Textdatei, die bei dem Besuch einer Website auf Ihrem Endgerät (Computer, Tablet, Smartphone) gespeichert wird. Er ermöglicht es der Website, Ihre Aktionen und Einstellungen für einen bestimmten Zeitraum zu speichern, damit Sie diese nicht bei jedem Besuch erneut eingeben müssen.`,
        ],
      },
      {
        heading: "2. Auf dieser Website verwendete Cookies",
        content: [
          `${COMPANY.name} verwendet die folgenden Cookie-Kategorien:`,
          ``,
          `a) Unbedingt erforderliche Cookies`,
          `Diese Cookies sind für das Funktionieren der Website unverzichtbar. Sie ermöglichen die Nutzung wesentlicher Funktionen (Warenkorb, Sitzung, Sicherheit). Ohne diese Cookies kann die Website nicht ordnungsgemäß funktionieren.`,
          `Beispiele: Benutzersitzung, Warenkorb, CSRF-Token.`,
          ``,
          `b) Performance- und Analyse-Cookies`,
          `Diese Cookies sammeln Informationen darüber, wie Sie die Website nutzen (besuchte Seiten, Verweildauer, Fehler). Sie helfen uns, die Website und das Nutzererlebnis zu verbessern.`,
          `Beispiel: Google Analytics.`,
          ``,
          `c) Funktions-Cookies`,
          `Diese Cookies speichern Ihre Einstellungen und Auswahlmöglichkeiten (Sprache, Region, Design), um Ihr Erlebnis zu personalisieren.`,
          ``,
          `d) Werbe- und Targeting-Cookies`,
          `Diese Cookies werden verwendet, um Ihnen relevante Werbung anzuzeigen. Sie können von Drittanbietern (Werbenetzwerke) platziert werden.`,
          `${COMPANY.name} platziert derzeit keine Werbe-Cookies von Drittanbietern auf seiner Website.`,
        ],
      },
      {
        heading: "3. Rechtsgrundlage",
        content: [
          `Unbedingt erforderliche Cookies werden ohne Einwilligung gemäß Art. 5 Abs. 3 der ePrivacy-Richtlinie und den geltenden nationalen Bestimmungen gesetzt.`,
          `Für die anderen Cookie-Kategorien (Performance, Funktionalität, Werbung) ist Ihre Einwilligung erforderlich. Ein Einwilligungsbanner wird Ihnen bei Ihrem ersten Besuch angezeigt.`,
        ],
      },
      {
        heading: "4. Verwaltung Ihrer Einstellungen",
        content: [
          `Sie können Ihre Cookie-Einstellungen jederzeit ändern:`,
          `• Durch Klicken auf den Link „Cookies verwalten" in der Fußzeile jeder Seite der Website`,
          `• Durch Konfiguration Ihres Browsers zum Blockieren oder Löschen von Cookies`,
          `Anweisungen zur Verwaltung von Cookies in den gängigsten Browsern:`,
          `• Chrome: chrome://settings/cookies`,
          `• Firefox: about:preferences#privacy`,
          `• Safari: Einstellungen > Datenschutz`,
          `• Edge: edge://settings/privacy`,
          `Hinweis: Das Deaktivieren bestimmter Cookies kann die Funktionalität der Website beeinträchtigen.`,
        ],
      },
      {
        heading: "5. Cookies von Drittanbietern",
        content: [
          `Die Website kann Links zu Websites von Drittanbietern enthalten. ${COMPANY.name} hat keinen Einfluss auf die Cookies, die von diesen Websites gesetzt werden. Wir empfehlen Ihnen, die Cookie-Richtlinien dieser Websites zu überprüfen.`,
        ],
      },
      {
        heading: "6. Lebensdauer der Cookies",
        content: [
          `• Sitzungs-Cookies: werden beim Schließen des Browsers gelöscht`,
          `• Persistent Cookies: maximal 13 Monate gemäß den Empfehlungen der CNIL`,
          `• Nach Ablauf dieser Frist wird die Einwilligung erneut angefordert`,
        ],
      },
      {
        heading: "7. Kontakt",
        content: [
          `Bei Fragen zu unserer Cookie-Richtlinie können Sie uns kontaktieren unter:`,
          `• E-Mail: ${COMPANY.email}`,
          `• Adresse: ${COMPANY.address}`,
        ],
      },
    ],
  },
};

export default function LegalPage() {
  const { type } = useParams();
  const doc = DOCS[type];

  if (!doc) {
    return (
      <div className="empty-state">
        <p>Seite nicht gefunden.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Zurück zur Startseite</Link>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb title={doc.breadcrumb} links={[{ label: doc.breadcrumb }]} />
      <div className="section">
        <div className="container legal-container">
          <ScrollReveal>
            <h1 className="legal-title">{doc.title}</h1>
            <p className="legal-updated">Letzte Aktualisierung: {doc.lastUpdated}</p>

            {doc.sections.map((section, i) => (
              <div key={i} className="legal-section">
                <h2 className="legal-heading">{section.heading}</h2>
                {section.content.map((line, j) =>
                  line === "" ? (
                    <br key={j} />
                  ) : (
                    <p key={j} className="legal-paragraph">{line}</p>
                  )
                )}
              </div>
            ))}

            <div className="legal-contact">
              <p>Bei Fragen zu {doc.breadcrumb.toLowerCase()} kontaktieren Sie uns bitte:</p>
              <p><strong>{COMPANY.name}</strong></p>
              <p><i className="fa-solid fa-envelope" style={{ marginRight: 6, color: "var(--orange)" }}></i> {COMPANY.email}</p>
              <p><i className="fa-solid fa-location-dot" style={{ marginRight: 6, color: "var(--orange)" }}></i> {COMPANY.address}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
