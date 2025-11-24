import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const ResetStyles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
    },
    descMargin: {
        marginBottom: 195
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: -120,
        color: colors.black03
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
        marginBottom: 30
    },
    createButton: {
        alignSelf: 'center',
        minWidth: '100%'
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
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
    goBack: {
        alignSelf: 'center',
        marginTop: 30,
        borderWidth: 1,
        borderColor: colors.black08,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 12
    },
    goBackText: {
        color: colors.black04,
        fontSize: 15,
        fontFamily: Fonts.medium
    },
    notice: {
        color: colors.black07,
        textAlign: 'center',
        fontSize: 13,
        fontFamily: Fonts.book,
        lineHeight: 18.2,
        letterSpacing: -.13
    }
});

export default ResetStyles;
