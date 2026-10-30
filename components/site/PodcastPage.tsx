"use client";

import { MotionRoot } from "@/components/motion/MotionRoot";
import { episodeIn } from "@/content/translations";
import type { Episode } from "@/content/types";
import { useLang } from "@/lib/i18n";
import { copy } from "./copy";
import { Playlist } from "./Playlist";
import { Stories } from "./Stories";
import styles from "./site.module.css";

/** Page Podcast : tous les portraits en playlist, puis les extraits en stories. */
export function PodcastPage({ episodes: source }: { episodes: Episode[] }) {
  const { lang } = useLang();
  const t = copy[lang];
  const episodes = source.map((e) => episodeIn(e, lang));

  return (
    <MotionRoot>
      <main className={styles.inner}>
        <header className={styles.pageHead}>
          <h1 key={lang} data-split="lines" data-split-load>
            {t.pages.podcast.title}
          </h1>
          <p data-reveal>{t.pages.podcast.lead}</p>
        </header>
        <Playlist episodes={episodes} t={t} />
        <Stories episodes={episodes} t={t} />
      </main>
    </MotionRoot>
  );
}
