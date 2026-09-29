import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { fontSize, radius, spacing } from '@/constants/layout';

/** Stilar för spelskärmen. */
export const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonLabel: {
    fontSize: fontSize.title,
    fontWeight: '800',
    color: palette.text,
  },
  textButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: palette.surface,
  },
  textButtonLabel: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: palette.text,
  },
  playerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  boardArea: {
    flex: 1,
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
});
