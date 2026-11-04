import type { MetadataRoute } from "next";
import { langs } from "@/lib/lang";
import { episodeRepository } from "@/lib/repositories/episodes";
import { episodeHref, href, type RouteKey } from "@/lib/routes";
import { siteUrl } from "@/lib/seo";

/** Pages publiées en V1 (les modules hors V1 n'apparaissent qu'avec leur flag). */
const pages: RouteKey[] = ["home", "podcast", "vision", "support", "collaborate", "contact", "faq", "legal", "privacy", "cookies"];

/** /sitemap.xml : chaque page dans ses deux langues, reliées par hreflang. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = (await episodeRepository.list()).filter((episode) => !episode.upcoming);
  const entry = (path: (lang: (typeof langs)[number]) => string, lastModified?: string) =>
    langs.map((lang) => ({
      url: `${siteUrl}${path(lang)}`,
      lastModified,
      alternates: { languages: Object.fromEntries(langs.map((l) => [l, `${siteUrl}${path(l)}`])) },
    }));
  return [
    ...pages.flatMap((route) => entry((lang) => href(route, lang))),
    ...episodes.flatMap((episode) => entry((lang) => episodeHref(episode.slug, lang), episode.publishedAt)),
  ];
}
