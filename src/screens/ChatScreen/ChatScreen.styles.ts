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
        marginHorizontal: 20,
        marginBottom: 100,
        borderRadius: 14,
        // White solid background for efficient shadow rasterization
        backgroundColor: '#FFFFFF',
        // Shadow matching Figma
        shadowColor: '#FFDFA6',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.34,
        shadowRadius: 11,
        elevation: 8,
    },
    inputContainer: {
        padding: 15,
        gap: 30,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#FFDFA6',
        overflow: 'hidden', // Ensure gradient respects border radius
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: 'transparent',
        fontFamily: Fonts.book,
        fontSize: 14,
        letterSpacing: -0.14,
        color: colors.black,
    },
    sendButton: {
        width: 48,
        height: 48,
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
    },
    messageBubble: {
        maxWidth: '80%',
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 16,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
        borderBottomRightRadius: 4,
    },
    assistantMessage: {
        alignSelf: 'flex-start',
        backgroundColor: colors.surface,
        borderBottomLeftRadius: 4,
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
        marginBottom: 8,
    },
    messageTextWithImage: {
        marginTop: 4,
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
        gap: 10,
        backgroundColor: 'transparent',
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: '#FFDFA6',
        borderRadius: 28,
        paddingHorizontal: 12,
        paddingVertical: 6,
        gap: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    actionButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#FFDFA6',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
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
