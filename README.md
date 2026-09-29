# Ludo Basar

A local **Ludo** game for 2–4 players on the same phone. Built with **Expo, React Native, and TypeScript**.

No internet connection or account is required. Players simply take turns passing the phone around.

## Getting Started

Requires **Node.js 22+** and **Expo Go**.

```bash
npm install
npm start
```

Scan the QR code shown in the terminal with Expo Go.

* **Android:** Scan the QR code from Expo Go.
* **iPhone:** Scan it with the Camera app.
* Your phone and computer must be on the same Wi-Fi network.
* If the connection fails, use `npm start -- --tunnel`.
* To run the web version: `npm run web`.

## Commands

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm start`          | Start the development server       |
| `npm run android`    | Run on Android                     |
| `npm run ios`        | Run on iOS                         |
| `npm run web`        | Run in a web browser               |
| `npm test`           | Run tests                          |
| `npm run test:watch` | Run tests automatically on changes |
| `npm run typecheck`  | Check TypeScript                   |
| `npm run doctor`     | Check the Expo project             |

## Game Rules

The game uses a fixed set of Ludo rules defined in `src/game/rules.ts`.

* A **six** is required to leave the starting area.
* Rolling a six gives an **extra turn**.
* Three sixes in a row end the turn without a move.
* Landing on an opponent's piece sends it back to the starting area.
* Starting squares are **safe**.
* Multiple pieces of the same player can share a square.
* An **exact roll** is required to reach the finish.
* The first player to get all four pieces home wins.
* If no valid move is available, the turn passes automatically.

## Project Structure

```text
src/
  app/          Screens and navigation
  components/   Reusable UI components
  constants/    Fixed values and constants
  game/         Game logic and rules
  hooks/        Custom React hooks
  services/     Local storage and vibration
  styles/       Component and screen styles
  types/        Shared TypeScript types

__tests__/      Tests
assets/         Images and icons
```

### Architecture

Game logic in `src/game` is separated from the UI, making the rules easy to test and maintain.

Styles are kept in separate `*.styles.ts` files.

The game also prevents **double taps**, so rapid repeated input cannot trigger multiple dice rolls or moves.

## Planned

* Computer opponents
* Online multiplayer and accounts
* Leaderboards
* Sound effects
* Piece movement animations
