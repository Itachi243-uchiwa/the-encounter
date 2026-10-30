import { ClairObscurHome } from "@/designs/clair-obscur/ClairObscurHome";
import { primaryNavigation } from "@/lib/navigation";
import { episodeRepository } from "@/lib/repositories/episodes";

/** Page d'accueil : la direction « Clair-obscur » retenue par la cliente. */
export default async function Home() {
  const episodes = await episodeRepository.list();
  return <ClairObscurHome episodes={episodes} nav={primaryNavigation()} />;
}
