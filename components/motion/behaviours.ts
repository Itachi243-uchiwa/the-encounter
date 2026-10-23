"use client";

import { getGsap } from "./gsap";

/**
 * Comportements déclaratifs : un design marque ses éléments avec des attributs
 * data-*, ce module les anime. Ajouter un effet = ajouter une fonction ici,
 * sans toucher aux designs (ouvert à l'extension, fermé à la modification).
 *
 *   data-split="lines|chars"  texte qui monte ligne par ligne (ou lettre par lettre) derrière un masque
 *   data-split-load           …au chargement plutôt qu'à l'entrée dans l'écran
 *   data-reveal               bloc qui monte en fondu (décalage via la variable CSS --d)
 *   data-clip                 image dévoilée par un rideau, avec un léger dézoom
 *   data-parallax="12"        déplacement vertical en pourcentage, lié au défilement
 *   data-scrub-words          les mots s'allument un à un au fil du défilement
 *   data-stagger              les enfants apparaissent en cascade
 */
type Behaviour = (root: HTMLElement, ctx: { loadDelay: number }) => void;

const START = "top 86%";

const split: Behaviour = (root, { loadDelay }) => {
  const { gsap, SplitText } = getGsap();
  root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    const type = el.dataset.split === "chars" ? "chars" : "lines";
    const onLoad = el.hasAttribute("data-split-load");
    SplitText.create(el, {
      type: type === "chars" ? "lines,chars" : "lines",
      mask: "lines",
      linesClass: "splitline",
      autoSplit: true,
      onSplit(self) {
        const targets = type === "chars" ? self.chars : self.lines;
        return gsap.from(targets, {
          yPercent: 115,
          // Au chargement, le titre doit être posé en moins d'une seconde.
          duration: onLoad ? 0.8 : type === "chars" ? 1 : 1.1,
          ease: "expo.out",
          stagger: type === "chars" ? 0.035 : 0.09,
          delay: onLoad ? loadDelay : 0,
          scrollTrigger: onLoad ? undefined : { trigger: el, start: START, once: true },
        });
      },
    });
  });
};

const reveal: Behaviour = (root) => {
  const { gsap } = getGsap();
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    const step = Number(getComputedStyle(el).getPropertyValue("--d")) || 0;
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      delay: step * 0.08,
      scrollTrigger: { trigger: el, start: START, once: true },
    });
  });
};

const clip: Behaviour = (root) => {
  const { gsap } = getGsap();
  root.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
    const media = el.querySelector("img, video");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
    if (media) tl.from(media, { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0.2);
  });
};

const parallax: Behaviour = (root) => {
  const { gsap } = getGsap();
  root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const amount = Number(el.dataset.parallax) || 10;
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
};

const scrubWords: Behaviour = (root) => {
  const { gsap, SplitText } = getGsap();
  root.querySelectorAll<HTMLElement>("[data-scrub-words]").forEach((el) => {
    const { words } = SplitText.create(el, { type: "words" });
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: true },
      },
    );
  });
};

const staggerChildren: Behaviour = (root) => {
  const { gsap } = getGsap();
  root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
    gsap.from(el.children, {
      opacity: 0,
      y: 48,
      scale: 0.94,
      duration: 0.9,
      ease: "expo.out",
      stagger: { each: 0.035, from: "start" },
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
    });
  });
};

export const behaviours: Behaviour[] = [split, reveal, clip, parallax, scrubWords, staggerChildren];
