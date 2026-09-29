import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { fontSize, spacing } from '@/constants/layout';

/** Stilar som flera skärmar delar på. */
export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: fontSize.heading,
    fontWeight: '800',
    color: palette.text,
  },
  subtitle: {
    fontSize: fontSize.body,
    color: palette.textMuted,
    lineHeight: 22,
  },
  sectionLabel: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: palette.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
});
