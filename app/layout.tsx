import type { Metadata } from "next";
import { Amiri, Anton, Archivo } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Charte : Impact (titres) → Anton, Amiri (sous-titres), Helvetica (texte) → Archivo.
const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const amiri = Amiri({ variable: "--font-amiri", weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${anton.variable} ${amiri.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
