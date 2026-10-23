import type { ReactNode } from "react";
import { isEnabled, type Feature } from "@/lib/features";

/** Monte un bloc uniquement si son module fait partie du périmètre actif. */
export function FeatureGate({ feature, children }: { feature: Feature; children: ReactNode }) {
  return isEnabled(feature) ? children : null;
}
