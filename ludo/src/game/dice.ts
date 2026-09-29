import { DICE_MAX, DICE_MIN } from '@/game/rules';

/**
 * Tärningen.
 *
 * Slumpen skickas in som en funktion i stället för att anropas direkt.
 * Då kan testerna ge ett bestämt värde och kontrollera reglerna exakt.
 */
export type RandomSource = () => number;

/** Kastar tärningen och ger ett heltal mellan 1 och 6. */
export function rollDie(random: RandomSource = Math.random): number {
  const span = DICE_MAX - DICE_MIN + 1;
  return DICE_MIN + Math.floor(random() * span);
}

/** Skapar en tärning som ger värdena i listan i tur och ordning. Används i tester. */
export function createSequenceRoller(values: number[]): () => number {
  let callCount = 0;
  return () => {
    const value = values[callCount % values.length];
    callCount += 1;
    return value;
  };
}
