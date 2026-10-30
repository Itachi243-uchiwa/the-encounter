"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";
export const langs: Lang[] = ["fr", "en"];

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangState | null>(null);
const STORAGE_KEY = "encounter-lang";

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang doit être utilisé dans <LangProvider>");
  return ctx;
}

/**
 * Langue de l'interface. Le changement est instantané : tous les textes sont déjà
 * dans la page, on ne recharge rien. Le choix est retenu pour la visite suivante.
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {}
    const initial = saved === "en" || saved === "fr" ? saved : navigator.language.toLowerCase().startsWith("en") ? "en" : "fr";
    // Lecture d'une préférence du navigateur, disponible seulement après l'hydratation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial !== "fr") setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
