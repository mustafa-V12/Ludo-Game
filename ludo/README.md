# Ludo Basar

Ett lokalt **Fia med knuff** för 2–4 spelare på samma mobil. Byggt med **Expo, React Native och TypeScript**.

Ingen internetanslutning eller konto krävs. Spelarna turas om och skickar mobilen mellan sig.

## Kom igång

Kräver **Node.js 22+** och **Expo Go**.

```bash
npm install
npm start
```

Skanna QR-koden i terminalen med Expo Go.

* **Android:** Skanna QR-koden från Expo Go.
* **iPhone:** Skanna med kameraappen.
* Telefon och dator behöver vara på samma Wi-Fi.
* Om anslutningen inte fungerar, använd `npm start -- --tunnel`.
* För att köra i webbläsaren: `npm run web`.

## Kommandon

| Kommando             | Beskrivning                          |
| -------------------- | ------------------------------------ |
| `npm start`          | Startar utvecklingsservern           |
| `npm run android`    | Startar Android-versionen            |
| `npm run ios`        | Startar iOS-versionen                |
| `npm run web`        | Startar webbversionen                |
| `npm test`           | Kör tester                           |
| `npm run test:watch` | Kör tester automatiskt vid ändringar |
| `npm run typecheck`  | Kontrollerar TypeScript              |
| `npm run doctor`     | Kontrollerar Expo-projektet          |

## Spelregler

Spelet använder en fast uppsättning Fia med knuff-regler som finns i `src/game/rules.ts`.

* En **sexa** krävs för att komma ut ur boet.
* En sexa ger **ett extra kast**.
* Tre sexor i rad avslutar turen utan drag.
* Landar du på en motståndares pjäs skickas den tillbaka till boet.
* Startrutorna är **säkra**.
* Egna pjäser kan stå på samma ruta.
* Målgång kräver **exakt slag**.
* Första spelaren med alla fyra pjäser i mål vinner.
* Om inga drag är möjliga går turen vidare.

## Projektstruktur

```text
src/
  app/          Skärmar och navigation
  components/   Återanvändbara UI-komponenter
  constants/    Fasta värden och konstanter
  game/         Spellogik och regler
  hooks/        Egna React-hooks
  services/     Lokal lagring och vibrationer
  styles/       Komponent- och skärmstyles
  types/        Gemensamma TypeScript-typer

__tests__/      Tester
assets/         Bilder och ikoner
```

### Arkitektur

Spellogiken i `src/game` är frikopplad från gränssnittet. Det gör reglerna enkla att testa och vidareutveckla.

Stilar hålls separerade från komponenterna i egna `*.styles.ts`-filer.

Spelet skyddar även mot **dubbeltryck**, så att snabba upprepade tryck inte kan orsaka flera kast eller drag.

## Planerat

* Datormotståndare
* Onlinespel och konton
* Topplistor
* Ljud
* Animationer
