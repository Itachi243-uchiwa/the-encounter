"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/BrandMark";
import { MOTION_OK, getGsap } from "@/components/motion/gsap";
import type { Photo } from "@/content/types";
import { langs, useLang } from "@/lib/i18n";
import type { Copy } from "./copy";
import { INTRO_SECONDS } from "./Intro";
import styles from "./clair-obscur.module.css";

interface EncounterHeroProps {
  /** Chaque plan existe en large (écran) et en hauteur (téléphone). */
  photos: { wide: Photo; tall: Photo }[];
  t: Copy;
  nav: { label: string; anchor: string }[];
}

const SLIDE_MS = 6500;

/**
 * L'ouverture du Studio (le plateau en grand) dans la nuit du clair-obscur :
 * chaque plan entre par un rideau et dérive lentement ; au défilement, l'image
 * recule dans un cadre arrondi et le texte s'efface.
 */
export function EncounterHero({ photos, t, nav }: EncounterHeroProps) {
  const { lang, setLang } = useLang();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const start = () => {
      timer = window.setInterval(() => {
        setActive((i) => {
          setPrevious(i);
          return (i + 1) % photos.length;
        });
      }, SLIDE_MS);
    };
    const onVisibility = () => {
      window.clearInterval(timer);
      if (!document.hidden) start();
    };
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [photos.length]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      // Le logo se dévoile de gauche à droite, puis le texte et les boutons montent.
      gsap.fromTo(q("[data-hero-logo]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "expo.inOut", delay: INTRO_SECONDS - 0.5 });
      gsap.from(q("[data-hero-late]"), { y: 24, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: INTRO_SECONDS + 0.15 });

      // Au défilement : le plateau recule dans un cadre, le texte s'en va.
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 } })
        .to(q("[data-hero-frame]"), { scale: 0.86, borderRadius: 28, ease: "none" }, 0)
        .to(q("[data-hero-copy]"), { yPercent: -20, opacity: 0, ease: "none" }, 0);

      // La barre se cache en descendant et revient dès qu'on remonte.
      const bar = q("[data-nav]")[0];
      const navState = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => bar.toggleAttribute("data-hidden", self.direction === 1 && self.scroll() > window.innerHeight),
      });
      return () => navState.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <header ref={root} className={styles.hero}>
      <div className={styles.heroStage}>
        <div className={styles.heroFrame} data-hero-frame>
          {photos.map(({ wide, tall }, i) => (
            <div key={wide.src} className={styles.heroSlide} data-state={i === active ? "active" : i === previous ? "previous" : undefined}>
              {/* Un seul des deux est affiché ; l'autre, masqué, n'est jamais téléchargé (chargement différé). */}
              <Image className={styles.heroWide} src={wide.src} alt={i === 0 ? wide.alt : ""} aria-hidden={i !== 0} fill loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} sizes="100vw" />
              <Image className={styles.heroTall} src={tall.src} alt="" aria-hidden fill loading="lazy" sizes="100vw" />
            </div>
          ))}
          <div className={styles.heroScrim} aria-hidden />
        </div>

        <div className={styles.heroCopy} id="top" data-hero-copy>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLogo} data-hero-logo>
              <Wordmark size={200} color="currentColor" className={styles.heroWordmark} />
            </span>
            {/* key : le texte découpé par l'animation est recréé, pas modifié, quand la langue change. */}
            <span key={lang} className={styles.heroTagline} data-split="lines" data-split-load>
              {t.tagline}
            </span>
          </h1>
          <p className={styles.heroPromise} data-hero-late>
            {t.promise}
          </p>
          <p className={styles.heroSub} data-hero-late>
            {t.pitch}
          </p>
          <div className={styles.heroLinks} data-hero-late>
            <a className={styles.pill} href="#podcast" data-magnetic>
              {t.heroAction}
            </a>
            <a className={styles.chevron} href="#vision">
              {t.heroLink} <span aria-hidden>›</span>
            </a>
          </div>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Navigation principale" data-nav>
        <a href="#top" className={styles.wordmark} aria-label={t.backToTop}>
          <Wordmark size={22} color="currentColor" label="" />
        </a>
        <ul>
          {nav.map((item) => (
            <li key={item.anchor}>
              <a href={item.anchor}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className={styles.langSwitch} role="group" aria-label={t.langLabel}>
          {langs.map((l) => (
            <button key={l} type="button" aria-pressed={l === lang} lang={l} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <a className={styles.navPill} href="#podcast">
          {t.navAction}
        </a>
      </nav>
    </header>
  );
}
