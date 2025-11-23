import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export const SignUpStyles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
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
