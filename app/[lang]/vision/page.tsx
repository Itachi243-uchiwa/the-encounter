import type { Metadata } from "next";
import { VisionPage } from "@/components/site/VisionPage";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/vision">): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata("vision", lang);
}

export default function Page() {
  return <VisionPage />;
}
