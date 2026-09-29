import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { fontSize, radius, spacing } from '@/constants/layout';

/** Stilar för rutan som visas när spelet är slut. */
export const winnerStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: palette.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: palette.background,
  },
  title: {
    fontSize: fontSize.heading,
    fontWeight: '800',
    color: palette.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.body,
    color: palette.textMuted,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});
