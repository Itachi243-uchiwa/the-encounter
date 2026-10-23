"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/content/types";

interface YouTubePlayerProps {
  /** Sans identifiant (épisode pas encore relié), le lecteur renvoie vers la chaîne. */
  videoId?: string;
  title: string;
  poster: Photo;
  fallbackUrl: string;
  className?: string;
  sizes?: string;
}

/**
 * Lecteur YouTube en « façade » : seule la miniature est chargée ; l'iframe
 * (youtube-nocookie) n'arrive qu'au clic. Aucune vidéo n'est hébergée sur le site.
 */
export function YouTubePlayer({ videoId, title, poster, fallbackUrl, className, sizes = "100vw" }: YouTubePlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing && videoId) {
    return (
      <div className={className} data-player="playing">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    );
  }

  const label = `Regarder « ${title} » sur YouTube`;
  const face = (
    <>
      <Image src={poster.src} alt={poster.alt} fill sizes={sizes} style={{ objectFit: "cover" }} />
      <span data-player-button aria-hidden>
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </>
  );

  return videoId ? (
    <button type="button" className={className} onClick={() => setPlaying(true)} aria-label={label} data-player="idle">
      {face}
    </button>
  ) : (
    <a className={className} href={fallbackUrl} target="_blank" rel="noopener" aria-label={label} data-player="idle">
      {face}
    </a>
  );
}
