import type { GameState } from '@/types/game';

/**
 * Turordningen.
 *
 * Spelarna turas om i den ordning de sitter i listan. En sexa ger ett extra
 * kast, men tre sexor i rad gör att turen går vidare utan drag.
 */

import { RULES } from '@/game/rules';

/** Vem står på tur efter den nuvarande spelaren? */
export function getNextPlayerIndex(currentIndex: number, playerCount: number): number {
  return (currentIndex + 1) % playerCount;
}

/** Ger tärningsvärdet ett extra kast? */
export function grantsExtraTurn(dice: number): boolean {
  return RULES.extraTurnOnSix && dice === 6;
}

/** Har spelaren slagit för många sexor i rad? */
export function isSixStreakBroken(sixStreak: number): boolean {
  return sixStreak >= RULES.maxSixesInARow;
}

/** Namnet på spelaren som har turen. Praktiskt i gränssnittet. */
export function getCurrentPlayer(state: GameState) {
  return state.players[state.currentPlayerIndex];
}
