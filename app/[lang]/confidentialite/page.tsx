import type { Metadata } from "next";
import { InfoPage } from "@/components/site/InfoPage";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/confidentialite">): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata("privacy", lang);
}

export default function Page() {
  return <InfoPage route="privacy" />;
}
