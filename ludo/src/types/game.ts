/**
 * Gemensamma typer för spelet.
 *
 * Här finns inga beroenden till React eller React Native – bara ren data.
 * Det gör att spellogiken kan testas utan att något gränssnitt behöver ritas upp.
 */

/** De fyra färgerna. Ordningen styr också turordningen medsols på brädet. */
export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

/**
 * En pjäs.
 *
 * `step` är pjäsens position räknat från spelarens egen startruta:
 *  -1      = pjäsen står i boet
 *  0–50    = pjäsen är ute på den gemensamma banan (52 rutor)
 *  51–55   = pjäsen är inne i sin egen hemkolumn
 *  56      = pjäsen är i mål
 */
export interface Token {
  /** Unikt id, t.ex. "red-0". Används som nyckel i listor och i tester. */
  id: string;
  color: PlayerColor;
  /** Vilken av spelarens fyra pjäser detta är (0–3). Styr platsen i boet. */
  index: number;
  step: number;
}

/** En spelare vid bordet. */
export interface Player {
  color: PlayerColor;
  name: string;
}

/**
 * Vad spelet väntar på just nu.
 *  'roll'     = aktuell spelare ska kasta tärningen
 *  'move'     = tärningen är kastad och en pjäs ska väljas
 *  'finished' = någon har vunnit
 */
export type TurnPhase = 'roll' | 'move' | 'finished';

/** Ett möjligt drag, uträknat i förväg så att gränssnittet kan markera pjäserna. */
export interface Move {
  tokenId: string;
  from: number;
  to: number;
  /** Pjäser som knuffas hem om draget utförs. */
  capturedTokenIds: string[];
  /** Sant om draget tar pjäsen ända i mål. */
  reachesGoal: boolean;
}

/** Det senaste som hände, så att skärmen kan visa ett meddelande. */
export type GameEvent =
  | { type: 'rolled'; value: number }
  | { type: 'moved'; color: PlayerColor }
  | { type: 'captured'; by: PlayerColor; count: number }
  | { type: 'goal'; color: PlayerColor }
  | { type: 'noMoves'; color: PlayerColor }
  | { type: 'threeSixes'; color: PlayerColor }
  | { type: 'win'; color: PlayerColor };

/** Hela spelets tillstånd. Allt som behövs för att rita en skärm finns här. */
export interface GameState {
  players: Player[];
  tokens: Token[];
  /** Index i `players` för den som har turen. */
  currentPlayerIndex: number;
  /** Senaste tärningskastet, eller null innan första kastet i turen. */
  dice: number | null;
  phase: TurnPhase;
  /** Antal sexor i rad under pågående tur. Tre i rad gör att turen går vidare. */
  sixStreak: number;
  /** Drag som är giltiga just nu. Tom lista när fasen är 'roll'. */
  legalMoves: Move[];
  winner: PlayerColor | null;
  lastEvent: GameEvent | null;
}
