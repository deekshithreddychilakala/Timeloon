import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export const LandingStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: colors.background,
    },
    logoContainer: {
        width: 160,
        height: 160,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        marginBottom: 24,
    },
    logoInnerPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: colors.muted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textMuted,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
        color: colors.textPrimary,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 32,
    },
    footer: {
        position: 'absolute',
        bottom: 24,
        fontSize: 12,
        color: colors.textMuted,
    },
});
