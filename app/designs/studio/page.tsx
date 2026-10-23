import type { Metadata } from "next";
import { StudioHome } from "@/designs/studio/StudioHome";
import { designById } from "@/designs/registry";
import { episodeRepository } from "@/lib/repositories/episodes";

export const metadata: Metadata = { title: `Proposition — ${designById("studio").name}` };

export default async function StudioPage() {
  const [episodes, latest] = await Promise.all([episodeRepository.list(), episodeRepository.latest()]);
  return <StudioHome episodes={episodes} latest={latest} />;
}
