import type { Metadata } from "next";
import { CampagneHome } from "@/designs/campagne/CampagneHome";
import { designById } from "@/designs/registry";
import { episodeRepository } from "@/lib/repositories/episodes";

export const metadata: Metadata = { title: `Proposition — ${designById("campagne").name}` };

export default async function CampagnePage() {
  const [episodes, latest] = await Promise.all([episodeRepository.list(), episodeRepository.latest()]);
  return <CampagneHome episodes={episodes} latest={latest} />;
}
