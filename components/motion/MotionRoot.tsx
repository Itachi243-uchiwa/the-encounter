"use client";

import Lenis from "lenis";
import { useEffect, useRef, type ReactNode } from "react";
import { behaviours } from "./behaviours";
import { MOTION_OK, getGsap } from "./gsap";

/** Faux au tout premier affichage : le navigateur garde alors sa position (rechargement, ancre). */
let navigated = false;

interface MotionRootProps {
  children: ReactNode;
  className?: string;
  /** Délai des animations « au chargement » (laisse le préchargeur finir). */
  loadDelay?: number;
}

/**
 * Racine d'animation d'un design : défilement fluide (Lenis) synchronisé avec
 * ScrollTrigger, puis application des comportements déclaratifs. Rien ne s'anime
 * si l'utilisateur a demandé moins d'animations ; le contenu reste alors intact.
 * Chaque page a la sienne : changer de page repart donc du haut.
 */
export function MotionRoot({ children, className, loadDelay = 0.2 }: MotionRootProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();

    // Nouvelle page : on part du haut, avant que Lenis ne lise la position de la page précédente.
    if (navigated && !window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    navigated = true;

    mm.add(MOTION_OK, () => {
      const lenis = new Lenis({ lerp: 0.09, anchors: true });
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      behaviours.forEach((behave) => behave(root, { loadDelay }));
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  }, [loadDelay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
