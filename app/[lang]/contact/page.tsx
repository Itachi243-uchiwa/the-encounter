import type { Metadata } from "next";
import { InfoPage } from "@/components/site/InfoPage";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata("contact", lang);
}

export default function Page() {
  return <InfoPage route="contact" />;
}
