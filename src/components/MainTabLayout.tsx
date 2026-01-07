import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNav from './BottomTabNav';
import AppBackground from './AppBackground';

type TabItem = 'MemoryTree' | 'Chat' | 'Profile';

interface MainTabLayoutProps {
    activeTab: TabItem;
    onTabPress: (tab: TabItem) => void;
    children: React.ReactNode;
}

/**
 * A layout wrapper that keeps the BottomTabNav persistent across tab switches.
 * This ensures smooth animations when switching tabs since the nav component
 * doesn't unmount/remount.
 */
const MainTabLayout: React.FC<MainTabLayoutProps> = ({
    activeTab,
    onTabPress,
    children,
}) => {
    return (
        <AppBackground>
            <View style={styles.container}>
                {/* Screen content */}
                <View style={styles.content}>
                    {children}
                </View>

                {/* Persistent bottom navigation */}
                <View style={styles.navContainer}>
                    <BottomTabNav activeTab={activeTab} onTabPress={onTabPress} />
                </View>
            </View>
        </AppBackground>
    );
};

export default MainTabLayout;

// Nav height is approximately 48px (padding + icon)
const NAV_HEIGHT = 48;
const NAV_BOTTOM_OFFSET = 23;
const CONTENT_GAP = 16;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingBottom: NAV_HEIGHT + CONTENT_GAP + NAV_BOTTOM_OFFSET,
    },
    navContainer: {
        position: 'absolute',
        bottom: NAV_BOTTOM_OFFSET,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});
