import { ImageResponse } from "next/og";
import { copy } from "@/components/site/copy";
import { photos } from "@/content/media";
import type { Lang } from "@/lib/lang";
import { SiteCard, ogSize, publicImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "The Encounter";

/** L'aperçu du site quand un lien est partagé (toutes les pages sans image propre). */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = copy[lang as Lang];
  return new ImageResponse(<SiteCard photo={await publicImage(photos.studioDuo.src)} tagline={t.tagline} promise={t.promise} />, ogSize);
}
