/**
 * LandingScreen
 *
 * Purpose: Minimal landing / splash screen for Timeloon. This is a simple
 * presentational screen that acts as the app entry point. No navigation or
 * business logic is included — extend as needed.
 */

import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';

const LandingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.logoContainer}>
        {/* Replace with your branded asset in `assets/` */}
        <Image
          source={require('../../assets/.gitkeep')}
          style={styles.logoPlaceholder}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Timeloon</Text>
      <Text style={styles.subtitle}>Track time beautifully</Text>

      <Text style={styles.footer}>Made with ❤️</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    width: 160,
    height: 160,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    marginBottom: 24,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    opacity: 0.6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    fontSize: 12,
    color: '#999',
  },
});

export default LandingScreen;
