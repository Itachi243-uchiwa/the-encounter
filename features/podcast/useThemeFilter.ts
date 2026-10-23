"use client";

import { useMemo, useState } from "react";
import type { Episode, ThemeId } from "@/content/types";

/** Logique de filtrage partagée par les trois designs ; chacun garde sa propre présentation. */
export function useThemeFilter(episodes: Episode[], initial: ThemeId | "tous" = "tous") {
  const [theme, setTheme] = useState<ThemeId | "tous">(initial);
  const visible = useMemo(
    () => (theme === "tous" ? episodes : episodes.filter((episode) => episode.theme === theme)),
    [episodes, theme],
  );
  const countFor = (id: ThemeId) => episodes.filter((episode) => episode.theme === id).length;
  return { theme, setTheme, visible, countFor };
}
