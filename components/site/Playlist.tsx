"use client";

import Image from "next/image";
import { BrandMark } from "@/components/brand/BrandMark";
import { photos } from "@/content/media";
import { site } from "@/content/site";
import type { Episode } from "@/content/types";
import { formatDuration } from "@/lib/navigation";
import type { Copy } from "./copy";
import { usePlayer } from "./Player";
import styles from "./site.module.css";

const PlayIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

/** Les barres de l'égaliseur, sur l'épisode en cours. */
const Equalizer = () => (
  <span className={styles.eq} aria-hidden>
    <span />
    <span />
    <span />
  </span>
);

/** The Encounter Podcast : en-tête, grand bouton lecture, un portrait par ligne. */
export function Playlist({ episodes, t }: { episodes: Episode[]; t: Copy }) {
  const { current, play } = usePlayer();
  const date = new Intl.DateTimeFormat(t.locale, { day: "numeric", month: "short", year: "numeric" });
  const latest = episodes.find((e) => !e.upcoming);
  const mosaic = episodes.filter((e) => !e.upcoming).slice(0, 4);

  return (
    <section id="podcast" className={styles.playlist} aria-labelledby="playlist-title">
      {/* La couleur de l'en-tête vient du portrait en cours, comme sur une app de streaming. */}
      <div className={styles.playlistBackdrop} aria-hidden>
        {episodes.map((episode) => (
          <Image
            key={episode.slug}
            src={episode.cover.src}
            alt=""
            fill
            sizes="40vw"
            loading="lazy"
            data-active={episode.slug === current.slug || undefined}
          />
        ))}
      </div>

      <div className={styles.playlistHead}>
        <div className={styles.playlistCover} aria-hidden data-reveal>
          {mosaic.map((episode) => (
            <span key={episode.slug} className={styles.mosaicTile}>
              <Image src={episode.cover.src} alt="" fill sizes="120px" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
            </span>
          ))}
          <span className={styles.coverBadge}>
            <BrandMark size={44} color="var(--brand-jaune)" className={styles.coverMark} />
          </span>
        </div>
        <div>
          <p className={styles.playlistKind}>{t.podcastKind}</p>
          <h2 id="playlist-title" className={styles.playlistTitle} data-split="lines" key={t.locale}>
            {t.podcastTitle}
          </h2>
          <p className={styles.playlistQuote} data-reveal>
            {t.quote(t.podcastQuote)}
          </p>
          <p className={styles.playlistMeta}>
            <span className={styles.avatar}>
              <Image src={photos.founderBlack.src} alt="" fill sizes="28px" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
            </span>
            <strong>{site.founder}</strong> · The Encounter · {t.portraits}
          </p>
        </div>
      </div>

      <div className={styles.playlistActions}>
        {latest ? (
          <button type="button" className={styles.bigPlay} onClick={() => play(latest.slug)} aria-label={t.playLatest} data-magnetic>
            <PlayIcon size={28} />
          </button>
        ) : null}
        <span className={styles.playlistHint}>{t.playLatest}</span>
        <a className={styles.followPill} href={site.links.youtube} target="_blank" rel="noopener">
          {t.follow}
        </a>
      </div>

      <ol className={styles.tracks} data-stagger>
        <li className={styles.trackHead} aria-hidden>
          <span>#</span>
          <span>{t.colTitle}</span>
          <span>{t.colFormat}</span>
          <span>{t.colDate}</span>
          <span>{t.colDuration}</span>
        </li>
        {episodes.map((episode) => {
          const active = episode.slug === current.slug;
          const content = (
            <>
              <span className={styles.trackNum}>
                {active ? <Equalizer /> : <span>{episode.number}</span>}
                <PlayIcon />
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
              <span className={styles.trackCol}>{t.portrait}</span>
              <span className={styles.trackCol}>{episode.upcoming ? "" : date.format(new Date(episode.publishedAt))}</span>
              <span className={styles.trackDur}>{episode.upcoming ? t.soon : formatDuration(episode.durationMinutes)}</span>
            </>
          );
          return (
            <li key={episode.slug}>
              {episode.upcoming ? (
                <div className={styles.track} data-upcoming>
                  {content}
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.track}
                  data-active={active || undefined}
                  onClick={() => play(episode.slug)}
                  aria-label={`${t.listen} : ${episode.title}, ${t.episode.toLowerCase()} ${episode.number}`}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
