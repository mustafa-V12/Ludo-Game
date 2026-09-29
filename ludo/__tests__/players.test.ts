/**
 * Tester för hur spelarna sätts ihop.
 * Färgvalet påverkar hur brädet ser ut, därför är det värt att kontrollera.
 */
import { MAX_PLAYERS, MIN_PLAYERS, createPlayers, getSeatColors } from '@/game/players';

describe('spelaruppsättning', () => {
  it('två spelare sitter mitt emot varandra', () => {
    expect(getSeatColors(2)).toEqual(['red', 'yellow']);
  });

  it('tre och fyra spelare följer turordningen runt brädet', () => {
    expect(getSeatColors(3)).toEqual(['red', 'green', 'yellow']);
    expect(getSeatColors(MAX_PLAYERS)).toEqual(['red', 'green', 'yellow', 'blue']);
  });

  it('namn som lämnas tomma får färgens namn', () => {
    const players = createPlayers(MIN_PLAYERS, { red: '  Mustafa  ', yellow: '   ' });

    expect(players).toEqual([
      { color: 'red', name: 'Mustafa' },
      { color: 'yellow', name: 'Gul' },
    ]);
  });
});
