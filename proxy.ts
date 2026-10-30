import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, parsePath } from "@/lib/routes";

/**
 * Langues : /podcast (français, sans préfixe) et /en/podcast (anglais) sont servis
 * par la même arborescence interne app/[lang]/podcast. À la toute première visite
 * de l'accueil, un navigateur anglophone est envoyé vers /en ; ensuite le cookie
 * de langue (posé au changement de langue) décide.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Les images de partage générées par Next portent le chemin interne (/fr/…) : on les sert telles quelles.
  if (/\/(opengraph|twitter)-image/.test(pathname)) return NextResponse.next();

  // /fr/… n'est pas une adresse publique : on renvoie vers l'adresse sans préfixe.
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/" && !request.cookies.has(LANG_COOKIE)) {
    const preferred = request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
    if (preferred.startsWith("en")) {
      const url = request.nextUrl.clone();
      url.pathname = "/en";
      return NextResponse.redirect(url);
    }
  }

  const { lang, path } = parsePath(pathname);
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${path === "/" ? "" : path}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Ni les fichiers Next, ni les fichiers publics (tout ce qui a une extension), ni les API.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
