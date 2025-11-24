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
    ,
    // modal picker container for iOS
    pickerOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    pickerContainer: {
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
