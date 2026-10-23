"use client";

import { useEffect, useRef } from "react";
import type { Clip } from "@/content/types";

interface LoopVideoProps {
  clip: Clip;
  className?: string;
}

/** Boucle muette ; reste sur l'affiche si l'utilisateur réduit les animations. */
export function LoopVideo({ clip, className }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={clip.src}
      poster={clip.poster}
      aria-label={clip.alt}
      muted
      loop
      playsInline
      preload="metadata"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
