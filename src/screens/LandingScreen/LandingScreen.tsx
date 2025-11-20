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
import { LandingStyles as styles } from './LandingScreen.styles';

const LandingScreen: React.FC = () => {
  return (
    <LinearGradient
      // Approximate 27deg using start/end points
      start={[0.0545, 0.2735]}
      end={[0.9455, 0.7265]}
      colors={[
        'rgba(0,0,0,0.00)',
        'rgba(0,0,0,0.00)',
        'rgba(0,0,0,0.01)',
        'rgba(0,0,0,0.01)'
      ]}
      locations={[0, 0.0024, 0.0024, 0.0048]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={styles.logoContainer}>
        {/*
         Placeholder logo area. Replace the contents below with a real image
         asset when ready, for example:
           <Image source={require('../../assets/logo.png')} />
         Do NOT require non-image files (like .gitkeep) — Metro will fail to
         resolve them.
        */}
        <View style={styles.logoInnerPlaceholder}>
          <Text style={styles.logoText}>TL</Text>
        </View>
      </View>

      <Text style={styles.title}>Timeloon</Text>
      <Text style={styles.subtitle}>Track time beautifully</Text>

      <Text style={styles.footer}>Made with ❤️</Text>
    </LinearGradient>
  );
};

export default LandingScreen;
