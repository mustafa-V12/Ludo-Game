import { Modal, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { TokenPiece } from '@/components/TokenPiece';
import { winnerStyles } from '@/styles/winner.styles';
import type { Player } from '@/types/game';

interface WinnerOverlayProps {
  winner: Player | null;
  onPlayAgain: () => void;
  onExit: () => void;
}

/** Rutan som visas när någon har vunnit. */
export function WinnerOverlay({ winner, onPlayAgain, onExit }: WinnerOverlayProps) {
  return (
    <Modal animationType="fade" transparent visible={winner !== null}>
      <View style={winnerStyles.backdrop}>
        <View style={winnerStyles.card}>
          {winner ? <TokenPiece color={winner.color} size={64} /> : null}

          <Text style={winnerStyles.title}>{winner?.name} vann!</Text>
          <Text style={winnerStyles.subtitle}>Alla fyra pjäser är i mål.</Text>

          <View style={winnerStyles.actions}>
            <AppButton label="Spela igen" onPress={onPlayAgain} />
            <AppButton label="Till menyn" variant="secondary" onPress={onExit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
