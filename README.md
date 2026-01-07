# Timeloon

A personal memory companion app that helps you capture, preserve, and relive your precious moments with friends and family. Powered by AI, Timeloon lets you have conversations about your memories, making it easy to document and revisit the stories that matter most.

## Features

- **AI-Powered Chat** – Have natural conversations to capture and explore your memories
- **Memory Tree** – Visualize and organize your memories in a beautiful tree structure
- **Photo & Video Support** – Attach media to your memories
- **Family Connections** – Build your family tree and connect memories to loved ones
- **Secure & Private** – Your memories are safely stored with Supabase authentication

---

## Tech Stack

- **React Native** with **Expo**
- **TypeScript**
- **Supabase** (Authentication & Database)
- **expo-linear-gradient**, **expo-blur** for UI effects

---

## Prerequisites

Before running the app, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)
- [Android Studio](https://developer.android.com/studio) (for Android development)

---

## Running Locally

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Timeloon
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create environment variables for Supabase. You can use `app.config.js` or a `.env` file with `expo-constants`:

```javascript
// app.config.js
export default {
  expo: {
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
};
```

> ⚠️ **Never commit your Supabase keys to source control.**

### 4. Start the Development Server

```bash
npx expo start
```

---

## Running on iOS

### Using Expo Go (Quick Testing)

1. Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) on your iPhone
2. Run `npx expo start`
3. Scan the QR code with your iPhone camera

### Using iOS Simulator (macOS only)

1. Open Xcode and install an iOS Simulator
2. Run:
   ```bash
   npx expo run:ios
   ```

### Building for iOS Device

```bash
# Install the development build
npx expo run:ios --device
```

---

## Running on Android

### Using Expo Go (Quick Testing)

1. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) on your Android device
2. Run `npx expo start`
3. Scan the QR code with Expo Go app

### Using Android Emulator

1. Open Android Studio → AVD Manager → Create/Start an emulator
2. Run:
   ```bash
   npx expo run:android
   ```

### Building for Android Device

```bash
# Install the development build
npx expo run:android --device
```

---

## Publishing to App Stores

### Prerequisites for App Store Submissions

1. **Apple Developer Account** ($99/year) – [developer.apple.com](https://developer.apple.com)
2. **Google Play Developer Account** ($25 one-time) – [play.google.com/console](https://play.google.com/console)
3. **EAS CLI** installed:
   ```bash
   npm install -g eas-cli
   eas login
   ```

---

### Publishing to Apple App Store

#### 1. Configure EAS Build

```bash
eas build:configure
```

#### 2. Update app.json

Ensure your `app.json` has the required iOS configuration:

```json
{
  "expo": {
    "name": "Timeloon",
    "slug": "timeloon",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.timeloon",
      "buildNumber": "1",
      "supportsTablet": true
    }
  }
}
```

#### 3. Build for iOS

```bash
eas build --platform ios
```

#### 4. Submit to App Store

```bash
eas submit --platform ios
```

This will upload your build to App Store Connect. Then:

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Complete app metadata (description, screenshots, privacy policy)
3. Submit for review

---

### Publishing to Google Play Store

#### 1. Update app.json

Ensure your `app.json` has the required Android configuration:

```json
{
  "expo": {
    "name": "Timeloon",
    "slug": "timeloon",
    "version": "1.0.0",
    "android": {
      "package": "com.yourcompany.timeloon",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
```

#### 2. Build for Android

```bash
eas build --platform android
```

#### 3. Submit to Play Store

```bash
eas submit --platform android
```

Or manually:

1. Download the `.aab` file from [expo.dev](https://expo.dev)
2. Go to [Google Play Console](https://play.google.com/console)
3. Create a new app and upload the `.aab` file
4. Complete store listing (description, screenshots, content rating)
5. Submit for review

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/          # App screens (Chat, Profile, etc.)
├── services/         # API services (Supabase client)
├── styles/           # Global styles and colors
├── utils/            # Utility functions and fonts
├── hooks/            # Custom React hooks
└── types/            # TypeScript type definitions

assets/
├── fonts/            # Custom font files
└── icons/            # SVG icons
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key |

---

## License

This project is proprietary software. All rights reserved.

