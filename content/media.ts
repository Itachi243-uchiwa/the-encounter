import type { Clip, Photo } from "./types";

const portrait = (src: string, alt: string, width = 1333, height = 2000): Photo => ({ src, alt, width, height });
const landscape = (src: string, alt: string): Photo => ({ src, alt, width: 2000, height: 1333 });

/** Registre unique des visuels du dossier client (optimisés dans /public/media). */
export const photos = {
  studioWide: portrait("/media/studio-wide.jpg", "Le plateau du podcast : canapés rouille, bibliothèque et lampes chaudes", 1505, 1881),
  studioDuo: landscape("/media/studio-duo.jpg", "Deux femmes en conversation sur le plateau The Encounter"),
  studioDuo2: landscape("/media/studio-duo-2.jpg", "Conversation sur les canapés du studio, vue large"),
  studioBts: portrait("/media/studio-bts.jpg", "Coulisses : caméras et projecteurs autour du plateau", 1500, 2000),
  studioEp7: portrait("/media/studio-ep7.jpg", "Plateau de l'épisode 7, deux invités sur le canapé", 1600, 2000),
  jenniferEp1: portrait("/media/jennifer-ep1.jpg", "L'animatrice en blazer pied-de-poule, en pleine conversation"),
  jenniferLamp: portrait("/media/jennifer-lamp.jpg", "L'animatrice assise sous la lampe du studio"),
  jenniferEp2: portrait("/media/jennifer-ep2.jpg", "L'animatrice en robe zébrée sur le canapé rouille"),
  jenniferEp2Lamp: portrait("/media/jennifer-ep2-lamp.jpg", "Plan large sous la lampe, notes à la main"),
  jenniferLaugh: portrait("/media/jennifer-laugh.jpg", "Éclat de rire sur le canapé du studio", 1600, 2000),
  jenniferEp4: portrait("/media/jennifer-ep4.jpg", "Miniature de l'épisode 4", 1365, 1865),
  jenniferEp5: portrait("/media/jennifer-ep5.jpg", "Plan serré pendant l'épisode 5"),
  guestEp2: portrait("/media/guest-ep2.jpg", "Invitée de l'épisode 2 en conversation"),
  guestEp3: portrait("/media/guest-ep3.jpg", "Invitée de l'épisode 3 en gilet gris", 1596, 1995),
  guestEp3b: portrait("/media/guest-ep3-b.jpg", "Invitée de l'épisode 3 sur le fauteuil blanc", 1600, 2000),
  guestEp4: portrait("/media/guest-ep4.jpg", "Invitée de l'épisode 4 sur le canapé"),
  guestEp5: portrait("/media/guest-ep5.jpg", "Invitée de l'épisode 5 en chemisier fleuri"),
  guestEp6: portrait("/media/guest-ep6.jpg", "Portrait de l'invitée de l'épisode 6 devant le rideau"),
  guestEp6b: portrait("/media/guest-ep6-b.jpg", "Invitée de l'épisode 6 en veste de cuir"),
  guestEp7: portrait("/media/guest-ep7.jpg", "Invité de l'épisode 7 en pull rayé", 1600, 2000),
  mug: portrait("/media/mug.jpg", "La tasse The ENCNTR posée sur la table du plateau"),
  cards: { src: "/media/cards.jpg", alt: "Les cartes de questions The ENCNTR sur la table", width: 1707, height: 1707 },
  notes: portrait("/media/notes.jpg", "Notes manuscrites et tasse avant l'enregistrement"),
  titleCard: { src: "/media/title-card.jpg", alt: "Écran titre « The Encounter — La rencontre qui transforme »", width: 900, height: 1600 },
  eventStage: landscape("/media/event-stage.jpg", "La Rencontre du 27 septembre 2025 : louange sur scène"),
  eventPreach: portrait("/media/event-preach.jpg", "Prédication au pupitre pendant La Rencontre"),
  eventCrowd: landscape("/media/event-crowd.jpg", "L'assemblée applaudit pendant La Rencontre"),
  eventWorship: landscape("/media/event-worship.jpg", "Temps de louange pendant La Rencontre"),
  eventWelcome: portrait("/media/event-welcome.jpg", "Accueil des participants à La Rencontre"),
  founderBlack: portrait("/media/founder-black.jpg", "La fondatrice en tailleur noir"),
  founderWhite: portrait("/media/founder-white.jpg", "La fondatrice en blanc près de la fenêtre"),
  founderPortrait: portrait("/media/founder-portrait.jpg", "Portrait de la fondatrice de The Encounter"),
} satisfies Record<string, Photo>;


/** Les deux seuls extraits hébergés (boucles muettes de quelques secondes) ; les épisodes restent sur YouTube. */
export const clips = {
  studio: { src: "/media/clip-studio.mp4", poster: "/media/clip-studio-poster.jpg", alt: "Le plateau pendant un enregistrement" },
  louange: { src: "/media/clip-louange.mp4", poster: "/media/clip-louange-poster.jpg", alt: "Louange, yeux fermés, pendant La Rencontre" },
} satisfies Record<string, Clip>;
