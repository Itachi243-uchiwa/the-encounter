import type { Feature } from "@/lib/features";

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

/** Court extrait vidéo hébergé (boucle muette). */
export interface Clip {
  src: string;
  poster: string;
  alt: string;
}

export interface Episode {
  slug: string;
  number: number;
  title: string;
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
  label: string;
  /** Route définitive du site. */
  href: string;
  /** Ancre sur la page d'accueil, utilisée par les maquettes. */
  anchor: string;
  feature: Feature;
}
