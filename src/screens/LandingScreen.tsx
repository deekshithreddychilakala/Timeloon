/**
 * LandingScreen
 *
 * Purpose: Minimal landing / splash screen for Timeloon. This is a simple
 * presentational screen that acts as the app entry point. No navigation or
 * business logic is included — extend as needed.
 */

import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const LandingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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
  logoInnerPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#999',
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
