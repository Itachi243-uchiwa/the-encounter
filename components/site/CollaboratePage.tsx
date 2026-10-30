"use client";

import Link from "next/link";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { collaboratePage } from "@/content/pages";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { copy } from "./copy";
import { PageHead } from "./InfoPage";
import styles from "./site.module.css";

/** Collaborer : quatre portes d'entrée, chacune mène au formulaire de contact, sujet déjà choisi. */
export function CollaboratePage() {
  const { lang } = useLang();
  const t = copy[lang];
  const c = collaboratePage[lang];

  return (
    <MotionRoot>
      <main className={styles.inner}>
        <PageHead title={t.pages.collaborate.title} lead={t.pages.collaborate.lead} />
        <section className={styles.cWays} aria-label={t.pages.collaborate.title}>
          <div className={styles.cGrid} data-stagger>
            {c.ways.map((w, i) => (
              <article key={w.name} className={styles.cWay} data-featured={i === 0 || undefined}>
                <h2>{w.name}</h2>
                <p>{w.body}</p>
                <Link className={i === 0 ? styles.pill : styles.followPill} href={`${href("contact", lang)}?sujet=${w.topic}`}>
                  {w.action}
                </Link>
              </article>
            ))}
          </div>
          <p className={styles.cNote} data-reveal>
            {c.note}
          </p>
        </section>
      </main>
    </MotionRoot>
  );
}
