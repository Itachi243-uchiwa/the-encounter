"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Episode } from "@/content/types";
import type { Copy } from "./copy";
import { usePlayer } from "./Player";
import styles from "./site.module.css";

/** Durée d'une story sans extrait vidéo (photo). Avec un extrait, la story dure le temps de l'extrait. */
const PHOTO_MS = 7000;

/**
 * « Ils ont rencontré Dieu » : les témoignages en stories, le format que le public
 * connaît déjà (Instagram, TikTok). Chaque story lit l'extrait de l'épisode (sans le son
 * par défaut, sous-titré) ou, tant qu'il n'est pas fourni, sa photo ; la phrase de l'invité
 * et l'épisode sont à un geste. Défilement automatique quand la section est visible, en
 * pause au survol ; gauche/droite de la carte pour revenir ou avancer.
 */
export function Stories({ episodes, t }: { episodes: Episode[]; t: Copy }) {
  const { play } = usePlayer();
  const stories = [...episodes].filter((e) => !e.upcoming).sort((a, b) => a.number - b.number);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const story = stories[index];
  const running = visible && !hovered;

  const go = (next: number) => {
    setProgress(0);
    setIndex((next + stories.length) % stories.length);
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // L'extrait suit l'état de la section : il joue quand elle est visible et pas survolée.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (running && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
    else v.pause();
  }, [running, index]);

  // Le navigateur peut mettre l'extrait en pause quand on active le son : on le relance aussitôt.
  const toggleSound = () => {
    const v = video.current;
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (v) {
      v.muted = nextMuted;
      if (running) v.play().catch(() => {});
    }
  };

  const next = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    go(index + 1);
  };

  return (
    <section ref={root} className={styles.stories} aria-labelledby="stories-title" data-playing={running || undefined}>
      <div className={styles.storiesBackdrop} aria-hidden>
        <Image key={story.slug} src={story.cover.src} alt="" fill sizes="50vw" />
      </div>

      <div className={styles.storiesIntro}>
        <h2 id="stories-title" data-split="lines" key={t.locale}>
          {t.storiesTitle}
        </h2>
        <p data-reveal>{t.storiesIntro}</p>

        <ul className={styles.storyBubbles} aria-label={t.storiesTitle} data-stagger>
          {stories.map((s, i) => (
            <li key={s.slug}>
              <button type="button" onClick={() => go(i)} aria-current={i === index || undefined} aria-label={s.title}>
                <span className={styles.bubbleRing}>
                  <span className={styles.bubbleImg}>
                    <Image src={s.cover.src} alt="" fill sizes="72px" style={{ objectFit: "cover", objectPosition: "50% 22%" }} />
                  </span>
                </span>
                <span className={styles.bubbleLabel}>
                  {t.episode} {s.number}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.storyCard} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <div className={styles.storyBars} aria-hidden>
          {stories.map((s, i) => (
            <span key={s.slug} data-state={i < index ? "done" : i === index ? "active" : undefined}>
              {i !== index ? (
                <span />
              ) : story.clip ? (
                // Avec un extrait : la barre suit la lecture de la vidéo.
                <span style={{ width: `${progress * 100}%` }} />
              ) : (
                <span key={`${s.slug}-${index}`} className={styles.barTimed} onAnimationEnd={next} style={{ animationDuration: `${PHOTO_MS}ms` }} />
              )}
            </span>
          ))}
        </div>

        <div key={story.slug} className={styles.storyMedia}>
          {story.clip ? (
            <video
              ref={video}
              className={styles.storyVideo}
              src={story.clip.src}
              poster={story.clip.poster}
              aria-label={story.clip.alt}
              muted={muted}
              playsInline
              preload="metadata"
              onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
              onEnded={next}
            >
              {story.clip.captions ? <track kind="captions" src={story.clip.captions} srcLang={t.locale.slice(0, 2)} label={t.langLabel} default /> : null}
            </video>
          ) : (
            <Image src={story.cover.src} alt={story.cover.alt} fill sizes="(max-width: 760px) 100vw, 440px" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
          )}
        </div>
        <div className={styles.storyShadeBottom} aria-hidden />

        <div className={styles.storyHeader}>
          <span className={styles.storyAvatar}>
            <Image src={story.cover.src} alt="" fill sizes="36px" style={{ objectFit: "cover", objectPosition: "50% 22%" }} />
          </span>
          <span>
            <strong>{story.guest ?? t.portrait}</strong> · {t.episode} {story.number}
          </span>
          {story.clip ? (
            <button type="button" className={styles.storySound} onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? t.soundOn : t.soundOff}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                {muted ? (
                  <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          ) : null}
        </div>

        {/* Zones de toucher, comme dans une story : gauche pour revenir, droite pour avancer. */}
        <button type="button" className={styles.storyPrev} onClick={() => go(index - 1)} aria-label={t.previousStory} />
        <button type="button" className={styles.storyNext} onClick={() => go(index + 1)} aria-label={t.nextStory} />

        <div key={`${story.slug}-text`} className={styles.storyCopy} aria-live="polite">
          <blockquote>
            <p>{t.quote(story.quote)}</p>
          </blockquote>
          <p className={styles.storyTitleLine}>{story.title}</p>
          <button type="button" className={styles.pill} onClick={() => play(story.slug)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
            {t.listenStory}
          </button>
        </div>
      </div>
    </section>
  );
}
