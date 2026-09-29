import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { radius } from '@/constants/layout';

const DICE_SIZE = 72;

/** Stilar för tärningen och dess punkter. */
export const diceStyles = StyleSheet.create({
  dice: {
    width: DICE_SIZE,
    height: DICE_SIZE,
    padding: 8,
    borderRadius: radius.md,
    borderWidth: 3,
    backgroundColor: '#FFFDF7',
    flexDirection: 'row',
    flexWrap: 'wrap',
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  diceReady: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  diceIdle: {
    opacity: 0.55,
    transform: [{ scale: 0.94 }],
  },
  dotSlot: {
    width: '33.33%',
    height: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: palette.text,
  },
});
