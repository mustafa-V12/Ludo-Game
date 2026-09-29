import { Fragment } from 'react';
import { Pressable, View } from 'react-native';

import { GRID_SIZE, SEATS } from '@/constants/board';
import { playerColors } from '@/constants/colors';
import { BoardBackground } from '@/components/BoardBackground';
import { TokenPiece } from '@/components/TokenPiece';
import { getTokenCell } from '@/game/board';
import { boardStyles } from '@/styles/board.styles';
import type { Token } from '@/types/game';

interface BoardProps {
  size: number;
  tokens: Token[];
  /** Pjäser som går att flytta just nu. De markeras och går att trycka på. */
  movableTokenIds: string[];
  onSelectToken: (tokenId: string) => void;
}

/** Pjäsens plats på skärmen, uträknad från dess ruta på brädet. */
interface PlacedToken {
  token: Token;
  left: number;
  top: number;
  centerX: number;
  centerY: number;
}

/**
 * Storlekarna som brädet räknas ut från: en ruta, och pjäsens bredd och höjd.
 * Samlade i en funktion så att brädet och pjäserna alltid använder samma mått.
 */
function getSizes(boardSize: number) {
  const cellSize = boardSize / GRID_SIZE;
  const tokenWidth = cellSize * 0.9;
  return { cellSize, tokenWidth, tokenHeight: tokenWidth * 1.3 };
}

/**
 * Lägger pjäserna på rätt plats och sprider ut dem något
 * när flera pjäser står på samma ruta.
 */
function placeTokens(tokens: Token[], size: number): PlacedToken[] {
  const { cellSize, tokenWidth, tokenHeight } = getSizes(size);

  // Gruppera pjäser som står på exakt samma ruta.
  const groups = new Map<string, Token[]>();
  for (const token of tokens) {
    const cell = getTokenCell(token);
    const key = `${cell.row.toFixed(2)},${cell.col.toFixed(2)}`;
    groups.set(key, [...(groups.get(key) ?? []), token]);
  }

  const placed: PlacedToken[] = [];

  for (const group of groups.values()) {
    const spread = Math.min(0.3, 1.1 / group.length);

    group.forEach((token, index) => {
      const cell = getTokenCell(token);
      const offset = group.length > 1 ? (index - (group.length - 1) / 2) * spread : 0;
      const centerX = (cell.col + offset) * cellSize;
      const centerY = cell.row * cellSize;

      placed.push({
        token,
        centerX,
        centerY,
        left: centerX - tokenWidth / 2,
        // Pjäsens spets ska peka på rutans mitt, därför dras nästan hela höjden bort.
        top: centerY - tokenHeight * 0.9,
      });
    });
  }

  return placed;
}

/** Brädet med alla pjäser ovanpå. */
export function Board({ size, tokens, movableTokenIds, onSelectToken }: BoardProps) {
  const { cellSize, tokenWidth } = getSizes(size);
  const placedTokens = placeTokens(tokens, size);

  return (
    <View style={[boardStyles.frame, { width: size + 12, height: size + 12 }]}>
      <BoardBackground size={size} />

      <View style={[boardStyles.tokenLayer, { width: size, height: size }]}>
        {placedTokens.map(({ token, left, top, centerX, centerY }) => {
          const isMovable = movableTokenIds.includes(token.id);
          // Ringen ritas runt pjäsens fot, alltså där den står på rutan.
          const ringSize = cellSize * 1.15;
          const haloSize = ringSize + 6;

          return (
            <Fragment key={token.id}>
              {isMovable ? (
                <>
                  <View
                    pointerEvents="none"
                    style={[
                      boardStyles.halo,
                      {
                        borderColor: playerColors[token.color].main,
                        left: centerX - haloSize / 2,
                        top: centerY - haloSize / 2,
                        width: haloSize,
                        height: haloSize,
                        borderRadius: haloSize / 2,
                      },
                    ]}
                  />
                  <View
                    pointerEvents="none"
                    style={[
                      boardStyles.highlight,
                      {
                        left: centerX - ringSize / 2,
                        top: centerY - ringSize / 2,
                        width: ringSize,
                        height: ringSize,
                        borderRadius: ringSize / 2,
                      },
                    ]}
                  />
                </>
              ) : null}

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${SEATS[token.color].label} pjäs ${token.index + 1}`}
                accessibilityState={{ disabled: !isMovable }}
                disabled={!isMovable}
                hitSlop={cellSize / 3}
                onPress={() => onSelectToken(token.id)}
                style={[
                  boardStyles.token,
                  { left, top },
                  isMovable ? { transform: [{ scale: 1.1 }] } : null,
                ]}
              >
                <TokenPiece color={token.color} size={tokenWidth} />
              </Pressable>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}
