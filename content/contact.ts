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

/**
 * L'accusé de réception envoyé à l'expéditeur, adapté au formulaire et au sujet.
 * Texte fixe : il ne reprend jamais le message reçu (le formulaire ne peut pas servir de relais).
 */
type ReceiptKind = ContactTopic | "donor";
interface ReceiptCopy {
  subject: Record<ReceiptKind, string>;
  eyebrow: Record<ReceiptKind, string>;
  title: (firstName: string) => string;
  lead: Record<ReceiptKind, string>;
  next: string;
  meanwhile: string;
  meanwhileText: string;
  watch: string;
  listen: string;
  faq: string;
  signature: string;
  team: string;
  footer: string;
}

export const contactReceipt = {
  fr: {
    subject: {
      question: "Ta question est bien arrivée · The Encounter",
      testimony: "Merci pour ton témoignage · The Encounter",
      partnership: "Ta proposition est bien arrivée · The Encounter",
      invitation: "Merci pour ton invitation · The Encounter",
      press: "Ta demande est bien arrivée · The Encounter",
      other: "Nous avons bien reçu ton message · The Encounter",
      donor: "Merci pour ton don · The Encounter",
    },
    eyebrow: {
      question: "Question reçue",
      testimony: "Témoignage reçu",
      partnership: "Proposition reçue",
      invitation: "Invitation reçue",
      press: "Demande presse reçue",
      other: "Message reçu",
      donor: "Don · Merci",
    },
    title: (n) => `Merci, ${n}.`,
    lead: {
      question:
        "Ta question est entre de bonnes mains. L'équipe de The Encounter la lit personnellement et te répond dès que possible.",
      testimony:
        "Merci de nous avoir confié ton histoire. Chaque témoignage est lu avec attention, et dans la prière. Si ton histoire peut être racontée dans le podcast, nous reprendrons contact avec toi.",
      partnership:
        "Merci de penser à The Encounter. Nous étudions chaque proposition avec soin et revenons vers toi personnellement.",
      invitation:
        "Merci pour ton invitation. Nous regardons les dates et les possibilités, puis nous revenons vers toi pour en parler.",
      press: "Merci pour ta demande. Nous revenons vers toi rapidement avec les éléments dont tu as besoin.",
      other: "Ton message est bien arrivé. L'équipe de The Encounter le lira personnellement et te répondra dès que possible.",
      donor:
        "Ton don permet de filmer de nouvelles histoires et de les partager au plus grand nombre. Si tu nous as confié un sujet de prière, l'équipe priera pour toi.",
    },
    next: "Tu peux répondre directement à cet e-mail si tu veux ajouter quelque chose.",
    meanwhile: "En attendant",
    meanwhileText: "Des histoires de foi, de cheminement et de transformation, racontées par celles et ceux qui les ont vécues.",
    watch: "Regarder sur YouTube",
    listen: "Écouter sur Spotify",
    faq: "Lire la FAQ",
    signature: "Avec gratitude,",
    team: "L'équipe de The Encounter",
    footer: "Tu reçois cet e-mail parce que tu as écrit à The Encounter depuis le site.",
  },
  en: {
    subject: {
      question: "Your question has arrived · The Encounter",
      testimony: "Thank you for your testimony · The Encounter",
      partnership: "Your proposal has arrived · The Encounter",
      invitation: "Thank you for your invitation · The Encounter",
      press: "Your request has arrived · The Encounter",
      other: "We received your message · The Encounter",
      donor: "Thank you for your gift · The Encounter",
    },
    eyebrow: {
      question: "Question received",
      testimony: "Testimony received",
      partnership: "Proposal received",
      invitation: "Invitation received",
      press: "Press request received",
      other: "Message received",
      donor: "Gift · Thank you",
    },
    title: (n) => `Thank you, ${n}.`,
    lead: {
      question: "Your question is in good hands. The Encounter team reads it personally and will answer you as soon as possible.",
      testimony:
        "Thank you for trusting us with your story. Every testimony is read carefully, and prayerfully. If your story can be told on the podcast, we'll get back in touch with you.",
      partnership: "Thank you for thinking of The Encounter. We consider every proposal with care and will get back to you personally.",
      invitation: "Thank you for your invitation. We're looking at dates and possibilities, and will get back to you to talk it through.",
      press: "Thank you for your request. We'll get back to you quickly with what you need.",
      other: "Your message has arrived. The Encounter team will read it personally and answer you as soon as possible.",
      donor:
        "Your gift helps us film new stories and share them widely. If you shared a prayer request with us, the team will pray for you.",
    },
    next: "You can reply directly to this email if you'd like to add anything.",
    meanwhile: "In the meantime",
    meanwhileText: "Stories of faith, of journeys and of transformation, told by the people who lived them.",
    watch: "Watch on YouTube",
    listen: "Listen on Spotify",
    faq: "Read the FAQ",
    signature: "With gratitude,",
    team: "The Encounter team",
    footer: "You're receiving this email because you wrote to The Encounter through the website.",
  },
} satisfies Record<Lang, ReceiptCopy>;

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
