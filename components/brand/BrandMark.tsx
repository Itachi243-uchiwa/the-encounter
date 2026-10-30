import { markPath, wordmarkPath } from "./paths";

interface BrandMarkProps {
  /** Hauteur en px ; la largeur suit le ratio du monogramme. */
  size?: number;
  color?: string;
  className?: string;
}

const MARK_RATIO = 1624 / 2920;
const WORDMARK_RATIO = 1992 / 640;

/** Monogramme « E » étoilé de la charte (logo principal), en vecteur : net à toutes les tailles. */
export function BrandMark({ size = 40, color = "currentColor", className }: BrandMarkProps) {
  return (
    <svg aria-hidden className={className} viewBox={markPath.viewBox} height={size} width={Math.round(size * MARK_RATIO)} style={{ display: "inline-block", flex: "none" }}>
      <path fill={color} fillRule="evenodd" d={markPath.d} />
    </svg>
  );
}

/** Logo secondaire « The ENCNTR ». Le nom complet reste lisible par les lecteurs d'écran. */
export function Wordmark({ size = 32, color = "currentColor", className, label = "The Encounter" }: BrandMarkProps & { label?: string }) {
  return (
    <svg role="img" aria-label={label} className={className} viewBox={wordmarkPath.viewBox} height={size} width={Math.round(size * WORDMARK_RATIO)} style={{ display: "inline-block", flex: "none" }}>
      <path fill={color} fillRule="evenodd" d={wordmarkPath.d} />
    </svg>
  );
}
