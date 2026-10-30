"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/BrandMark";
import { MOTION_OK, getGsap } from "@/components/motion/gsap";
import type { Photo } from "@/content/types";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import type { Copy } from "./copy";
import { INTRO_SECONDS } from "./Intro";
import styles from "./site.module.css";

interface EncounterHeroProps {
  /** Chaque plan existe en large (écran) et en hauteur (téléphone). */
  photos: { wide: Photo; tall: Photo }[];
  t: Copy;
}

const SLIDE_MS = 6500;

/** Même seuil que le recadrage en hauteur de la feuille de style. */
const TALL_MEDIA = "(max-aspect-ratio: 4 / 5)";

/**
 * Un plan en direction artistique : le navigateur ne télécharge que la version
 * qui convient à l'écran (hauteur sur téléphone, large ailleurs). Le premier plan
 * est l'image principale de la page (LCP) : chargé tout de suite, en priorité.
 */
function HeroPicture({ wide, tall, first }: { wide: Photo; tall: Photo; first: boolean }) {
  const common = { fill: true, sizes: "100vw", alt: first ? wide.alt : "" } as const;
  const { props: { srcSet: tallSet } } = getImageProps({ ...common, src: tall.src });
  const { props: { alt, ...props } } = getImageProps({ ...common, src: wide.src, loading: first ? "eager" : "lazy", fetchPriority: first ? "high" : "auto" });
  return (
    <picture>
      <source media={TALL_MEDIA} srcSet={tallSet} sizes="100vw" />
      <img {...props} alt={alt} aria-hidden={!first} />
    </picture>
  );
}

/**
 * L'ouverture du Studio (le plateau en grand) dans la nuit du clair-obscur :
 * chaque plan entre par un rideau et dérive lentement ; au défilement, l'image
 * recule dans un cadre arrondi et le texte s'efface.
 */
export function EncounterHero({ photos, t }: EncounterHeroProps) {
  const { lang } = useLang();
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
    const { gsap } = getGsap();
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

    });
    return () => mm.revert();
  }, []);

  return (
    <header ref={root} className={styles.hero}>
      <div className={styles.heroStage}>
        <div className={styles.heroFrame} data-hero-frame>
          {photos.map(({ wide, tall }, i) => (
            <div key={wide.src} className={styles.heroSlide} data-state={i === active ? "active" : i === previous ? "previous" : undefined}>
              <HeroPicture wide={wide} tall={tall} first={i === 0} />
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
            <Link className={styles.chevron} href={href("vision", lang)}>
              {t.heroLink} <span aria-hidden>›</span>
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}
