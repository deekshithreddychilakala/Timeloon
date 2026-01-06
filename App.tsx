import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen/LandingScreen';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import ResetPassword from './src/screens/ResetPassword/ResetPassword';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';
import FamilyTreeScreen from './src/screens/FamilyTree/FamilyTree';
import ProfileScreen from './src/screens/Profile/Profile';
import { GlobalStyles as styles } from '@/styles/Global.styles';
import { useFonts } from 'expo-font';
import { supabase } from '@/services/supabase/client';

const Stack = createNativeStackNavigator();

type TabName = 'MemoryTree' | 'Chat' | 'Profile';

export default function App() {
  const [loaded] = useFonts({
    AvenirLight: require('./assets/fonts/Avenir-Light.ttf'),
    AvenirBook: require('./assets/fonts/Avenir-Book.ttf'),
    AvenirMedium: require('./assets/fonts/Avenir-Medium.ttf'),
    AvenirHeavy: require('./assets/fonts/Avenir-Heavy.ttf'),
    AvenirBlack: require('./assets/fonts/Avenir-Black.ttf'),
    SFProTextRegular: require('./assets/fonts/SF-Pro-Text-Regular.ttf'),
    SFProTextSemibold: require('./assets/fonts/SF-Pro-Text-Semibold.ttf'),
    SFProTextBold: require('./assets/fonts/SF-Pro-Text-Bold.ttf'),
  });

  // null = checking, true = signed in, false = signed out
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<TabName>('Chat');

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
      if (session?.access_token) {
        setActiveTab('Chat'); // Reset to Chat screen on sign in
      }
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const handleTabChange = (tab: TabName) => {
    setActiveTab(tab);
  };

  if (!loaded || isAuthenticated === null) return null; // avoid flash

  // Render the appropriate screen based on active tab
  const renderAuthenticatedScreen = () => {
    switch (activeTab) {
      case 'MemoryTree':
        return <FamilyTreeScreen onTabChange={handleTabChange} />;
      case 'Profile':
        return <ProfileScreen onTabChange={handleTabChange} />;
      case 'Chat':
      default:
        return <ChatScreen onTabChange={handleTabChange} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="Main">
              {() => renderAuthenticatedScreen()}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Landing">
                {props => (
                  // pass onGetStarted to LandingScreen so it can navigate
                  <LandingScreen onGetStarted={() => props.navigation.navigate('SignIn')} />
                )}
              </Stack.Screen>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </View>
  );
}



