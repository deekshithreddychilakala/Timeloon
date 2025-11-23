import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen/LandingScreen';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';
import { GlobalStyles as styles } from '@/styles/Global.styles';
import { useFonts } from 'expo-font';
import { supabase } from '@/services/supabase/client';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    AvenirLight: require('./assets/fonts/Avenir-Light.ttf'),
    AvenirBook: require('./assets/fonts/Avenir-Book.ttf'),
    AvenirMedium: require('./assets/fonts/Avenir-Medium.ttf'),
    AvenirHeavy: require('./assets/fonts/Avenir-Heavy.ttf'),
    AvenirBlack: require('./assets/fonts/Avenir-Black.ttf'),
  });

  // null = checking, true = signed in, false = signed out
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase
      .auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setIsAuthenticated(!!data.session);
      })
      .catch(() => setIsAuthenticated(false));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.access_token);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  if (!loaded || isAuthenticated === null) return null; // avoid flash

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="Chat" component={ChatScreen} />
          ) : (
            <>
              <Stack.Screen name="Landing">
                {props => (
                  // pass onGetStarted to LandingScreen so it can navigate
                  <LandingScreen onGetStarted={() => props.navigation.navigate('SignIn')} />
                )}
              </Stack.Screen>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}



