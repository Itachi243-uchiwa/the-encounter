import type { Metadata } from "next";
import { SupportPage } from "@/components/site/SupportPage";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/soutenir">): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata("support", lang);
}

export default function Page() {
  return <SupportPage />;
}
