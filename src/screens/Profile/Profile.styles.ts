import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 27.3,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontFamily: Fonts.heavy,
        fontSize: 16,
        letterSpacing: -0.32,
        color: colors.black,
        marginBottom: 12,
    },
    infoRow: {
        marginBottom: 12,
    },
    infoLabel: {
        fontFamily: Fonts.book,
        fontSize: 13,
        letterSpacing: -0.13,
        color: colors.black03,
        marginBottom: 4,
    },
    infoValue: {
        fontFamily: Fonts.medium,
        fontSize: 15,
        letterSpacing: -0.15,
        color: colors.black,
    },
    signOutButton: {
        marginTop: 30,
        paddingVertical: 14.1,
        paddingHorizontal: 27.3,
        backgroundColor: colors.primary,
        borderRadius: 12,
        alignItems: 'center',
    },
    signOutButtonText: {
        fontFamily: Fonts.heavy,
        fontSize: 15,
        letterSpacing: -0.3,
        color: colors.black,
    },
});

export default ProfileStyles;
