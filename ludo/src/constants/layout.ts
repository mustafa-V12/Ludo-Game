/**
 * Mått som används på flera ställen: avstånd, rundade hörn och textstorlekar.
 * Genom att hålla dem här slipper vi slumpmässiga siffror utspridda i koden.
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  pill: 999,
} as const;

export const fontSize = {
  small: 13,
  body: 16,
  title: 20,
  heading: 26,
  display: 40,
} as const;
