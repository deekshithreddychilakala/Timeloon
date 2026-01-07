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

export const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        backgroundColor: colors.surface,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 31,
        paddingBottom: 23,
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 24,
        paddingVertical: 20,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        ...cardShadow,
    },
    avatarWrapper: {
        width: 112,
        height: 112,
        borderRadius: 56,
        backgroundColor: colors.gray02,
        alignItems: 'center',
        justifyContent: 'center',
        ...cardShadow,
        shadowOpacity: 0.15,
        shadowColor: colors.purple01,
        flexShrink: 0,
    },
    avatarImage: {
        width: 104,
        height: 104,
        borderRadius: 52,
    },
    userInfo: {
        flex: 1,
        gap: 6,
    },
    userName: {
        fontSize: 20,
        fontFamily: Fonts.heavy,
        letterSpacing: -0.4,
        color: colors.black,
        alignSelf: 'stretch',
    },
    userEmail: {
        fontSize: 14,
        fontFamily: Fonts.sfProTextRegular,
        color: '#8E8E93',
    },
    userDob: {
        fontSize: 14,
        fontFamily: Fonts.sfProTextRegular,
        color: '#8E8E93',
    },
    settingsSection: {
        gap: 20,
    },
    settingsTitle: {
        fontSize: 14,
        fontFamily: Fonts.book,
        color: '#555555',
    },
    settingsList: {
        gap: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 20,
        backgroundColor: colors.white,
        borderRadius: 12,
        ...cardShadow,
    },
    settingIconBg: {
        width: 44,
        height: 44,
        borderRadius: 28,
        backgroundColor: 'rgba(164, 117, 239, 0.06)',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    settingLabel: {
        flex: 1,
        fontSize: 18,
        fontFamily: Fonts.sfProTextRegular,
        color: colors.black,
    },
    chevron: {
        width: 20,
        height: 20,
        flexShrink: 0,
    },
    signOutButton: {
        width: '100%',
    },
});

export default ProfileStyles;
