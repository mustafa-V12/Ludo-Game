import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { fontSize, radius, spacing } from '@/constants/layout';

/** Stilar för knappen som används på alla skärmar. */
export const buttonStyles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primary: {
    backgroundColor: palette.gold,
    borderBottomWidth: 4,
    borderBottomColor: palette.goldShadow,
  },
  secondary: {
    backgroundColor: palette.surface,
    borderBottomWidth: 4,
    borderBottomColor: palette.boardFrame,
  },
  pressed: {
    transform: [{ translateY: 2 }],
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontSize: fontSize.title,
    fontWeight: '800',
  },
  primaryLabel: {
    color: palette.goldText,
  },
  secondaryLabel: {
    color: palette.text,
  },
});
