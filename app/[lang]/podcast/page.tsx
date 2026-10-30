import type { Metadata } from "next";
import { PodcastPage } from "@/components/site/PodcastPage";
import { episodeRepository } from "@/lib/repositories/episodes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/podcast">): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata("podcast", lang);
}

export default async function Page() {
  const episodes = await episodeRepository.list();
  return <PodcastPage episodes={episodes} />;
}
