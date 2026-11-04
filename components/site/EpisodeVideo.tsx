"use client";

import { useState } from "react";
import { YouTubePlayer } from "@/components/media/YouTubePlayer";
import { site } from "@/content/site";
import type { Episode } from "@/content/types";
import { formatDuration } from "@/lib/navigation";
import type { Copy } from "./copy";
import styles from "./site.module.css";

interface EpisodeVideoProps {
  episode: Episode;
  t: Copy;
  className?: string;
  sizes?: string;
}

/**
 * La vidéo YouTube intégrée d'un épisode. Publié en plusieurs vidéos, l'épisode
 * propose ses parties au-dessus du lecteur ; changer de partie remplace la vidéo.
 */
export function EpisodeVideo({ episode, t, className, sizes }: EpisodeVideoProps) {
  const parts = episode.parts ?? (episode.youtubeId ? [{ youtubeId: episode.youtubeId, durationMinutes: episode.durationMinutes }] : []);
  const [index, setIndex] = useState(0);
  const part = parts[index];

  return (
    <>
      {parts.length > 1 ? (
        <div className={styles.parts} role="tablist" aria-label={t.partsCount(parts.length)}>
          {parts.map((p, i) => (
            <button key={p.youtubeId} type="button" role="tab" aria-selected={i === index} onClick={() => setIndex(i)}>
              {t.part} {i + 1} · {formatDuration(p.durationMinutes)}
            </button>
          ))}
        </div>
      ) : null}
      <YouTubePlayer
        key={part?.youtubeId ?? "none"}
        className={className}
        videoId={part?.youtubeId}
        title={parts.length > 1 ? `${episode.title} (${t.part} ${index + 1})` : episode.title}
        poster={episode.cover}
        fallbackUrl={site.links.youtube}
        sizes={sizes}
      />
    </>
  );
}
