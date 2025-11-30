import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const LandingStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexShrink: 0,
        margin: 'auto',
        textAlign: 'center',
        backgroundColor: colors.white,
        padding: 28,
        flexDirection: 'column'
    },
    safeAreContainer: {
        flex: 1,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heroContainer: {
        flex: 1,
        flexShrink: 0,
        alignItems: 'center',
    },
    ctaButton: {
        minWidth: '100%'
    },
    welcomeText: {
        marginTop: 12,
        fontWeight: '500',
        fontFamily: Fonts.light,
        fontSize: 15,
        color: colors.black02,
        marginBottom: 8,
        letterSpacing: -0.15
    },
    appTitle: {
        fontSize: 48,
        fontFamily: Fonts.black,
        fontWeight: '500',
        marginBottom: 8,
        color: colors.black03,
    },
    illustrationWrap: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hero: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.black,
        marginBottom: 20,
        fontFamily: Fonts.black
    },
    description: {
        fontSize: 17,
        color: colors.black04,
        textAlign: 'center',
        paddingHorizontal: 30,
        marginBottom: 20,
        fontFamily: Fonts.light,
        lineHeight: 25.5,
        letterSpacing: -0.17
    },
    terms: {
        marginTop: 18,
        fontSize: 13,
        color: colors.black03,
        textAlign: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
        fontFamily: Fonts.medium,
        letterSpacing: -.13
    },
    link: {
        textDecorationLine: 'underline',
        color: colors.black03,
        fontWeight: '600',
    }
});
