"use client";

import { useEffect, useRef } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { MOTION_OK, getGsap } from "@/components/motion/gsap";
import type { Clip } from "@/content/types";
import styles from "./clair-obscur.module.css";

interface SpotlightHeroProps {
  clip: Clip;
  name: string;
  nav: { label: string; anchor: string }[];
}

/**
 * Le buisson dans la nuit : le plateau filmé en 4K est plongé dans le noir,
 * seule une lumière chaude le révèle là où se trouve le visiteur. En défilant,
 * la lumière s'élargit jusqu'à tout éclairer. Sans animation : image pleinement éclairée.
 */
export function SpotlightHero({ clip, name, nav }: SpotlightHeroProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const light = { x: 62, y: 62, r: 22 };
      const apply = () => {
        el.style.setProperty("--x", `${light.x}%`);
        el.style.setProperty("--y", `${light.y}%`);
        el.style.setProperty("--r", `${light.r}vmax`);
      };
      apply();
      const toX = gsap.quickTo(light, "x", { duration: 1.6, ease: "power3.out", onUpdate: apply });
      const toY = gsap.quickTo(light, "y", { duration: 1.6, ease: "power3.out", onUpdate: apply });

      // La lumière fait d'abord un tour seule (elle cherche dans la pièce), puis le visiteur la prend en main.
      const tour = gsap.timeline({ repeat: -1, delay: 0.6, onUpdate: apply });
      tour
        .to(light, { x: 30, y: 58, duration: 3.2, ease: "sine.inOut" })
        .to(light, { x: 52, y: 70, duration: 3.4, ease: "sine.inOut" })
        .to(light, { x: 76, y: 56, duration: 3.2, ease: "sine.inOut" })
        .to(light, { x: 62, y: 62, duration: 2.8, ease: "sine.inOut" });

      const touch = window.matchMedia("(pointer: coarse)").matches;
      const move = (e: PointerEvent) => {
        if (tour.isActive() || tour.progress() > 0) tour.kill();
        const r = el.getBoundingClientRect();
        toX(((e.clientX - r.left) / r.width) * 100);
        toY(((e.clientY - r.top) / r.height) * 100);
      };
      if (!touch) el.addEventListener("pointermove", move);

      gsap.from(light, { r: 0, duration: 2.2, ease: "expo.out", delay: 0.2, onUpdate: apply });
      gsap.to(light, {
        r: 140,
        ease: "none",
        onUpdate: apply,
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        el.removeEventListener("pointermove", move);
        tour.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <header ref={root} className={styles.hero}>
      <video className={styles.heroVideo} src={clip.src} poster={clip.poster} aria-label={clip.alt} muted loop autoPlay playsInline preload="auto" />
      <div className={styles.heroDark} aria-hidden />

      <nav className={styles.nav} aria-label="Navigation principale">
        <a href="#top" className={styles.wordmark}>
          <BrandMark size={28} color="currentColor" />
          <span>{name}</span>
        </a>
        <ul>
          {nav.map((item) => (
            <li key={item.anchor}>
              <a href={item.anchor}>{item.label}</a>
            </li>
          ))}
        </ul>
        <a className={styles.navPill} href="#podcast">
          Écouter
        </a>
      </nav>

      <div className={styles.heroCopy} id="top">
        <p className={styles.heroKicker} data-split="lines" data-split-load>
          The Encounter Podcast
        </p>
        <h1 data-split="lines" data-split-load>
          La rencontre <br />
          qui transforme.
        </h1>
        <p className={styles.heroSub} data-split="lines" data-split-load>
          Des vies racontent, face caméra, leur rencontre avec Dieu.
        </p>
        <div className={styles.heroLinks}>
          <a className={styles.pill} href="#podcast">
            Écouter
          </a>
          <a className={styles.chevron} href="#vision">
            Découvrir la vision <span aria-hidden>›</span>
          </a>
        </div>
      </div>
      <p className={styles.heroHint} aria-hidden>
        Bouge la lumière
      </p>
    </header>
  );
}
