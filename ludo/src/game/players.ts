import { SEATS, SEAT_ORDER } from '@/constants/board';
import type { Player, PlayerColor } from '@/types/game';

/**
 * Vilka färger som används vid olika antal spelare, och hur spelarna skapas.
 */

/** Minsta och största antal spelare i det lokala spelet. */
export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 4;

/**
 * Färgerna som används vid ett visst antal spelare.
 * Med två spelare väljs röd och gul, som sitter mitt emot varandra på brädet.
 */
export function getSeatColors(playerCount: number): PlayerColor[] {
  if (playerCount === 2) {
    return ['red', 'yellow'];
  }
  return SEAT_ORDER.slice(0, playerCount);
}

/** Förslag på namn, så att man kan börja spela utan att skriva något. */
export function getDefaultName(color: PlayerColor): string {
  return SEATS[color].label;
}

/** Bygger spelarlistan utifrån antal spelare och eventuella inskrivna namn. */
export function createPlayers(playerCount: number, names: Partial<Record<PlayerColor, string>> = {}): Player[] {
  return getSeatColors(playerCount).map((color) => ({
    color,
    name: names[color]?.trim() || getDefaultName(color),
  }));
}
