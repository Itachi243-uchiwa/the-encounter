import type { Lang } from "@/lib/lang";
import { site } from "./site";

/**
 * Pages légales (droit belge, RGPD). Les crochets [à compléter] attendent les
 * informations de la cliente (plan V1, §5 : nom légal, n° BCE, adresse), au plus tard le 4/11.
 */
export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDoc {
  updated: string;
  sections: LegalSection[];
}

export type LegalRoute = "legal" | "privacy" | "cookies";

const publisherFr = "[à compléter : nom légal de l'éditeur, ou Jennifer Mondele en personne physique]";
const publisherEn = "[to be completed: publisher's legal name, or Jennifer Mondele as a natural person]";

export const legalPages: Record<LegalRoute, Record<Lang, LegalDoc>> = {
  legal: {
    fr: {
      updated: "Mis à jour le 30 octobre 2026",
      sections: [
        {
          title: "Éditeur du site",
          paragraphs: [`Le site ${site.name} est édité par ${publisherFr}.`],
          list: [
            "Adresse : [à compléter]",
            "Numéro d'entreprise (BCE) : [à compléter, le cas échéant]",
            `E-mail : ${site.email}`,
            `Responsable de la publication : ${site.founder}`,
          ],
        },
        {
          title: "Hébergement",
          paragraphs: ["Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com)."],
        },
        {
          title: "Conception et réalisation",
          paragraphs: ["Site conçu et développé par AppliCraft Studio (applicraftstudio.com)."],
        },
        {
          title: "Propriété intellectuelle",
          paragraphs: [
            "Les textes, photographies, vidéos, logos et la marque The Encounter sont protégés par le droit d'auteur et le droit des marques. Toute reproduction, même partielle, sans autorisation écrite de l'éditeur est interdite.",
            "Les témoignages appartiennent aux personnes qui les ont confiés et sont publiés avec leur accord. Les versets bibliques sont cités dans la traduction Louis Segond 1910 (domaine public).",
          ],
        },
        {
          title: "Liens et contenus tiers",
          paragraphs: [
            "Les épisodes sont diffusés par YouTube et Spotify, et les dons sont reçus via Revolut. Ces services ont leurs propres conditions ; l'éditeur n'est pas responsable de leur contenu ni de leur disponibilité.",
          ],
        },
        {
          title: "Droit applicable",
          paragraphs: ["Le site et ces mentions sont soumis au droit belge. Tout litige relève des tribunaux de Bruxelles, sauf disposition légale contraire."],
        },
      ],
    },
    en: {
      updated: "Last updated 30 October 2026",
      sections: [
        {
          title: "Publisher",
          paragraphs: [`The ${site.name} website is published by ${publisherEn}.`],
          list: [
            "Address: [to be completed]",
            "Company number (BCE/KBO): [to be completed, if applicable]",
            `Email: ${site.email}`,
            `Publication manager: ${site.founder}`,
          ],
        },
        {
          title: "Hosting",
          paragraphs: ["The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States (vercel.com)."],
        },
        {
          title: "Design and development",
          paragraphs: ["Site designed and developed by AppliCraft Studio (applicraftstudio.com)."],
        },
        {
          title: "Intellectual property",
          paragraphs: [
            "The texts, photographs, videos, logos and The Encounter brand are protected by copyright and trademark law. Any reproduction, even partial, without the publisher's written permission is prohibited.",
            "Testimonies belong to the people who shared them and are published with their consent. Bible verses are quoted from the King James Version (public domain).",
          ],
        },
        {
          title: "Third-party links and content",
          paragraphs: [
            "Episodes are streamed by YouTube and Spotify, and gifts are received through Revolut. These services have their own terms; the publisher is not responsible for their content or availability.",
          ],
        },
        {
          title: "Governing law",
          paragraphs: ["This site and this notice are governed by Belgian law. Any dispute falls under the courts of Brussels, unless the law provides otherwise."],
        },
      ],
    },
  },

  privacy: {
    fr: {
      updated: "Mise à jour le 30 octobre 2026",
      sections: [
        {
          title: "Qui est responsable de vos données",
          paragraphs: [`${publisherFr}, joignable à ${site.email}. Les données sont traitées conformément au Règlement général sur la protection des données (RGPD).`],
        },
        {
          title: "Ce que nous collectons",
          paragraphs: ["Le site ne demande aucun compte et ne collecte rien à votre insu. Seul le formulaire de contact recueille des données, celles que vous y écrivez :"],
          list: ["votre nom ;", "votre adresse e-mail ;", "le sujet et le contenu de votre message."],
        },
        {
          title: "Pourquoi, et sur quelle base",
          paragraphs: [
            "Uniquement pour lire votre message et vous répondre, sur la base de votre consentement (case à cocher du formulaire). Vos données ne sont ni vendues, ni louées, ni utilisées pour de la publicité ou une newsletter.",
            "Pour éviter les abus, l'adresse IP d'envoi est gardée en mémoire quelques minutes, sans être enregistrée.",
          ],
        },
        {
          title: "Combien de temps",
          paragraphs: ["Les messages sont conservés dans la boîte e-mail de The Encounter le temps de l'échange, puis au plus 12 mois après le dernier contact."],
        },
        {
          title: "Qui y a accès",
          paragraphs: ["L'équipe de The Encounter, et les prestataires techniques qui font fonctionner le site :"],
          list: [
            "Vercel Inc. (hébergement du site, États-Unis) ;",
            "Resend (acheminement des e-mails du formulaire, États-Unis).",
          ],
        },
        {
          title: "Transferts hors de l'Union européenne",
          paragraphs: [
            "Ces prestataires sont établis aux États-Unis. Les transferts sont encadrés par le Data Privacy Framework UE–États-Unis ou par les clauses contractuelles types de la Commission européenne.",
          ],
        },
        {
          title: "Vidéos, écoute et dons",
          paragraphs: [
            "Les vidéos YouTube et le lecteur Spotify ne se chargent qu'avec votre accord (voir la page Cookies). Les dons se font sur Revolut, qui traite vos données de paiement sous sa propre responsabilité : le site n'en reçoit aucune.",
          ],
        },
        {
          title: "Vos droits",
          paragraphs: [
            `Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, leur portabilité, la limitation du traitement, ou retirer votre consentement à tout moment, en écrivant à ${site.email}. Nous répondons dans un délai d'un mois.`,
            "Vous pouvez aussi introduire une plainte auprès de l'Autorité de protection des données, rue de la Presse 35, 1000 Bruxelles (autoriteprotectiondonnees.be).",
          ],
        },
      ],
    },
    en: {
      updated: "Last updated 30 October 2026",
      sections: [
        {
          title: "Who is responsible for your data",
          paragraphs: [`${publisherEn}, reachable at ${site.email}. Data is processed in line with the General Data Protection Regulation (GDPR).`],
        },
        {
          title: "What we collect",
          paragraphs: ["The site asks for no account and collects nothing behind your back. Only the contact form collects data, the data you type into it:"],
          list: ["your name;", "your email address;", "the subject and content of your message."],
        },
        {
          title: "Why, and on what basis",
          paragraphs: [
            "Only to read your message and reply to you, based on your consent (the form's checkbox). Your data is never sold, rented, or used for advertising or a newsletter.",
            "To prevent abuse, the sending IP address is kept in memory for a few minutes, without being stored.",
          ],
        },
        {
          title: "How long",
          paragraphs: ["Messages are kept in The Encounter's mailbox for the time of the conversation, then at most 12 months after the last contact."],
        },
        {
          title: "Who has access",
          paragraphs: ["The Encounter team, and the technical providers that run the site:"],
          list: ["Vercel Inc. (site hosting, United States);", "Resend (delivery of the form's emails, United States)."],
        },
        {
          title: "Transfers outside the European Union",
          paragraphs: [
            "These providers are based in the United States. Transfers are covered by the EU–US Data Privacy Framework or by the European Commission's standard contractual clauses.",
          ],
        },
        {
          title: "Videos, listening and gifts",
          paragraphs: [
            "YouTube videos and the Spotify player only load with your consent (see the Cookies page). Gifts are made on Revolut, which processes your payment data under its own responsibility: the site receives none of it.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            `You can ask to access, correct, erase or port your data, restrict its processing, or withdraw your consent at any time by writing to ${site.email}. We reply within one month.`,
            "You can also lodge a complaint with the Belgian Data Protection Authority, rue de la Presse 35, 1000 Brussels (dataprotectionauthority.be).",
          ],
        },
      ],
    },
  },

  cookies: {
    fr: {
      updated: "Mise à jour le 30 octobre 2026",
      sections: [
        {
          title: "Les cookies nécessaires",
          paragraphs: ["Le site en dépose deux, sans lesquels il ne fonctionnerait pas comme prévu. Ils ne servent à aucun suivi et ne demandent pas d'accord :"],
          list: ["encounter-lang : retient la langue choisie (1 an) ;", "encounter-consent : retient votre choix sur les cookies ci-dessous (6 mois)."],
        },
        {
          title: "Les contenus de YouTube et Spotify",
          paragraphs: [
            "Les épisodes sont lus dans le lecteur de YouTube (en mode « confidentialité renforcée », youtube-nocookie.com) et, quand il existe, dans celui de Spotify. Ces services peuvent déposer leurs propres cookies et mesurer l'audience de leurs contenus.",
            "C'est pourquoi ils ne se chargent qu'avec votre accord. Sans accord, rien ne leur est transmis : un bouton vous propose d'accepter au moment de lire, ou d'ouvrir l'épisode directement sur YouTube ou Spotify.",
          ],
        },
        {
          title: "Pas de publicité ni de traceurs",
          paragraphs: ["Aucun cookie publicitaire, aucun pixel de réseau social, aucun outil de mesure d'audience à base de cookies."],
        },
        {
          title: "Changer d'avis",
          paragraphs: ["Votre choix est modifiable à tout moment avec le bouton ci-dessous, ou le lien « Gérer les cookies » en pied de page. Vous pouvez aussi supprimer les cookies depuis les réglages de votre navigateur."],
        },
      ],
    },
    en: {
      updated: "Last updated 30 October 2026",
      sections: [
        {
          title: "Essential cookies",
          paragraphs: ["The site sets two, without which it would not work as intended. They are not used for tracking and need no consent:"],
          list: ["encounter-lang: remembers your chosen language (1 year);", "encounter-consent: remembers your choice about the cookies below (6 months)."],
        },
        {
          title: "YouTube and Spotify content",
          paragraphs: [
            "Episodes play in YouTube's player (in “privacy-enhanced” mode, youtube-nocookie.com) and, when available, in Spotify's. These services may set their own cookies and measure the audience of their content.",
            "That is why they only load with your consent. Without it, nothing is sent to them: a button lets you accept when you press play, or open the episode directly on YouTube or Spotify.",
          ],
        },
        {
          title: "No advertising, no trackers",
          paragraphs: ["No advertising cookies, no social media pixels, no cookie-based analytics."],
        },
        {
          title: "Changing your mind",
          paragraphs: ["You can change your choice at any time with the button below, or the “Manage cookies” link in the footer. You can also delete cookies from your browser settings."],
        },
      ],
    },
  },
};
