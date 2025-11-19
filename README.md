# Timeloon (Expo + TypeScript)

Minimal Expo (TypeScript) boilerplate prepared for Timeloon.

Quick start

1. Create the Expo app (if you haven't already):

```bash
npx create-expo-app@latest Timeloon --template expo-template-blank-typescript
cd Timeloon
```

2. Install dependencies (if you used the generated template, adjust as needed):

```bash
npm install
```

3. Add your environment variables (example using `app.json`/`app.config.js` or other secure methods).

4. Run the app:

```bash
npm start
# or
yarn start
```

Notes
- This repo includes:
  - `src/services/supabase/client.ts` — Supabase client + small helpers
  - `src/store/userStore.ts` and `src/store/appStore.ts` — Zustand stores
  - `tsconfig.json` — path aliases set up for `@/...`
  - Placeholder folders: `src/utils/`, `src/hooks/`, `src/types/`, `assets/`

Environment
- For simple projects, use `expo-constants` to access values from `app.config.js`.
- Keep your SUPABASE keys out of source control. Use environment variables or a secret manager.
