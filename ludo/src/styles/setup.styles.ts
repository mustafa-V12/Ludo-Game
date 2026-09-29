import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { fontSize, radius, spacing } from '@/constants/layout';

/** Stilar för sidan där spelarna ställs in. */
export const setupStyles = StyleSheet.create({
  scroll: {
    gap: spacing.xl,
    paddingBottom: spacing.lg,
  },
  counterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  counterOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: palette.surface,
    alignItems: 'center',
  },
  counterOptionActive: {
    borderColor: palette.accent,
  },
  counterLabel: {
    fontSize: fontSize.title,
    fontWeight: '800',
    color: palette.textMuted,
  },
  counterLabelActive: {
    color: palette.text,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  colorDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    fontSize: fontSize.body,
    fontWeight: '600',
    color: palette.text,
  },
  actions: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
});
