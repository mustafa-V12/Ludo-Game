import { Text, View } from 'react-native';

import { TOKENS_PER_PLAYER } from '@/constants/board';
import { playerColors } from '@/constants/colors';
import { playerPanelStyles } from '@/styles/playerPanel.styles';
import type { Player } from '@/types/game';

interface PlayerPanelProps {
  player: Player;
  /** Antal pjäser som är i mål. Visas som ifyllda prickar. */
  finishedTokens: number;
  isCurrent: boolean;
}

/** Ett kort per spelare som visar namn, färg och hur många pjäser som är i mål. */
export function PlayerPanel({ player, finishedTokens, isCurrent }: PlayerPanelProps) {
  const colors = playerColors[player.color];

  return (
    <View
      style={[
        playerPanelStyles.card,
        isCurrent ? { ...playerPanelStyles.cardActive, borderColor: colors.main } : null,
      ]}
    >
      <View style={[playerPanelStyles.colorDot, { backgroundColor: colors.main }]} />

      <View style={playerPanelStyles.info}>
        <Text numberOfLines={1} style={playerPanelStyles.name}>
          {player.name}
        </Text>

        <View style={playerPanelStyles.progress}>
          {Array.from({ length: TOKENS_PER_PLAYER }, (_, index) => (
            <View
              key={index}
              style={[
                playerPanelStyles.progressDot,
                { borderColor: colors.main },
                index < finishedTokens ? { backgroundColor: colors.main } : null,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
