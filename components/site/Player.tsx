"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { site } from "@/content/site";
import type { Episode } from "@/content/types";
import { useLang } from "@/lib/i18n";
import { formatDuration, youtubeUrl } from "@/lib/navigation";
import { episodeHref } from "@/lib/routes";
import { copy } from "./copy";
import { EpisodeVideo } from "./EpisodeVideo";
import styles from "./site.module.css";

interface PlayerState {
  current: Episode;
  select: (slug: string) => void;
  /** Sélectionne l'épisode et ouvre le lecteur. */
  play: (slug?: string) => void;
}

const PlayerContext = createContext<PlayerState | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer doit être utilisé dans <PlayerProvider>");
  return ctx;
}


/**
 * L'écoute, comme sur une application de streaming : un épisode « en cours »
 * partagé par toute la page, une barre de lecture en bas d'écran, et une
 * fenêtre de lecture YouTube.
 */
export function PlayerProvider({ episodes, children }: { episodes: Episode[]; children: ReactNode }) {
  const released = episodes.filter((e) => !e.upcoming);
  // On retient le slug, pas l'objet : l'épisode suit la langue choisie.
  const [slug, setSlug] = useState(released[0].slug);
  const current = released.find((e) => e.slug === slug) ?? released[0];
  const { lang } = useLang();
  const t = copy[lang];
  // Change à chaque fermeture : le lecteur est remonté, donc la vidéo s'arrête avec la fenêtre.
  const [session, setSession] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  // Pas de useCallback : le compilateur React mémoïse ces fonctions lui-même.
  const select = (target: string) => {
    const next = episodes.find((e) => e.slug === target);
    if (next && !next.upcoming) setSlug(next.slug);
  };

  const play = (target?: string) => {
    if (target) select(target);
    const d = dialog.current;
    if (!d) return;
    // La fenêtre naît du bouton qui l'a ouverte (et y retourne en se fermant).
    const trigger = document.activeElement !== document.body ? document.activeElement?.getBoundingClientRect() : undefined;
    d.showModal();
    d.style.transformOrigin = "";
    if (trigger && trigger.bottom > 0 && trigger.top < window.innerHeight) {
      const r = d.getBoundingClientRect();
      d.style.transformOrigin = `${trigger.left + trigger.width / 2 - r.left}px ${trigger.top + trigger.height / 2 - r.top}px`;
    }
  };

  return (
    <PlayerContext.Provider value={{ current, select, play }}>
      {children}
      <NowPlayingBar />
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="dialog-title"
        onClose={() => setSession((n) => n + 1)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button type="button" className={styles.dialogClose} onClick={() => dialog.current?.close()} aria-label={t.close}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <EpisodeVideo
          key={`${current.slug}-${session}`}
          episode={current}
          t={t}
          className={styles.dialogPlayer}
          sizes="(max-width: 760px) 100vw, 880px"
        />
        <div className={styles.dialogBody}>
          <p className={styles.dialogMeta}>
            {t.portrait} · {t.episode} {current.number} · {formatDuration(current.durationMinutes)}
          </p>
          <h2 id="dialog-title">{current.title}</h2>
          <p>{current.hook}</p>
          <blockquote>{t.quote(current.quote)}</blockquote>
          <div className={styles.dialogLinks}>
            <a className={styles.pill} href={youtubeUrl(current.youtubeId, site.links.youtube)} target="_blank" rel="noopener">
              {t.openYoutube}
            </a>
            <Link className={styles.chevron} href={episodeHref(current.slug, lang)} onClick={() => dialog.current?.close()}>
              {t.episodePage} <span aria-hidden>›</span>
            </Link>
          </div>
        </div>
      </dialog>
    </PlayerContext.Provider>
  );
}

/** La barre « en cours de lecture » : elle apparaît une fois l'ouverture passée. */
function NowPlayingBar() {
  const { current, play } = usePlayer();
  const t = copy[useLang().lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.nowPlaying} data-visible={visible || undefined} aria-hidden={!visible}>
      <div className={styles.npTrack}>
        <span className={styles.npCover}>
          <Image src={current.cover.src} alt="" fill sizes="56px" style={{ objectFit: "cover" }} />
        </span>
        <span className={styles.npText}>
          <strong>{current.title}</strong>
          <span>
            The Encounter · {t.episode} {current.number}
          </span>
        </span>
      </div>
      <div className={styles.npControls}>
        <button type="button" className={styles.npPlay} onClick={() => play()} aria-label={`${t.play} : ${current.title}`} tabIndex={visible ? 0 : -1}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </button>
        <span className={styles.npProgress} aria-hidden>
          <span>0:00</span>
          <span className={styles.npBar} />
          <span>{formatDuration(current.durationMinutes)}</span>
        </span>
      </div>
      <a className={styles.npBrand} href={youtubeUrl(current.youtubeId, site.links.youtube)} target="_blank" rel="noopener" tabIndex={visible ? 0 : -1}>
        <BrandMark size={22} color="currentColor" /> {t.onYoutube}
      </a>
    </div>
  );
}
