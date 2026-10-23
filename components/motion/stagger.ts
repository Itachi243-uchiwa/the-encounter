import type { CSSProperties } from "react";

/** Décalage d'apparition (multiples de 80ms) lu par la règle [data-reveal] globale. */
export function stagger(step: number): CSSProperties {
  return { "--d": step } as CSSProperties;
}

/** Variable CSS d'index, pour les compositions qui dépendent du rang d'un élément. */
export function indexVar(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}
