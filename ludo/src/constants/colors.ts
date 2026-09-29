import type { PlayerColor } from '@/types/game';

/**
 * Alla färger i appen samlade på ett ställe.
 * Ändrar du en färg här slår det igenom i hela spelet.
 */

/** Grundfärgerna för gränssnittet. */
export const palette = {
  background: '#ECE8FA',
  surface: '#FFFFFF',
  surfaceMuted: '#F4F1FD',
  boardFrame: '#CBC0F0',
  boardBase: '#FFF8EA',
  boardLine: '#DCCDAA',
  text: '#1E1A4A',
  textMuted: '#645E92',
  accent: '#5A3FD1',
  accentText: '#FFFFFF',
  gold: '#F4B63A',
  goldText: '#3A2600',
  goldShadow: '#C98A12',
  shadow: 'rgba(40, 30, 110, 0.18)',
  overlay: 'rgba(12, 9, 40, 0.55)',
} as const;

/** Varje spelarfärg i tre nyanser: huvudfärg, mörk kantlinje och ljus bakgrund. */
export interface ColorSet {
  main: string;
  dark: string;
  tint: string;
}

export const playerColors: Record<PlayerColor, ColorSet> = {
  red: { main: '#E4473B', dark: '#A92E25', tint: '#FAD3CE' },
  green: { main: '#1FA366', dark: '#12704A', tint: '#CBEEDC' },
  yellow: { main: '#F2B400', dark: '#B08300', tint: '#FCEDBE' },
  blue: { main: '#2E6FE0', dark: '#1C4CA3', tint: '#D2E0FA' },
};
