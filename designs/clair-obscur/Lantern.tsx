"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Les tuiles restent dans le noir ; la lumière suit le pointeur, à l'aplomb, comme
 * le projecteur de l'ouverture. Chaque tuile marquée data-lit reçoit la position.
 */
export function Lantern({ className, children }: { className?: string; children: ReactNode }) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const tile = (e.target as HTMLElement).closest<HTMLElement>("[data-lit]");
    if (!tile) return;
    const r = tile.getBoundingClientRect();
    tile.style.setProperty("--lx", `${e.clientX - r.left}px`);
    tile.style.setProperty("--ly", `${e.clientY - r.top}px`);
  };

  return (
    <div className={className} onPointerMove={move}>
      {children}
    </div>
  );
}
