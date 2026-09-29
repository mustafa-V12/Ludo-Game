import { createGame } from '@/game/state';
import type { GameState, Player, PlayerColor } from '@/types/game';

/**
 * Hjälpfunktioner för testerna.
 *
 * Med dessa kan vi bygga upp exakt det läge vi vill undersöka, i stället för
 * att spela oss fram till det.
 */

/** Skapar ett spel med de färger som anges. */
export function createTestGame(colors: PlayerColor[] = ['red', 'green']): GameState {
  const players: Player[] = colors.map((color) => ({ color, name: color }));
  return createGame(players);
}

/** Flyttar en pjäs till ett bestämt steg utan att gå via reglerna. */
export function placeToken(state: GameState, tokenId: string, step: number): GameState {
  return {
    ...state,
    tokens: state.tokens.map((token) => (token.id === tokenId ? { ...token, step } : token)),
  };
}

/** Hämtar en pjäs. Kastar fel om id:t inte finns, så att testet misslyckas tydligt. */
export function getToken(state: GameState, tokenId: string) {
  const token = state.tokens.find((item) => item.id === tokenId);
  if (!token) {
    throw new Error(`Hittade ingen pjäs med id ${tokenId}`);
  }
  return token;
}

/** En tärning som alltid ger samma värde. */
export function fixedDie(value: number) {
  // rollDie räknar 1 + Math.floor(random() * 6), så vi räknar baklänges.
  return () => (value - 1) / 6;
}
