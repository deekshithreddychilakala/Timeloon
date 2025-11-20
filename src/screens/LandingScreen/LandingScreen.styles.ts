import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export const LandingStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexShrink: 0,
        alignItems: 'center',
        // justifyContent: 'center',
        // padding: 0,
        backgroundColor: colors.background,
    },
    logoContainer: {
        width: 160,
        height: 160,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: colors.surface,
        marginBottom: 24,
        marginTop: 24,
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
        marginTop: '5%',
        color: colors.textPrimary,
    },
    small: {
        marginTop: 12,
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    illustrationWrap: {
        marginTop: 12,
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hero: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.textPrimary,
        marginTop: 8,
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 28,
        marginBottom: 20,
    },
    terms: {
        marginTop: 18,
        fontSize: 12,
        color: colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    link: {
        textDecorationLine: 'underline',
        color: colors.textPrimary,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 24,
        fontSize: 12,
        color: colors.textMuted,
    },
});
