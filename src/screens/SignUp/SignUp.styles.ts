import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const SignUpStyles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
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
        backgroundColor: colors.white,
        minHeight: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(164, 117, 239, 0.5)',
        paddingVertical: 14.75,
        paddingHorizontal: 12,
        color: colors.black,
        fontFamily: Fonts.book,
        fontSize: 16,
        letterSpacing: -.16,
        marginBottom: 20,
        shadowColor: '#FFDFA6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    createButton: {
        marginTop: 20,
        alignSelf: 'center',
        minWidth: '100%'
    },
    dobInput: {
        borderRadius: 20
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    small: {
        color: colors.black04,
        fontSize: 15,
        letterSpacing: -.15,
        fontFamily: Fonts.medium
    },
    notice: {
        color: colors.black07,
        textAlign: 'center',
        fontSize: 13,
        fontFamily: Fonts.book,
        lineHeight: 18.2,
        letterSpacing: -.13
    },
    // modal picker container for iOS
    pickerOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        padding: 0,
        margin: 0
    },
    pickerContainer: {
        alignSelf: 'stretch',
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 8,
        paddingBottom: 32,
        paddingHorizontal: 12,
    },
    signInLinkContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(164, 117, 239, 0.6)',
        paddingBottom: 3,
    },
    link: {
        color: colors.black,
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: -.15,
        fontFamily: Fonts.heavy
    }
});

export default SignUpStyles;
