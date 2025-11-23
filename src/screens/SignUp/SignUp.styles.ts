import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export const SignUpStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBg: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    logoElement: {
        width: 420,
        height: 420,
        marginTop: -220,
        opacity: 0.95,
        alignSelf: 'center',
    },
    safeArea: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: -120,
        color: colors.black03,
    },
    description: {
        fontSize: 16,
        color: colors.black02,
        alignSelf: 'center',
        marginTop: 6,
        marginBottom: 18,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.black03,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: colors.tertiary,
        marginTop: 8,
        fontSize: 16,
        width: '100%'
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
});

export default SignUpStyles;
