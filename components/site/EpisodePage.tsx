"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { LoopVideo } from "@/components/media/LoopVideo";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { journeys } from "@/content/journeys";
import { cookieConsent } from "@/content/contact";
import { site } from "@/content/site";
import { episodeIn, journeyIn } from "@/content/translations";
import type { Episode } from "@/content/types";
import { useConsent } from "@/lib/consent";
import { useLang } from "@/lib/i18n";
import { formatDuration, youtubeUrl } from "@/lib/navigation";
import { episodeHref, href } from "@/lib/routes";
import { copy } from "./copy";
import { EpisodeVideo } from "./EpisodeVideo";
import styles from "./site.module.css";

interface EpisodePageProps {
  episode: Episode;
  /** Tous les épisodes, pour la navigation précédent / suivant et « D'autres portraits ». */
  episodes: Episode[];
}

/**
 * La fiche d'un épisode : le portrait (titre, invité, extrait vidéo), la vidéo
 * complète, sa phrase et une parole qui lui répond, puis les autres portraits.
 */
export function EpisodePage({ episode: source, episodes: all }: EpisodePageProps) {
  const { lang } = useLang();
  const t = copy[lang];
  const e = t.ep;
  const consent = useConsent();
  const episode = episodeIn(source, lang);
  // Publié en plusieurs parties : une écoute Spotify par partie ; sinon celle de l'épisode.
  const spotify = episode.parts?.some((p) => p.spotifyId)
    ? episode.parts.flatMap((p, i) => (p.spotifyId ? [{ id: p.spotifyId, label: `${t.part} ${i + 1}` }] : []))
    : episode.spotifyId
      ? [{ id: episode.spotifyId, label: "" }]
      : [];
  const ordered = all.map((x) => episodeIn(x, lang)).sort((a, b) => a.number - b.number);
  const index = ordered.findIndex((x) => x.slug === episode.slug);
  const previous = ordered[index - 1];
  const next = ordered[index + 1];
  const others = ordered.filter((x) => x.slug !== episode.slug && !x.upcoming).slice(0, 3);
  const journey = journeys.find((j) => j.episodeSlug === episode.slug);
  const verse = journey ? journeyIn(journey, lang) : undefined;
  const date = new Intl.DateTimeFormat(t.locale, { day: "numeric", month: "long", year: "numeric" });
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: episode.title, text: episode.hook, url }).catch(() => {});
      return;
    }
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MotionRoot>
      <main id="contenu" tabIndex={-1} className={styles.inner}>
        {/* Le portrait : l'invité, le titre, la promesse ; à côté, l'extrait qui tourne en boucle. */}
        <header className={styles.epHero}>
          <div className={styles.epBackdrop} aria-hidden>
            <Image src={episode.cover.src} alt="" fill sizes="100vw" />
          </div>
          <div className={styles.epIntro}>
            <p className={styles.episodeMeta} data-reveal>
              {t.portrait} · {t.episode} {episode.number}
              {episode.upcoming ? ` · ${t.soon}` : ` · ${formatDuration(episode.durationMinutes)}`}
              {episode.parts ? ` · ${t.partsCount(episode.parts.length)}` : ""}
            </p>
            <h1 key={lang} data-split="lines" data-split-load>
              {episode.title}
            </h1>
            {episode.guest ? (
              <p className={styles.epGuest} data-reveal>
                {episode.guest}
              </p>
            ) : null}
            <p className={styles.epHook} data-reveal>
              {episode.hook}
            </p>
            <div className={styles.epActions} data-reveal>
              {episode.upcoming ? null : (
                <a className={styles.pill} href="#video" data-magnetic>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                  {e.watch}
                </a>
              )}
              {episode.youtubeId ? (
                <a className={styles.followPill} href={youtubeUrl(episode.youtubeId, site.links.youtube)} target="_blank" rel="noopener">
                  {e.youtube}
                </a>
              ) : null}
              {episode.spotifyId ? (
                <a className={styles.followPill} href={`https://open.spotify.com/episode/${episode.spotifyId}`} target="_blank" rel="noopener">
                  {e.spotify}
                </a>
              ) : null}
              <button type="button" className={styles.followPill} onClick={share}>
                {copied ? e.copied : e.share}
              </button>
            </div>
            {episode.upcoming ? null : (
              <p className={styles.epDate} data-reveal>
                {e.published} {date.format(new Date(episode.publishedAt))}
              </p>
            )}
          </div>

          <figure className={styles.epCard} data-reveal>
            {episode.clip ? (
              <LoopVideo clip={episode.clip} />
            ) : (
              <Image src={episode.cover.src} alt={episode.cover.alt} fill sizes="(max-width: 900px) 100vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
            )}
            <figcaption>{episode.clip ? e.extract : t.portrait}</figcaption>
          </figure>
        </header>

        {/* La vidéo complète, puis Spotify quand l'épisode y est publié. */}
        {episode.upcoming ? null : (
          <section id="video" className={styles.epVideo} aria-label={e.watch}>
            <div className={styles.episodePlayer}>
              <EpisodeVideo episode={episode} t={t} className={styles.dialogPlayer} sizes="(max-width: 1100px) 100vw, 1100px" />
            </div>
            {spotify.length ? (
              <div className={styles.epSpotify}>
                <p>{e.alsoSpotify}</p>
                {/* Le lecteur Spotify dépose des cookies : sans accord, un simple lien. */}
                {spotify.map((s) => (
                  <Fragment key={s.id}>
                    {s.label ? <p className={styles.epSpotifyPart}>{s.label}</p> : null}
                    {consent === "accepted" ? (
                      <iframe
                        title={`Spotify · ${episode.title}${s.label ? ` (${s.label})` : ""}`}
                        src={`https://open.spotify.com/embed/episode/${s.id}?utm_source=generator&theme=0`}
                        loading="lazy"
                        data-compact={spotify.length > 1 || undefined}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      />
                    ) : (
                      <a className={styles.followPill} href={`https://open.spotify.com/episode/${s.id}`} target="_blank" rel="noopener">
                        {cookieConsent[lang].spotify}
                        {s.label ? ` · ${s.label}` : ""}
                      </a>
                    )}
                  </Fragment>
                ))}
              </div>
            ) : null}
          </section>
        )}

        {/* Sa phrase, et la parole qui lui répond. */}
        <section className={styles.epWords} aria-label={e.inTheirWords}>
          <blockquote className={styles.epQuote} data-reveal>
            <p className={styles.epLabel}>{e.inTheirWords}</p>
            <p>{t.quote(episode.quote)}</p>
            {episode.guest ? <cite>{episode.guest}</cite> : null}
          </blockquote>
          {verse ? (
            <blockquote className={styles.epVerse} data-reveal>
              <p className={styles.epLabel}>{e.verse}</p>
              <p>{t.quote(verse.verse)}</p>
              <cite>{verse.reference}</cite>
            </blockquote>
          ) : null}
        </section>

        {/* Précédent / suivant. */}
        <nav className={styles.epPager} aria-label={t.allEpisodes}>
          {[previous, next].map((target, i) =>
            target ? (
              <Link key={target.slug} href={episodeHref(target.slug, lang)} className={styles.epPagerLink} data-dir={i === 0 ? "prev" : "next"}>
                <span className={styles.epPagerImg}>
                  <Image src={target.cover.src} alt="" fill sizes="96px" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
                </span>
                <span>
                  <span className={styles.epLabel}>{i === 0 ? e.previous : e.next}</span>
                  <strong>{target.title}</strong>
                </span>
              </Link>
            ) : (
              <span key={i} />
            ),
          )}
        </nav>

        {/* D'autres portraits. */}
        <section className={styles.epMore} aria-labelledby="more-title">
          <div className={styles.epMoreHead}>
            <h2 id="more-title">{e.more}</h2>
            <Link className={styles.chevron} href={href("podcast", lang)}>
              {t.allEpisodes} <span aria-hidden>›</span>
            </Link>
          </div>
          <ul className={styles.epMoreRow} data-stagger>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={episodeHref(o.slug, lang)} className={styles.epMoreCard}>
                  <span className={styles.epMoreImg}>
                    <Image src={o.cover.src} alt="" fill sizes="(max-width: 760px) 80vw, 30vw" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
                  </span>
                  <span className={styles.epLabel}>
                    {t.episode} {o.number}
                    {o.guest ? ` · ${o.guest}` : ""}
                  </span>
                  <strong>{o.title}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </MotionRoot>
  );
}
