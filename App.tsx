/**
 * App entry point
 *
 * Purpose: Render the `LandingScreen` as the app entry point. Keep this file
 * minimal — as the app grows you can add navigation, providers (Theme, Supabase,
 * stores), and other global wrappers here.
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import LandingScreen from './src/screens/LandingScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <LandingScreen />
    </SafeAreaView>
  );
}
