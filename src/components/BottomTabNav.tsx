import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Fonts } from '@/utils/fonts';
import { SvgProps } from 'react-native-svg';

import MemoryTreeIcon from '../../assets/icons/memory_tree.svg';
import MemoryTreeIconActive from '../../assets/icons/memory_tree_active.svg';
import ChatIcon from '../../assets/icons/ai_chat.svg';
import ChatIconActive from '../../assets/icons/ai_chat_active.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import ProfileIconActive from '../../assets/icons/profile_active.svg';
import { BlurView } from 'expo-blur';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type TabItem = 'MemoryTree' | 'Chat' | 'Profile';

const TAB_ORDER: TabItem[] = ['MemoryTree', 'Chat', 'Profile'];

interface BottomTabNavProps {
    activeTab: TabItem;
    onTabPress: (tab: TabItem) => void;
}

interface AnimatedTabProps {
    isActive: boolean;
    label: string;
    Icon: React.FC<SvgProps>;
    IconActive: React.FC<SvgProps>;
    onPress: () => void;
    direction: 'left' | 'right' | 'none';
}

const AnimatedTab: React.FC<AnimatedTabProps> = ({
    isActive,
    label,
    Icon,
    IconActive,
    onPress,
    direction,
}) => {
    const animProgress = useRef(new Animated.Value(isActive ? 1 : 0)).current;
    const prevActive = useRef(isActive);

    useEffect(() => {
        // Only animate if state changed
        if (prevActive.current !== isActive) {
            prevActive.current = isActive;

            Animated.timing(animProgress, {
                toValue: isActive ? 1 : 0,
                duration: 300,
                easing: Easing.bezier(0.4, 0, 0.2, 1), // Material Design easing
                useNativeDriver: false,
            }).start();
        }
    }, [isActive]);

    const IconComp = isActive ? IconActive : Icon;

    // Smooth background color transition
    const backgroundColor = animProgress.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(140, 67, 255, 0)', 'rgba(140, 67, 255, 0.1)'],
    });

    // Smooth padding transition
    const paddingHorizontal = animProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [8, 14],
    });

    // Icon scale with gentle bounce
    const iconScale = animProgress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.9, 1.05, 1],
    });

    // Label opacity - fade in during second half of animation
    const labelOpacity = animProgress.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [0, 0, 1],
    });

    // Label slide direction based on navigation direction
    const slideOffset = direction === 'left' ? 15 : direction === 'right' ? -15 : 0;
    const labelTranslateX = animProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [slideOffset, 0],
    });

    // Label scale for a subtle pop effect
    const labelScale = animProgress.interpolate({
        inputRange: [0, 0.6, 1],
        outputRange: [0.8, 0.95, 1],
    });

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Animated.View
                style={[
                    styles.tab,
                    {
                        backgroundColor,
                        paddingHorizontal,
                    }
                ]}
            >
                <Animated.View style={{ transform: [{ scale: iconScale }] }}>
                    <IconComp width={30} height={30} />
                </Animated.View>
                {isActive && (
                    <Animated.Text
                        style={[
                            styles.labelActive,
                            {
                                opacity: labelOpacity,
                                transform: [
                                    { translateX: labelTranslateX },
                                    { scale: labelScale },
                                ],
                            },
                        ]}
                    >
                        {label}
                    </Animated.Text>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

const BottomTabNav: React.FC<BottomTabNavProps> = ({
    activeTab,
    onTabPress,
}) => {
    const [prevTab, setPrevTab] = useState<TabItem>(activeTab);

    // Calculate direction based on tab indices
    const getDirection = (tabKey: TabItem): 'left' | 'right' | 'none' => {
        if (tabKey !== activeTab) return 'none';

        const currentIndex = TAB_ORDER.indexOf(activeTab);
        const prevIndex = TAB_ORDER.indexOf(prevTab);

        if (currentIndex > prevIndex) return 'left'; // Moving right, label slides from left
        if (currentIndex < prevIndex) return 'right'; // Moving left, label slides from right
        return 'none';
    };

    // Update previous tab when active tab changes
    useEffect(() => {
        if (activeTab !== prevTab) {
            // Trigger layout animation for smooth repositioning
            LayoutAnimation.configureNext({
                duration: 300,
                update: {
                    type: LayoutAnimation.Types.easeInEaseOut,
                },
            });

            // Store the previous tab for direction calculation
            const timer = setTimeout(() => {
                setPrevTab(activeTab);
            }, 350);

            return () => clearTimeout(timer);
        }
        return undefined;
    }, [activeTab]);

    const tabs = [
        {
            key: 'MemoryTree' as TabItem,
            label: 'Memory Tree',
            Icon: MemoryTreeIcon,
            IconActive: MemoryTreeIconActive,
        },
        {
            key: 'Chat' as TabItem,
            label: 'AI Chat',
            Icon: ChatIcon,
            IconActive: ChatIconActive,
        },
        {
            key: 'Profile' as TabItem,
            label: 'Profile',
            Icon: ProfileIcon,
            IconActive: ProfileIconActive,
        },
    ];

    return (
        <View style={styles.wrapper}>
            {/* Shadow wrapper */}
            <View style={styles.shadowContainer}>
                {/* Rounded container that clips blur + content */}
                <View style={styles.glassCard}>
                    {/* Backdrop blur */}
                    <BlurView
                        intensity={90}
                        tint="light"
                        style={StyleSheet.absoluteFill}
                    />

                    {/* Inner border highlight */}
                    <View style={styles.innerBorder} />

                    {/* Tab row */}
                    <View style={styles.row}>
                        {tabs.map(({ key, label, Icon, IconActive }) => (
                            <AnimatedTab
                                key={key}
                                isActive={activeTab === key}
                                label={label}
                                Icon={Icon}
                                IconActive={IconActive}
                                onPress={() => onTabPress(key)}
                                direction={getDirection(key)}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default BottomTabNav;

const PILL_RADIUS = 14;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
    },

    shadowContainer: {
        width: 340,
        borderRadius: PILL_RADIUS,
        // Base white background for the glass effect
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        // Outer shadow for depth
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
        // Android elevation
        elevation: 12,
    },

    glassCard: {
        borderRadius: PILL_RADIUS,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        paddingHorizontal: 8,
        paddingVertical: 6,
    },

    innerBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: PILL_RADIUS,
        // Inset shadow effect
        shadowColor: '#FFF',
        shadowOpacity: 0.12,
        shadowRadius: 9.56,
        shadowOffset: { width: -3.788, height: -1.47 },
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 9,
        paddingHorizontal: 8,
        borderRadius: 10,
        gap: 5,
    },

    tabActive: {
        backgroundColor: 'rgba(140, 67, 255, 0.1)',
        paddingHorizontal: 11,
        gap: 10,
    },

    labelActive: {
        fontFamily: Fonts.medium,
        fontSize: 18,
        letterSpacing: -0.1,
        color: '#8C43FF',
    },
});
