import type { Metadata } from "next";
import { Amiri, Archivo } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Charte : Amiri (sous-titres, paroles), Helvetica (texte et titres) → Archivo.
const amiri = Amiri({ variable: "--font-amiri", weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${amiri.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
