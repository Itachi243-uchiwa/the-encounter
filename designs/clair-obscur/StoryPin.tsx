"use client";

import { useEffect, useRef } from "react";
import { LoopVideo } from "@/components/media/LoopVideo";
import { MOTION_OK, getGsap } from "@/components/motion/gsap";
import type { Clip } from "@/content/types";
import styles from "./clair-obscur.module.css";

interface StoryPinProps {
  clip: Clip;
  beats: { title: string; text: string }[];
}

/**
 * Récit épinglé, à la manière des pages produit : la vidéo du plateau grandit
 * au centre pendant que trois phrases se succèdent. Sans animation : les trois
 * phrases s'affichent l'une sous l'autre.
 */
export function StoryPin({ clip, beats }: StoryPinProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(el);
      const items = q("[data-beat]");
      gsap.set(items, { autoAlpha: 0, y: 40 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "+=260%", pin: q("[data-stage]")[0], scrub: 0.6 },
      });
      tl.fromTo(q("[data-frame]"), { scale: 0.62, borderRadius: "48px" }, { scale: 1, borderRadius: "28px", ease: "none", duration: 1 }, 0);
      items.forEach((item, i) => {
        const at = 0.25 + i * 0.9;
        tl.to(item, { autoAlpha: 1, y: 0, duration: 0.3 }, at);
        if (i < items.length - 1) tl.to(item, { autoAlpha: 0, y: -40, duration: 0.3 }, at + 0.6);
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={styles.story} aria-labelledby="story-title">
      <h2 id="story-title" className="visually-hidden">
        Comment le podcast est fait
      </h2>
      <div className={styles.storyStage} data-stage>
        <div className={styles.storyFrame} data-frame>
          <LoopVideo clip={clip} />
          <div className={styles.storyShade} aria-hidden />
        </div>
        <div className={styles.storyBeats}>
          {beats.map((beat) => (
            <div key={beat.title} className={styles.storyBeat} data-beat>
              <p className={styles.storyTitle}>{beat.title}</p>
              <p className={styles.storyText}>{beat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
