"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/** Point d'entrée unique de GSAP : les plugins ne sont enregistrés qu'une fois, côté navigateur. */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 900px) and (pointer: fine)";
