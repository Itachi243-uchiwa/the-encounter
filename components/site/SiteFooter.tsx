"use client";

import Link from "next/link";
import { BrandMark, Wordmark } from "@/components/brand/BrandMark";
import { site } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";
import { ManageCookies } from "./CookieBanner";
import { copy } from "./copy";
import styles from "./site.module.css";

const socials = [
  {
    name: "YouTube",
    url: site.links.youtube,
    icon: <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3L10 15z" fill="currentColor" />,
  },
  {
    name: "Spotify",
    url: site.links.spotify,
    icon: (
      <>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M7 9.5c3.5-1 7.4-.7 10.3.9M7.6 12.6c2.9-.8 6-.5 8.4.8M8.3 15.5c2.3-.6 4.6-.4 6.6.7" fill="none" stroke="var(--cut)" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    name: "Instagram",
    url: site.links.instagram,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
      </>
    ),
  },
  {
    name: "TikTok",
    url: site.links.tiktok,
    icon: <path d="M16.5 3c.4 2.2 1.7 3.6 4 3.8v3.1a7 7 0 01-4-1.3v6.2a5.8 5.8 0 11-5.8-5.8c.3 0 .6 0 .9.1v3.2a2.7 2.7 0 102 2.6V3h2.9z" fill="currentColor" />,
  },
];

const columns: { key: "footerPodcast" | "footerEncounter" | "footerInfo"; routes: RouteKey[] }[] = [
  { key: "footerPodcast", routes: ["home", "podcast"] },
  { key: "footerEncounter", routes: ["vision", "support", "collaborate"] },
  { key: "footerInfo", routes: ["contact", "faq", "legal", "privacy", "cookies"] },
];

/**
 * Le pied de page, en trois temps : la conclusion (monogramme, promesse, deux
 * actions, réseaux), les pages du site dans une carte, puis le logo en grand qui
 * s'efface dans le noir. La mention AppliCraft Studio est une obligation du contrat (§06).
 */
export function SiteFooter() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInvite}>
        <BrandMark size={64} color="var(--accent)" className={styles.footerMark} />
        <p className={styles.footerTagline}>{t.tagline}</p>
        <p className={styles.footerPromise}>{t.footerNote}</p>
        <div className={styles.footerActions}>
          <Link className={styles.pill} href={href("podcast", lang)}>
            {t.navAction}
          </Link>
          <a className={styles.followPill} href={site.links.support} target="_blank" rel="noopener">
            {t.give}
          </a>
        </div>
        <ul className={styles.footerSocials} aria-label={t.footerFollow}>
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener" aria-label={s.name}>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                  {s.icon}
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.footerCard}>
        <div className={styles.footerBrand}>
          <Wordmark size={30} color="currentColor" label={site.name} />
          <p>{t.pitch}</p>
          <h2>{t.footerContact}</h2>
          <a className={styles.footerMail} href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <nav className={styles.footerCols} aria-label={t.footerNav}>
          {columns.map((col) => (
            <div key={col.key}>
              <h2>{t[col.key]}</h2>
              <ul>
                {col.routes.map((route) => (
                  <li key={route}>
                    <Link href={href(route, lang)}>{route === "home" ? t.footerHome : t.nav[route]}</Link>
                  </li>
                ))}
                {col.key === "footerInfo" ? (
                  <li>
                    <ManageCookies className={styles.footerLinkButton} />
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.footerBottom}>
        <p>{t.rights}</p>
        <p>
          {t.madeBy}{" "}
          <a href="https://applicraftstudio.com" target="_blank" rel="noopener">
            AppliCraft Studio
          </a>
        </p>
      </div>

      {/* Le logo en entier, centré, qui s'efface vers le bas : la page se referme dessus. */}
      <div className={styles.footerGiant} aria-hidden>
        <Wordmark size={400} color="currentColor" label="" className={styles.footerGiantMark} />
      </div>
    </footer>
  );
}
