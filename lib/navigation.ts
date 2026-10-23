import { navigation } from "@/content/site";
import type { NavItem } from "@/content/types";
import { isEnabled } from "./features";

/** Le menu ne montre que les modules actifs : activer un flag suffit à faire apparaître son entrée. */
export function primaryNavigation(): NavItem[] {
  return navigation.filter((item) => isEnabled(item.feature));
}

export function formatDuration(minutes: number): string {
  return `${minutes} min`;
}

export function formatEpisodeNumber(n: number): string {
  return `Épisode ${n}`;
}
