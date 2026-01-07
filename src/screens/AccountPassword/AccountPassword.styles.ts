import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

const cardShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
};

export const AccountPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        backgroundColor: 'transparent',
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 31,
        paddingBottom: 23,
    },
    card: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 24,
        ...cardShadow,
    },
    topSection: {
        width: '100%',
        gap: 20,
    },
    inputContainer: {
        gap: 10,
        width: '100%',
    },
    label: {
        fontFamily: Fonts.heavy,
        fontSize: 14,
        letterSpacing: -0.14,
        color: 'rgba(28, 28, 30, 0.85)',
        paddingLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        minHeight: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(164, 117, 239, 0.5)',
        paddingVertical: 14.75,
        paddingHorizontal: 12,
        shadowColor: '#FFDFA6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    input: {
        flex: 1,
        fontFamily: Fonts.book,
        fontSize: 16,
        letterSpacing: -0.16,
        color: colors.black,
        padding: 0,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    helperText: {
        fontFamily: Fonts.medium,
        fontSize: 15,
        letterSpacing: -0.15,
        color: 'rgba(28, 28, 30, 0.75)',
        lineHeight: 22,
    },
    resetButton: {
        width: '100%',
    },
    buttonsSection: {
        width: '100%',
        gap: 16,
    },
    dangerButton: {
        width: '100%',
    },
    goBackButton: {
        width: '100%',
    },
});

export default AccountPasswordStyles;
