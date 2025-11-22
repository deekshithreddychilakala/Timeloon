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
import PrimaryButton from '@/components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

type Props = {
  onGetStarted?: () => void;
};

const LandingScreen: React.FC<Props> = ({ onGetStarted }) => {
  const navigation = useNavigation<any>();

  const handleGetStarted = () => {
    if (onGetStarted) return onGetStarted();
    navigation.navigate('SignIn');
  };
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
        <View style={styles.heroContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appTitle}>Timeloon</Text>

          <View style={styles.illustrationWrap}>
            <Logo />
          </View>

          <Text style={styles.hero}>Glad you're here!</Text>
          <Text style={styles.description}>
            Timeloon lets you store memories and stories in the exact context they
            belong: people.
          </Text>

          <PrimaryButton style={styles.ctaButton} title="Get Started" onPress={handleGetStarted} />
        </View>

        <Text style={styles.terms}>
          By continuing, you agree to
          {"\n"}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LandingScreen;
