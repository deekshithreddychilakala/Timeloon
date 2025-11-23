import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const SignInStyles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.secondary,
        overflow: 'hidden',
        // position: 'relative'
    },
    gradientBg: {
        flex: 1,
        height: '100%',
        padding: 26
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoElement: {
        position: 'absolute'
    },
    title: {
        color: colors.black,
        fontFamily: Fonts.heavy,
        fontSize: 32,
        letterSpacing: -.64,
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'center'
    },
    description: {
        color: colors.black03,
        fontFamily: Fonts.book,
        fontSize: 16,
        letterSpacing: -.16,
        fontWeight: '500',
        marginBottom: 98,
        textAlign: 'center'
    },
    label: {
        color: colors.black05,
        fontSize: 14,
        fontFamily: Fonts.heavy,
        letterSpacing: -.14,
        marginBottom: 10,
        fontWeight: '800'
    },
    input: {
        backgroundColor: colors.secondary,
        minHeight: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.yellow01,
        paddingVertical: 14.75,
        paddingHorizontal: 21.5,
        color: colors.black06,
        fontFamily: Fonts.medium,
        fontSize: 16,
        letterSpacing: -.16,
        marginBottom: 20
    },
    passwordInput: {
        marginBottom: 30
    },
    forgotWrap: {
        alignItems: 'center',
        marginTop: 26,
    },
    linkContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.textUnderlineColor,
        paddingBottom: 4,
    },
    forgot: {
        color: colors.black02,
        fontSize: 13,
        fontWeight: '500',
        fontFamily: Fonts.medium
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 14,
    },
    small: {
        color: colors.black04,
        fontSize: 15,
        letterSpacing: -.15,
        fontFamily: Fonts.medium
    },
    createAccLinkContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.yellow01,
        paddingBottom: 3,
    },
    link: {
        color: colors.black,
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: -.15,
        fontFamily: Fonts.heavy
    },
    notice: {
        color: colors.black07,
        textAlign: 'center',
        fontSize: 13,
        fontFamily: Fonts.book,
        lineHeight: 18.2,
        letterSpacing: -.13
    },
});

export default SignInStyles;
