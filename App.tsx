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
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    AvenirLight: require('./assets/fonts/Avenir-Light.ttf'),
    AvenirBook: require('./assets/fonts/Avenir-Book.ttf'),
    AvenirMedium: require('./assets/fonts/Avenir-Medium.ttf'),
    AvenirHeavy: require('./assets/fonts/Avenir-Heavy.ttf'),
    AvenirBlack: require('./assets/fonts/Avenir-Black.ttf'),
  });

  if (!loaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LandingScreen />
    </View>
  );
}

