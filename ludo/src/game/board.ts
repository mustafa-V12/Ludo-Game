import {
  BASE_SLOTS,
  BASE_STEP,
  FIRST_HOME_STEP,
  GOAL_STEP,
  LAST_TRACK_STEP,
  SAFE_TRACK_INDICES,
  SEATS,
  TRACK,
  TRACK_LENGTH,
  type Cell,
} from '@/constants/board';
import type { PlayerColor, Token } from '@/types/game';

/**
 * Hjälpfunktioner för att räkna om en pjäs position till en plats på brädet.
 *
 * Spellogiken räknar i "steg" från spelarens egen startruta. Brädet räknar i
 * rutor på den gemensamma banan. Den här filen översätter mellan de två.
 */

/** Är pjäsen kvar i boet? */
export function isInBase(step: number): boolean {
  return step === BASE_STEP;
}

/** Är pjäsen ute på den gemensamma banan? */
export function isOnTrack(step: number): boolean {
  return step >= 0 && step <= LAST_TRACK_STEP;
}

/** Är pjäsen inne i sin hemkolumn (men inte i mål)? */
export function isInHomeLane(step: number): boolean {
  return step >= FIRST_HOME_STEP && step < GOAL_STEP;
}

/** Är pjäsen i mål? */
export function isFinished(step: number): boolean {
  return step === GOAL_STEP;
}

/**
 * Räknar ut vilken ruta på den gemensamma banan en pjäs står på.
 * Returnerar null om pjäsen står i boet eller redan lämnat banan.
 */
export function getTrackIndex(color: PlayerColor, step: number): number | null {
  if (!isOnTrack(step)) {
    return null;
  }
  return (SEATS[color].startIndex + step) % TRACK_LENGTH;
}

/** Är rutan en säker ruta, alltså en av de fyra startrutorna? */
export function isSafeTrackIndex(trackIndex: number): boolean {
  return SAFE_TRACK_INDICES.includes(trackIndex);
}

/**
 * Var ska pjäsen ritas? Svaret är rad och kolumn i rutnätet på 15 x 15 rutor,
 * räknat till rutans mitt så att pjäsen hamnar centrerad.
 */
export function getTokenCell(token: Token): Cell {
  const seat = SEATS[token.color];

  if (isInBase(token.step)) {
    const slot = BASE_SLOTS[token.index];
    return {
      row: seat.baseOrigin.row + slot.row,
      col: seat.baseOrigin.col + slot.col,
    };
  }

  if (isFinished(token.step)) {
    return seat.goalCell;
  }

  if (isInHomeLane(token.step)) {
    const cell = seat.homeCells[token.step - FIRST_HOME_STEP];
    return { row: cell.row + 0.5, col: cell.col + 0.5 };
  }

  const trackIndex = getTrackIndex(token.color, token.step);
  const cell = TRACK[trackIndex ?? 0];
  return { row: cell.row + 0.5, col: cell.col + 0.5 };
}

/**
 * Hittar alla pjäser som står på samma ruta på den gemensamma banan.
 * Används både för knuffar och för att kunna rita flera pjäser bredvid varandra.
 */
export function getTokensOnTrackIndex(tokens: Token[], trackIndex: number): Token[] {
  return tokens.filter((token) => getTrackIndex(token.color, token.step) === trackIndex);
}
