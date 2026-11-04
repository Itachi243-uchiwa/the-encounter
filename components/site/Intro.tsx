import { markPath } from "@/components/brand/paths";
import styles from "./site.module.css";

/** Durée de l'ouverture : les animations « au chargement » du hero attendent qu'elle se lève. */
export const INTRO_SECONDS = 1.4;

/**
 * L'ouverture : le monogramme se trace dans le noir, l'étoile s'allume, puis le rideau
 * se lève sur le plateau. Entièrement en CSS : sans script, elle se lève quand même ;
 * avec moins d'animations demandées, elle n'existe pas.
 */
export function Intro() {
  return (
    <div className={styles.intro} aria-hidden>
      <svg className={styles.introMark} viewBox={markPath.viewBox}>
        <path className={styles.introStroke} d={markPath.d} pathLength={1} />
        <path className={styles.introFill} d={markPath.d} fillRule="evenodd" />
      </svg>
    </div>
  );
}
