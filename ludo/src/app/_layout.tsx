import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { palette } from '@/constants/colors';

/**
 * Appens yttersta ram.
 *
 * Alla skärmar ritar sina egna rubriker, därför är den inbyggda rubrikraden
 * avstängd. Skärmarna ligger i en stack, så tillbakaknappen fungerar som vanligt.
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: palette.background },
        }}
      />
    </SafeAreaProvider>
  );
}
