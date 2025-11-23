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
    card: {
    },
    label: {
        color: colors.black03,
        fontSize: 12,
        marginBottom: 6,
    },
    input: {
        backgroundColor: colors.secondary,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F4C78A',
        paddingVertical: 12,
        paddingHorizontal: 14,
        color: colors.black03,
    },
    signInButton: {
        marginTop: 18,
    },
    forgotWrap: {
        alignItems: 'center',
        marginTop: 12,
    },
    forgot: {
        color: colors.black04,
        textDecorationLine: 'underline',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 14,
    },
    small: {
        color: colors.black04,
    },
    link: {
        color: colors.black03,
        fontWeight: '700',
    },
    notice: {
        color: colors.black04,
        textAlign: 'center',
        marginTop: 28,
    },
});

export default SignInStyles;
