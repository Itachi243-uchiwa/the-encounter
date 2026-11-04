import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EpisodePage } from "@/components/site/EpisodePage";
import { episodeIn } from "@/content/translations";
import type { Lang } from "@/lib/i18n";
import { episodeRepository } from "@/lib/repositories/episodes";
import { episodeHref } from "@/lib/routes";
import { alternates, episodeLd, jsonLd } from "@/lib/seo";

/** Une fiche par épisode, générée à la compilation pour chaque langue. */
export async function generateStaticParams() {
  const episodes = await episodeRepository.list();
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/podcast/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const source = await episodeRepository.bySlug(slug);
  if (!source) return {};
  const episode = episodeIn(source, lang as Lang);
  return {
    title: episode.title,
    description: episode.hook,
    alternates: alternates((l) => episodeHref(slug, l), lang as Lang),
    openGraph: { type: "article", title: episode.title, description: episode.hook, siteName: "The Encounter" },
  };
}

/**
 * Le slug n'est lu qu'à l'intérieur de <Suspense> : la coquille de la page reste la même
 * pour toutes les fiches, et la navigation vers une fiche est instantanée.
 */
export default function Page({ params }: PageProps<"/[lang]/podcast/[slug]">) {
  return (
    <Suspense fallback={null}>
      <Episode params={params} />
    </Suspense>
  );
}

async function Episode({ params }: Pick<PageProps<"/[lang]/podcast/[slug]">, "params">) {
  const { lang, slug } = await params;
  const [episode, episodes] = await Promise.all([episodeRepository.bySlug(slug), episodeRepository.list()]);
  if (!episode) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(episodeLd(episodeIn(episode, lang as Lang), lang as Lang)) }} />
      <EpisodePage episode={episode} episodes={episodes} />
    </>
  );
}
