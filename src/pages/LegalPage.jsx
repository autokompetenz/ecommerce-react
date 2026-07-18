import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ScrollReveal from "../components/ScrollReveal";

const COMPANY = {
  name: "POWER Tools GmbH",
  address: "Am Winkel 4, 15528 Spreenhagen, Allemagne",
  registeredAddress: "Am Winkel 2d, 15528 Spreenhagen, Allemagne",
  hrNumber: "HRB 11523 FF",
  court: "Amtsgericht Frankfurt (Oder)",
  vat: "DE232530007",
  director: "Oliver Haack",
  phone: "",
  email: "kontakt@powertoolsgmbh.com",
  website: "https://ecommerce-react-dun-zeta.vercel.app",
  activity: "Développement, fabrication et distribution d'outils de coupe haute performance pour machines industrielles de broyage et industrie agroalimentaire.",
  sector: "Fabrication d'outillage industriel et de machines de coupe",
  employees: "10 à 19 employés",
  status: "Entreprise active",
  host: "Vercel Inc., 349 S Bernal Ave, San Francisco, CA 94103, USA",
};

const DOCS = {
  mentions: {
    title: "Mentions Légales",
    breadcrumb: "Mentions légales",
    lastUpdated: "18 juillet 2026",
    sections: [
      {
        heading: "1. Éditeur du site",
        content: [
          `Le site ${COMPANY.website} est édité par :`,
          `• Dénomination sociale : ${COMPANY.name}`,
          `• Forme juridique : GmbH (Société à responsabilité limitée de droit allemand)`,
          `• Directeur : ${COMPANY.director} (Geschäftsführer)`,
          `• Siège social : ${COMPANY.address}`,
          `• Adresse enregistrée : ${COMPANY.registeredAddress}`,
          `• Immatriculation : ${COMPANY.hrNumber} — ${COMPANY.court}`,
          `• N° de TVA intracommunautaire : ${COMPANY.vat}`,
          `• E-mail : ${COMPANY.email}`,
        ],
      },
      {
        heading: "2. Activité",
        content: [
          COMPANY.activity,
          `Secteur : ${COMPANY.sector}`,
          `Effectif : ${COMPANY.employees}`,
          `Statut : ${COMPANY.status}`,
        ],
      },
      {
        heading: "3. Hébergeur",
        content: [
          `Ce site est hébergé par :`,
          `• ${COMPANY.host}`,
          `• Site : https://vercel.com`,
        ],
      },
      {
        heading: "4. Propriété intellectuelle",
        content: [
          `L'ensemble du contenu de ce site (textes, images, vidéos, logos, marques, éléments graphiques, logiciels) est la propriété exclusive de ${COMPANY.name} ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.`,
          `Toute reproduction, représentation, modification, publication, transmission ou dénaturation du site ou de son contenu, par quelque procédé que ce soit, est interdite sans autorisation préalable écrite de ${COMPANY.name}.`,
          `Les marques et logos présents sur le site sont des marques déposées par ${COMPANY.name} ou ses partenaires. Toute reproduction sans autorisation est interdite.`,
        ],
      },
      {
        heading: "5. Données personnelles",
        content: [
          `Les informations relatives au traitement des données personnelles figurent dans notre Politique de confidentialité accessible depuis le pied de page du site.`,
        ],
      },
      {
        heading: "6. Limitation de responsabilité",
        content: [
          `${COMPANY.name} s'efforce de fournir des informations aussi précises que possible sur ce site. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.`,
          `L'utilisateur est seul responsable de l'utilisation qu'il fait du site et de ses données. ${COMPANY.name} ne saurait être tenue responsable de tout dommage résultant de l'utilisation du site.`,
          `Les liens hypertextes présents sur le site peuvent renvoyer vers d'autres sites. ${COMPANY.name} décline toute responsabilité quant au contenu de ces sites tiers.`,
        ],
      },
      {
        heading: "7. Droit applicable",
        content: [
          `Les présentes mentions légales sont régies par le droit allemand. En cas de litige, les tribunaux compétents seront ceux de Frankfurt (Oder), Allemagne, sauf disposition légale impérative contraire.`,
        ],
      },
    ],
  },
  cgv: {
    title: "Conditions Générales de Vente",
    breadcrumb: "CGV",
    lastUpdated: "18 juillet 2026",
    sections: [
      {
        heading: "Article 1 — Objet",
        content: [
          `Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre ${COMPANY.name} et tout acheteur (ci-après « le Client ») effectuant un achat sur le site ${COMPANY.website}.`,
          `Toute commande passée sur le site implique l'acceptation sans réserve des présentes CGV.`,
        ],
      },
      {
        heading: "Article 2 — Produits",
        content: [
          `Les produits proposés à la vente sont ceux figurant sur le site ${COMPANY.website}. Les photographies et descriptions des produits sont fournies à titre indicatif et n'engagent pas ${COMPANY.name}.`,
          `Les produits sont conformes à la réglementation en vigueur en Allemagne et dans l'Union européenne. ${COMPANY.name} se réserve le droit de modifier sa catalogue de produits à tout moment.`,
        ],
      },
      {
        heading: "Article 3 — Prix",
        content: [
          `Les prix sont indiqués en euros (€) toutes taxes comprises (TTC), incluant la TVA allemande au taux en vigueur.`,
          `${COMPANY.name} se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix applicable est celui en vigueur au moment de la validation de la commande par le Client.`,
          `Les frais de livraison ne sont pas inclus dans le prix indiqué et seront indiqués au Client avant la validation de la commande.`,
        ],
      },
      {
        heading: "Article 4 — Commande",
        content: [
          `La commande est validée lorsque le Client a complété toutes les étapes du processus de commande :`,
          `1. Ajout des produits au panier`,
          `2. Vérification du panier`,
          `3. Renseignement des informations de livraison et de facturation`,
          `4. Acceptation des présentes CGV`,
          `5. Validation du paiement`,
          `Un e-mail de confirmation est envoyé au Client à l'adresse e-mail renseignée lors de la commande.`,
        ],
      },
      {
        heading: "Article 5 — Paiement",
        content: [
          `Le paiement est exigible à la commande. Les moyens de paiement acceptés sont :`,
          `• Carte bancaire (Visa, Mastercard, American Express)`,
          `• Virement bancaire`,
          `• PayPal`,
          `Le paiement est sécurisé par les protocoles de chiffrement SSL/TLS. ${COMPANY.name} ne stocke pas les données de carte bancaire.`,
        ],
      },
      {
        heading: "Article 6 — Livraison",
        content: [
          `Les livraisons sont effectuées en France métropolitaine, dans l'Union européenne et dans les pays suivants : Allemagne, Belgique, Pays-Bas, Luxembourg, Autriche, Italie, Espagne, Pologne.`,
          `Les délais de livraison indicatifs sont :`,
          `• Livraison standard : 2 à 5 jours ouvrés`,
          `• Livraison express : 1 à 2 jours ouvrés`,
          `Ces délais courent à compter de la confirmation de la commande. ${COMPANY.name} ne saurait être tenue responsable des retards de livraison imputables au transporteur ou à des circonstances indépendantes de sa volonté (force majeure, intempéries, etc.).`,
          `La livraison est gratuite pour toute commande supérieure ou égale à 100 €. En dessous de ce montant, des frais de livraison de 9,90 € TTC sont appliqués.`,
        ],
      },
      {
        heading: "Article 7 — Droit de rétractation",
        content: [
          `Conformément aux dispositions légales en vigueur, le Client dispose d'un délai de 14 jours à compter de la réception de sa commande pour exercer son droit de rétractation, sans avoir à justifier de motif.`,
          `Pour exercer ce droit, le Client doit adresser à ${COMPANY.name} une déclaration écrite (e-mail à ${COMPANY.email}) mentionnant :`,
          `• Son nom et prénom`,
          `• La référence de la commande`,
          `• Les produits concernés`,
          `• La date de réception`,
          `Le Client devra retourner les produits dans leur emballage d'origine, en parfait état, aux frais du Client, à l'adresse suivante : ${COMPANY.address}.`,
          `Le remboursement sera effectué dans un délai de 14 jours à compter de la réception du retour par ${COMPANY.name}, par le même moyen de paiement que celui utilisé lors de la commande.`,
          `Le droit de rétractation ne peut être exercé pour les produits confectionnés selon les spécifications du Client ou nettement personnalisés.`,
        ],
      },
      {
        heading: "Article 8 — Garantie légale de conformité",
        content: [
          `Tous les produits vendus sur le site bénéficient de la garantie légale de conformité (§ 434 et suivants du BGB - Code civil allemand) et de la garantie contre les vices cachés (§ 435 et suivants du BGB).`,
          `En cas de non-conformité ou de vice, le Client peut demander :`,
          `• Le remplacement du produit`,
          `• La réparation du produit`,
          `• Le remboursement du prix payé`,
          `Le Client doit signaler tout défaut dans un délai de 2 ans à compter de la livraison du produit.`,
        ],
      },
      {
        heading: "Article 9 — Responsabilité",
        content: [
          `${COMPANY.name} ne saurait être tenue responsable des dommages résultant d'une utilisation non conforme des produits ou d'un défaut d'utilisation par le Client.`,
          `La responsabilité de ${COMPANY.name} est limitée au montant de la commande concernée.`,
        ],
      },
      {
        heading: "Article 10 — Droit applicable et juridiction",
        content: [
          `Les présentes CGV sont régies par le droit allemand. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire.`,
          `À défaut, les tribunaux compétents seront ceux de Frankfurt (Oder), Allemagne, sauf disposition légale impérative contraire.`,
        ],
      },
    ],
  },
  confidentialite: {
    title: "Politique de Confidentialité",
    breadcrumb: "Politique de confidentialité",
    lastUpdated: "18 juillet 2026",
    sections: [
      {
        heading: "1. Responsable du traitement",
        content: [
          `Le responsable du traitement des données personnelles est :`,
          `• ${COMPANY.name}`,
          `• ${COMPANY.director}, Geschäftsführer`,
          `• ${COMPANY.address}`,
          `• ${COMPANY.email}`,
        ],
      },
      {
        heading: "2. Données collectées",
        content: [
          `Dans le cadre de l'utilisation du site, ${COMPANY.name} peut collecter les données suivantes :`,
          `• Données d'identification : nom, prénom, adresse e-mail, numéro de téléphone`,
          `• Données de livraison : adresse postale, ville, code postal, pays`,
          `• Données de facturation : informations de facturation`,
          `• Données de commande : historique des commandes, produits achetés, montants`,
          `• Données de navigation : adresse IP, type de navigateur, pages visitées, durée de la connexion`,
          `• Données de paiement : les données de carte bancaire ne sont pas stockées par ${COMPANY.name}`,
        ],
      },
      {
        heading: "3. Finalités du traitement",
        content: [
          `Les données personnelles sont collectées pour les finalités suivantes :`,
          `• Traitement et suivi des commandes`,
          `• Livraison des produits`,
          `• Facturation et gestion comptable`,
          `• Relation client (réponses aux demandes, service après-vente)`,
          `• Envoi de newsletters et offres commerciales (avec consentement préalable)`,
          `• Amélioration du site et de l'expérience utilisateur`,
          `• Respect des obligations légales`,
          `• Prévention de la fraude`,
        ],
      },
      {
        heading: "4. Base légale du traitement",
        content: [
          `Les données personnelles sont traitées sur les bases légales suivantes :`,
          `• Exécution du contrat (Article 6.1.b du RGPD) : traitement nécessaire à l'exécution de la commande`,
          `• Intérêt légitime (Article 6.1.f du RGPD) : amélioration du service, prévention de la fraude`,
          `• Consentement (Article 6.1.a du RGPD) : envoi de newsletters et communications commerciales`,
          `• Obligation légale (Article 6.1.c du RGPD) : conservation des données comptables`,
        ],
      },
      {
        heading: "5. Durée de conservation",
        content: [
          `Les données personnelles sont conservées pour la durée suivante :`,
          `• Données de commande : 10 ans (obligations comptables)`,
          `• Données de compte client : jusqu'à la suppression du compte ou 3 ans d'inactivité`,
          `• Données de navigation : 13 mois maximum`,
          `• Données de consentement (newsletter) : jusqu'au retrait du consentement`,
        ],
      },
      {
        heading: "6. Destinataires des données",
        content: [
          `Les données personnelles peuvent être communiquées aux destinataires suivants :`,
          `• Les services internes de ${COMPANY.name}`,
          `• Les prestataires de livraison (DHL, DPD, UPS, GLS)`,
          `• Les prestataires de paiement (Stripe, PayPal)`,
          `• L'hébergeur du site (${COMPANY.host})`,
          `• Les autorités compétentes en cas d'obligation légale`,
        ],
      },
      {
        heading: "7. Transferts de données hors UE",
        content: [
          `Certains prestataires (Stripe, Vercel, PayPal) sont situés hors de l'Union européenne. Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne ou par des décisions d'adéquation, conformément au RGPD.`,
        ],
      },
      {
        heading: "8. Droits des utilisateurs",
        content: [
          `Conformément au RGPD (Règlement Général sur la Protection des Données), le Client dispose des droits suivants :`,
          `• Droit d'accès (Article 15) : obtenir une copie de ses données`,
          `• Droit de rectification (Article 16) : corriger des données inexactes`,
          `• Droit à l'effacement (Article 17) : demander la suppression de ses données`,
          `• Droit à la limitation (Article 18) : demander la limitation du traitement`,
          `• Droit à la portabilité (Article 20) : recevoir ses données dans un format structuré`,
          `• Droit d'opposition (Article 21) : s'opposer au traitement pour motifs légitimes`,
          `• Droit de retirer le consentement à tout moment`,
          `Pour exercer ses droits, le Client peut contacter ${COMPANY.name} à l'adresse : ${COMPANY.email}.`,
          `Le Client dispose également du droit d'introduire une réclamation auprès de l'autorité de contrôle compétente : Bundesbeauftragter für den Datenschutz und die Informationsfreiheit (BfDI), Friedrichstraße 219, 10969 Berlin, Allemagne.`,
        ],
      },
      {
        heading: "9. Sécurité",
        content: [
          `${COMPANY.name} met en œuvre les mesures techniques et organisationnelles suivantes pour protéger les données personnelles :`,
          `• Chiffrement SSL/TLS des communications`,
          `• Chiffrement des données sensibles en base`,
          `• Contrôle d'accès strict aux données`,
          `• Journalisation des accès`,
          `• Mises à jour de sécurité régulières`,
        ],
      },
      {
        heading: "10. Cookies",
        content: [
          `Pour les informations relatives à l'utilisation des cookies, veuillez consulter notre Politique en matière de cookies.`,
        ],
      },
    ],
  },
  retractation: {
    title: "Droit de Rétractation",
    breadcrumb: "Droit de rétractation",
    lastUpdated: "18 juillet 2026",
    sections: [
      {
        heading: "1. Délai de rétractation",
        content: [
          `Conformément aux dispositions légales en vigueur (§ 355 et suivants du BGB), vous disposez d'un délai de 14 jours pour exercer votre droit de rétractation, sans avoir à justifier de motif.`,
          `Le délai de rétractation expire 14 jours après le jour où vous (ou un tiers indiqué par vous, autre que le transporteur) prend possession physique du bien.`,
          `Pour les commandes portant sur plusieurs biens livrés séparément, le délai expire 14 jours après le jour où vous prenez possession du dernier bien.`,
        ],
      },
      {
        heading: "2. Exercice du droit de rétractation",
        content: [
          `Pour exercer votre droit de rétractation, vous devez nous informer de votre décision de vous rétracter par une déclaration écrite (e-mail ou courrier postal) en utilisant les coordonnées suivantes :`,
          `• ${COMPANY.name}`,
          `• ${COMPANY.address}`,
          `• E-mail : ${COMPANY.email}`,
          `Vous pouvez utiliser le modèle de formulaire de rétractation ci-dessous, mais ce n'est pas obligatoire.`,
        ],
      },
      {
        heading: "3. Modèle de formulaire de rétractation",
        content: [
          `À l'attention de ${COMPANY.name} :`,
          `${COMPANY.address}`,
          `E-mail : ${COMPANY.email}`,
          ``,
          `Je nous informe par la présente de mon retrait du contrat portant sur le(s) bien(s) suivant(s) :`,
          `• Référence de la commande : _______________`,
          `• Nom du/des bien(s) : _______________`,
          `• Date de la commande : _______________`,
          `• Date de réception : _______________`,
          `• Nom du consommateur : _______________`,
          `• Adresse du consommateur : _______________`,
          `• Date : _______________`,
          `• Signature du consommateur : _______________`,
        ],
      },
      {
        heading: "4. Effets de la rétractation",
        content: [
          `En cas de rétractation, ${COMPANY.name} vous rembourse l'intégralité des sommes versées, y compris les frais de livraison (sauf frais supplémentaires résultant du choix d'un mode de livraison autre que le mode standard proposé), dans un délai de 14 jours à compter de la date à laquelle nous sommes informés de votre décision de vous rétracter.`,
          `${COMPANY.name} procède au remboursement en utilisant le même moyen de paiement que celui utilisé lors de la transaction initiale, sauf si vous convenez expressément d'un moyen différent.`,
          `${COMPANY.name} peut différer le remboursement jusqu'à réception du bien retourné ou jusqu'à ce que vous ayez fourni une preuve d'expédition du bien, la date retenue étant celle du premier de ces faits.`,
        ],
      },
      {
        heading: "5. Retour des biens",
        content: [
          `Vous devez renvoyer ou restituer les biens à ${COMPANY.name} sans retard injustifié et, en tout état de cause, au plus tard 14 jours après la communication de votre décision de vous rétracter.`,
          `Vous supportez les frais directs du retour des biens, sauf si ${COMPANY.name} s'engage à les prendre en charge.`,
          `Vous n'avez à supporter que la dépréciation du bien résultant de manipulations autres que celles nécessaires pour établir la nature, les caractéristiques et le fonctionnement du bien.`,
        ],
      },
      {
        heading: "6. Exceptions au droit de rétractation",
        content: [
          `Le droit de rétractation ne peut être exercé pour les produits suivants :`,
          `• Biens confectionnés selon les spécifications du consommateur ou nettement personnalisés`,
          `• Biens scellés qui ne peuvent être retournés pour des raisons d'hygiène ou de protection de la santé et qui ont été descellés après la livraison`,
          `• Biens qui, par leur nature, sont melangés de manière indivisible avec d'autres articles`,
        ],
      },
    ],
  },
  expedition: {
    title: "Conditions d'Expédition et de Livraison",
    breadcrumb: "Expédition & livraison",
    lastUpdated: "18 juillet 2026",
    sections: [
      {
        heading: "1. Zones de livraison",
        content: [
          `${COMPANY.name} livre dans les pays suivants :`,
          `• France métropolitaine`,
          `• Allemagne`,
          `• Belgique`,
          `• Pays-Bas`,
          `• Luxembourg`,
          `• Autriche`,
          `• Italie`,
          `• Espagne`,
          `• Pologne`,
          `Pour les livraisons hors de ces zones, veuillez nous contacter à ${COMPANY.email} pour un devis personnalisé.`,
        ],
      },
      {
        heading: "2. Délais de traitement",
        content: [
          `Les commandes sont traitées et expédiées sous 24 à 48 heures ouvrées après validation du paiement.`,
          `Les commandes passées le vendredi après 14h, le week-end ou les jours férés seront traitées le premier jour ouvré suivant.`,
        ],
      },
      {
        heading: "3. Délais de livraison",
        content: [
          `• Livraison standard : 2 à 5 jours ouvrés selon la destination`,
          `• Livraison express : 1 à 2 jours ouvrés (disponible en France et en Allemagne)`,
          `Ces délais sont donnés à titre indicatif et courent à compter de la date d'expédition. ${COMPANY.name} ne saurait être tenue responsable des retards imputables au transporteur.`,
        ],
      },
      {
        heading: "4. Frais de livraison",
        content: [
          `• France métropolitaine et Allemagne : gratuit dès 100 € TTC — sinon 9,90 €`,
          `• Belgique, Pays-Bas, Luxembourg : gratuit dès 150 € TTC — sinon 12,90 €`,
          `• Autriche, Italie, Espagne, Pologne : gratuit dès 200 € TTC — sinon 16,90 €`,
          `Les frais de livraison sont indiqués au Client avant la validation de la commande.`,
        ],
      },
      {
        heading: "5. Suivi de commande",
        content: [
          `Un numéro de suivi est communiqué au Client par e-mail dès l'expédition de la commande. Le suivi peut être effectué via la page dédiée du site ou directement sur le site du transporteur.`,
        ],
      },
      {
        heading: "6. Réception et contrôle",
        content: [
          `À la réception, le Client est tenu de vérifier l'état du colis et la conformité des produits commandés. En cas de dommage ou d'anomalie, le Client doit :`,
          `• Faire des réserves expresses auprès du transporteur`,
          `• Contacter ${COMPANY.name} dans un délai de 48 heures à l'adresse ${COMPANY.email}`,
          `• Fournir des photographsies du colis endommagé`,
        ],
      },
      {
        heading: "7. Retard ou absence de livraison",
        content: [
          `En cas de retard de livraison supérieur à 7 jours par rapport à la date annoncée, le Client peut contacter ${COMPANY.name} pour lancer une procédure d'enquête auprès du transporteur.`,
          `Si la livraison s'avère impossible par la faute du transporteur, ${COMPANY.name} procédera au remboursement des frais de livraison ou à un réenvoi selon le choix du Client.`,
        ],
      },
    ],
  },
  retour: {
    title: "Politique de Retour et de Remboursement",
    breadcrumb: "Retour & remboursement",
    lastUpdated: "18 juillet 2026",
    sections: [
      {
        heading: "1. Délai de retour",
        content: [
          `Vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour nous retourner tout ou partie des articles commandés, sans avoir à justifier de motif (conformément au droit de rétractation).`,
          `Au-delà de 14 jours, les retours ne seront pas acceptés, sauf en cas de défaut de conformité ou de vice caché couvert par la garantie légale.`,
        ],
      },
      {
        heading: "2. Conditions de retour",
        content: [
          `Les produits doivent être retournés :`,
          `• Dans leur emballage d'origine`,
          `• En parfait état (non utilisés, non endommagés)`,
          `• Avec tous les accessoires et documents d'origine`,
          `• Accompagnés du bon de retour (fourni par ${COMPANY.name})`,
          `Les produits retournés incomplets, endommagés ou dont l'emballage a été ouvert ne seront pas acceptés pour remboursement.`,
        ],
      },
      {
        heading: "3. Procédure de retour",
        content: [
          `Étape 1 : Contactez ${COMPANY.name} à ${COMPANY.email} en indiquant votre numéro de commande et le(s) produit(s) concerné(s).`,
          `Étape 2 : Vous recevrez un bon de retour avec les instructions et l'adresse d'envoi.`,
          `Étape 3 : Emballez soigneusement le(s) produit(s) et envoyez-le(s) à l'adresse indiquée sur le bon de retour.`,
          `Étape 4 : ${COMPANY.name} vérifiera le bon état du produit retourné et procédera au remboursement dans un délai de 14 jours.`,
        ],
      },
      {
        heading: "4. Frais de retour",
        content: [
          `Les frais de retour sont à la charge du Client, sauf :`,
          `• Si le produit est défectueux ou non conforme à la commande`,
          `• Si ${COMPANY.name} a fait une erreur d'expédition`,
          `• Si le produit est endommagé pendant le transport`,
          `Dans ces cas, ${COMPANY.name} prendra en charge les frais de retour après accord préalable.`,
        ],
      },
      {
        heading: "5. Remboursement",
        content: [
          `Le remboursement est effectué dans un délai de 14 jours à compter de la réception du retour par ${COMPANY.name}.`,
          `Le remboursement comprend le prix d'achat du ou des produits retournés et les frais de livraison initiaux (dans la limite du tarif de livraison standard).`,
          `Le remboursement est effectué par le même moyen de paiement que celui utilisé lors de la commande, sauf accord contraire.`,
        ],
      },
      {
        heading: "6. Produits défectueux ou non conformes",
        content: [
          `En cas de produit défectueux, endommagé ou non conforme à la commande, le Client peut demander :`,
          `• Le remplacement du produit`,
          `• La réparation du produit`,
          `• Le remboursement intégral du prix payé`,
          `Le Client doit signaler le défaut dans un délai de 2 ans à compter de la livraison, conformément à la garantie légale de conformité (§ 434 et suivants du BGB).`,
          `${COMPANY.name} prendra en charge les frais de retour et de réexpédition pour les produits défectueux.`,
        ],
      },
    ],
  },
  cookies: {
    title: "Politique en Matière de Cookies",
    breadcrumb: "Cookies",
    lastUpdated: "18 juillet 2026",
    sections: [
      {
        heading: "1. Qu'est-ce qu'un cookie ?",
        content: [
          `Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la consultation d'un site internet. Il permet au site de retenir vos actions et préférences pendant une durée déterminée, afin de ne pas avoir à les ressaisir à chaque visite.`,
        ],
      },
      {
        heading: "2. Cookies utilisés sur ce site",
        content: [
          `${COMPANY.name} utilise les catégories de cookies suivantes :`,
          ``,
          `a) Cookies strictement nécessaires`,
          `Ces cookies sont indispensables au fonctionnement du site. Ils vous permettent d'utiliser les fonctionnalités essentielles (panier, session, sécurité). Sans ces cookies, le site ne peut pas fonctionner correctement.`,
          `Exemples : session utilisateur, panier d'achat, jeton CSRF.`,
          ``,
          `b) Cookies de performance et d'analyse`,
          `Ces cookies recueillent des informations sur la façon dont vous utilisez le site (pages visitées, temps passé, erreurs). Ils nous aident à améliorer le site et l'expérience utilisateur.`,
          `Exemple : Google Analytics.`,
          ``,
          `c) Cookies de fonctionnalité`,
          `Ces cookies mémorisent vos préférences et choix (langue, région, thème) afin de personnaliser votre expérience.`,
          ``,
          `d) Cookies publicitaires et de ciblage`,
          `Ces cookies sont utilisés pour vous proposer des publicités pertinentes en fonction de votre navigation. Ils peuvent être placés par des tiers (réseaux publicitaires).`,
          `À ce jour, ${COMPANY.name} ne place pas de cookies publicitaires tiers sur son site.`,
        ],
      },
      {
        heading: "3. Base légale",
        content: [
          `Les cookies strictement nécessaires sont placés sans consentement, conformément à l'article 5.3 de la directive ePrivacy et aux dispositions nationales applicables.`,
          `Pour les autres catégories de cookies (performance, fonctionnalité, publicité), votre consentement est requis. Un bandeau de consentement vous est présenté lors de votre première visite.`,
        ],
      },
      {
        heading: "4. Gestion de vos préférences",
        content: [
          `Vous pouvez à tout moment modifier vos préférences en matière de cookies :`,
          `• En cliquant sur le lien « Gérer les cookies » en bas de chaque page du site`,
          `• En paramétrant votre navigateur pour bloquer ou supprimer les cookies`,
          `Les instructions pour gérer les cookies dans les principaux navigateurs :`,
          `• Chrome : chrome://settings/cookies`,
          `• Firefox : about:preferences#privacy`,
          `• Safari : Préférences > Confidentialité`,
          `• Edge : edge://settings/privacy`,
          `Attention : la désactivation de certains cookies peut affecter le fonctionnement du site.`,
        ],
      },
      {
        heading: "5. Cookies tiers",
        content: [
          `Le site peut contenir des liens vers des sites tiers. ${COMPANY.name} n'a pas de contrôle sur les cookies déposés par ces sites tiers. Nous vous invitons à consulter les politiques de cookies de ces sites.`,
        ],
      },
      {
        heading: "6. Durée de vie des cookies",
        content: [
          `• Cookies de session : supprimés à la fermeture du navigateur`,
          `• Cookies persistants : durée maximale de 13 mois conformément aux recommandations de la CNIL`,
          `• Au-delà de cette durée, le consentement est redemandé`,
        ],
      },
      {
        heading: "7. Contact",
        content: [
          `Pour toute question relative à notre politique en matière de cookies, vous pouvez nous contacter à :`,
          `• E-mail : ${COMPANY.email}`,
          `• Adresse : ${COMPANY.address}`,
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
        <p>Page non trouvée.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Retour à l'accueil</Link>
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
            <p className="legal-updated">Dernière mise à jour : {doc.lastUpdated}</p>

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
              <p>Pour toute question concernant ces {doc.breadcrumb.toLowerCase()}, contactez-nous :</p>
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
