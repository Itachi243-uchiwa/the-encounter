/** Les langues du site. Module neutre : utilisable côté serveur (génération des pages) comme côté client. */
export type Lang = "fr" | "en";
export const langs: Lang[] = ["fr", "en"];

export function isLang(value: string): value is Lang {
  return (langs as string[]).includes(value);
}
