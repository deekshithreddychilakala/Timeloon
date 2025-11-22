import 'react-native-url-polyfill/auto';
import React, { useRef, useState, useEffect } from 'react';
import { StatusBar, View, Animated, StyleSheet } from 'react-native';
import LandingScreen from './src/screens/LandingScreen/LandingScreen';
import SignIn from './src/screens/SignIn/SignIn';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';
import { GlobalStyles as styles } from '@/styles/Global.styles';
import { useFonts } from 'expo-font';
import { supabase } from '@/services/supabase/client';

export default function App() {
  const [loaded] = useFonts({
    AvenirLight: require('./assets/fonts/Avenir-Light.ttf'),
    AvenirBook: require('./assets/fonts/Avenir-Book.ttf'),
    AvenirMedium: require('./assets/fonts/Avenir-Medium.ttf'),
    AvenirHeavy: require('./assets/fonts/Avenir-Heavy.ttf'),
    AvenirBlack: require('./assets/fonts/Avenir-Black.ttf'),
  });

  const [screen, setScreen] = useState<'landing' | 'signin' | 'chat'>('landing');
  const anim = useRef(new Animated.Value(1)).current; // 1 = landing visible

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) setScreen('chat');
      else setScreen('landing');
    }).catch(() => setScreen('landing'));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token) setScreen('chat');
      else setScreen('landing');
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: screen === 'landing' ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [screen, anim]);

  if (!loaded) return null;

  const landingOpacity = anim;
  const nonLandingOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Animated.View style={[StyleSheet.absoluteFill, { opacity: landingOpacity }]} pointerEvents={screen === 'landing' ? 'auto' : 'none'}>
        <LandingScreen />
      </Animated.View>

      <Animated.View style={[StyleSheet.absoluteFill, { opacity: nonLandingOpacity }]} pointerEvents={screen === 'chat' ? 'auto' : 'none'}>
        {screen === 'signin' ? <SignIn /> : <ChatScreen />}
      </Animated.View>
    </View>
  );
}
import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './src/screens/LandingScreen/LandingScreen';
import SignIn from './src/screens/SignIn/SignIn';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';
import { GlobalStyles as styles } from '@/styles/Global.styles';
import { useFonts } from 'expo-font';
import { supabase } from '@/services/supabase/client';

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    AvenirLight: require('./assets/fonts/Avenir-Light.ttf'),
    AvenirBook: require('./assets/fonts/Avenir-Book.ttf'),
    AvenirMedium: require('./assets/fonts/Avenir-Medium.ttf'),
    AvenirHeavy: require('./assets/fonts/Avenir-Heavy.ttf'),
    AvenirBlack: require('./assets/fonts/Avenir-Black.ttf'),
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    // Check existing session on app start
    supabase
      .auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setIsAuthenticated(!!data.session);
      })
      .catch(() => setIsAuthenticated(false));

    // Listen for auth changes (sign in / sign out)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.access_token);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  if (!loaded || isAuthenticated === null) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          {isAuthenticated ? (
            <Stack.Screen name="Chat" component={ChatScreen} />
          ) : (
            <>
              <Stack.Screen name="Landing" component={LandingScreen} />
              <Stack.Screen name="SignIn" component={SignIn} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}


