import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ManageMemoriesStyles as styles } from './ManageMemories.styles';
import BottomTabNav from '@/components/BottomTabNav';
import DangerButton from '@/components/DangerButton';
import SecondaryButton from '@/components/SecondaryButton';
import { WarningModal } from '@/components/DeleteAccountModal';
import colors from '@/styles/colors';
import { GlobalStyles } from '@/styles/Global.styles';
import Toast from 'react-native-toast-message';
import RadioSelectedIcon from '../../../assets/icons/radio_selected.svg';
import RadioUnselectedIcon from '../../../assets/icons/radio_unselected.svg';

type DeleteOption = 'memories' | 'photos' | 'everything';

interface ManageMemoriesScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
    onGoBack: () => void;
    hideBottomNav?: boolean;
}

const ManageMemoriesScreen: React.FC<ManageMemoriesScreenProps> = ({ onTabChange, onGoBack, hideBottomNav }) => {
    const [selectedOption, setSelectedOption] = useState<DeleteOption>('everything');
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleDeletePress = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);

        try {
            // TODO: Implement actual delete logic based on selectedOption
            // For now, show a placeholder message
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay

            setShowDeleteModal(false);
            Toast.show({
                type: 'success',
                text1: 'Deleted successfully',
                text2: `Your ${selectedOption} have been permanently deleted.`,
                position: 'top',
                visibilityTime: 3000,
            });
            onGoBack();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Delete failed',
                text2: error?.message || 'Something went wrong. Please try again.',
                position: 'top',
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const renderRadioButton = (isSelected: boolean) => (
        isSelected
            ? <RadioSelectedIcon width={20} height={20} />
            : <RadioUnselectedIcon width={20} height={20} />
    );

    return (
        <View style={styles.container}>
            <View style={[colors.mainScreensBGElement, styles.background]}>
                <View style={GlobalStyles.mainScreenTitleDescContainer}>
                    <Text style={GlobalStyles.mainScreenTitle}>Manage Memories</Text>
                    <Text style={GlobalStyles.mainScreenDescription}>Manage your memories and photos data</Text>
                </View>

                <View style={styles.contentWrapper}>
                    <View style={styles.card}>
                        {/* Options Section */}
                        <View style={styles.optionsSection}>
                            <TouchableOpacity
                                style={styles.optionItem}
                                activeOpacity={0.8}
                                onPress={() => setSelectedOption('memories')}
                            >
                                {renderRadioButton(selectedOption === 'memories')}
                                <Text style={styles.optionLabel}>Memories</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionItem}
                                activeOpacity={0.8}
                                onPress={() => setSelectedOption('photos')}
                            >
                                {renderRadioButton(selectedOption === 'photos')}
                                <Text style={styles.optionLabel}>Photos/Videos</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionItem}
                                activeOpacity={0.8}
                                onPress={() => setSelectedOption('everything')}
                            >
                                {renderRadioButton(selectedOption === 'everything')}
                                <Text style={styles.optionLabel}>Everything</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Buttons Section */}
                        <View style={styles.buttonsSection}>
                            <DangerButton
                                title="Delete Permanently"
                                onPress={handleDeletePress}
                            />
                            <SecondaryButton
                                title="I want to go back"
                                onPress={onGoBack}
                            />
                        </View>
                    </View>
                </View>

                <View style={GlobalStyles.BottomNavContainer}>
                    {!hideBottomNav && <BottomTabNav activeTab="Profile" onTabPress={onTabChange} />}
                </View>
            </View>

            {/* Delete Confirmation Modal */}
            <WarningModal
                visible={showDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isDeleting}
                type="deleteMemories"
            />
        </View>
    );
};

export default ManageMemoriesScreen;
