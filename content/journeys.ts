import type { ThemeId } from "./types";

/**
 * « Ce que tu traverses » : une situation de vie, une parole (Louis Segond 1910,
 * domaine public) et l'épisode qui en parle. Contenu à relire par la fondatrice.
 */
export interface Journey {
  id: string;
  label: string;
  theme: ThemeId;
  verse: string;
  reference: string;
  episodeSlug: string;
}

export const journeys: Journey[] = [
  {
    id: "chercher",
    label: "Je cherche Dieu",
    theme: "temoignages",
    verse: "Vous me chercherez, et vous me trouverez, si vous me cherchez de tout votre cœur.",
    reference: "Jérémie 29:13",
    episodeSlug: "comment-j-ai-rencontre-dieu-en-boite-de-nuit",
  },
  {
    id: "pardon",
    label: "Mon passé",
    theme: "foi",
    verse: "C'est pourquoi, je te le dis, ses nombreux péchés ont été pardonnés : car elle a beaucoup aimé.",
    reference: "Luc 7:47",
    episodeSlug: "il-m-a-beaucoup-pardonne",
  },
  {
    id: "blessures",
    label: "Mes blessures",
    theme: "temoignages",
    verse: "Il guérit ceux qui ont le cœur brisé, et il panse leurs blessures.",
    reference: "Psaume 147:3",
    episodeSlug: "ils-ont-brise-mon-enfance",
  },
  {
    id: "restauration",
    label: "Tout s'est effondré",
    theme: "foi",
    verse: "Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom.",
    reference: "Psaume 23:3",
    episodeSlug: "il-m-a-restaure",
  },
  {
    id: "seul",
    label: "Je me sens seul",
    theme: "relations",
    verse: "Deux valent mieux qu'un, parce qu'ils retirent un bon salaire de leur travail. Car, s'ils tombent, l'un relève son compagnon.",
    reference: "Ecclésiaste 4:9-10",
    episodeSlug: "deux-valent-mieux-qu-un",
  },
  {
    id: "couple",
    label: "Mon couple",
    theme: "relations",
    verse: "Et si quelqu'un est plus fort qu'un seul, deux peuvent lui résister ; et la corde à trois fils ne se rompt pas facilement.",
    reference: "Ecclésiaste 4:12",
    episodeSlug: "jeunes-et-maries",
  },
  {
    id: "identite",
    label: "Qui je suis",
    theme: "identite",
    verse:
      "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées ; voici, toutes choses sont devenues nouvelles.",
    reference: "2 Corinthiens 5:17",
    episodeSlug: "etre-avant-de-faire",
  },
];
