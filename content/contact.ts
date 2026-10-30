import type { Lang } from "@/lib/lang";

/** Les sujets du formulaire de contact ; ?sujet=… dans l'adresse pré-sélectionne le bon. */
export const contactTopics = ["question", "testimony", "partnership", "invitation", "press", "other"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export function isContactTopic(value: unknown): value is ContactTopic {
  return typeof value === "string" && (contactTopics as readonly string[]).includes(value);
}

export const contactPage = {
  fr: {
    topicLabel: "Sujet",
    topics: {
      question: "Une question",
      testimony: "Mon témoignage",
      partnership: "Un partenariat",
      invitation: "Une invitation (église, événement)",
      press: "Presse et médias",
      other: "Autre chose",
    } satisfies Record<ContactTopic, string>,
    name: "Ton nom",
    email: "Ton adresse e-mail",
    message: "Ton message",
    messageHint: "Quelques lignes suffisent. Indique ta ville si tu nous invites.",
    consent: "J'accepte que The Encounter utilise ces informations pour me répondre.",
    privacyLink: "Politique de confidentialité",
    send: "Envoyer",
    sending: "Envoi…",
    sent: "Merci, ton message est bien parti. Tu vas recevoir un e-mail de confirmation ; l'équipe te répond personnellement.",
    sendAnother: "Écrire un autre message",
    errors: {
      name: "Indique ton nom.",
      email: "Cette adresse e-mail ne semble pas valide.",
      message: "Ton message est vide ou trop long (5 000 caractères au plus).",
      consent: "Coche la case pour que nous puissions te répondre.",
      rate: "Plusieurs messages viennent de partir depuis ta connexion. Réessaie dans quelques minutes.",
      send: "Le message n'a pas pu partir. Tu peux nous écrire directement :",
    },
    directTitle: "Ou directement",
    faqTitle: "Une question fréquente ?",
    faqLink: "Lire la FAQ",
  },
  en: {
    topicLabel: "Subject",
    topics: {
      question: "A question",
      testimony: "My testimony",
      partnership: "A partnership",
      invitation: "An invitation (church, event)",
      press: "Press and media",
      other: "Something else",
    } satisfies Record<ContactTopic, string>,
    name: "Your name",
    email: "Your email address",
    message: "Your message",
    messageHint: "A few lines are enough. Tell us your city if you're inviting us.",
    consent: "I agree that The Encounter may use this information to reply to me.",
    privacyLink: "Privacy policy",
    send: "Send",
    sending: "Sending…",
    sent: "Thank you, your message is on its way. You'll receive a confirmation email; the team will answer you personally.",
    sendAnother: "Write another message",
    errors: {
      name: "Please enter your name.",
      email: "This email address doesn't look valid.",
      message: "Your message is empty or too long (5,000 characters at most).",
      consent: "Please tick the box so we can reply to you.",
      rate: "Several messages were just sent from your connection. Please try again in a few minutes.",
      send: "The message couldn't be sent. You can write to us directly:",
    },
    directTitle: "Or directly",
    faqTitle: "A common question?",
    faqLink: "Read the FAQ",
  },
} satisfies Record<Lang, unknown>;

/** Le formulaire des donateurs (page Soutenir) : se faire connaître après un don, laisser un mot ou un sujet de prière. */
export const donorForm = {
  fr: {
    title: "Tu as fait un don ?",
    lead: "Revolut ne nous transmet que ton nom. Laisse-nous un mot pour que l'équipe puisse te remercier, et prier pour toi si tu le souhaites.",
    amount: "Montant donné (facultatif)",
    message: "Un mot pour l'équipe, un sujet de prière (facultatif)",
    send: "Me faire connaître",
    sent: "Merci pour ton don et pour ton message. L'équipe de The Encounter te répondra personnellement.",
  },
  en: {
    title: "Have you given?",
    lead: "Revolut only passes on your name. Leave us a note so the team can thank you, and pray for you if you wish.",
    amount: "Amount given (optional)",
    message: "A word for the team, a prayer request (optional)",
    send: "Let us know",
    sent: "Thank you for your gift and your message. The Encounter team will answer you personally.",
  },
} satisfies Record<Lang, unknown>;

/** L'accusé de réception envoyé à l'expéditeur : un texte fixe, qui ne reprend jamais le message reçu. */
export const contactReceipt = {
  fr: {
    subject: "Nous avons bien reçu ton message · The Encounter",
    body: (name: string) =>
      `Bonjour ${name},\n\nMerci pour ton message : il est bien arrivé et l'équipe de The Encounter le lira personnellement. Nous te répondons dès que possible.\n\nÀ bientôt,\nThe Encounter`,
  },
  en: {
    subject: "We received your message · The Encounter",
    body: (name: string) =>
      `Hello ${name},\n\nThank you for your message: it has arrived and the team at The Encounter will read it personally. We'll get back to you as soon as we can.\n\nSee you soon,\nThe Encounter`,
  },
} satisfies Record<Lang, unknown>;

/** Le panneau à côté de la FAQ, et la table des matières des pages légales. */
export const infoAside = {
  fr: {
    faqTitle: "Pas trouvé ta réponse ?",
    faqText: "Écris-nous : l'équipe lit chaque message et te répond personnellement.",
    toc: "Sur cette page",
    pending: "À compléter",
  },
  en: {
    faqTitle: "Didn't find your answer?",
    faqText: "Write to us: the team reads every message and answers you personally.",
    toc: "On this page",
    pending: "To be completed",
  },
} satisfies Record<Lang, unknown>;

/** FAQ proposée par AppliCraft Studio, à valider par la cliente (plan V1, §5). */
export const faqPage = {
  fr: [
    {
      q: "Qu'est-ce que The Encounter ?",
      a: "Une plateforme de conversations fondée par Jennifer Mondele. Elle réunit un podcast de portraits, des soirées de louange (La Rencontre) et des ateliers, autour d'une conviction : une rencontre avec Dieu peut tout changer.",
    },
    {
      q: "Où écouter le podcast ?",
      a: "Les épisodes sont publiés en entier sur YouTube et Spotify, et en extraits sur Instagram et TikTok. Tu peux aussi les regarder ici, sur la page Podcast.",
    },
    {
      q: "Faut-il être chrétien pour écouter ?",
      a: "Non. Les invités racontent leur histoire telle qu'elle s'est passée, sans jargon. Que tu croies, que tu doutes ou que tu cherches, tu es le bienvenu.",
    },
    {
      q: "Comment être invité dans le podcast ?",
      a: "Raconte-nous ta rencontre avec Dieu en quelques lignes depuis la page Contact (sujet « Mon témoignage »). L'équipe lit chaque message et reprend contact avec les personnes dont l'histoire sera filmée.",
    },
    {
      q: "Comment soutenir The Encounter ?",
      a: "Par un don ponctuel via Revolut (page Soutenir), mais aussi en priant, en partageant un épisode ou en t'abonnant sur YouTube et Spotify.",
    },
    {
      q: "Mon don est-il déductible des impôts ?",
      a: "Non : The Encounter ne délivre pas d'attestation fiscale. Le don est reçu par Jennifer Mondele, fondatrice de The Encounter.",
    },
    {
      q: "Peut-on inviter The Encounter dans notre église ou notre ville ?",
      a: "Oui. Écris-nous depuis la page Collaborer en précisant le lieu, la date envisagée et le type de rencontre.",
    },
    {
      q: "Le site existe-t-il en anglais ?",
      a: "Oui : le bouton FR / EN en haut de chaque page change la langue instantanément. Les épisodes, eux, sont en français.",
    },
  ],
  en: [
    {
      q: "What is The Encounter?",
      a: "A platform of conversations founded by Jennifer Mondele. It brings together a podcast of portraits, evenings of praise (La Rencontre) and workshops, around one conviction: a single encounter with God can change everything.",
    },
    {
      q: "Where can I listen to the podcast?",
      a: "Full episodes are published on YouTube and Spotify, with clips on Instagram and TikTok. You can also watch them right here, on the Podcast page.",
    },
    {
      q: "Do I need to be a Christian to listen?",
      a: "No. Guests tell their story as it happened, without jargon. Whether you believe, doubt or are searching, you are welcome.",
    },
    {
      q: "How can I be a guest on the podcast?",
      a: "Tell us about your encounter with God in a few lines from the Contact page (subject “My testimony”). The team reads every message and gets back to the people whose story will be filmed.",
    },
    {
      q: "How can I support The Encounter?",
      a: "With a one-off gift through Revolut (Support page), and also by praying, sharing an episode or subscribing on YouTube and Spotify.",
    },
    {
      q: "Is my gift tax-deductible?",
      a: "No: The Encounter does not issue tax receipts. Gifts are received by Jennifer Mondele, founder of The Encounter.",
    },
    {
      q: "Can we invite The Encounter to our church or city?",
      a: "Yes. Write to us from the Collaborate page with the place, the date you have in mind and the kind of gathering.",
    },
    {
      q: "Is the site available in English?",
      a: "Yes: the FR / EN button at the top of every page switches language instantly. The episodes themselves are in French.",
    },
  ],
} satisfies Record<Lang, { q: string; a: string }[]>;

export const cookieConsent = {
  fr: {
    label: "Choix des cookies",
    text: "Le site n'utilise que des cookies nécessaires. Les vidéos YouTube et le lecteur Spotify peuvent en déposer : ils ne se chargent qu'avec ton accord.",
    accept: "Accepter",
    refuse: "Refuser",
    more: "En savoir plus sur les cookies",
    manage: "Gérer les cookies",
    gate: "Cette vidéo est hébergée par YouTube, qui peut déposer des cookies.",
    gateAccept: "Accepter et lire",
    gateOpen: "Ouvrir sur YouTube",
    watch: (title: string) => `Regarder « ${title} »`,
    spotify: "Écouter sur Spotify",
  },
  en: {
    label: "Cookie choice",
    text: "This site only uses essential cookies. YouTube videos and the Spotify player may set their own: they only load with your consent.",
    accept: "Accept",
    refuse: "Decline",
    more: "About our cookies",
    manage: "Manage cookies",
    gate: "This video is hosted by YouTube, which may set cookies.",
    gateAccept: "Accept and play",
    gateOpen: "Open on YouTube",
    watch: (title: string) => `Watch “${title}”`,
    spotify: "Listen on Spotify",
  },
} satisfies Record<Lang, unknown>;
