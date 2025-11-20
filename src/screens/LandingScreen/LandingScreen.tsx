/**
 * LandingScreen
 *
 * Purpose: Minimal landing / splash screen for Timeloon. This is a simple
 * presentational screen that acts as the app entry point. No navigation or
 * business logic is included — extend as needed.
 */

import React from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/styles/colors';
import { LandingStyles as styles } from './LandingScreen.styles';
import Logo from '../../../assets/logo/timeloon_logo.svg';
import PrimaryButton from '../../components/PrimaryButton';

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
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <SafeAreaView style={styles.safeAreContainer}>
        <Text style={styles.small}>Welcome to</Text>
        <Text style={styles.title}>Timeloon</Text>

        <View style={styles.illustrationWrap}>
          <Logo width={220} height={220} />
        </View>

        <Text style={styles.hero}>Glad you're here!</Text>
        <Text style={styles.description}>
          Timeloon lets you store memories and stories in the exact context they
          belong: people.
        </Text>

        <PrimaryButton title="Get Started" onPress={() => { /* TODO */ }} />

        <Text style={styles.terms}>
          By continuing, you agree to <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LandingScreen;
