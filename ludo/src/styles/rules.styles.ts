import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { fontSize, radius, spacing } from '@/constants/layout';

/** Stilar för regelsidan. */
export const rulesStyles = StyleSheet.create({
  list: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    gap: spacing.xs,
  },
  cardTitle: {
    fontSize: fontSize.body,
    fontWeight: '800',
    color: palette.text,
  },
  cardText: {
    fontSize: fontSize.body,
    lineHeight: 22,
    color: palette.textMuted,
  },
  action: {
    marginTop: spacing.md,
  },
});
