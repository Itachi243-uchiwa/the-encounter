"use client";

import { useState } from "react";
import type { Journey } from "@/content/journeys";
import type { Episode } from "@/content/types";
import type { Copy } from "./copy";
import { usePlayer } from "./Player";
import styles from "./site.module.css";

/** Tuile « Ce que tu vis » : une situation, une parole, et l'épisode à écouter. */
export function JourneyTile({ journeys, episodes, t }: { journeys: Journey[]; episodes: Episode[]; t: Copy }) {
  const { play } = usePlayer();
  const [id, setId] = useState(journeys[0].id);
  const journey = journeys.find((j) => j.id === id) ?? journeys[0];
  const episode = episodes.find((e) => e.slug === journey.episodeSlug);

  return (
    <div className={styles.journey}>
      <p className={styles.tileKicker}>{t.journeyTitle}</p>
      <div className={styles.journeyChips} role="radiogroup" aria-label={t.journeyTitle}>
        {journeys.map((j) => (
          <button key={j.id} type="button" role="radio" aria-checked={j.id === id} onClick={() => setId(j.id)}>
            {j.label}
          </button>
        ))}
      </div>
      <blockquote key={journey.id + journey.reference} className={styles.journeyVerse}>
        <p>{t.quote(journey.verse)}</p>
        <cite>{journey.reference}</cite>
      </blockquote>
      {episode ? (
        <button type="button" className={styles.journeyListen} onClick={() => play(episode.slug)}>
          {t.journeyListen(episode.title)} <span aria-hidden>›</span>
        </button>
      ) : null}
    </div>
  );
}
