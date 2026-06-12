# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

BakeHelper is a cross-platform baking utility app (iOS, Android, Web) built with Expo + React Native + TypeScript. It has four tab screens: unit conversion, ingredient weight conversion, temperature conversion, and recipe portion scaling. There is no backend — all logic is client-side.

## Commands

```bash
npm start          # Expo dev server (scan QR for device)
npm run android    # Run on Android emulator/device
npm run ios        # Run on iOS simulator/device
npm run web        # Run in browser
```

No linting or test scripts are configured. TypeScript checking runs through Expo's build pipeline.

## Architecture

**Routing:** Expo Router with file-based tabs. `app/_layout.tsx` defines the tab bar; each `app/*.tsx` file is a screen.

**Data flow:** Screens own local state (controlled inputs). Results are derived/computed on render — never stored in state. No global state, no context, no API calls.

**Conversion logic lives in `lib/`:**
- `lib/units.ts` — Unit definitions for volume and weight. Each unit has a `toBase` multiplier (base units are ml and grams). Conversion formula: `value × from.toBase ÷ to.toBase`.
- `lib/ingredients.ts` — Ingredient data as `gramsPerCup` values. Cross-category conversion (volume ↔ weight) uses this density to bridge the two unit categories.
- `lib/temperature.ts` — F↔C conversion functions.
- `lib/theme.ts` — Design tokens (colors, spacing, shadows). All components import from here rather than using hardcoded values. The palette is warm/baking-themed (off-white backgrounds, orange accents).

**Components in `components/`:**
- `ConverterRow` — A paired amount input + unit dropdown. Supports a `readOnly` prop (used for output rows).
- `OptionDropdown` — A modal-based bottom-sheet picker for selecting units or ingredients.
- `DismissKeyboardScroll` — Wraps screen content; handles keyboard dismissal differently per platform (web vs native).
- `Card` — Styled container with shadow and border radius.

## Key Conventions

- Styling uses `StyleSheet.create` (React Native). No CSS, no CSS-in-JS library.
- Icons use `@expo/vector-icons` (MaterialCommunityIcons, Ionicons).
- Safe area insets via `useSafeAreaInsets()` — always apply `insets.top`/`insets.bottom` on screens with custom chrome.
- TypeScript strict mode is on (`tsconfig.json` extends `expo/tsconfig.base` with `strict: true`).
