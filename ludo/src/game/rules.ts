/**
 * Reglerna vi har valt, samlade på ett ställe.
 *
 * Samma fil används av spellogiken, av regelsidan i appen och av testerna.
 * Vill du prova en annan variant ändrar du här, inte inne i logiken.
 */
export const RULES = {
  /** En sexa krävs för att flytta ut en pjäs ur boet. */
  requiresSixToLeaveBase: true,

  /** En sexa ger ett extra kast. */
  extraTurnOnSix: true,

  /** Tre sexor i rad gör att turen går vidare utan drag. */
  maxSixesInARow: 3,

  /** De fyra startrutorna är säkra, där kan ingen knuffas hem. */
  startSquaresAreSafe: true,

  /** Flera egna pjäser får stå på samma ruta. Ingen blockering. */
  allowStackingOwnTokens: true,

  /** Pjäsen måste nå målrutan med exakt slag, annars är draget ogiltigt. */
  requiresExactRollToFinish: true,

  /** Har spelaren inga giltiga drag går turen vidare direkt. */
  passTurnWhenNoLegalMoves: true,
} as const;

/** Tärningens lägsta och högsta värde. */
export const DICE_MIN = 1;
export const DICE_MAX = 6;
