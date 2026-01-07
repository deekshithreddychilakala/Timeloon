import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Fonts } from '@/utils/fonts';
import colors from '@/styles/colors';

type Props = {
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
};

/**
 * SecondaryButton
 * Reusable secondary button with dark outline, used for "Go Back" actions.
 */
const SecondaryButton: React.FC<Props> = ({ title, onPress, style, textStyle, disabled }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.button, style, disabled && styles.disabled]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !!disabled }}
            disabled={disabled}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        minHeight: 50,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(37, 37, 37, 0.75)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: 17,
        letterSpacing: -0.15,
        color: 'rgba(37, 37, 37, 0.75)',
        textAlign: 'center',
        flexShrink: 1,
    },
    disabled: {
        opacity: 0.6,
    },
});

export default SecondaryButton;
