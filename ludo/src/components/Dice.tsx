import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { playerColors } from '@/constants/colors';
import { diceStyles } from '@/styles/dice.styles';
import type { PlayerColor } from '@/types/game';

/** Vilka av de nio punkterna som lyser för varje tärningsvärde. */
const DICE_FACES: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

interface DiceProps {
  value: number | null;
  color: PlayerColor;
  /** Sant medan tärningen rullar. Då visas slumpmässiga sidor. */
  isRolling: boolean;
  /** Sant när spelaren får kasta. Tärningen blir då tryckbar och markeras. */
  canRoll: boolean;
  onRoll: () => void;
}

/** Tärningen. Visar sex punkter och rullar en kort stund innan värdet visas. */
export function Dice({ value, color, isRolling, canRoll, onRoll }: DiceProps) {
  const [shownValue, setShownValue] = useState(value ?? 6);

  useEffect(() => {
    if (!isRolling) {
      setShownValue(value ?? 6);
      return;
    }

    // Byt sida några gånger i sekunden så att det ser ut som att tärningen rullar.
    const interval = setInterval(() => {
      setShownValue(1 + Math.floor(Math.random() * 6));
    }, 80);

    return () => clearInterval(interval);
  }, [isRolling, value]);

  const dots = DICE_FACES[shownValue] ?? DICE_FACES[6];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Kasta tärningen"
      disabled={!canRoll}
      onPress={onRoll}
      style={[
        diceStyles.dice,
        { borderColor: playerColors[color].main },
        canRoll ? diceStyles.diceReady : diceStyles.diceIdle,
      ]}
    >
      {Array.from({ length: 9 }, (_, index) => (
        <View key={index} style={diceStyles.dotSlot}>
          {dots.includes(index) ? <View style={diceStyles.dot} /> : null}
        </View>
      ))}
    </Pressable>
  );
}
