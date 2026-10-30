"use client";

import Link from "next/link";
import { cookieConsent } from "@/content/contact";
import { setConsent, useConsent } from "@/lib/consent";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import styles from "./site.module.css";

/** Bandeau sobre : deux boutons de même poids, rien de tiers ne se charge avant un choix. */
export function CookieBanner() {
  const { lang } = useLang();
  const consent = useConsent();
  if (consent !== null) return null;
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
  return (
    <button type="button" className={className} onClick={() => setConsent(null)}>
      {cookieConsent[lang].manage}
    </button>
  );
}
