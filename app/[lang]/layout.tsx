import type { Metadata } from "next";
import { Amiri, Anton } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";
import { site } from "@/content/site";
import { english } from "@/content/translations";
import { isLang, langs } from "@/lib/lang";
import { primaryNavigation } from "@/lib/navigation";
import { episodeRepository } from "@/lib/repositories/episodes";
import "../globals.css";

// Charte : Impact (titres), Amiri (sous-titres, paroles), Helvetica (texte courant).
// Impact et Helvetica sont des polices système sous licence : Anton, dessinée sur le modèle d'Impact, la remplace
// là où Impact manque (iPhone, Android) ; Helvetica retombe sur Arial, qui en reprend les proportions.
const amiri = Amiri({ variable: "--font-amiri", weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });

/** Les deux langues sont générées à la compilation ; une autre valeur mène à notFound() dans le layout. */
export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const tagline = lang === "en" ? english.site.tagline : site.tagline;
  return {
    // Adresse publique du site (variable de Vercel) : les images de partage ont besoin d'adresses absolues.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: `${site.name} · ${tagline}`, template: `%s · ${site.name}` },
    description: lang === "en" ? english.site.description : site.description,
    openGraph: { siteName: site.name, locale: lang === "en" ? "en_GB" : "fr_BE", type: "website" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const episodes = await episodeRepository.list();

  return (
    <html lang={lang} data-scroll-behavior="smooth" className={`${amiri.variable} ${anton.variable}`}>
      <body>
        <SiteShell lang={lang} episodes={episodes} nav={primaryNavigation()}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
