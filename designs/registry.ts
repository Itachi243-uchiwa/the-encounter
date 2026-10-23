import type { Photo } from "@/content/types";

export interface DesignDefinition {
  id: "studio" | "clair-obscur" | "campagne";
  href: string;
  name: string;
  /** Le registre visuel, en deux mots : ce qui distingue cette direction des deux autres. */
  genre: string;
  /** L'idée en une phrase : ce qui, du sujet, devient le dispositif. */
  idea: string;
  mood: string;
  typography: string;
  references: string;
  preview: Photo;
}

/** Les trois directions présentées au client. Ajouter une direction = une entrée ici + un dossier dans /designs. */
export const designs: DesignDefinition[] = [
  {
    id: "studio",
    href: "/designs/studio",
    name: "Le Studio",
    genre: "Magazine éditorial",
    idea: "Le plateau du podcast devient un magazine culturel : une une de couverture, les citations des invités en billets, la feuille des épisodes, le lexique pagash / metamorphōsis.",
    mood: "Chaleureux, cultivé, premium. On lit, on s'attarde.",
    typography: "Amiri pour la voix, Archivo pour la lecture. Bordeaux sur ivoire.",
    references: "Magazines culturels, sites primés Awwwards (Cartier, The Beaux Arts).",
    preview: { src: "/previews/studio.jpg", alt: "Aperçu du design Le Studio : titre éditorial sur une photo du plateau", width: 1440, height: 900 },
  },
  {
    id: "clair-obscur",
    href: "/designs/clair-obscur",
    name: "Clair-obscur",
    genre: "Luxe cinématographique",
    idea: "Le buisson qui brûle dans la nuit : le plateau est plongé dans le noir, et seule une lumière qui suit le visiteur le révèle, de l'ouverture jusqu'aux dernières photos. Les épisodes s'écoutent comme une playlist.",
    mood: "Noir profond, une seule lumière chaude, très peu de mots. Mystérieux et premium.",
    typography: "Archivo gras, serré en grand. Noir profond, une lueur chaude, le jaune de la charte pour agir.",
    references: "Pages produit Apple, Spotify, studios de cinéma (A24).",
    preview: { src: "/previews/clair-obscur.jpg", alt: "Aperçu du design Clair-obscur : le plateau révélé par une lumière dans le noir", width: 1440, height: 900 },
  },
  {
    id: "campagne",
    href: "/designs/campagne",
    name: "Campagne",
    genre: "Affiche champagne",
    idea: "The Encounter comme une campagne d'affiches, mais habillée : une affiche d'ouverture, des portraits en bichromie noir et champagne, un mur d'épisodes en affiches numérotées, des stickers « ce que tu vis ».",
    mood: "Fier, festif et chic. Fait pour être partagé, sans crier.",
    typography: "Anton (l'Impact de la charte), Archivo, une touche d'Amiri italique. Bordeaux, noir et champagne doré.",
    references: "Campagnes de mode (Jacquemus, Dior), affiches de concert, Spotify Wrapped.",
    preview: { src: "/previews/campagne.jpg", alt: "Aperçu du design Campagne : tuiles champagne et bordeaux, nom en grand", width: 1440, height: 900 },
  },
];

export function designById(id: DesignDefinition["id"]): DesignDefinition {
  const design = designs.find((d) => d.id === id);
  if (!design) throw new Error(`Design inconnu : ${id}`);
  return design;
}
