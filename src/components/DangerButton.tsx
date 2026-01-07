import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Fonts } from '@/utils/fonts';

type Props = {
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
};

const cardShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
};

/**
 * DangerButton
 * Reusable danger/destructive button with red outline.
 * Used for actions like "Sign out" and "Delete Account".
 */
const DangerButton: React.FC<Props> = ({ title, onPress, style, textStyle, disabled }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
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
        padding: 16,
        borderColor: '#FC5445',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        ...cardShadow,
    },
    text: {
        color: '#FC5445',
        fontFamily: Fonts.sfProTextRegular,
        fontSize: 17,
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.6,
    },
});

export default DangerButton;
