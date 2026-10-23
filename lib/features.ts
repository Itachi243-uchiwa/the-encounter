/**
 * Feature flags — périmètre V1 du cahier des charges.
 *
 * Tout ce qui a été barré dans le cahier (shop, communauté/newsletter,
 * événement en billetterie, espace membre) existe ici comme module désactivé :
 * le jour où il est livré, on active le flag et on monte son module, sans
 * toucher aux designs ni au contenu existant.
 */
export const features = {
  // Socle V1 (P0)
  podcast: true,
  vision: true,
  support: true, // lien de soutien externe (Revolut) — pas de paiement intégré
  collaborate: true,
  contact: true, // mailto en V1, formulaires plus tard

  // Évolution proche conservée (P1)
  transcripts: true,
  playlists: true,
  themes: true,

  // Hors V1 (barrés dans le cahier)
  events: false,
  shop: false,
  community: false,
  newsletter: false,
  memberArea: false,
} as const;

export type Feature = keyof typeof features;

export function isEnabled(feature: Feature): boolean {
  return features[feature];
}
