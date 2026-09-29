import { useCallback, useEffect, useRef, useState } from 'react';

import { createGame, moveToken, rollDice } from '@/game/state';
import { successFeedback, tapFeedback } from '@/services/feedback';
import type { GameState, Player } from '@/types/game';

/** Hur länge tärningen rullar innan värdet visas. */
const ROLL_ANIMATION_MS = 500;

/**
 * Kopplar ihop spellogiken med skärmen.
 *
 * Hooken äger tillståndet och ser till att ett snabbt dubbeltryck inte kan ge
 * två kast eller två drag. All regelkunskap ligger kvar i src/game.
 */
export function useGame(players: Player[]) {
  const [state, setState] = useState<GameState>(() => createGame(players));
  const [isRolling, setIsRolling] = useState(false);
  const rollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Städa upp tidtagningen om skärmen lämnas medan tärningen rullar.
  useEffect(() => {
    return () => {
      if (rollTimer.current) {
        clearTimeout(rollTimer.current);
      }
    };
  }, []);

  const roll = useCallback(() => {
    // Första spärren: medan tärningen rullar händer ingenting.
    if (isRolling || state.phase !== 'roll' || state.winner) {
      return;
    }

    tapFeedback();
    setIsRolling(true);

    rollTimer.current = setTimeout(() => {
      // Andra spärren: reglerna i rollDice släpper bara igenom ett kast per tur.
      setState((current) => rollDice(current));
      setIsRolling(false);
    }, ROLL_ANIMATION_MS);
  }, [isRolling, state.phase, state.winner]);

  const selectToken = useCallback(
    (tokenId: string) => {
      if (isRolling) {
        return;
      }

      setState((current) => {
        const next = moveToken(current, tokenId);

        // Ge en vibration när något viktigt hände.
        if (next !== current) {
          const event = next.lastEvent?.type;
          if (event === 'captured' || event === 'goal' || event === 'win') {
            successFeedback();
          }
        }

        return next;
      });
    },
    [isRolling],
  );

  const restart = useCallback(() => {
    if (rollTimer.current) {
      clearTimeout(rollTimer.current);
    }
    setIsRolling(false);
    setState(createGame(players));
  }, [players]);

  return {
    state,
    isRolling,
    roll,
    selectToken,
    restart,
    /** Pjäser som spelaren får flytta just nu. */
    movableTokenIds: state.legalMoves.map((move) => move.tokenId),
    canRoll: state.phase === 'roll' && !state.winner && !isRolling,
  };
}
