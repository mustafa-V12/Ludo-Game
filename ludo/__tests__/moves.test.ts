import { BASE_STEP, GOAL_STEP } from '@/constants/board';
import { getTrackIndex } from '@/game/board';
import { applyMoveToTokens, findMoveForToken, getLegalMoves, hasPlayerWon } from '@/game/moves';
import { createTestGame, getToken, placeToken } from './helpers';

describe('giltiga drag', () => {
  it('en pjäs kommer bara ut ur boet på en sexa', () => {
    const game = createTestGame();

    expect(getLegalMoves(game.tokens, 'red', 3)).toHaveLength(0);
    expect(getLegalMoves(game.tokens, 'red', 6)).toHaveLength(4);
  });

  it('en pjäs som kommer ut hamnar på startrutan', () => {
    const game = createTestGame();
    const move = getLegalMoves(game.tokens, 'red', 6)[0];

    expect(move.from).toBe(BASE_STEP);
    expect(move.to).toBe(0);
  });

  it('pjäser i mål räknas inte som möjliga drag', () => {
    let game = createTestGame();
    game = placeToken(game, 'red-0', GOAL_STEP);
    game = placeToken(game, 'red-1', 10);

    const moves = getLegalMoves(game.tokens, 'red', 3);

    expect(moves.map((move) => move.tokenId)).toEqual(['red-1']);
  });
});

describe('målgång med exakt slag', () => {
  it('ett för högt slag ger inget drag', () => {
    let game = createTestGame();
    game = placeToken(game, 'red-0', 54); // två steg kvar till mål

    expect(getLegalMoves(game.tokens, 'red', 3)).toHaveLength(0);
  });

  it('exakt slag tar pjäsen i mål', () => {
    let game = createTestGame();
    game = placeToken(game, 'red-0', 54);

    const move = findMoveForToken(getLegalMoves(game.tokens, 'red', 2), 'red-0');

    expect(move?.to).toBe(GOAL_STEP);
    expect(move?.reachesGoal).toBe(true);
  });
});

describe('knuffar', () => {
  it('en motståndares pjäs knuffas hem till boet', () => {
    let game = createTestGame(['red', 'green']);
    // Grön pjäs står på ruta 20 på banan, röd pjäs står tre steg bakom.
    const greenStep = (20 - 0 + 52) % 52; // grön startar på ruta 0
    const redStep = (20 - 39 + 52) % 52 - 3;
    game = placeToken(game, 'green-0', greenStep);
    game = placeToken(game, 'red-0', redStep);

    const move = findMoveForToken(getLegalMoves(game.tokens, 'red', 3), 'red-0');
    expect(move?.capturedTokenIds).toEqual(['green-0']);

    const tokens = applyMoveToTokens(game.tokens, move!);
    expect(tokens.find((token) => token.id === 'green-0')?.step).toBe(BASE_STEP);
    expect(tokens.find((token) => token.id === 'red-0')?.step).toBe(redStep + 3);
  });

  it('ingen knuffas på en säker startruta', () => {
    let game = createTestGame(['red', 'green']);
    // Grön pjäs står still på sin egen startruta, som är säker.
    game = placeToken(game, 'green-0', 0);
    // Röd pjäs placeras tre steg före grön startruta (ruta 0).
    const redStep = (0 - 39 + 52) % 52 - 3;
    game = placeToken(game, 'red-0', redStep);

    const move = findMoveForToken(getLegalMoves(game.tokens, 'red', 3), 'red-0');

    expect(getTrackIndex('red', move!.to)).toBe(0);
    expect(move?.capturedTokenIds).toEqual([]);
  });

  it('egna pjäser knuffas aldrig utan får stå på samma ruta', () => {
    let game = createTestGame();
    game = placeToken(game, 'red-0', 10);
    game = placeToken(game, 'red-1', 7);

    const move = findMoveForToken(getLegalMoves(game.tokens, 'red', 3), 'red-1');
    expect(move?.capturedTokenIds).toEqual([]);

    const tokens = applyMoveToTokens(game.tokens, move!);
    expect(tokens.find((token) => token.id === 'red-0')?.step).toBe(10);
    expect(tokens.find((token) => token.id === 'red-1')?.step).toBe(10);
  });
});

describe('vinstkontroll', () => {
  it('spelaren har vunnit när alla fyra pjäser är i mål', () => {
    let game = createTestGame();
    ['red-0', 'red-1', 'red-2'].forEach((id) => {
      game = placeToken(game, id, GOAL_STEP);
    });

    expect(hasPlayerWon(game.tokens, 'red')).toBe(false);

    game = placeToken(game, 'red-3', GOAL_STEP);
    expect(hasPlayerWon(game.tokens, 'red')).toBe(true);
    expect(getToken(game, 'red-3').step).toBe(GOAL_STEP);
  });
});
