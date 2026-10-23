"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "@/content/types";

interface CrossfadeProps {
  photos: Photo[];
  className?: string;
  imageClassName?: string;
  intervalMs?: number;
  sizes?: string;
}

/** Fondu lent entre plusieurs photos du même cadrage : « la lumière qui change dans la pièce ». */
export function Crossfade({ photos, className, imageClassName, intervalMs = 5600, sizes = "100vw" }: CrossfadeProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const start = () => {
      timer = window.setInterval(() => setActive((i) => (i + 1) % photos.length), intervalMs);
    };
    const onVisibility = () => {
      window.clearInterval(timer);
      if (!document.hidden) start();
    };
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [photos.length, intervalMs]);

  return (
    <div className={className}>
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={i === 0 ? photo.alt : ""}
          aria-hidden={i !== 0}
          fill
          sizes={sizes}
          priority={i === 0}
          className={imageClassName}
          style={{ opacity: i === active ? 1 : 0, transition: "opacity 1.6s ease" }}
        />
      ))}
    </div>
  );
}
