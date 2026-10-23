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
    id: "inquietude",
    label: "L'inquiétude",
    theme: "foi",
    verse:
      "Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.",
    reference: "Philippiens 4:6-7",
    episodeSlug: "de-l-anxiete-a-la-paix",
  },
  {
    id: "identite",
    label: "Qui je suis",
    theme: "identite",
    verse:
      "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées ; voici, toutes choses sont devenues nouvelles.",
    reference: "2 Corinthiens 5:17",
    episodeSlug: "qui-suis-je-vraiment",
  },
  {
    id: "couple",
    label: "Mon couple",
    theme: "relations",
    verse: "Et si quelqu'un est plus fort qu'un seul, deux peuvent lui résister ; et la corde à trois fils ne se rompt pas facilement.",
    reference: "Ecclésiaste 4:12",
    episodeSlug: "young-and-married",
  },
  {
    id: "pardon",
    label: "Pardonner",
    theme: "relations",
    verse:
      "Supportez-vous les uns les autres, et, si l'un a sujet de se plaindre de l'autre, pardonnez-vous réciproquement. De même que Christ vous a pardonné, pardonnez-vous aussi.",
    reference: "Colossiens 3:13",
    episodeSlug: "pardonner-sans-oublier",
  },
  {
    id: "appel",
    label: "Mon appel",
    theme: "parcours",
    verse:
      "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
    reference: "Jérémie 29:11",
    episodeSlug: "mon-appel-ma-destinee",
  },
  {
    id: "chercher",
    label: "Je cherche Dieu",
    theme: "temoignages",
    verse: "Vous me chercherez, et vous me trouverez, si vous me cherchez de tout votre cœur.",
    reference: "Jérémie 29:13",
    episodeSlug: "le-jour-ou-tout-a-bascule",
  },
];
