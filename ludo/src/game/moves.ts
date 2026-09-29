import { BASE_STEP, GOAL_STEP, TOKENS_PER_PLAYER } from '@/constants/board';
import { getTrackIndex, isFinished, isInBase, isOnTrack, isSafeTrackIndex } from '@/game/board';
import { RULES } from '@/game/rules';
import type { Move, PlayerColor, Token } from '@/types/game';

/**
 * Reglerna för drag: vilka drag som är giltiga och vad som händer när ett utförs.
 *
 * Funktionerna här ändrar aldrig något direkt. De tar emot pjäser och ger
 * tillbaka nya pjäser. Det gör dem lätta att testa och svåra att råka missbruka.
 */

/** Vilka pjäser hör till spelaren? */
export function getPlayerTokens(tokens: Token[], color: PlayerColor): Token[] {
  return tokens.filter((token) => token.color === color);
}

/**
 * Räknar ut vilka pjäser som knuffas hem om en pjäs landar på `targetStep`.
 * Egna pjäser knuffas aldrig, och på en säker ruta händer ingenting.
 */
function findCapturedTokens(tokens: Token[], color: PlayerColor, targetStep: number): Token[] {
  if (!isOnTrack(targetStep)) {
    return [];
  }

  const targetIndex = getTrackIndex(color, targetStep);
  if (targetIndex === null) {
    return [];
  }

  if (RULES.startSquaresAreSafe && isSafeTrackIndex(targetIndex)) {
    return [];
  }

  return tokens.filter(
    (token) => token.color !== color && getTrackIndex(token.color, token.step) === targetIndex,
  );
}

/** Bygger ett drag för en pjäs, eller null om draget inte är tillåtet. */
function buildMove(tokens: Token[], token: Token, dice: number): Move | null {
  // Pjäser som redan är i mål står still.
  if (isFinished(token.step)) {
    return null;
  }

  // Ut ur boet krävs en sexa, och pjäsen ställs på startrutan.
  if (isInBase(token.step)) {
    if (RULES.requiresSixToLeaveBase && dice !== 6) {
      return null;
    }
    const captured = findCapturedTokens(tokens, token.color, 0);
    return {
      tokenId: token.id,
      from: BASE_STEP,
      to: 0,
      capturedTokenIds: captured.map((item) => item.id),
      reachesGoal: false,
    };
  }

  const target = token.step + dice;

  // Målrutan kräver exakt slag. Slår du för högt är draget ogiltigt.
  if (RULES.requiresExactRollToFinish && target > GOAL_STEP) {
    return null;
  }

  const captured = findCapturedTokens(tokens, token.color, target);
  return {
    tokenId: token.id,
    from: token.step,
    to: target,
    capturedTokenIds: captured.map((item) => item.id),
    reachesGoal: target === GOAL_STEP,
  };
}

/** Alla giltiga drag för spelaren med det aktuella tärningsvärdet. */
export function getLegalMoves(tokens: Token[], color: PlayerColor, dice: number): Move[] {
  const moves: Move[] = [];

  for (const token of getPlayerTokens(tokens, color)) {
    const move = buildMove(tokens, token, dice);
    if (move) {
      moves.push(move);
    }
  }

  return moves;
}

/** Letar upp draget som hör till en viss pjäs. */
export function findMoveForToken(moves: Move[], tokenId: string): Move | undefined {
  return moves.find((move) => move.tokenId === tokenId);
}

/**
 * Utför ett drag och ger tillbaka en ny lista med pjäser.
 * Knuffade pjäser skickas tillbaka till boet.
 */
export function applyMoveToTokens(tokens: Token[], move: Move): Token[] {
  return tokens.map((token) => {
    if (token.id === move.tokenId) {
      return { ...token, step: move.to };
    }
    if (move.capturedTokenIds.includes(token.id)) {
      return { ...token, step: BASE_STEP };
    }
    return token;
  });
}

/** Har spelaren fått alla sina pjäser i mål? */
export function hasPlayerWon(tokens: Token[], color: PlayerColor): boolean {
  const finished = getPlayerTokens(tokens, color).filter((token) => isFinished(token.step));
  return finished.length === TOKENS_PER_PLAYER;
}
