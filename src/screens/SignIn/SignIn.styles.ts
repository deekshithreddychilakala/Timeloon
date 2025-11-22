import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export const SignInStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black3,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    title: {
        color: colors.secondary,
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 18,
    },
    card: {
        backgroundColor: colors.secondary,
        borderRadius: 8,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4,
    },
    label: {
        color: colors.black3,
        fontSize: 12,
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F4C78A',
        paddingVertical: 12,
        paddingHorizontal: 14,
        color: colors.black3,
    },
    signInButton: {
        marginTop: 18,
    },
    forgotWrap: {
        alignItems: 'center',
        marginTop: 12,
    },
    forgot: {
        color: colors.black4,
        textDecorationLine: 'underline',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 14,
    },
    small: {
        color: colors.black4,
    },
    link: {
        color: colors.black3,
        fontWeight: '700',
    },
    notice: {
        color: colors.black4,
        textAlign: 'center',
        marginTop: 28,
    },
});

export default SignInStyles;
