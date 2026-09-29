import { BASE_STEP, GOAL_STEP } from '@/constants/board';
import { createGame, moveToken, rollDice } from '@/game/state';
import { createTestGame, fixedDie, getToken, placeToken } from './helpers';

describe('turordning', () => {
  it('spelet börjar med att första spelaren ska kasta', () => {
    const game = createGame([
      { color: 'red', name: 'Ada' },
      { color: 'green', name: 'Bo' },
    ]);

    expect(game.phase).toBe('roll');
    expect(game.currentPlayerIndex).toBe(0);
    expect(game.dice).toBeNull();
    expect(game.tokens).toHaveLength(8);
    expect(game.tokens.every((token) => token.step === BASE_STEP)).toBe(true);
  });

  it('turen går vidare när spelaren inte har något giltigt drag', () => {
    const game = createTestGame(['red', 'green']);
    // Alla röda pjäser står i boet och en trea kan inte användas.
    const after = rollDice(game, fixedDie(3));

    expect(after.currentPlayerIndex).toBe(1);
    expect(after.phase).toBe('roll');
    expect(after.lastEvent).toEqual({ type: 'noMoves', color: 'red' });
  });

  it('en sexa ger ett extra kast efter draget', () => {
    const game = createTestGame(['red', 'green']);
    const rolled = rollDice(game, fixedDie(6));

    expect(rolled.phase).toBe('move');
    expect(rolled.legalMoves).toHaveLength(4);

    const moved = moveToken(rolled, 'red-0');

    expect(getToken(moved, 'red-0').step).toBe(0);
    expect(moved.currentPlayerIndex).toBe(0); // samma spelare igen
    expect(moved.phase).toBe('roll');
  });

  it('turen går vidare efter ett vanligt drag', () => {
    let game = createTestGame(['red', 'green']);
    game = placeToken(game, 'red-0', 5);

    const moved = moveToken(rollDice(game, fixedDie(4)), 'red-0');

    expect(getToken(moved, 'red-0').step).toBe(9);
    expect(moved.currentPlayerIndex).toBe(1);
    expect(moved.dice).toBeNull();
  });

  it('tre sexor i rad gör att turen går vidare utan drag', () => {
    let game = createTestGame(['red', 'green']);
    game = placeToken(game, 'red-0', 5);

    // Första sexan: pjäsen flyttas och spelaren får kasta igen.
    let state = moveToken(rollDice(game, fixedDie(6)), 'red-0');
    expect(state.sixStreak).toBe(1);

    // Andra sexan: samma sak igen.
    state = moveToken(rollDice(state, fixedDie(6)), 'red-0');
    expect(state.sixStreak).toBe(2);

    // Tredje sexan: turen går vidare direkt, inget drag utförs.
    const before = getToken(state, 'red-0').step;
    state = rollDice(state, fixedDie(6));

    expect(getToken(state, 'red-0').step).toBe(before);
    expect(state.currentPlayerIndex).toBe(1);
    expect(state.sixStreak).toBe(0);
    expect(state.lastEvent).toEqual({ type: 'threeSixes', color: 'red' });
  });

  it('turordningen går laget runt med fyra spelare', () => {
    let state = createTestGame(['red', 'green', 'yellow', 'blue']);

    for (let i = 0; i < 4; i += 1) {
      expect(state.currentPlayerIndex).toBe(i);
      state = rollDice(state, fixedDie(2)); // inga drag möjliga, turen går vidare
    }

    expect(state.currentPlayerIndex).toBe(0);
  });
});

describe('skydd mot dubbeltryck', () => {
  it('det går inte att kasta två gånger i samma tur', () => {
    let game = createTestGame(['red', 'green']);
    game = placeToken(game, 'red-0', 5);

    const first = rollDice(game, fixedDie(4));
    const second = rollDice(first, fixedDie(6));

    expect(second).toBe(first); // exakt samma tillstånd tillbaka
    expect(second.dice).toBe(4);
  });

  it('det går inte att flytta en pjäs som inte har ett giltigt drag', () => {
    let game = createTestGame(['red', 'green']);
    game = placeToken(game, 'red-0', 5);

    const rolled = rollDice(game, fixedDie(4));
    const cheated = moveToken(rolled, 'red-1'); // står i boet, får inte flyttas på en fyra

    expect(cheated).toBe(rolled);
  });

  it('det går inte att flytta två gånger på samma kast', () => {
    let game = createTestGame(['red', 'green']);
    game = placeToken(game, 'red-0', 5);

    const rolled = rollDice(game, fixedDie(4));
    const moved = moveToken(rolled, 'red-0');
    const movedAgain = moveToken(moved, 'red-0');

    expect(movedAgain).toBe(moved);
    expect(getToken(movedAgain, 'red-0').step).toBe(9);
  });
});

describe('spelets slut', () => {
  it('spelet avslutas när sista pjäsen går i mål', () => {
    let game = createTestGame(['red', 'green']);
    ['red-0', 'red-1', 'red-2'].forEach((id) => {
      game = placeToken(game, id, GOAL_STEP);
    });
    game = placeToken(game, 'red-3', GOAL_STEP - 3);

    const finished = moveToken(rollDice(game, fixedDie(3)), 'red-3');

    expect(finished.winner).toBe('red');
    expect(finished.phase).toBe('finished');
    expect(finished.lastEvent).toEqual({ type: 'win', color: 'red' });
  });

  it('inget går att göra efter att spelet är slut', () => {
    let game = createTestGame(['red', 'green']);
    ['red-0', 'red-1', 'red-2'].forEach((id) => {
      game = placeToken(game, id, GOAL_STEP);
    });
    game = placeToken(game, 'red-3', GOAL_STEP - 1);

    const finished = moveToken(rollDice(game, fixedDie(1)), 'red-3');

    expect(rollDice(finished, fixedDie(6))).toBe(finished);
    expect(moveToken(finished, 'red-0')).toBe(finished);
  });
});
