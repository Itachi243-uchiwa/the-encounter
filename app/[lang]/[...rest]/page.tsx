import { notFound } from "next/navigation";

/** Toute adresse inconnue : la 404 du site (app/[lang]/not-found.tsx), avec la nav et le pied de page. */
export default function UnknownPage() {
  notFound();
}
