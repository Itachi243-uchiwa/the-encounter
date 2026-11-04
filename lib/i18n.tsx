"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./lang";
import { LANG_COOKIE, localizePath } from "./routes";

export type { Lang };

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangState | null>(null);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang doit être utilisé dans <LangProvider>");
  return ctx;
}

/**
 * Langue de l'interface, donnée par l'adresse (/… ou /en/…). Le changement est
 * instantané : tous les textes sont déjà dans la page, on change l'état, puis on
 * met l'adresse à jour (sans navigation) et on retient le choix dans un cookie.
 */
export function LangProvider({ initial, children }: { initial: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);

  // Navigation client vers une page de l'autre langue (lien /en/…) : l'adresse fait foi.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setLangState(initial), [initial]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    const { pathname, search, hash } = window.location;
    const target = localizePath(pathname, next);
    if (target !== pathname) window.history.replaceState(window.history.state, "", target + search + hash);
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
