import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { Fonts } from '@/utils/fonts';

export const ChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 140, // space for input + bottom tab
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 27.3,
        paddingBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottomWidth: 1,
        borderBottomColor: colors.tertiary,
    },
    title: {
        fontFamily: Fonts.heavy,
        fontSize: 20,
        letterSpacing: -0.4,
        color: colors.black,
        marginBottom: 4,
    },
    subtitle: {
        fontFamily: Fonts.book,
        fontSize: 13,
        letterSpacing: -0.13,
        color: colors.black02,
    },
    content: {
        flex: 1,
        padding: 27.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: colors.black04,
        textAlign: 'center',
        marginBottom: 30,
    },
    promptsContainer: {
        width: '100%',
        gap: 12,
    },
    promptButton: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderWidth: 1,
        borderColor: colors.tertiary,
        borderRadius: 12,
    },
    promptText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        letterSpacing: -0.14,
        color: colors.black,
        textAlign: 'center',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 80, // above bottom tab
        left: 0,
        right: 0,
        paddingHorizontal: 27.3,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTopWidth: 1,
        borderTopColor: colors.tertiary,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.tertiary,
        borderRadius: 20,
        fontFamily: Fonts.book,
        fontSize: 14,
        letterSpacing: -0.14,
        color: colors.black,
        marginRight: 8,
    },
    sendButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
        alignItems: 'flex-end',
    },
    imageButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    imageButtonText: {
        fontSize: 24,
    },
});

export default ChatStyles;
