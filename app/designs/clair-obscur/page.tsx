import type { Metadata } from "next";
import { ClairObscurHome } from "@/designs/clair-obscur/ClairObscurHome";
import { designById } from "@/designs/registry";
import { episodeRepository } from "@/lib/repositories/episodes";

export const metadata: Metadata = { title: `Proposition — ${designById("clair-obscur").name}` };

export default async function ClairObscurPage() {
  const episodes = await episodeRepository.list();
  return <ClairObscurHome episodes={episodes} />;
}
