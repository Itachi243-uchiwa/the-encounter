"use client";

import { useSyncExternalStore } from "react";

/**
 * Consentement aux contenus tiers (YouTube, Spotify), gardé dans un cookie de 6 mois.
 * "unknown" côté serveur et pendant l'hydratation : le bandeau n'apparaît qu'une fois
 * le cookie lu, sans clignoter pour qui a déjà choisi.
 */
export type Consent = "accepted" | "refused" | null | "unknown";

export const CONSENT_COOKIE = "encounter-consent";
const listeners = new Set<() => void>();

function read(): Consent {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(accepted|refused)`));
  return (match?.[1] as "accepted" | "refused" | undefined) ?? null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Enregistre le choix ; null l'efface et rouvre le bandeau (« Gérer les cookies »). */
export function setConsent(value: "accepted" | "refused" | null) {
  document.cookie =
    value === null
      ? `${CONSENT_COOKIE}=; path=/; max-age=0; samesite=lax`
      : `${CONSENT_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 182}; samesite=lax`;
  listeners.forEach((l) => l());
}

export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, read, () => "unknown");
}
