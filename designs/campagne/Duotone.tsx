import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/content/types";
import styles from "./campagne.module.css";

export type Tone = "bordeaux" | "noir" | "jaune";

interface DuotoneProps {
  photo?: Photo;
  /** Pour une vidéo ou tout autre média : il reçoit le même traitement bichrome. */
  children?: ReactNode;
  tone?: Tone;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Bichromie aux couleurs de la charte : les ombres prennent une couleur, les
 * lumières l'autre. bordeaux = bordeaux/jaune, noir = noir/beige, jaune = bordeaux/jaune inversé.
 */
export function Duotone({ photo, children, tone = "bordeaux", sizes = "50vw", className, priority }: DuotoneProps) {
  return (
    <div className={`${styles.duotone} ${styles[`tone_${tone}`]} ${className ?? ""}`}>
      {photo ? <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} /> : children}
    </div>
  );
}
