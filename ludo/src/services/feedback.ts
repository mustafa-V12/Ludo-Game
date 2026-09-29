import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Små vibrationer som svar på det som händer i spelet.
 * Webben saknar stöd, och misslyckas det är det inget som ska stoppa spelet.
 */

function isSupported(): boolean {
  return Platform.OS === 'ios' || Platform.OS === 'android';
}

/** Lätt vibration, används när tärningen kastas. */
export function tapFeedback(): void {
  if (!isSupported()) return;
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
}

/** Tydligare vibration, används vid knuff och målgång. */
export function successFeedback(): void {
  if (!isSupported()) return;
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
}
