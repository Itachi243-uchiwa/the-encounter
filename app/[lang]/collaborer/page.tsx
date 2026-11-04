import type { Metadata } from "next";
import { CollaboratePage } from "@/components/site/CollaboratePage";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/collaborer">): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata("collaborate", lang);
}

export default function Page() {
  return <CollaboratePage />;
}
