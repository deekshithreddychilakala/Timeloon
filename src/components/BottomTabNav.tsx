import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Fonts } from '@/utils/fonts';
import colors from '@/styles/colors';

// Import tab icons - regular and gold versions
import MemoryTreeIcon from '../../assets/icons/memory_tree.svg';
import MemoryTreeIconGold from '../../assets/icons/memory_tree_gold.svg';
import ChatIcon from '../../assets/icons/ai_chat.svg';
import ChatIconGold from '../../assets/icons/ai_chat_gold.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import ProfileIconGold from '../../assets/icons/profile_gold.svg';

type TabItem = 'MemoryTree' | 'Chat' | 'Profile';

interface BottomTabNavProps {
    activeTab: TabItem;
    onTabPress: (tab: TabItem) => void;
}

const BottomTabNav: React.FC<BottomTabNavProps> = ({ activeTab, onTabPress }) => {
    const tabs: Array<{ key: TabItem; label: string; Icon: any; IconActive: any }> = [
        { key: 'MemoryTree', label: 'Memory Tree', Icon: MemoryTreeIcon, IconActive: MemoryTreeIconGold },
        { key: 'Chat', label: 'AI Chat', Icon: ChatIcon, IconActive: ChatIconGold },
        { key: 'Profile', label: 'Profile', Icon: ProfileIcon, IconActive: ProfileIconGold },
    ];

    return (
        <View style={styles.container}>
            {tabs.map(({ key, label, Icon, IconActive }) => {
                const isActive = activeTab === key;
                const ActiveIcon = isActive ? IconActive : Icon;
                return (
                    <TouchableOpacity
                        key={key}
                        style={[styles.tab, isActive && styles.activeTab]}
                        onPress={() => onTabPress(key)}
                        accessibilityRole="button"
                        accessibilityLabel={`Navigate to ${label}`}
                    >
                        <View style={styles.iconContainer}>
                            <ActiveIcon width={24} height={24} />
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
        left: '6.5%',
        right: '6.5%',
        height: 62,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 6,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.34)',
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
