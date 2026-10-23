"use client";

import { useState } from "react";
import type { Journey } from "@/content/journeys";
import { site } from "@/content/site";
import type { Episode } from "@/content/types";
import { formatDuration } from "@/lib/navigation";
import { Duotone } from "./Duotone";
import styles from "./campagne.module.css";

/** « Ce que tu vis » : des stickers à choisir ; la page répond par une parole et un épisode. */
export function JourneyStickers({ journeys, episodes }: { journeys: Journey[]; episodes: Episode[] }) {
  const [activeId, setActiveId] = useState(journeys[0].id);
  const journey = journeys.find((j) => j.id === activeId) ?? journeys[0];
  const episode = episodes.find((e) => e.slug === journey.episodeSlug);

  return (
    <div className={styles.journey}>
      <div className={styles.journeyChoices} role="radiogroup" aria-label="Ce que tu vis">
        {journeys.map((j, i) => (
          <button
            key={j.id}
            type="button"
            role="radio"
            aria-checked={j.id === activeId}
            onClick={() => setActiveId(j.id)}
            style={{ rotate: `${[-4, 3, -2, 5, -3, 2][i % 6]}deg` }}
          >
            {j.label}
          </button>
        ))}
      </div>

      <div className={styles.journeyAnswer} key={journey.id} aria-live="polite">
        <blockquote>
          <p>{journey.verse}</p>
          <cite>{journey.reference}</cite>
        </blockquote>
        {episode ? (
          <a className={styles.journeyEpisode} href={site.links.youtube} target="_blank" rel="noopener">
            <Duotone photo={episode.cover} tone="noir" sizes="240px" className={styles.journeyImg} />
            <span className={styles.journeyLabel}>L&apos;épisode qui en parle</span>
            <span className={styles.journeyTitle}>{episode.title}</span>
            <span className={styles.journeyMeta}>
              Épisode {episode.number} · {formatDuration(episode.durationMinutes)} →
            </span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
