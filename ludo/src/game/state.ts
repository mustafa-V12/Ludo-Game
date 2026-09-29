import { BASE_STEP, TOKENS_PER_PLAYER } from '@/constants/board';
import { rollDie, type RandomSource } from '@/game/dice';
import {
  applyMoveToTokens,
  findMoveForToken,
  getLegalMoves,
  hasPlayerWon,
} from '@/game/moves';
import { getNextPlayerIndex, grantsExtraTurn, isSixStreakBroken } from '@/game/turn';
import type { GameState, Player, Token } from '@/types/game';

/**
 * Spelets tillstånd och de två handlingar som driver spelet framåt:
 * kasta tärningen och flytta en pjäs.
 *
 * Varje funktion tar ett tillstånd och ger tillbaka ett nytt. Inget ändras på
 * plats. Är handlingen otillåten just nu ges samma tillstånd tillbaka, vilket
 * gör att snabba dubbeltryck inte kan ge två kast eller två drag.
 */

/** Skapar fyra pjäser per spelare, alla i boet. */
export function createTokens(players: Player[]): Token[] {
  const tokens: Token[] = [];

  for (const player of players) {
    for (let index = 0; index < TOKENS_PER_PLAYER; index += 1) {
      tokens.push({
        id: `${player.color}-${index}`,
        color: player.color,
        index,
        step: BASE_STEP,
      });
    }
  }

  return tokens;
}

/** Startar ett nytt spel med de valda spelarna. Den första i listan börjar. */
export function createGame(players: Player[]): GameState {
  return {
    players,
    tokens: createTokens(players),
    currentPlayerIndex: 0,
    dice: null,
    phase: 'roll',
    sixStreak: 0,
    legalMoves: [],
    winner: null,
    lastEvent: null,
  };
}

/** Lämnar över turen till nästa spelare och nollställer tärning och sexräknare. */
function passTurn(state: GameState, lastEvent: GameState['lastEvent']): GameState {
  return {
    ...state,
    currentPlayerIndex: getNextPlayerIndex(state.currentPlayerIndex, state.players.length),
    dice: null,
    phase: 'roll',
    sixStreak: 0,
    legalMoves: [],
    lastEvent,
  };
}

/**
 * Kastar tärningen.
 *
 * Tre saker kan hända: turen går vidare på grund av tre sexor i rad, turen går
 * vidare för att inget drag är möjligt, eller så väntar spelet på att en pjäs väljs.
 */
export function rollDice(state: GameState, random: RandomSource = Math.random): GameState {
  // Skydd mot dubbeltryck: går bara att kasta när spelet väntar på ett kast.
  if (state.phase !== 'roll' || state.winner) {
    return state;
  }

  const value = rollDie(random);
  const currentPlayer = state.players[state.currentPlayerIndex];
  const sixStreak = value === 6 ? state.sixStreak + 1 : 0;

  if (isSixStreakBroken(sixStreak)) {
    return passTurn({ ...state, dice: value }, { type: 'threeSixes', color: currentPlayer.color });
  }

  const legalMoves = getLegalMoves(state.tokens, currentPlayer.color, value);

  if (legalMoves.length === 0) {
    return passTurn({ ...state, dice: value }, { type: 'noMoves', color: currentPlayer.color });
  }

  return {
    ...state,
    dice: value,
    phase: 'move',
    sixStreak,
    legalMoves,
    lastEvent: { type: 'rolled', value },
  };
}

/**
 * Flyttar den valda pjäsen.
 *
 * Pjäsen måste finnas bland de giltiga dragen, annars händer ingenting. Efter
 * draget kontrolleras vinst, och sedan avgörs om spelaren får kasta igen.
 */
export function moveToken(state: GameState, tokenId: string): GameState {
  // Skydd mot dubbeltryck: går bara att flytta när ett kast väntar på ett drag.
  if (state.phase !== 'move' || state.winner) {
    return state;
  }

  const move = findMoveForToken(state.legalMoves, tokenId);
  if (!move) {
    return state;
  }

  const tokens = applyMoveToTokens(state.tokens, move);
  const currentPlayer = state.players[state.currentPlayerIndex];

  if (hasPlayerWon(tokens, currentPlayer.color)) {
    return {
      ...state,
      tokens,
      phase: 'finished',
      legalMoves: [],
      winner: currentPlayer.color,
      lastEvent: { type: 'win', color: currentPlayer.color },
    };
  }

  const lastEvent: GameState['lastEvent'] =
    move.capturedTokenIds.length > 0
      ? { type: 'captured', by: currentPlayer.color, count: move.capturedTokenIds.length }
      : move.reachesGoal
        ? { type: 'goal', color: currentPlayer.color }
        : { type: 'moved', color: currentPlayer.color };

  // En sexa ger ett extra kast, annars går turen vidare.
  if (grantsExtraTurn(state.dice ?? 0)) {
    return {
      ...state,
      tokens,
      dice: null,
      phase: 'roll',
      legalMoves: [],
      lastEvent,
    };
  }

  return passTurn({ ...state, tokens }, lastEvent);
}
