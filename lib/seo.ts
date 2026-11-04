import type { Metadata } from "next";
import { copy } from "@/components/site/copy";
import { site } from "@/content/site";
import type { Episode } from "@/content/types";
import { langs, type Lang } from "./lang";
import { episodeHref, href, type RouteKey } from "./routes";

/** Adresse de production du site. */
export const productionUrl = "https://www.thencntr.com";

/**
 * Adresse publique du site : les liens hreflang, le sitemap, le JSON-LD et les e-mails veulent des adresses absolues.
 * NEXT_PUBLIC_SITE_URL la remplace si besoin ; sinon la production en build, localhost en développement.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? productionUrl : "http://localhost:3000")
).replace(/\/$/, "");

/** Une page dans ses deux langues : adresse canonique + hreflang (le français sert aussi de x-default). */
export function alternates(path: (lang: Lang) => string, lang: Lang): Metadata["alternates"] {
  return {
    canonical: path(lang),
    languages: { ...Object.fromEntries(langs.map((l) => [l, path(l)])), "x-default": path("fr") },
  };
}

type PageKey = "podcast" | "vision" | "support" | "collaborate" | "contact" | "faq" | "legal" | "privacy" | "cookies";

/** Titre, description et liens de langue d'une page simple (titre et phrase d'en-tête de copy.ts). */
export function pageMetadata(route: PageKey & RouteKey, lang: string): Metadata {
  const l = lang as Lang;
  const page = copy[l].pages[route];
  return {
    title: page.title,
    description: page.lead,
    // Pas d'openGraph ici : il remplacerait l'image de partage du segment [lang] (opengraph-image.tsx).
    alternates: alternates((x) => href(route, x), l),
  };
}

/** Données structurées : sérialisées sans « < » pour ne jamais fermer la balise script. */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: `${siteUrl}${href("home", lang)}`,
        logo: `${siteUrl}/brand/wordmark.svg`,
        founder: { "@type": "Person", name: site.founder },
        sameAs: [site.links.youtube, site.links.spotify, site.links.instagram, site.links.tiktok],
      },
      {
        "@type": "PodcastSeries",
        "@id": `${siteUrl}/#podcast`,
        name: site.podcast,
        url: `${siteUrl}${href("podcast", lang)}`,
        inLanguage: "fr",
        author: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

export function episodeLd(episode: Episode, lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.hook,
    episodeNumber: episode.number,
    datePublished: episode.publishedAt,
    url: `${siteUrl}${episodeHref(episode.slug, lang)}`,
    image: `${siteUrl}${episode.cover.src}`,
    inLanguage: "fr",
    timeRequired: `PT${episode.durationMinutes}M`,
    partOfSeries: { "@type": "PodcastSeries", "@id": `${siteUrl}/#podcast`, name: site.podcast },
  };
}
