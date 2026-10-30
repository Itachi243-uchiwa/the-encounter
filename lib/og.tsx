import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { wordmarkPath } from "@/components/brand/paths";

/** Format des images de partage (Open Graph) : celui que WhatsApp, Facebook et LinkedIn affichent. */
export const ogSize = { width: 1200, height: 630 };

const BORDEAUX = "#59101c";
const JAUNE = "#ffe432";

/** Une image de public/ en data URI : l'image de partage est générée sans requête réseau. */
export async function publicImage(src: string): Promise<string> {
  const data = await readFile(join(process.cwd(), "public", src));
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

/** Le logo « The ENCOUNTER » en SVG, à la couleur voulue. */
export function wordmark(color: string, height: number) {
  const [, , w, h] = wordmarkPath.viewBox.split(" ").map(Number);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wordmarkPath.viewBox}"><path fill="${color}" fill-rule="evenodd" d="${wordmarkPath.d}"/></svg>`;
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt="" src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`} height={height} width={Math.round((height * w) / h)} />;
}

interface EpisodeCardProps {
  photo: string;
  kicker: string;
  title: string;
  footer: string;
}

/** Image de partage d'un épisode : la photo de l'invité, puis le titre sur fond noir. */
export function EpisodeCard({ photo, kicker, title, footer }: EpisodeCardProps) {
  const size = title.length > 40 ? 54 : 66;
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#000", color: "#f8f4ef" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={photo} width={470} height={630} style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "56px 60px", background: BORDEAUX }}>
        {wordmark("#f8f4ef", 46)}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 26, color: JAUNE, fontWeight: 700 }}>{kicker}</div>
          <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.04, letterSpacing: -1.5 }}>{title}</div>
        </div>
        <div style={{ fontSize: 26, color: "#e9d9c3" }}>{footer}</div>
      </div>
    </div>
  );
}

/** Image de partage du site : la photo du plateau, le logo et la promesse. */
export function SiteCard({ photo, tagline, promise }: { photo: string; tagline: string; promise: string }) {
  return (
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#000", color: "#f8f4ef" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={photo} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
      {/* Le moteur des images de partage ignore « inset » : position et taille explicites. */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.62) 55%, rgba(0,0,0,0.25) 100%)" }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", gap: 26, padding: "0 72px" }}>
        {wordmark("#f8f4ef", 96)}
        <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: -1.5 }}>{tagline}</div>
        <div style={{ fontSize: 30, color: JAUNE }}>{promise}</div>
      </div>
    </div>
  );
}
