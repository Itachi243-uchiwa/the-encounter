import type { NavItem, Theme } from "./types";

export const site = {
  name: "The Encounter",
  shortName: "The ENCNTR",
  tagline: "La rencontre qui transforme",
  /** Textes d'ouverture validés par la fondatrice. */
  promise: "Une rencontre avec Dieu peut tout changer.",
  pitch: "Des conversations autour de la foi, du cheminement et de la transformation.",
  podcast: "The Encounter Podcast",
  description:
    "The Encounter est une plateforme de conversations qui inspire la foi, l'identité et une vie transformée en Christ.",
  founder: "Jennifer Mondele",
  email: "contact@theencounter.be", // À CONFIRMER
  links: {
    youtube: "https://www.youtube.com/channel/UC878pf2VoT_LxXC40uN0gQQ",
    instagram: "https://www.instagram.com/thencntr/",
    tiktok: "https://www.tiktok.com/@thencntr",
    support: "https://revolut.me/jennifermondele",
  },
} as const;

/** Où écouter et regarder — seules les plateformes confirmées (Linktree). Spotify / Apple Podcasts : à confirmer. */
export const platforms = [
  { name: "YouTube", href: site.links.youtube, kind: "vidéo intégrale" },
  { name: "TikTok", href: site.links.tiktok, kind: "extraits" },
  { name: "Instagram", href: site.links.instagram, kind: "coulisses" },
] as const;

/** Lien « Pose ta question » pour les épisodes questions-réponses (mailto en V1, sans formulaire). */
export const askQuestionHref = `mailto:${site.email}?subject=${encodeURIComponent("Ma question pour The Encounter")}`;

/** Taxonomie proposée par le cahier (§3.4) — à valider. */
export const themes: Theme[] = [
  { id: "foi", label: "Foi", summary: "Croire quand rien ne bouge encore." },
  { id: "identite", label: "Identité", summary: "Savoir qui l'on est avant de savoir quoi faire." },
  { id: "relations", label: "Relations", summary: "Couple, amitié, famille : aimer en vrai." },
  { id: "temoignages", label: "Témoignages", summary: "Le jour où tout a basculé, raconté sans filtre." },
  { id: "parcours", label: "Parcours", summary: "Appel, carrière, destinée : le chemin pas à pas." },
];

export const navigation: NavItem[] = [
  { label: "Podcast", href: "/podcast", anchor: "#podcast", feature: "podcast" },
  { label: "Événements", href: "/evenements", anchor: "#evenements", feature: "events" },
  { label: "Shop", href: "/shop", anchor: "#shop", feature: "shop" },
  { label: "Notre vision", href: "/vision", anchor: "#vision", feature: "vision" },
  { label: "Collaborer", href: "/collaborer", anchor: "#collaborer", feature: "collaborate" },
];
