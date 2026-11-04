import { ImageResponse } from "next/og";
import { copy } from "@/components/site/copy";
import { episodeIn } from "@/content/translations";
import type { Lang } from "@/lib/lang";
import { formatDuration } from "@/lib/navigation";
import { EpisodeCard, ogSize, publicImage } from "@/lib/og";
import { episodeRepository } from "@/lib/repositories/episodes";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "The Encounter Podcast";

export async function generateStaticParams() {
  const episodes = await episodeRepository.list();
  return episodes.map((episode) => ({ slug: episode.slug }));
}

/** L'aperçu d'un épisode quand son lien est partagé. */
export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const source = await episodeRepository.bySlug(slug);
  if (!source) return new Response("Not found", { status: 404 });
  const t = copy[lang as Lang];
  const episode = episodeIn(source, lang as Lang);
  const footer = [episode.guest, episode.upcoming ? t.soon : formatDuration(episode.durationMinutes)].filter(Boolean).join(" · ");

  return new ImageResponse(
    <EpisodeCard photo={await publicImage(episode.cover.src)} kicker={`The Encounter Podcast · ${t.episode} ${episode.number}`} title={episode.title} footer={footer} />,
    ogSize,
  );
}
