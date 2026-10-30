"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Les tuiles s'inclinent légèrement vers le pointeur, comme une carte qu'on tient
 * en main. Chaque tuile marquée data-tilt reçoit son inclinaison en variables CSS ;
 * elle revient à plat quand le pointeur la quitte.
 */
export function Tilt({ className, children }: { className?: string; children: ReactNode }) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const tile = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
    if (!tile) return;
    const r = tile.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tile.style.setProperty("--ry", `${x * 6}deg`);
    tile.style.setProperty("--rx", `${-y * 6}deg`);
  };

  const leave = (e: PointerEvent<HTMLDivElement>) => {
    const tile = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
    tile?.style.setProperty("--rx", "0deg");
    tile?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={className} onPointerMove={move} onPointerOut={leave}>
      {children}
    </div>
  );
}
