import { Crossfade } from "@/components/media/Crossfade";
import type { Photo } from "@/content/types";

/** Les photos du plateau en fondu lent, avec une légère parallaxe au défilement. */
export function HeroMedia({ photos, className }: { photos: Photo[]; className?: string }) {
  return (
    <div className={className}>
      <div data-parallax="10" style={{ position: "absolute", inset: "-8% 0" }}>
        <Crossfade photos={photos} className="hero-crossfade" imageClassName="hero-crossfade-img" intervalMs={6000} />
      </div>
    </div>
  );
}
