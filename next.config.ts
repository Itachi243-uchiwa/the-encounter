import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  images: {
    // Une seule qualité, haute : les photos du plateau ne doivent pas être dégradées par la recompression.
    qualities: [90],
    formats: ["image/avif", "image/webp"],
  },
  // Les fichiers bruts de la cliente (rushes, exports Spotify : des dizaines de Go, ignorés par git) ne font pas
  // partie du site : le traçage des fichiers serveur ne doit pas les lire (le build échoue sur les vidéos de 4 Go).
  outputFileTracingExcludes: {
    "**": ["public/dossier-client/**/*"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Tailwind uniquement sur la feuille globale : les *.module.css des designs restent des CSS modules.
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
