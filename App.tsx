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
import EditProfileScreen from './src/screens/EditProfile/EditProfile';
import AccountPasswordScreen from './src/screens/AccountPassword/AccountPassword';
import ManageMemoriesScreen from './src/screens/ManageMemories/ManageMemories';
import MainTabLayout from './src/components/MainTabLayout';
import { GlobalStyles as styles } from '@/styles/Global.styles';
import { useFonts } from 'expo-font';
import { supabase } from '@/services/supabase/client';

const Stack = createNativeStackNavigator();

type TabName = 'MemoryTree' | 'Chat' | 'Profile' | 'EditProfile' | 'AccountPassword' | 'ManageMemories';
type MainTab = 'MemoryTree' | 'Chat' | 'Profile';

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
    let wasAuthenticated = false;

    supabase
      .auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        wasAuthenticated = !!data.session;
        setIsAuthenticated(wasAuthenticated);
      })
      .catch(() => setIsAuthenticated(false));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const isNowAuthenticated = !!session?.access_token;
      setIsAuthenticated(isNowAuthenticated);

      // Only navigate to Chat on actual sign-in (not re-authentication)
      if (isNowAuthenticated && !wasAuthenticated) {
        setActiveTab('Chat');
      }
      wasAuthenticated = isNowAuthenticated;
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

  // Get the current main tab for the bottom nav
  const getCurrentMainTab = (): MainTab => {
    if (activeTab === 'EditProfile' || activeTab === 'AccountPassword' || activeTab === 'ManageMemories') {
      return 'Profile';
    }
    return activeTab as MainTab;
  };

  // Handle bottom nav tab press
  const handleMainTabPress = (tab: MainTab) => {
    setActiveTab(tab);
  };

  // Render the screen content (without bottom nav - that's in the layout)
  const renderScreenContent = () => {
    switch (activeTab) {
      case 'MemoryTree':
        return <FamilyTreeScreen onTabChange={handleTabChange} hideBottomNav />;
      case 'Profile':
        return (
          <ProfileScreen
            onTabChange={handleTabChange}
            onEditProfile={() => setActiveTab('EditProfile')}
            onAccountPassword={() => setActiveTab('AccountPassword')}
            onManageMemories={() => setActiveTab('ManageMemories')}
            hideBottomNav
          />
        );
      case 'EditProfile':
        return <EditProfileScreen onTabChange={handleTabChange} onGoBack={() => setActiveTab('Profile')} hideBottomNav />;
      case 'AccountPassword':
        return (
          <AccountPasswordScreen
            onTabChange={handleTabChange}
            onGoBack={() => setActiveTab('Profile')}
            onLogout={() => setIsAuthenticated(false)}
            hideBottomNav
          />
        );
      case 'ManageMemories':
        return (
          <ManageMemoriesScreen
            onTabChange={handleTabChange}
            onGoBack={() => setActiveTab('Profile')}
            hideBottomNav
          />
        );
      case 'Chat':
      default:
        return <ChatScreen onTabChange={handleTabChange} hideBottomNav />;
    }
  };

  // Render authenticated screen with persistent bottom nav
  const renderAuthenticatedScreen = () => {
    return (
      <MainTabLayout
        activeTab={getCurrentMainTab()}
        onTabPress={handleMainTabPress}
      >
        {renderScreenContent()}
      </MainTabLayout>
    );
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



