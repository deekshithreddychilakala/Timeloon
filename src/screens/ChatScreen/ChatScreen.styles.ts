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
    inputContainer: {
        paddingHorizontal: 27.3,
        paddingVertical: 12,
        backgroundColor: 'transparent',
        // borderTopWidth: 1,
        borderTopColor: colors.tertiary,
        marginBottom: 80, // space for bottom tab
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1.5,
        borderColor: '#E5AB47',
        borderRadius: 28,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    imageButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    imageButtonText: {
        fontSize: 24,
    },
});

export default ChatStyles;
