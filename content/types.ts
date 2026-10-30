import type { Feature } from "@/lib/features";
import type { RouteKey } from "@/lib/routes";

export type ThemeId = "foi" | "identite" | "relations" | "temoignages" | "parcours";

export interface Theme {
  id: ThemeId;
  label: string;
  summary: string;
}

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Court extrait vidéo hébergé (boucle muette, ou extrait d'épisode lu dans les stories). */
export interface Clip {
  src: string;
  poster: string;
  alt: string;
  /** Sous-titres WebVTT, indispensables pour un extrait parlé (lu sans le son par défaut). */
  captions?: string;
}

/** Une partie d'un épisode publié en plusieurs vidéos. */
export interface EpisodePart {
  youtubeId: string;
  durationMinutes: number;
  /** La même partie sur Spotify, quand elle y est publiée. */
  spotifyId?: string;
}

export interface Episode {
  slug: string;
  number: number;
  title: string;
  /** La ou les personnes dont c'est le portrait. */
  guest?: string;
  /** Une phrase qui donne envie d'écouter. */
  hook: string;
  /** Citation marquante extraite de l'épisode (Journal). */
  quote: string;
  theme: ThemeId;
  durationMinutes: number;
  publishedAt: string;
  cover: Photo;
  /** Identifiant de la vidéo YouTube (les vidéos ne sont jamais hébergées sur le site). */
  youtubeId?: string;
  /** Identifiant de l'épisode sur Spotify (open.spotify.com/episode/…), quand il y est publié. */
  spotifyId?: string;
  /** Toutes les parties, dans l'ordre, quand l'épisode est publié en plusieurs vidéos. */
  parts?: EpisodePart[];
  /** Extrait vertical de l'épisode (le même que sur TikTok / Instagram), lu dans les stories. */
  clip?: Clip;
  /** Annoncé mais pas encore diffusé : visible, pas encore écoutable. */
  upcoming?: boolean;
  /** Vrai tant que le titre, la citation et la durée n'ont pas été validés par la fondatrice. */
  sample: boolean;
}

export interface Pillar {
  name: string;
  line: string;
  body: string;
}

export interface Expression {
  name: string;
  subtitle: string;
  body: string;
  /** Module requis pour que l'expression ait sa propre page / son propre parcours. */
  feature?: Feature;
}

export interface Verse {
  text: string;
  reference: string;
}

export interface NavItem {
  /** La page visée ; son adresse et son libellé dépendent de la langue. */
  route: RouteKey;
  feature: Feature;
}
