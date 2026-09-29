import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Player } from '@/types/game';

/**
 * Lokal lagring.
 *
 * Vi sparar bara senaste spelaruppsättningen, så att namnen finns kvar nästa
 * gång appen startas. Allt är inkapslat här, så resten av appen slipper veta
 * hur lagringen fungerar.
 */

const SETUP_KEY = 'ludo.players';

/** Sparar spelarna. Misslyckas det spelar det ingen roll för spelet, så felet sväljs. */
export async function savePlayers(players: Player[]): Promise<void> {
  try {
    await AsyncStorage.setItem(SETUP_KEY, JSON.stringify(players));
  } catch {
    // Lagringen är en bekvämlighet, inte ett krav.
  }
}

/** Läser tillbaka senaste spelaruppsättningen, eller null om inget finns sparat. */
export async function loadPlayers(): Promise<Player[] | null> {
  try {
    const raw = await AsyncStorage.getItem(SETUP_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return null;
    }

    // Kontrollera formen innan vi litar på det som lästes in.
    const isPlayer = (value: unknown): value is Player =>
      typeof value === 'object' &&
      value !== null &&
      typeof (value as Player).name === 'string' &&
      typeof (value as Player).color === 'string';

    return parsed.every(isPlayer) ? (parsed as Player[]) : null;
  } catch {
    return null;
  }
}
