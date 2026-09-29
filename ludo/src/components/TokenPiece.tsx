import { Circle, Ellipse, Path, Svg } from 'react-native-svg';

import { playerColors } from '@/constants/colors';
import type { PlayerColor } from '@/types/game';

interface TokenPieceProps {
  color: PlayerColor;
  size: number;
}

/**
 * Själva pjäsen, ritad som en enkel spelpjäs med skugga.
 * Komponenten vet inget om spelet, den ritar bara en pjäs i rätt färg och storlek.
 */
export function TokenPiece({ color, size }: TokenPieceProps) {
  const { main, dark } = playerColors[color];

  return (
    <Svg width={size} height={size * 1.3} viewBox="0 0 40 52">
      <Ellipse cx={20} cy={47.5} rx={10} ry={3.4} fill="rgba(0,0,0,0.25)" />
      <Path
        d="M20 47C20 47 5 31.5 5 20a15 15 0 1 1 30 0C35 31.5 20 47 20 47Z"
        fill={main}
        stroke={dark}
        strokeWidth={2.2}
      />
      <Circle cx={20} cy={20} r={8.5} fill="#FFF8EA" />
      <Circle cx={20} cy={20} r={4.6} fill={main} />
    </Svg>
  );
}
