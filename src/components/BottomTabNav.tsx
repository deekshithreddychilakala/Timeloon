import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/utils/fonts';
import colors from '@/styles/colors';

import MemoryTreeIcon from '../../assets/icons/memory_tree.svg';
import MemoryTreeIconGold from '../../assets/icons/memory_tree_active.svg';
import ChatIcon from '../../assets/icons/ai_chat.svg';
import ChatIconGold from '../../assets/icons/ai_chat_active.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import ProfileIconGold from '../../assets/icons/profile_active.svg';
import { BlurView } from 'expo-blur';

type TabItem = 'MemoryTree' | 'Chat' | 'Profile';

interface BottomTabNavProps {
    activeTab: TabItem;
    onTabPress: (tab: TabItem) => void;
}

const BottomTabNav: React.FC<BottomTabNavProps> = ({
    activeTab,
    onTabPress,
}) => {
    const tabs = [
        {
            key: 'MemoryTree',
            label: 'Memory Tree',
            Icon: MemoryTreeIcon,
            IconActive: MemoryTreeIconGold,
        },
        {
            key: 'Chat',
            label: 'AI Chat',
            Icon: ChatIcon,
            IconActive: ChatIconGold,
        },
        {
            key: 'Profile',
            label: 'Profile',
            Icon: ProfileIcon,
            IconActive: ProfileIconGold,
        },
    ] as const;

    return (
        <View style={styles.wrapper}>
            {/* Shadow wrapper (DO NOT put BlurView shadow directly) */}
            <View style={styles.shadowContainer}>
                {/* Rounded container that clips blur + content */}
                <View style={styles.glassCard}>
                    {/* Backdrop blur */}
                    <BlurView
                        intensity={80} // stronger so it’s obvious
                        tint="light"
                        style={StyleSheet.absoluteFill}
                    />

                    {/* Light vertical gradient & content */}
                    <LinearGradient
                        colors={colors.tabNavGradient}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.card}
                    >
                        {/* Inner border to fake inset highlight */}
                        <View style={styles.innerBorder} />

                        <View style={styles.row}>
                            {tabs.map(({ key, label, Icon, IconActive }) => {
                                const isActive = activeTab === key;
                                const IconComp = isActive ? IconActive : Icon;

                                return (
                                    <TouchableOpacity
                                        key={key}
                                        style={styles.tab}
                                        onPress={() => onTabPress(key)}
                                        activeOpacity={0.85}
                                    >
                                        <IconComp
                                            width={22}
                                            height={22}
                                            opacity={isActive ? 1 : 0.55}
                                        />
                                        <Text
                                            style={[
                                                styles.label,
                                                isActive && styles.labelActive,
                                            ]}
                                        >
                                            {label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};

export default BottomTabNav;

const PILL_RADIUS = 24;

const styles = StyleSheet.create({
    // Positions pill above the bottom edge
    wrapper: {
        // position: 'absolute',
        // left: 26,
        // right: 26,
        // bottom: 23, // adjust with SafeArea if necessary
        alignItems: 'center',
    },

    // Shadow container – approximates your big soft glow
    shadowContainer: {
        width: '100%',
        borderRadius: PILL_RADIUS,
        // Solid (non-transparent) background to allow efficient shadow rasterization
        backgroundColor: colors.white,
        // iOS shadow
        shadowColor: colors.black,
        shadowOpacity: 0.12,
        shadowRadius: 28,
        shadowOffset: { width: 0, height: 12 },
        // Android elevation
        elevation: 18,
    },

    // Outer rounded glass card that clips blur
    glassCard: {
        borderRadius: PILL_RADIUS,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.tabNavGlassBorder,
        backgroundColor: colors.tabNavGlassBackground,
    },

    // Content pill
    card: {
        borderRadius: PILL_RADIUS,
        paddingVertical: 10,
        paddingHorizontal: 25,
        justifyContent: 'center',
    },

    innerBorder: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: PILL_RADIUS,
        borderWidth: 1,
        borderColor: colors.tabNavInnerBorder,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 32,
    },

    tab: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },

    label: {
        fontFamily: Fonts.book,
        fontSize: 10,
        color: colors.black03,
    },

    labelActive: {
        color: colors.black,
    },
});
