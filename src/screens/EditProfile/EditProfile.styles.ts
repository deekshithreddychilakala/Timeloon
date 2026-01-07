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

export const EditProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        backgroundColor: colors.surface,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 26,
        paddingBottom: 23,
    },
    card: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 24,
        ...cardShadow,
    },
    avatarSection: {
        alignItems: 'center',
    },
    avatarWrapper: {
        width: 112.01,
        height: 112.01,
        borderRadius: 112.01,
        borderWidth: 0.683,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        backgroundColor: colors.gray02,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
    },
    avatarImage: {
        width: 112.01,
        height: 112.01,
        borderRadius: 112.01,
    },
    avatarOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.43)',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 23,
        borderRadius: 112.01,
    },
    avatarUpdateText: {
        color: colors.white,
        fontFamily: Fonts.medium,
        fontSize: 12,
        textAlign: 'center',
    },
    changePhotoButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.purple01,
    },
    changePhotoText: {
        color: 'rgba(164, 117, 239, 0.8)',
        fontFamily: Fonts.medium,
        fontSize: 12,
    },
    formSection: {
        width: '100%',
        gap: 17,
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
    input: {
        backgroundColor: colors.white,
        minHeight: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(164, 117, 239, 0.5)',
        paddingVertical: 14.75,
        paddingHorizontal: 12,
        fontFamily: Fonts.book,
        fontSize: 16,
        letterSpacing: -0.16,
        color: colors.black,
        shadowColor: '#FFDFA6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    inputPlaceholder: {
        color: colors.black06,
    },
    dobInputContainer: {
        position: 'relative',
    },
    dobInput: {
        paddingRight: 40,
    },
    calendarIcon: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    buttonsSection: {
        width: '100%',
        gap: 16,
    },
    makeChangesButton: {
        width: '100%',
    },
    goBackButton: {
        width: '100%',
    },
    // Date picker modal
    pickerOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    pickerContainer: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 8,
        paddingBottom: 32,
        paddingHorizontal: 12,
    },
});

export default EditProfileStyles;
