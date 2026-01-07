import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { AccountPasswordStyles as styles } from './AccountPassword.styles';
import BottomTabNav from '@/components/BottomTabNav';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import DangerButton from '@/components/DangerButton';
import DeleteAccountModal from '@/components/DeleteAccountModal';
import colors from '@/styles/colors';
import { GlobalStyles } from '@/styles/Global.styles';
import ShowPasswordIcon from '../../../assets/icons/show_password.svg';
import { supabase, sendPasswordReset, deleteAccount } from '@/services/supabase/client';
import Toast from 'react-native-toast-message';

interface AccountPasswordScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
    onGoBack: () => void;
    onLogout: () => void;
}

const AccountPasswordScreen: React.FC<AccountPasswordScreenProps> = ({ onTabChange, onGoBack, onLogout }) => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserEmail = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) {
                setUserEmail(user.email);
            }
        };
        fetchUserEmail();
    }, []);

    const handleResetPassword = async () => {
        if (!currentPassword) {
            Toast.show({
                type: 'error',
                text1: 'Password required',
                text2: 'Please enter your current password.',
                position: 'top',
            });
            return;
        }

        if (!userEmail) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Unable to get your email. Please try again.',
                position: 'top',
            });
            return;
        }

        setIsLoading(true);

        try {
            // Step 1: Verify current password by re-authenticating
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: userEmail,
                password: currentPassword,
            });

            if (authError) {
                Toast.show({
                    type: 'error',
                    text1: 'Incorrect password',
                    text2: 'The password you entered is incorrect.',
                    position: 'top',
                });
                setIsLoading(false);
                return;
            }

            // Step 2: Password verified, send reset email
            const resetResponse = await sendPasswordReset(userEmail);

            if (resetResponse?.error) {
                Toast.show({
                    type: 'error',
                    text1: 'Reset failed',
                    text2: resetResponse.error.message || 'Unable to send reset email.',
                    position: 'top',
                });
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Reset email sent',
                    text2: 'Check your inbox for a password reset link.',
                    position: 'top',
                    visibilityTime: 3000,
                });
                setCurrentPassword('');
                onGoBack();
            }
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error?.message || 'Something went wrong. Please try again.',
                position: 'top',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);

        try {
            const { error } = await deleteAccount();

            if (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Delete failed',
                    text2: error.message || 'Unable to delete account. Please try again.',
                    position: 'top',
                });
                setIsDeleting(false);
                return;
            }

            // Successfully deleted - close modal and logout
            setShowDeleteModal(false);
            Toast.show({
                type: 'success',
                text1: 'Account deleted',
                text2: 'Your account has been permanently deleted.',
                position: 'top',
                visibilityTime: 3000,
            });

            // Trigger logout to navigate to landing screen
            onLogout();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error?.message || 'Something went wrong. Please try again.',
                position: 'top',
            });
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <View style={styles.container}>
            <View style={[colors.mainScreensBGElement, styles.background]}>
                <View style={GlobalStyles.mainScreenTitleDescContainer}>
                    <Text style={GlobalStyles.mainScreenTitle}>Settings</Text>
                    <Text style={GlobalStyles.mainScreenDescription}>Account and Password</Text>
                </View>

                <View style={styles.contentWrapper}>
                    <View style={styles.card}>
                        {/* Top Section - Password Input */}
                        <View style={styles.topSection}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Current Password</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your current password"
                                        placeholderTextColor={colors.black06}
                                        value={currentPassword}
                                        onChangeText={setCurrentPassword}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setShowPassword(!showPassword)}
                                        activeOpacity={0.7}
                                    >
                                        <ShowPasswordIcon width={20} height={20} opacity={showPassword ? 1 : 0.5} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.helperText}>
                                To reset your password, please enter your current password before clicking the reset button. A reset link will be sent to your email.
                            </Text>

                            <PrimaryButton
                                title={isLoading ? 'Verifying...' : 'Reset Password'}
                                onPress={handleResetPassword}
                                style={styles.resetButton}
                                disabled={isLoading}
                            />
                        </View>

                        {/* Bottom Section - Danger Actions */}
                        <View style={styles.buttonsSection}>
                            <DangerButton
                                title="Delete Account"
                                onPress={handleDeleteAccount}
                                style={styles.dangerButton}
                            />

                            <SecondaryButton
                                title="I want to go back"
                                onPress={onGoBack}
                                style={styles.goBackButton}
                            />
                        </View>
                    </View>
                </View>

                <View style={GlobalStyles.BottomNavContainer}>
                    <BottomTabNav activeTab="Profile" onTabPress={onTabChange} />
                </View>
            </View>

            {/* Delete Account Warning Modal */}
            <DeleteAccountModal
                visible={showDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isDeleting}
            />
        </View>
    );
};

export default AccountPasswordScreen;
