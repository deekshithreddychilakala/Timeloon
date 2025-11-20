/**
 * App entry point
 *
 * Purpose: Render the `LandingScreen` as the app entry point. Keep this file
 * minimal — as the app grows you can add navigation, providers (Theme, Supabase,
 * stores), and other global wrappers here.
 */

import { StatusBar, View } from 'react-native';
import LandingScreen from './src/screens/LandingScreen/LandingScreen';
import { GlobalStyles as styles } from '@/styles/Global.styles';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LandingScreen />
    </View>
  );
}
