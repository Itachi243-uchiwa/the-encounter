import type { Lang } from "./lang";

/**
 * Les pages du site et leur adresse dans chaque langue. Le français n'a pas de
 * préfixe ; l'anglais vit sous /en avec ses propres mots. En interne, une seule
 * arborescence app/[lang]/… dont les dossiers portent le chemin français :
 * proxy.ts traduit l'adresse publique vers ce chemin.
 */
export const routes = {
  home: { fr: "/", en: "/en" },
  podcast: { fr: "/podcast", en: "/en/podcast" },
  vision: { fr: "/vision", en: "/en/vision" },
  support: { fr: "/soutenir", en: "/en/support" },
  collaborate: { fr: "/collaborer", en: "/en/collaborate" },
  contact: { fr: "/contact", en: "/en/contact" },
  faq: { fr: "/faq", en: "/en/faq" },
  legal: { fr: "/mentions-legales", en: "/en/legal-notice" },
  privacy: { fr: "/confidentialite", en: "/en/privacy" },
  cookies: { fr: "/cookies", en: "/en/cookies" },
  // Modules hors V1 : leurs pages arrivent avec leur flag (lib/features.ts).
  events: { fr: "/evenements", en: "/en/events" },
  shop: { fr: "/shop", en: "/en/shop" },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

export const LANG_COOKIE = "encounter-lang";

export function href(route: RouteKey, lang: Lang, hash?: string): string {
  return routes[route][lang] + (hash ? `#${hash}` : "");
}

export function episodeHref(slug: string, lang: Lang): string {
  return `${routes.podcast[lang]}/${slug}`;
}

/** Sépare une adresse publique en langue + chemin français (le chemin des dossiers internes). */
export function parsePath(pathname: string): { lang: Lang; path: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3) || "/";
    for (const r of Object.values(routes)) {
      const en = r.en.slice(3) || "/";
      if (rest === en || (en !== "/" && rest.startsWith(`${en}/`))) return { lang: "en", path: r.fr + rest.slice(en.length) };
    }
    return { lang: "en", path: rest };
  }
  return { lang: "fr", path: pathname };
}

/** La même page dans l'autre langue (sert au changement de langue instantané). */
export function localizePath(pathname: string, to: Lang): string {
  const { path } = parsePath(pathname);
  if (to === "fr") return path;
  for (const r of Object.values(routes)) {
    if (path === r.fr || (r.fr !== "/" && path.startsWith(`${r.fr}/`))) return r.en + path.slice(r.fr.length);
  }
  return `/en${path === "/" ? "" : path}`;
}
