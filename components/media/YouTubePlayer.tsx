"use client";

import Image from "next/image";
import { useState } from "react";
import { cookieConsent } from "@/content/contact";
import type { Photo } from "@/content/types";
import { setConsent, useConsent } from "@/lib/consent";
import { useLang } from "@/lib/i18n";

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
 * (youtube-nocookie) n'arrive qu'au clic, et seulement avec l'accord aux cookies tiers.
 * Sans accord, le clic propose d'accepter ou d'ouvrir la vidéo sur YouTube.
 * Aucune vidéo n'est hébergée sur le site.
 */
export function YouTubePlayer({ videoId, title, poster, fallbackUrl, className, sizes = "100vw" }: YouTubePlayerProps) {
  const { lang } = useLang();
  const t = cookieConsent[lang];
  const consent = useConsent();
  const [wanted, setWanted] = useState(false);

  if (wanted && videoId && consent === "accepted") {
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

  const label = t.watch(title);
  const image = <Image src={poster.src} alt={poster.alt} fill sizes={sizes} style={{ objectFit: "cover" }} />;

  if (wanted && videoId) {
    return (
      <div className={className} data-player="consent">
        {image}
        <div data-player-gate>
          <p>{t.gate}</p>
          <div>
            <button type="button" onClick={() => setConsent("accepted")} autoFocus>
              {t.gateAccept}
            </button>
            <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener">
              {t.gateOpen}
            </a>
          </div>
        </div>
      </div>
    );
  }

  const face = (
    <>
      {image}
      <span data-player-button aria-hidden>
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </>
  );

  return videoId ? (
    <button type="button" className={className} onClick={() => setWanted(true)} aria-label={label} data-player="idle">
      {face}
    </button>
  ) : (
    <a className={className} href={fallbackUrl} target="_blank" rel="noopener" aria-label={label} data-player="idle">
      {face}
    </a>
  );
}
