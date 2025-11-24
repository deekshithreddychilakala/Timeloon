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
    createButton: {
        marginTop: 20,
        alignSelf: 'center',
        minWidth: '100%'
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    small: {
        color: colors.black02,
        fontSize: 14,
    },
    link: {
        color: colors.black03,
        fontWeight: '700',
        marginLeft: 6,
    },
    notice: {
        color: colors.muted,
        alignSelf: 'center',
        marginTop: 18,
        paddingBottom: 8,
    }
    ,
    // modal picker container for iOS
    pickerOverlay: {
        // position: 'absolute',
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
    }
});

export default SignUpStyles;
