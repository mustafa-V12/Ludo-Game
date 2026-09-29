import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { commonStyles } from '@/styles/common.styles';
import { rulesStyles } from '@/styles/rules.styles';

/** En regel med rubrik och förklaring. */
interface RuleItem {
  title: string;
  text: string;
}

/**
 * Reglerna i klartext. De följer inställningarna i src/game/rules.ts,
 * som också styr spellogiken och testerna.
 */
const RULE_ITEMS: RuleItem[] = [
  {
    title: 'Målet med spelet',
    text: 'Flytta dina fyra pjäser ett varv runt brädet och in i din egen hemkolumn. Först med alla fyra pjäser i mål vinner.',
  },
  {
    title: 'Ut ur boet',
    text: 'Du behöver en sexa för att flytta ut en pjäs. Pjäsen ställs då på din startruta.',
  },
  {
    title: 'Extra kast',
    text: 'En sexa ger ett extra kast. Slår du tre sexor i rad går turen vidare utan att du får flytta.',
  },
  {
    title: 'Knuff',
    text: 'Landar du på en ruta där en motståndare står åker den pjäsen tillbaka till sitt bo.',
  },
  {
    title: 'Säkra rutor',
    text: 'De fyra startrutorna är säkra och markerade med en stjärna. Där kan ingen knuffas hem.',
  },
  {
    title: 'Egna pjäser',
    text: 'Flera av dina egna pjäser får stå på samma ruta. De blockerar ingen och knuffar inte varandra.',
  },
  {
    title: 'Målgång',
    text: 'Pjäsen måste nå målrutan med exakt slag. Slår du för högt går draget inte att göra med den pjäsen.',
  },
  {
    title: 'Inga möjliga drag',
    text: 'Kan ingen av dina pjäser flyttas med det du slog går turen vidare till nästa spelare.',
  },
];

/** Regelsidan. */
export default function RulesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={commonStyles.screen} edges={['top', 'bottom']}>
      <View style={commonStyles.content}>
        <View style={commonStyles.header}>
          <Text style={commonStyles.title}>Regler</Text>
        </View>

        <ScrollView contentContainerStyle={rulesStyles.list} showsVerticalScrollIndicator={false}>
          {RULE_ITEMS.map((item) => (
            <View key={item.title} style={rulesStyles.card}>
              <Text style={rulesStyles.cardTitle}>{item.title}</Text>
              <Text style={rulesStyles.cardText}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>

        <AppButton label="Tillbaka" onPress={() => router.back()} style={rulesStyles.action} />
      </View>
    </SafeAreaView>
  );
}
