import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Fonts } from '@/utils/fonts';
import colors from '@/styles/colors';

// Import tab icons - these should be SVG files in assets/icons/tabs
// For now using placeholders that you should replace with actual icons
import MemoryTreeIcon from '../../assets/icons/tabs/memory-tree.svg';
import ChatIcon from '../../assets/icons/tabs/chat.svg';
import ProfileIcon from '../../assets/icons/tabs/profile.svg';

type TabItem = 'MemoryTree' | 'Chat' | 'Profile';

interface BottomTabNavProps {
    activeTab: TabItem;
    onTabPress: (tab: TabItem) => void;
}

const BottomTabNav: React.FC<BottomTabNavProps> = ({ activeTab, onTabPress }) => {
    const tabs: Array<{ key: TabItem; label: string; Icon: any }> = [
        { key: 'MemoryTree', label: 'Memory Tree', Icon: MemoryTreeIcon },
        { key: 'Chat', label: 'AI Chat', Icon: ChatIcon },
        { key: 'Profile', label: 'Profile', Icon: ProfileIcon },
    ];

    return (
        <View style={styles.container}>
            {tabs.map(({ key, label, Icon }) => {
                const isActive = activeTab === key;
                return (
                    <TouchableOpacity
                        key={key}
                        style={[styles.tab, isActive && styles.activeTab]}
                        onPress={() => onTabPress(key)}
                        accessibilityRole="button"
                        accessibilityLabel={`Navigate to ${label}`}
                    >
                        <View style={styles.iconContainer}>
                            <Icon width={24} height={24} fill={isActive ? colors.black : colors.black03} />
                        </View>
                        <Text style={[styles.label, isActive && styles.activeLabel]}>{label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 23,
        left: 25.59,
        width: 338.81,
        height: 62,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 6,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.34)',
        // iOS blur effect simulation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 9.02,
        elevation: 5,
    },
    tab: {
        flex: 1,
        height: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
    },
    activeTab: {
        backgroundColor: 'rgba(255,255,255,0.12)',
    },
    iconContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontFamily: Fonts.medium,
        fontSize: 10,
        letterSpacing: -0.1,
        color: colors.black03,
    },
    activeLabel: {
        color: colors.black,
    },
});

export default BottomTabNav;
