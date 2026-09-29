import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { fontSize, spacing } from '@/constants/layout';

/** Stilar för startsidan. */
export const homeStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    fontSize: fontSize.display,
    fontWeight: '800',
    color: palette.text,
    textAlign: 'center',
  },
  tagline: {
    fontSize: fontSize.body,
    color: palette.textMuted,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 22,
  },
  pieces: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actions: {
    gap: spacing.md,
  },
});
