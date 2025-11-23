import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export const ChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: colors.black04,
        marginBottom: 24,
    },
    signOut: {
        backgroundColor: '#eee',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    signOutText: {
        color: colors.black03,
        fontWeight: '600',
    },
});

export default ChatStyles;
