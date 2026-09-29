import type { PlayerColor } from '@/types/game';

/**
 * Brädets uppbyggnad.
 *
 * Brädet är ett rutnät på 15 x 15 rutor. Den gemensamma banan är en slinga
 * på 52 rutor. Varje färg har dessutom en egen hemkolumn på fem rutor och
 * ett bo där pjäserna står innan de kommit ut.
 */

/** Antal rutor på ena sidan av brädet. */
export const GRID_SIZE = 15;

/** Antal rutor i den gemensamma slingan. */
export const TRACK_LENGTH = 52;

/** Sista steget på den gemensamma banan. Efter detta börjar hemkolumnen. */
export const LAST_TRACK_STEP = 50;

/** Första steget i hemkolumnen. */
export const FIRST_HOME_STEP = 51;

/** Steget som betyder "i mål". Kräver exakt slag. */
export const GOAL_STEP = 56;

/** Steget som betyder "pjäsen står i boet". */
export const BASE_STEP = -1;

/** Antal pjäser per spelare. */
export const TOKENS_PER_PLAYER = 4;

/** En ruta på brädet, angiven som rad och kolumn i rutnätet. */
export interface Cell {
  row: number;
  col: number;
}

/**
 * Den gemensamma banans 52 rutor i medsols ordning.
 * Index 0 är grön spelares startruta.
 */
export const TRACK: Cell[] = [
  { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 },
  { row: 6, col: 5 }, { row: 5, col: 6 }, { row: 4, col: 6 }, { row: 3, col: 6 },
  { row: 2, col: 6 }, { row: 1, col: 6 }, { row: 0, col: 6 }, { row: 0, col: 7 },
  { row: 0, col: 8 }, { row: 1, col: 8 }, { row: 2, col: 8 }, { row: 3, col: 8 },
  { row: 4, col: 8 }, { row: 5, col: 8 }, { row: 6, col: 9 }, { row: 6, col: 10 },
  { row: 6, col: 11 }, { row: 6, col: 12 }, { row: 6, col: 13 }, { row: 6, col: 14 },
  { row: 7, col: 14 }, { row: 8, col: 14 }, { row: 8, col: 13 }, { row: 8, col: 12 },
  { row: 8, col: 11 }, { row: 8, col: 10 }, { row: 8, col: 9 }, { row: 9, col: 8 },
  { row: 10, col: 8 }, { row: 11, col: 8 }, { row: 12, col: 8 }, { row: 13, col: 8 },
  { row: 14, col: 8 }, { row: 14, col: 7 }, { row: 14, col: 6 }, { row: 13, col: 6 },
  { row: 12, col: 6 }, { row: 11, col: 6 }, { row: 10, col: 6 }, { row: 9, col: 6 },
  { row: 8, col: 5 }, { row: 8, col: 4 }, { row: 8, col: 3 }, { row: 8, col: 2 },
  { row: 8, col: 1 }, { row: 8, col: 0 }, { row: 7, col: 0 }, { row: 6, col: 0 },
];

/**
 * Säkra rutor: de fyra startrutorna. Här sker ingen knuff.
 * Vi håller oss till en enda sorts säker ruta för att regeln ska vara lätt att minnas.
 */
export const SAFE_TRACK_INDICES: number[] = [0, 13, 26, 39];

/** Allt som är fast för en färg: var den startar, var boet ligger och var hemkolumnen går. */
export interface SeatConfig {
  color: PlayerColor;
  /** Svenskt namn på färgen, används i gränssnittet. */
  label: string;
  /** Index i TRACK där färgens pjäser kommer ut. */
  startIndex: number;
  /** Övre vänstra hörnet av boets 6 x 6-ruta. */
  baseOrigin: Cell;
  /** Hemkolumnens fem rutor, från den första till målrutan. */
  homeCells: Cell[];
  /** Rutan mitt i brädet där pjäsen står när den är i mål. */
  goalCell: Cell;
}

/**
 * Turordningen. Röd börjar, sedan går det medsols runt brädet.
 * Med två spelare används röd och gul, som sitter mitt emot varandra.
 */
export const SEAT_ORDER: PlayerColor[] = ['red', 'green', 'yellow', 'blue'];

export const SEATS: Record<PlayerColor, SeatConfig> = {
  red: {
    color: 'red',
    label: 'Röd',
    startIndex: 39,
    baseOrigin: { row: 9, col: 0 },
    homeCells: [13, 12, 11, 10, 9].map((row) => ({ row, col: 7 })),
    goalCell: { row: 8.2, col: 7.5 },
  },
  green: {
    color: 'green',
    label: 'Grön',
    startIndex: 0,
    baseOrigin: { row: 0, col: 0 },
    homeCells: [1, 2, 3, 4, 5].map((col) => ({ row: 7, col })),
    goalCell: { row: 7.5, col: 6.8 },
  },
  yellow: {
    color: 'yellow',
    label: 'Gul',
    startIndex: 13,
    baseOrigin: { row: 0, col: 9 },
    homeCells: [1, 2, 3, 4, 5].map((row) => ({ row, col: 7 })),
    goalCell: { row: 6.8, col: 7.5 },
  },
  blue: {
    color: 'blue',
    label: 'Blå',
    startIndex: 26,
    baseOrigin: { row: 9, col: 9 },
    homeCells: [13, 12, 11, 10, 9].map((col) => ({ row: 7, col })),
    goalCell: { row: 7.5, col: 8.2 },
  },
};

/** Platserna för de fyra pjäserna inne i ett bo, relativt boets hörn. */
export const BASE_SLOTS: Cell[] = [
  { row: 2, col: 2 },
  { row: 2, col: 4 },
  { row: 4, col: 2 },
  { row: 4, col: 4 },
];
