import { StyleSheet } from 'react-native';

export const LandingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    logoContainer: {
        width: 160,
        height: 160,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        marginBottom: 24,
    },
    logoInnerPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#999',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    footer: {
        position: 'absolute',
        bottom: 24,
        fontSize: 12,
        color: '#999',
    },
});
