interface BrandMarkProps {
  /** Hauteur en px ; la largeur suit le ratio du monogramme. */
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Monogramme « E » étoilé de la charte, teinté par CSS mask pour suivre n'importe quelle couleur.
 * Fichier source actuel : PNG extrait de la charte — à remplacer par le SVG officiel.
 */
export function BrandMark({ size = 40, color = "currentColor", className }: BrandMarkProps) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: "inline-block",
        height: size,
        width: Math.round(size * 0.542),
        backgroundColor: color,
        maskImage: "url(/brand/mark.png)",
        WebkitMaskImage: "url(/brand/mark.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}
