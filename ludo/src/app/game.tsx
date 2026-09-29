import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, View, type LayoutChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Board } from '@/components/Board';
import { Dice } from '@/components/Dice';
import { PlayerPanel } from '@/components/PlayerPanel';
import { StatusMessage } from '@/components/StatusMessage';
import { WinnerOverlay } from '@/components/WinnerOverlay';
import { isFinished } from '@/game/board';
import { createPlayers } from '@/game/players';
import { useGame } from '@/hooks/useGame';
import { commonStyles } from '@/styles/common.styles';
import { gameStyles } from '@/styles/game.styles';
import type { Player } from '@/types/game';

/** Läser spelarna som skickades med från inställningssidan. */
function parsePlayers(raw: string | string[] | undefined): Player[] {
  if (typeof raw !== 'string') {
    return createPlayers(2);
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length >= 2 ? (parsed as Player[]) : createPlayers(2);
  } catch {
    return createPlayers(2);
  }
}

/** Spelskärmen: bräde, tärning och spelarkort. */
export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ players?: string }>();

  // Spelarlistan ska inte skapas om vid varje omritning, därför useMemo.
  const players = useMemo(() => parsePlayers(params.players), [params.players]);

  const { state, isRolling, roll, selectToken, restart, movableTokenIds, canRoll } =
    useGame(players);
  const [boardSize, setBoardSize] = useState(0);

  // Brädet ska vara kvadratiskt och fylla ytan som blir över på skärmen.
  const measureBoardArea = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setBoardSize(Math.max(0, Math.min(width, height) - 12));
  };

  const currentPlayer = state.players[state.currentPlayerIndex];
  const winner = state.winner
    ? (state.players.find((player) => player.color === state.winner) ?? null)
    : null;

  const finishedCount = (player: Player) =>
    state.tokens.filter((token) => token.color === player.color && isFinished(token.step)).length;

  return (
    <SafeAreaView style={commonStyles.screen} edges={['top', 'bottom']}>
      <View style={gameStyles.container}>
        <View style={commonStyles.header}>
          <Pressable
            accessibilityLabel="Tillbaka till menyn"
            accessibilityRole="button"
            onPress={() => router.replace('/')}
            style={gameStyles.iconButton}
          >
            <Text style={gameStyles.iconButtonLabel}>✕</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={restart}
            style={gameStyles.textButton}
          >
            <Text style={gameStyles.textButtonLabel}>Nytt spel</Text>
          </Pressable>
        </View>

        <View style={gameStyles.playerRow}>
          {state.players.map((player) => (
            <PlayerPanel
              finishedTokens={finishedCount(player)}
              isCurrent={player.color === currentPlayer.color}
              key={player.color}
              player={player}
            />
          ))}
        </View>

        <View onLayout={measureBoardArea} style={gameStyles.boardArea}>
          {boardSize > 0 ? (
            <Board
              movableTokenIds={movableTokenIds}
              onSelectToken={selectToken}
              size={boardSize}
              tokens={state.tokens}
            />
          ) : null}
        </View>

        <View style={gameStyles.footer}>
          <StatusMessage isRolling={isRolling} state={state} />

          <Dice
            canRoll={canRoll}
            color={currentPlayer.color}
            isRolling={isRolling}
            onRoll={roll}
            value={state.dice}
          />
        </View>
      </View>

      <WinnerOverlay onExit={() => router.replace('/')} onPlayAgain={restart} winner={winner} />
    </SafeAreaView>
  );
}
