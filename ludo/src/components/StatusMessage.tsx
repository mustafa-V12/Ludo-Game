import { Text, View } from 'react-native';

import { SEATS } from '@/constants/board';
import { statusStyles } from '@/styles/status.styles';
import type { GameState } from '@/types/game';

interface StatusMessageProps {
  state: GameState;
  isRolling: boolean;
}

/** Namnet på spelaren med en viss färg, så att meddelandena blir personliga. */
function nameOfColor(state: GameState, color: string): string {
  const player = state.players.find((item) => item.color === color);
  return player?.name ?? SEATS[color as keyof typeof SEATS].label;
}

/** Vad spelet väntar på just nu. */
function describeTurn(state: GameState, isRolling: boolean): string {
  if (state.winner) {
    return `${nameOfColor(state, state.winner)} har vunnit`;
  }

  const current = state.players[state.currentPlayerIndex];

  if (isRolling) {
    return 'Tärningen rullar…';
  }

  return state.phase === 'roll'
    ? `${current.name}, kasta tärningen`
    : `${current.name}, välj en pjäs`;
}

/** Det senaste som hände, i klartext. Tom sträng när det inte finns något att säga. */
function describeEvent(state: GameState): string {
  const event = state.lastEvent;
  if (!event) {
    return '';
  }

  switch (event.type) {
    case 'captured':
      return event.count === 1
        ? `${nameOfColor(state, event.by)} knuffade hem en pjäs`
        : `${nameOfColor(state, event.by)} knuffade hem ${event.count} pjäser`;
    case 'goal':
      return `${nameOfColor(state, event.color)} fick en pjäs i mål`;
    case 'noMoves':
      return `${nameOfColor(state, event.color)} kunde inte flytta, turen går vidare`;
    case 'threeSixes':
      return 'Tre sexor i rad, turen går vidare';
    default:
      return '';
  }
}

/** Texten under brädet som berättar vems tur det är och vad som hände sist. */
export function StatusMessage({ state, isRolling }: StatusMessageProps) {
  const eventText = describeEvent(state);

  return (
    <View style={statusStyles.container}>
      <Text style={statusStyles.turn}>{describeTurn(state, isRolling)}</Text>
      <Text numberOfLines={2} style={statusStyles.event}>
        {eventText}
      </Text>
    </View>
  );
}
