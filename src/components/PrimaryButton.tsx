import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/utils/fonts';

type Props = {
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
};

/**
 * PrimaryButton
 * Reusable primary call-to-action button used across the app.
 */
const PrimaryButton: React.FC<Props> = ({ title, onPress, style, textStyle, disabled }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[styles.button, style, disabled && styles.disabled]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !!disabled }}
            disabled={disabled}
        >
            {/*
                Figma gradient: linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.00) 50%), #252525
                We approximate by using a LinearGradient overlay and a dark base color.
            */}
            <LinearGradient
                colors={[
                    'rgba(255,255,255,0.3)',
                    'rgba(255,255,255,0.0)',
                ]}
                locations={[0, 0.5]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={[StyleSheet.absoluteFillObject, styles.gradientElement]}
            />
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#252525',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
        minWidth: 200,
    },
    gradientElement: {
        borderRadius: 12
    },
    text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        fontFamily: Fonts.medium,
        letterSpacing: -0.17
    },
    disabled: {
        opacity: 0.6,
    },
});

export default PrimaryButton;
