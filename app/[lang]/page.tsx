import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomePage";
import { english } from "@/content/translations";
import { site } from "@/content/site";
import type { Lang } from "@/lib/lang";
import { episodeRepository } from "@/lib/repositories/episodes";
import { href } from "@/lib/routes";
import { alternates, jsonLd, organizationLd } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return {
    description: lang === "en" ? english.site.description : site.description,
    alternates: alternates((l) => href("home", l), lang as Lang),
  };
}

/** Accueil : la direction « Clair-obscur » retenue par la cliente. */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const episodes = await episodeRepository.list();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationLd(lang as Lang)) }} />
      <HomePage episodes={episodes} />
    </>
  );
}
