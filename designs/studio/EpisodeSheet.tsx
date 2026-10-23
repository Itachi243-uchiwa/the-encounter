"use client";

import { themes } from "@/content/site";
import type { Episode } from "@/content/types";
import { useThemeFilter } from "@/features/podcast/useThemeFilter";
import { formatDuration } from "@/lib/navigation";
import styles from "./studio.module.css";

/** Le catalogue présenté comme une feuille imprimée, filtrable par conversation. */
export function EpisodeSheet({ episodes }: { episodes: Episode[] }) {
  const { theme, setTheme, visible, countFor } = useThemeFilter(episodes);
  const groups = themes
    .map((t) => ({ ...t, items: visible.filter((e) => e.theme === t.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className={styles.sheet}>
      <h2 className={styles.sheetTitle}>Histoires de Rencontres</h2>
      <p className={styles.sheetNote}>Choisis une conversation, la feuille se met à jour.</p>
      <div className={styles.sheetFilters} role="group" aria-label="Filtrer par conversation">
        <button type="button" aria-pressed={theme === "tous"} onClick={() => setTheme("tous")}>
          Tout
        </button>
        {themes.map((t) =>
          countFor(t.id) > 0 ? (
            <button key={t.id} type="button" aria-pressed={theme === t.id} onClick={() => setTheme(t.id)}>
              {t.label}
            </button>
          ) : null,
        )}
      </div>
      {groups.map((group) => (
        <section key={group.id} className={styles.sheetGroup} aria-label={group.label}>
          <h3>{group.label}</h3>
          <ul>
            {group.items.map((episode) => (
              <li key={episode.slug}>
                <a href={`/podcast/${episode.slug}`}>
                  <span className={styles.sheetName}>{episode.title}</span>
                  <span className={styles.sheetMeta}>{formatDuration(episode.durationMinutes)}</span>
                  <span className={styles.sheetHook}>
                    Épisode {episode.number} · {episode.hook}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className={styles.sheetFoot}>
        Chaque épisode en vidéo intégrale
        <br />
        sur YouTube, les extraits sur TikTok
      </p>
    </div>
  );
}
