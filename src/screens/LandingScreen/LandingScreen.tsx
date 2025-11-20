/**
 * LandingScreen
 *
 * Purpose: Minimal landing / splash screen for Timeloon. This is a simple
 * presentational screen that acts as the app entry point. No navigation or
 * business logic is included — extend as needed.
 */

import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/styles/colors';
import { LandingStyles as styles } from './LandingScreen.styles';
import Logo from '../../../assets/timeloon_logo.svg';

const LandingScreen: React.FC = () => {
  return (
    <LinearGradient
      // Gradient comes from central color tokens
      start={colors.landingScreenBG_Gradient.start}
      end={colors.landingScreenBG_Gradient.end}
      colors={colors.landingScreenBG_Gradient.colors}
      locations={colors.landingScreenBG_Gradient.locations}
      style={styles.container}
    >
      {/* <SafeAreaView> */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <Text style={styles.title}>Timeloon</Text>
      <Text style={styles.subtitle}>Track time beautifully</Text>
      {/* LOGO PLACEHOLDER */}
      <View style={styles.logoContainer}>
        <Logo width={120} height={120} />
      </View>
      <Text style={styles.footer}>Made with code</Text>
      {/* </SafeAreaView> */}
    </LinearGradient>
  );
};

export default LandingScreen;
