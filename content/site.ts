import type { NavItem, Theme } from "./types";

export const site = {
  name: "The Encounter",
  shortName: "The Encounter",
  tagline: "La rencontre qui transforme",
  /** Textes d'ouverture validés par la fondatrice. */
  promise: "Une rencontre avec Dieu peut tout changer.",
  pitch: "Des conversations autour de la foi, du cheminement et de la transformation.",
  podcast: "The Encounter Podcast",
  description:
    "The Encounter est une plateforme de conversations qui inspire la foi, l'identité et une vie transformée en Christ.",
  founder: "Jennifer Mondele",
  email: "contact@thencounter.be", // Confirmée par la cliente le 30/10
  links: {
    youtube: "https://www.youtube.com/channel/UC878pf2VoT_LxXC40uN0gQQ",
    spotify: "https://open.spotify.com/show/3H0Bbb7jQGq6vCHHXkpXUR",
    instagram: "https://www.instagram.com/thencntr/",
    tiktok: "https://www.tiktok.com/@thencntr",
    support: "https://revolut.me/jennifermondele",
  },
} as const;

/** Où écouter et regarder : les plateformes confirmées. Apple Podcasts : à confirmer. */
export const platforms = [
  { name: "YouTube", href: site.links.youtube, kind: "vidéo intégrale" },
  { name: "Spotify", href: site.links.spotify, kind: "vidéo et audio" },
  { name: "TikTok", href: site.links.tiktok, kind: "extraits" },
  { name: "Instagram", href: site.links.instagram, kind: "coulisses" },
] as const;


/** Taxonomie proposée par le cahier (§3.4) — à valider. */
export const themes: Theme[] = [
  { id: "foi", label: "Foi", summary: "Croire quand rien ne bouge encore." },
  { id: "identite", label: "Identité", summary: "Savoir qui l'on est avant de savoir quoi faire." },
  { id: "relations", label: "Relations", summary: "Couple, amitié, famille : aimer en vrai." },
  { id: "temoignages", label: "Témoignages", summary: "Le jour où tout a basculé, raconté sans filtre." },
  { id: "parcours", label: "Parcours", summary: "Appel, carrière, destinée : le chemin pas à pas." },
];

export const navigation: NavItem[] = [
  { route: "podcast", feature: "podcast" },
  { route: "events", feature: "events" },
  { route: "shop", feature: "shop" },
  { route: "vision", feature: "vision" },
  { route: "support", feature: "support" },
  { route: "collaborate", feature: "collaborate" },
];
