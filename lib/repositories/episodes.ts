import { episodes } from "@/content/episodes";
import type { Episode, ThemeId } from "@/content/types";

/**
 * Contrat d'accès aux épisodes. Les pages et les designs dépendent de cette
 * interface, jamais de la source : la V1 lit le fichier statique, le CMS
 * prendra le relais en fournissant une autre implémentation.
 */
export interface EpisodeRepository {
  list(): Promise<Episode[]>;
  latest(): Promise<Episode>;
  bySlug(slug: string): Promise<Episode | undefined>;
  byTheme(theme: ThemeId): Promise<Episode[]>;
}

class StaticEpisodeRepository implements EpisodeRepository {
  constructor(private readonly source: Episode[]) {}

  async list() {
    return [...this.source].sort((a, b) => b.number - a.number);
  }

  async latest() {
    const [first] = await this.list();
    return first;
  }

  async bySlug(slug: string) {
    return this.source.find((episode) => episode.slug === slug);
  }

  async byTheme(theme: ThemeId) {
    return (await this.list()).filter((episode) => episode.theme === theme);
  }
}

export const episodeRepository: EpisodeRepository = new StaticEpisodeRepository(episodes);
