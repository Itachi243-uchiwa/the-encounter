"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { cookieConsent } from "@/content/contact";
import { setConsent, useConsent } from "@/lib/consent";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import styles from "./site.module.css";

/** Le bandeau se montre une fois par visite, puis reste visible d'une page à l'autre jusqu'au choix. */
let revealed = false;
const listeners = new Set<() => void>();

function reveal() {
  if (revealed) return;
  revealed = true;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Bandeau sobre : deux boutons de même poids, rien de tiers ne se charge avant un choix.
 * Rien ne dépend d'une réponse immédiate : il attend que le visiteur ait quitté l'ouverture
 * (la moitié d'un écran défilée) pour ne jamais cacher la promesse ni le bouton « Écouter ».
 */
export function CookieBanner() {
  const { lang } = useLang();
  const consent = useConsent();
  const shown = useSyncExternalStore(subscribe, () => revealed, () => false);

  useEffect(() => {
    if (consent !== null || shown) return;
    const check = () => {
      const short = document.documentElement.scrollHeight < window.innerHeight * 1.5;
      if (short || window.scrollY > window.innerHeight * 0.5) reveal();
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [consent, shown]);

  if (consent !== null || !shown) return null;
  const t = cookieConsent[lang];

  return (
    <section className={styles.cookieBanner} aria-label={t.label}>
      <p>
        {t.text} <Link href={href("cookies", lang)}>{t.more}</Link>
      </p>
      <div>
        <button type="button" className={styles.cookieButton} onClick={() => setConsent("refused")}>
          {t.refuse}
        </button>
        <button type="button" className={styles.cookieButton} onClick={() => setConsent("accepted")}>
          {t.accept}
        </button>
      </div>
    </section>
  );
}

/** « Gérer les cookies » : efface le choix, le bandeau revient. */
export function ManageCookies({ className }: { className?: string }) {
  const { lang } = useLang();
  // « Gérer les cookies » rouvre le bandeau tout de suite, où qu'on soit dans la page.
  const manage = () => {
    reveal();
    setConsent(null);
  };
  return (
    <button type="button" className={className} onClick={manage}>
      {cookieConsent[lang].manage}
    </button>
  );
}
