import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { playerColors } from '@/constants/colors';
import { MAX_PLAYERS, MIN_PLAYERS, createPlayers, getDefaultName, getSeatColors } from '@/game/players';
import { loadPlayers, savePlayers } from '@/services/storage';
import { commonStyles } from '@/styles/common.styles';
import { setupStyles } from '@/styles/setup.styles';
import type { PlayerColor } from '@/types/game';

/** Sidan där man väljer antal spelare och skriver in namn. */
export default function SetupScreen() {
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState<Partial<Record<PlayerColor, string>>>({});

  // Fyll i namnen från förra spelet, om det finns några sparade.
  useEffect(() => {
    let isActive = true;

    loadPlayers().then((stored) => {
      if (!isActive || !stored?.length) {
        return;
      }

      const storedNames: Partial<Record<PlayerColor, string>> = {};
      stored.forEach((player) => {
        storedNames[player.color] = player.name;
      });

      setNames(storedNames);
      setPlayerCount(Math.min(Math.max(stored.length, MIN_PLAYERS), MAX_PLAYERS));
    });

    return () => {
      isActive = false;
    };
  }, []);

  const colors = getSeatColors(playerCount);

  const startGame = () => {
    const players = createPlayers(playerCount, names);
    void savePlayers(players);

    router.push({
      pathname: '/game',
      params: { players: JSON.stringify(players) },
    });
  };

  return (
    <SafeAreaView style={commonStyles.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={commonStyles.screen}
      >
        <View style={commonStyles.content}>
          <View style={commonStyles.header}>
            <Text style={commonStyles.title}>Vilka spelar?</Text>
          </View>

          <ScrollView
            contentContainerStyle={setupStyles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text style={commonStyles.sectionLabel}>Antal spelare</Text>
              <View style={setupStyles.counterRow}>
                {[2, 3, 4].map((count) => (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: playerCount === count }}
                    key={count}
                    onPress={() => setPlayerCount(count)}
                    style={[
                      setupStyles.counterOption,
                      playerCount === count ? setupStyles.counterOptionActive : null,
                    ]}
                  >
                    <Text
                      style={[
                        setupStyles.counterLabel,
                        playerCount === count ? setupStyles.counterLabelActive : null,
                      ]}
                    >
                      {count}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View>
              <Text style={commonStyles.sectionLabel}>Namn</Text>
              {colors.map((color, index) => (
                <View key={color} style={setupStyles.nameRow}>
                  <View style={[setupStyles.colorDot, { backgroundColor: playerColors[color].main }]} />
                  <TextInput
                    accessibilityLabel={`Namn för spelare ${index + 1}`}
                    maxLength={14}
                    onChangeText={(text) => setNames((current) => ({ ...current, [color]: text }))}
                    placeholder={getDefaultName(color)}
                    placeholderTextColor="#9A93C4"
                    style={setupStyles.input}
                    value={names[color] ?? ''}
                  />
                </View>
              ))}
            </View>

            <Text style={commonStyles.subtitle}>
              Alla spelar på samma mobil. Skicka runt telefonen när turen går vidare.
            </Text>
          </ScrollView>

          <View style={setupStyles.actions}>
            <AppButton label="Starta spelet" onPress={startGame} />
            <AppButton label="Tillbaka" variant="secondary" onPress={() => router.back()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
