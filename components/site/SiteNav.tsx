"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Wordmark } from "@/components/brand/BrandMark";
import type { NavItem } from "@/content/types";
import { useLang } from "@/lib/i18n";
import { langs } from "@/lib/lang";
import { href, parsePath, routes } from "@/lib/routes";
import { copy } from "./copy";
import styles from "./site.module.css";

/**
 * Barre de navigation commune : une capsule de verre qui flotte en haut de page
 * (monogramme et logo, pages, langue, « Écouter »). Elle se cache en descendant,
 * revient en remontant. Sur téléphone, les pages passent dans un menu plein écran.
 */
export function SiteNav({ items }: { items: NavItem[] }) {
  const { lang, setLang } = useLang();
  const t = copy[lang];
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const current = parsePath(usePathname()).path;

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      bar.current?.toggleAttribute("data-hidden", y > last && y > window.innerHeight);
      bar.current?.toggleAttribute("data-scrolled", y > 24);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu ouvert : la page ne défile plus derrière, Échap le referme.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isCurrent = (route: NavItem["route"]) => {
    const fr: string = routes[route].fr;
    return current === fr || current.startsWith(`${fr}/`);
  };
  const close = () => setOpen(false);

  const langSwitch = (
    <div className={styles.langSwitch} role="group" aria-label={t.langLabel}>
      {langs.map((l) => (
        <button key={l} type="button" aria-pressed={l === lang} lang={l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <nav ref={bar} className={styles.nav} aria-label={t.navLabel} data-open={open || undefined}>
        <Link href={href("home", lang)} className={styles.wordmark} aria-label={t.backToTop} onClick={close}>
          <Wordmark size={19} color="currentColor" label="" />
        </Link>

        <ul className={styles.navLinks}>
          {items.map((item) => (
            <li key={item.route}>
              <Link href={href(item.route, lang)} aria-current={isCurrent(item.route) ? "page" : undefined}>
                {t.nav[item.route]}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.navEnd}>
          {langSwitch}
          <Link className={styles.navPill} href={href("podcast", lang)}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
            {t.navAction}
          </Link>
          <button
            type="button"
            className={styles.navBurger}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden />
            <span aria-hidden />
          </button>
        </div>
      </nav>

      {/* Téléphone : les pages en grand, qui arrivent l'une après l'autre. */}
      <div id="site-menu" className={styles.navSheet} data-open={open || undefined} aria-hidden={!open} inert={!open}>
        <ul>
          <li style={{ "--i": 0 } as CSSProperties}>
            <Link href={href("home", lang)} onClick={close} aria-current={current === "/" ? "page" : undefined}>
              {t.nav.home}
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.route} style={{ "--i": i + 1 } as CSSProperties}>
              <Link href={href(item.route, lang)} onClick={close} aria-current={isCurrent(item.route) ? "page" : undefined}>
                {t.nav[item.route]}
              </Link>
            </li>
          ))}
          <li style={{ "--i": items.length + 1 } as CSSProperties}>
            <Link href={href("contact", lang)} onClick={close} aria-current={isCurrent("contact") ? "page" : undefined}>
              {t.nav.contact}
            </Link>
          </li>
        </ul>
        <div className={styles.navSheetEnd}>
          {langSwitch}
          <Link className={styles.pill} href={href("podcast", lang)} onClick={close}>
            {t.navAction}
          </Link>
        </div>
      </div>
    </>
  );
}
