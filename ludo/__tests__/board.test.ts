import { GOAL_STEP, SEATS, TRACK_LENGTH } from '@/constants/board';
import {
  getTokenCell,
  getTrackIndex,
  isFinished,
  isInBase,
  isInHomeLane,
  isOnTrack,
  isSafeTrackIndex,
} from '@/game/board';
import type { Token } from '@/types/game';

describe('brädets positioner', () => {
  it('steg 0 är spelarens egen startruta', () => {
    expect(getTrackIndex('red', 0)).toBe(SEATS.red.startIndex);
    expect(getTrackIndex('green', 0)).toBe(SEATS.green.startIndex);
  });

  it('banan är en slinga, så räkningen börjar om efter sista rutan', () => {
    // Röd startar på ruta 39. Efter 13 steg har vi passerat ruta 51 och börjat om.
    expect(getTrackIndex('red', 13)).toBe((39 + 13) % TRACK_LENGTH);
    expect(getTrackIndex('red', 13)).toBe(0);
  });

  it('pjäser i boet eller i hemkolumnen finns inte på den gemensamma banan', () => {
    expect(getTrackIndex('red', -1)).toBeNull();
    expect(getTrackIndex('red', 51)).toBeNull();
    expect(getTrackIndex('red', GOAL_STEP)).toBeNull();
  });

  it('de fyra startrutorna är säkra rutor', () => {
    expect(isSafeTrackIndex(0)).toBe(true);
    expect(isSafeTrackIndex(13)).toBe(true);
    expect(isSafeTrackIndex(26)).toBe(true);
    expect(isSafeTrackIndex(39)).toBe(true);
    expect(isSafeTrackIndex(7)).toBe(false);
  });

  it('varje steg hör till exakt ett läge', () => {
    expect(isInBase(-1)).toBe(true);
    expect(isOnTrack(0)).toBe(true);
    expect(isOnTrack(50)).toBe(true);
    expect(isInHomeLane(51)).toBe(true);
    expect(isInHomeLane(55)).toBe(true);
    expect(isFinished(GOAL_STEP)).toBe(true);
    expect(isInHomeLane(GOAL_STEP)).toBe(false);
  });

  it('en pjäs i boet ritas inne i sitt eget bo', () => {
    const token: Token = { id: 'blue-0', color: 'blue', index: 0, step: -1 };
    const cell = getTokenCell(token);

    // Blås bo börjar vid rad 9 och kolumn 9 och är sex rutor stort.
    expect(cell.row).toBeGreaterThanOrEqual(9);
    expect(cell.row).toBeLessThanOrEqual(15);
    expect(cell.col).toBeGreaterThanOrEqual(9);
    expect(cell.col).toBeLessThanOrEqual(15);
  });

  it('alla färger når sin hemkolumn på samma antal steg', () => {
    for (const color of ['red', 'green', 'yellow', 'blue'] as const) {
      const lastTrackCell = getTokenCell({ id: `${color}-0`, color, index: 0, step: 50 });
      const firstHomeCell = getTokenCell({ id: `${color}-0`, color, index: 0, step: 51 });

      // Rutan före hemkolumnen ska ligga direkt intill den första hemrutan.
      const distance =
        Math.abs(lastTrackCell.row - firstHomeCell.row) +
        Math.abs(lastTrackCell.col - firstHomeCell.col);
      expect(distance).toBe(1);
    }
  });
});
