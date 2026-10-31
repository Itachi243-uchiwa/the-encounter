import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Fichiers bruts de la cliente (vidéos, exports) : pas de code.
    "dossier-client/**",
    // Outils de design installés localement (skills), pas du code du site.
    ".agents/**",
  ]),
]);

export default eslintConfig;
