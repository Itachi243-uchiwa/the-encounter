"use client";

import type { ReactNode } from "react";
import { episodeIn } from "@/content/translations";
import type { Episode, NavItem } from "@/content/types";
import { LangProvider, useLang, type Lang } from "@/lib/i18n";
import { copy } from "./copy";
import { CookieBanner } from "./CookieBanner";
import { PlayerProvider } from "./Player";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import styles from "./site.module.css";

interface SiteShellProps {
  lang: Lang;
  episodes: Episode[];
  nav: NavItem[];
  children: ReactNode;
}

/**
 * Tout ce qui reste d'une page à l'autre : la langue, le lecteur (barre et fenêtre),
 * la navigation, le pied de page et le bandeau cookies. La lecture en cours survit donc à la navigation.
 */
export function SiteShell({ lang, ...props }: SiteShellProps) {
  return (
    <LangProvider initial={lang}>
      <Shell {...props} />
    </LangProvider>
  );
}

function Shell({ episodes, nav, children }: Omit<SiteShellProps, "lang">) {
  const { lang } = useLang();
  return (
    <PlayerProvider episodes={episodes.map((e) => episodeIn(e, lang))}>
      <div className={styles.page}>
        {/* Premier arrêt du clavier : passer la navigation et aller droit au contenu. */}
        <a className={styles.skipLink} href="#contenu">
          {copy[lang].skipToContent}
        </a>
        <SiteNav items={nav} />
        {children}
        <SiteFooter />
      </div>
      <CookieBanner />
    </PlayerProvider>
  );
}
