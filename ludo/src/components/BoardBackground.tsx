import { Fragment } from 'react';
import { G, Path, Polygon, Rect, Svg } from 'react-native-svg';

import {
  GRID_SIZE,
  SAFE_TRACK_INDICES,
  SEATS,
  SEAT_ORDER,
  TRACK,
  type Cell,
} from '@/constants/board';
import { palette, playerColors } from '@/constants/colors';
import type { PlayerColor } from '@/types/game';

/** En ruta i SVG-bilden är tio enheter bred. Hela brädet blir 150 x 150. */
const CELL = 10;
const BOARD_UNITS = GRID_SIZE * CELL;

/** Vilken färg äger vilken startruta? Används för att måla startrutorna. */
const startSquareOwner = new Map<number, PlayerColor>(
  SEAT_ORDER.map((color) => [SEATS[color].startIndex, color]),
);

/** Ritar en femuddig stjärna, som markerar de säkra rutorna. */
function starPath(centerX: number, centerY: number, outer: number, inner: number): string {
  const points: string[] = [];

  for (let i = 0; i < 10; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? outer : inner;
    points.push(`${centerX + radius * Math.cos(angle)} ${centerY + radius * Math.sin(angle)}`);
  }

  return `M${points.join('L')}Z`;
}

/** Boets fyra cirkelplatser, där pjäserna står innan de kommit ut. */
function baseSlotCells(origin: Cell): Cell[] {
  return [
    { row: origin.row + 2, col: origin.col + 2 },
    { row: origin.row + 2, col: origin.col + 4 },
    { row: origin.row + 4, col: origin.col + 2 },
    { row: origin.row + 4, col: origin.col + 4 },
  ];
}

interface BoardBackgroundProps {
  size: number;
}

/**
 * Själva brädet: bon, banan, de säkra rutorna, hemkolumnerna och mitten.
 * Ritas en gång och ändras aldrig – pjäserna ligger som ett eget lager ovanpå.
 */
export function BoardBackground({ size }: BoardBackgroundProps) {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${BOARD_UNITS} ${BOARD_UNITS}`}>
      <Rect width={BOARD_UNITS} height={BOARD_UNITS} fill={palette.boardBase} />

      {/* De fyra bona */}
      {SEAT_ORDER.map((color) => {
        const seat = SEATS[color];
        const colors = playerColors[color];
        const x = seat.baseOrigin.col * CELL;
        const y = seat.baseOrigin.row * CELL;

        return (
          <G key={`base-${color}`}>
            <Rect x={x} y={y} width={6 * CELL} height={6 * CELL} fill={colors.main} />
            <Rect
              x={x + 9}
              y={y + 9}
              width={42}
              height={42}
              rx={7}
              fill={palette.boardBase}
              stroke={colors.dark}
              strokeWidth={1}
            />
            {baseSlotCells(seat.baseOrigin).map((cell, index) => (
              <Rect
                key={`slot-${color}-${index}`}
                x={cell.col * CELL - 6.2}
                y={cell.row * CELL - 6.2}
                width={12.4}
                height={12.4}
                rx={6.2}
                fill={colors.tint}
                stroke={colors.main}
                strokeWidth={1.4}
              />
            ))}
          </G>
        );
      })}

      {/* Den gemensamma banans 52 rutor */}
      {TRACK.map((cell, index) => {
        const owner = startSquareOwner.get(index);
        const isSafe = SAFE_TRACK_INDICES.includes(index);

        return (
          <Fragment key={`track-${index}`}>
            <Rect
              x={cell.col * CELL}
              y={cell.row * CELL}
              width={CELL}
              height={CELL}
              fill={owner ? playerColors[owner].main : palette.boardBase}
              stroke={palette.boardLine}
              strokeWidth={0.5}
            />
            {isSafe ? (
              <Path
                d={starPath(cell.col * CELL + 5, cell.row * CELL + 5, 3.9, 1.65)}
                fill={owner ? '#FFFFFF' : palette.boardLine}
              />
            ) : null}
          </Fragment>
        );
      })}

      {/* Hemkolumnerna */}
      {SEAT_ORDER.map((color) =>
        SEATS[color].homeCells.map((cell, index) => (
          <Rect
            key={`home-${color}-${index}`}
            x={cell.col * CELL}
            y={cell.row * CELL}
            width={CELL}
            height={CELL}
            fill={playerColors[color].main}
            stroke={playerColors[color].dark}
            strokeWidth={0.5}
          />
        )),
      )}

      {/* Mitten, där pjäserna står när de är i mål */}
      <Polygon points="60,90 90,90 75,75" fill={playerColors.red.main} />
      <Polygon points="60,60 60,90 75,75" fill={playerColors.green.main} />
      <Polygon points="60,60 90,60 75,75" fill={playerColors.yellow.main} />
      <Polygon points="90,60 90,90 75,75" fill={playerColors.blue.main} />
    </Svg>
  );
}
