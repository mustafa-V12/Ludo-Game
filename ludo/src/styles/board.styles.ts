import { StyleSheet } from 'react-native';

import { palette } from '@/constants/colors';
import { radius } from '@/constants/layout';

/** Stilar för brädet och pjäslagret ovanpå det. */
export const boardStyles = StyleSheet.create({
  frame: {
    padding: 6,
    borderRadius: radius.md,
    backgroundColor: palette.boardFrame,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenLayer: {
    position: 'absolute',
    top: 6,
    left: 6,
  },
  token: {
    position: 'absolute',
  },
  /** Vit ring runt foten på en pjäs som går att flytta. */
  highlight: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  /** Färgad ring utanför den vita, så att markeringen syns på alla underlag. */
  halo: {
    position: 'absolute',
    borderWidth: 2.5,
    backgroundColor: 'transparent',
  },
});
