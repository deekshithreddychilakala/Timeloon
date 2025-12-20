import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const ChatStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1
    },
    suggestionsContainer: {
        flex: 1,
        padding: 27.3,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centerText: {
        fontFamily: Fonts.book,
        fontSize: 14,
        color: colors.black11,
        textAlign: 'center',
        letterSpacing: -.15
    },
    promptsContainer: {
        width: '100%',
        gap: 12,
    },
    promptButton: {
        paddingVertical: 19,
        paddingHorizontal: 21,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.black12,
        borderRadius: 14,
    },
    promptText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        letterSpacing: -0.15,
        lineHeight: 21,
        color: colors.black,
        textAlign: 'left',
    },
    inputShadowContainer: {
        borderRadius: 14,
        // White solid background for efficient shadow rasterization
        backgroundColor: colors.white,
        // Shadow matching Figma
        shadowColor: colors.yellow01,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.34,
        shadowRadius: 11,
        elevation: 8,
    },
    inputContainer: {
        minHeight: 118,
        alignContent: 'space-between',
        padding: 15,
        gap: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.yellow01,
        overflow: 'hidden', // Ensure gradient respects border radius
    },
    input: {
        // flex: 1,
        minHeight: 40,
        maxHeight: 40,
        paddingTop: 0,
        // maxHeight: 100,
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
        fontFamily: Fonts.book,
        fontSize: 14,
        letterSpacing: -0.14,
        color: colors.black,
    },
    sendButton: {
        width: 39,
        height: 39,
        backgroundColor: colors.primary,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
    sendButtonText: {
        fontFamily: Fonts.heavy,
        fontSize: 14,
        letterSpacing: -0.28,
        color: colors.black,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 27.3,
    },
    messagesContainer: {
        padding: 27.3,
        paddingTop: 20,
        gap: 28,
    },
    messageBubble: {
        maxWidth: '86%', // keep responsive, slightly wider
        // marginBottom: 28,
    },
    messageBubbleInner: {
        paddingVertical: 17,
        paddingHorizontal: 19,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.yellow01,
        gap: 8,
    },

    messageTimestamp: {
        alignSelf: 'flex-end',
        marginTop: 6,
        fontSize: 11,
        lineHeight: 14,
        color: colors.timestampColor,
    },

    messageBubbleShadowWrapper: {
        backgroundColor: colors.white,
        borderRadius: 22,
        // iOS shadow
        shadowColor: colors.black,
        shadowOpacity: 0.06,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 8 },
        // Android elevation
        elevation: 8,
        overflow: 'visible',
    },
    messageBubbleClip: {
        borderRadius: 22,
        overflow: 'hidden',
    },
    messageBubbleGradient: {
        borderRadius: 22,
    },
    userMessage: {
        alignSelf: 'flex-end',
    },
    assistantMessage: {
        alignSelf: 'flex-start',
    },
    messageText: {
        fontFamily: Fonts.book,
        fontSize: 14,
        letterSpacing: -0.14,
        lineHeight: 20,
    },
    userMessageText: {
        color: colors.black,
    },
    assistantMessageText: {
        color: colors.black03,
    },
    messageImage: {
        width: 200,
        height: 200,
        borderRadius: 12,
    },
    imagePreviewContainer: {
        position: 'relative',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    imagePreview: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    uploadProgressContainer: {
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    uploadProgressWrapper: {
        backgroundColor: 'transparent',
    },
    removeImageButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.black03,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeImageText: {
        color: colors.secondary,
        fontSize: 12,
        fontFamily: Fonts.heavy,
    },
    inputRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
        backgroundColor: 'transparent',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionButton: {
        width: 39,
        height: 39,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.yellow01,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dateSeparatorContainer: {
        alignSelf: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.black12,
        marginBottom: 12,
    },
    dateSeparatorText: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        letterSpacing: -0.1,
        color: colors.black03,
    },
    imageButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageButtonText: {
        fontSize: 24,
    },
});

export default ChatStyles;
