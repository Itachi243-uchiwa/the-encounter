"use client";

import Link from "next/link";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { PageHead } from "@/components/site/InfoPage";
import styles from "@/components/site/site.module.css";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";

const text = {
  fr: { title: "Page introuvable", lead: "Cette page n'existe pas, ou plus. Les portraits, eux, sont toujours là.", home: "Retour à l'accueil", podcast: "Écouter les portraits" },
  en: { title: "Page not found", lead: "This page doesn't exist, or no longer does. The portraits are still here.", home: "Back to home", podcast: "Listen to the portraits" },
};

/** 404 : dans le site (nav, pied de page, lecteur), avec un chemin de retour. */
export default function NotFound() {
  const { lang } = useLang();
  const t = text[lang];
  return (
    <MotionRoot>
      <main id="contenu" tabIndex={-1} className={styles.inner}>
        <PageHead
          title={t.title}
          lead={t.lead}
          action={
            <div className={styles.heroLinks}>
              <Link className={styles.pill} href={href("podcast", lang)}>
                {t.podcast}
              </Link>
              <Link className={styles.chevron} href={href("home", lang)}>
                {t.home} <span aria-hidden>›</span>
              </Link>
            </div>
          }
        />
      </main>
    </MotionRoot>
  );
}
