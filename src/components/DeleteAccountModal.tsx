import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Fonts } from '@/utils/fonts';
import ConfirmDangerButton from './ConfirmDangerButton';
import SecondaryButton from './SecondaryButton';
import Toast from 'react-native-toast-message';

export type WarningModalType = 'deleteAccount' | 'deleteMemories';

interface WarningModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
    type?: WarningModalType;
}

const WARNING_CONTENT = {
    deleteAccount: {
        mainMessage: 'Deleting your account will permanently remove all your saved memories, including photos and personal data related to friends and family.',
        footerMessage: 'Remember, this action is irreversible.',
    },
    deleteMemories: {
        mainMessage: 'Proceeding with this action will permanently delete all stored memories. This includes all data associated with your friends and family.',
        footerMessage: 'Please note, this operation is irreversible.',
    },
};

/**
 * WarningModal
 * Reusable warning modal for destructive actions.
 * Supports different warning types: deleteAccount, deleteMemories
 */
const WarningModal: React.FC<WarningModalProps> = ({
    visible,
    onConfirm,
    onCancel,
    isLoading = false,
    type = 'deleteAccount',
}) => {
    const content = WARNING_CONTENT[type];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.overlay}>
                    <BlurView intensity={5} style={StyleSheet.absoluteFill} tint="dark" />
                    <TouchableWithoutFeedback>
                        <View style={styles.modalCard}>
                            {/* Warning Message */}
                            <View style={styles.messageContainer}>
                                <Text style={styles.warningTitle}>Warning:</Text>
                                <Text style={styles.messageText}>{'\n'}</Text>
                                <Text style={styles.messageText}>
                                    {content.mainMessage}
                                </Text>
                                <Text style={styles.messageText}>{'\n'}</Text>
                                <Text style={styles.messageText}>
                                    {content.footerMessage}
                                </Text>
                            </View>

                            {/* Buttons */}
                            <View style={styles.buttonsContainer}>
                                <ConfirmDangerButton
                                    title={isLoading ? 'Deleting...' : 'Confirm Delete'}
                                    onPress={onConfirm}
                                    disabled={isLoading}
                                />
                                <SecondaryButton
                                    title="I want to go back"
                                    onPress={onCancel}
                                    style={styles.goBackButton}
                                    disabled={isLoading}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
            {/* Toast inside Modal so it renders above the blur */}
            <Toast />
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    modalCard: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        gap: 40,
        shadowColor: '#000',
        shadowOffset: { width: -0.2, height: 2.75 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    messageContainer: {
        width: '100%',
    },
    warningTitle: {
        fontFamily: Fonts.heavy,
        fontSize: 18,
        color: 'rgba(28, 28, 30, 0.75)',
        letterSpacing: -0.15,
    },
    messageText: {
        fontFamily: Fonts.medium,
        fontSize: 15,
        color: 'rgba(28, 28, 30, 0.75)',
        letterSpacing: -0.15,
        lineHeight: 22,
    },
    buttonsContainer: {
        width: '100%',
        gap: 16,
    },
    goBackButton: {
        borderColor: 'rgba(28, 28, 30, 0.55)',
    },
});

// Export as both WarningModal and DeleteAccountModal for backward compatibility
export { WarningModal };
export default WarningModal;
