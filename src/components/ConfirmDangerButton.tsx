import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Fonts } from '@/utils/fonts';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
};

/**
 * ConfirmDangerButton
 * Reusable red filled button for confirming destructive actions.
 * Used for actions like "Confirm Delete" in modals.
 */
const ConfirmDangerButton: React.FC<Props> = ({ title, onPress, style, textStyle, disabled }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[styles.button, style, disabled && styles.disabled]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !!disabled }}
            disabled={disabled}
        >
            {/* Base red background */}
            <View style={styles.baseBackground}>
                {/* White gradient overlay on top half */}
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0)']}
                    locations={[0, 1]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.gradientOverlay}
                />
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignSelf: 'stretch',
        height: 50,
        borderRadius: 12,
        overflow: 'hidden',
    },
    baseBackground: {
        flex: 1,
        backgroundColor: '#D63B2D',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
    },
    text: {
        color: '#FFFFFF',
        fontFamily: Fonts.medium,
        fontSize: 17,
        letterSpacing: -0.17,
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.6,
    },
});

export default ConfirmDangerButton;
