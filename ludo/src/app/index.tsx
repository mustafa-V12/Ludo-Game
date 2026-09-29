import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { TokenPiece } from '@/components/TokenPiece';
import { SEAT_ORDER } from '@/constants/board';
import { commonStyles } from '@/styles/common.styles';
import { homeStyles } from '@/styles/home.styles';

/** Startsidan. Härifrån startar man ett spel eller läser reglerna. */
export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={commonStyles.screen} edges={['top', 'bottom']}>
      <View style={[commonStyles.content, homeStyles.container]}>
        <View style={homeStyles.hero}>
          <Text style={homeStyles.title}>Ludo Basar</Text>
          <Text style={homeStyles.tagline}>Fia med knuff för 2–4 spelare på samma mobil</Text>

          <View style={homeStyles.pieces}>
            {SEAT_ORDER.map((color) => (
              <TokenPiece key={color} color={color} size={38} />
            ))}
          </View>
        </View>

        <View style={homeStyles.actions}>
          <AppButton label="Nytt spel" onPress={() => router.push('/setup')} />
          <AppButton label="Regler" variant="secondary" onPress={() => router.push('/rules')} />
        </View>
      </View>
    </SafeAreaView>
  );
}
