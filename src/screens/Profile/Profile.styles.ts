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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 26,
        paddingBottom: 160,
        gap: 24,
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
    editButton: {
        marginTop: 13,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.purple01,
        alignSelf: 'flex-start',
    },
    editButtonText: {
        color: colors.purple01,
        fontFamily: Fonts.heavy,
        fontSize: 12,
        letterSpacing: -0.24,
    },
    settingsSection: {
        gap: 20,
    },
    settingsTitle: {
        fontSize: 28,
        fontFamily: Fonts.sfProTextBold,
        color: colors.black,
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
        marginTop: 40,
        padding: 16,
        borderColor: '#FC5445',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        ...cardShadow,
    },
    signOutText: {
        color: '#FC5445',
        fontFamily: Fonts.sfProTextRegular,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ProfileStyles;
