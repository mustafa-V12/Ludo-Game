import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { fontSize, radius, spacing } from '@/constants/layout';

/** Stilar för spelarkorten ovanför och under brädet. */
export const playerPanelStyles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 130,
    maxWidth: 220,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: palette.surfaceMuted,
    opacity: 0.65,
  },
  cardActive: {
    backgroundColor: palette.surface,
    opacity: 1,
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: palette.text,
  },
  progress: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  progressDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 2,
  },
});
