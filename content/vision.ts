import type { Expression, Pillar, Verse } from "./types";

/** Textes repris du document « Vision de The Encounter » fourni par la fondatrice. */
export const vision = {
  statement:
    "Voir chaque personne vivre une rencontre authentique avec Dieu, une rencontre qui transforme, qui restaure et qui repositionne chacun dans sa véritable destinée.",
  burningBush:
    "Comme Moïse au buisson ardent, nous croyons qu'une seule rencontre avec Dieu peut bouleverser une vie, changer une histoire et réveiller un appel.",
  closing: "J'ai rencontré Dieu… et ma vie n'a plus jamais été la même.",
  mission: [
    "Vivre la présence de Dieu de manière tangible et personnelle.",
    "Marcher dans une transformation réelle, fruit d'une conversion authentique.",
    "Entrer dans sa destinée, en grandissant dans la maturité spirituelle.",
  ],
  words: {
    encounter: {
      word: "pagash",
      language: "hébreu",
      pronunciation: "pa-gash",
      meaning: "Rencontrer, faire face à, venir au-devant de quelqu'un.",
    },
    transformation: {
      word: "metamorphōsis",
      language: "grec",
      pronunciation: "meta-mor-pho-sis",
      meaning: "Transformation, changement de forme, métamorphose intérieure.",
    },
  },
} as const;

export const pillars: Pillar[] = [
  {
    name: "Présence",
    line: "Tout commence dans Sa présence.",
    body: "C'est là que les cœurs sont touchés, que les chaînes tombent et que les vies sont transformées. Sans Sa présence, nos efforts restent vides.",
  },
  {
    name: "Transformation",
    line: "Une vraie rencontre produit un changement.",
    body: "Pas seulement dans les émotions, mais dans le caractère, les choix et la manière de vivre. La Parole renouvelle l'intelligence et restaure l'identité.",
  },
  {
    name: "Destinée",
    line: "Chaque vie porte un appel.",
    body: "Dieu ne rencontre jamais quelqu'un sans intention : chaque encounter ouvre une porte vers la destinée, à vivre avec équilibre, foi et assurance.",
  },
];

export const expressions: Expression[] = [
  {
    name: "Histoires de Rencontres",
    subtitle: "Le podcast",
    body: "Des témoignages de personnes dont la rencontre avec Dieu a changé la vie. La transformation est un chemin, pas un instant magique.",
  },
  {
    name: "La Rencontre",
    subtitle: "Les événements",
    body: "Des temps de louange et d'adoration pour créer un espace où la gloire de Dieu se manifeste et provoque la rencontre personnelle.",
    feature: "events",
  },
  {
    name: "Ateliers",
    subtitle: "Enseignement et accompagnement",
    body: "Comprendre son processus, accepter le travail de Dieu dans sa vie et marcher avec confiance, de gloire en gloire.",
  },
];

export const verses: Verse[] = [
  {
    text: "Nous sommes transformés en la même image, de gloire en gloire, comme par le Seigneur, l'Esprit.",
    reference: "2 Corinthiens 3:18",
  },
  {
    text: "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées.",
    reference: "2 Corinthiens 5:17",
  },
  {
    text: "Moïse ! Moïse ! Et il répondit : Me voici !",
    reference: "Exode 3:4",
  },
];
