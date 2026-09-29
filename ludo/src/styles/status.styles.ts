import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { fontSize, spacing } from '@/constants/layout';

/** Stilar för texten som berättar vems tur det är. */
export const statusStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  turn: {
    fontSize: fontSize.title,
    fontWeight: '800',
    color: palette.text,
    textAlign: 'center',
  },
  event: {
    minHeight: 20,
    fontSize: fontSize.small,
    color: palette.textMuted,
    textAlign: 'center',
  },
});
