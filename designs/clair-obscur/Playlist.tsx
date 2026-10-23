"use client";

import Image from "next/image";
import { BrandMark } from "@/components/brand/BrandMark";
import { themes } from "@/content/site";
import type { Episode } from "@/content/types";
import { formatDuration } from "@/lib/navigation";
import { formatDate, themeLabel, usePlayer } from "./Player";
import styles from "./clair-obscur.module.css";

const totalLabel = (episodes: Episode[]) => {
  const minutes = episodes.reduce((n, e) => n + e.durationMinutes, 0);
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
};

/** La playlist des épisodes : en-tête, grand bouton lecture, liste numérotée. */
export function Playlist({ episodes }: { episodes: Episode[] }) {
  const { current, play } = usePlayer();

  return (
    <section id="podcast" className={styles.playlist} aria-labelledby="playlist-title">
      <div className={styles.playlistHead}>
        <div className={styles.playlistCover} aria-hidden>
          <BrandMark size={120} color="var(--brand-jaune)" />
          <span>Histoires de Rencontres</span>
        </div>
        <div>
          <p className={styles.playlistKind}>Podcast</p>
          <h2 id="playlist-title" className={styles.playlistTitle}>
            Histoires de Rencontres
          </h2>
          <p className={styles.playlistMeta}>
            <strong>The Encounter</strong> · {episodes.length} épisodes, {totalLabel(episodes)}
          </p>
        </div>
      </div>

      <div className={styles.playlistActions}>
        <button type="button" className={styles.bigPlay} onClick={() => play(episodes[0].slug)} aria-label="Lire le dernier épisode">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden>
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </button>
        <span className={styles.playlistHint}>Lire le dernier épisode</span>
      </div>

      <ol className={styles.tracks}>
        <li className={styles.trackHead} aria-hidden>
          <span>#</span>
          <span>Titre</span>
          <span>Conversation</span>
          <span>Date</span>
          <span>Durée</span>
        </li>
        {episodes.map((episode) => {
          const active = episode.slug === current.slug;
          return (
            <li key={episode.slug}>
              <button
                type="button"
                className={styles.track}
                data-active={active || undefined}
                onClick={() => play(episode.slug)}
                aria-label={`Lire ${episode.title}, épisode ${episode.number}`}
              >
                <span className={styles.trackNum}>
                  <span>{episode.number}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                </span>
                <span className={styles.trackMain}>
                  <span className={styles.trackImg}>
                    <Image src={episode.cover.src} alt="" fill sizes="48px" style={{ objectFit: "cover" }} />
                  </span>
                  <span>
                    <strong>{episode.title}</strong>
                    <span>{episode.hook}</span>
                  </span>
                </span>
                <span className={styles.trackCol}>{themeLabel(episode)}</span>
                <span className={styles.trackCol}>{formatDate(episode.publishedAt)}</span>
                <span className={styles.trackDur}>{formatDuration(episode.durationMinutes)}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Les étagères : une carte par conversation, comme des albums. */
export function Shelf({ episodes }: { episodes: Episode[] }) {
  const { play } = usePlayer();

  return (
    <section className={styles.shelf} aria-labelledby="shelf-title">
      <div className={styles.shelfHead}>
        <h2 id="shelf-title">Par conversation</h2>
        <p>Cinq thèmes, comme des playlists.</p>
      </div>
      <ul className={styles.shelfRow}>
        {themes.map((theme) => {
          const first = episodes.find((e) => e.theme === theme.id);
          const count = episodes.filter((e) => e.theme === theme.id).length;
          if (!first) return null;
          return (
            <li key={theme.id}>
              <button type="button" className={styles.card} onClick={() => play(first.slug)} aria-label={`Lire la conversation ${theme.label}`}>
                <span className={styles.cardImg}>
                  <Image src={first.cover.src} alt="" fill sizes="(max-width: 760px) 44vw, 18vw" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
                  <span className={styles.cardPlay} aria-hidden>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M8 5.5v13l11-6.5z" />
                    </svg>
                  </span>
                </span>
                <strong>{theme.label}</strong>
                <span>
                  {count} épisode{count > 1 ? "s" : ""} · {theme.summary}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
