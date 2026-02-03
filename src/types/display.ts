export type ColorVariant = "simple" | "neon";
export type Density = "comfortable" | "compact";

export const densityScale = (density: Density) => (density === "compact" ? 0.85 : 1);
export const densityPadding = (density: Density) => (density === "compact" ? 0.5 : 1);
