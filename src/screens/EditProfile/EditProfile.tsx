import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    Modal,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { EditProfileStyles as styles } from './EditProfile.styles';
import BottomTabNav from '@/components/BottomTabNav';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { supabase } from '@/services/supabase/client';
import Toast from 'react-native-toast-message';
import colors from '@/styles/colors';
import { GlobalStyles } from '@/styles/Global.styles';
import ProfileActive from '../../../assets/icons/profile_active.svg';
import CalendarIcon from '../../../assets/icons/calendar.svg';

interface EditProfileScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
    onGoBack: () => void;
    hideBottomNav?: boolean;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onTabChange, onGoBack, hideBottomNav }) => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [dob, setDob] = useState<Date | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setEmail(user.email || '');
                setFullName(user.user_metadata?.full_name || '');
                setAvatarUrl(user.user_metadata?.avatar_url || '');
                const dobIso = user.user_metadata?.dob;
                if (dobIso) {
                    const d = new Date(dobIso);
                    if (!isNaN(d.getTime())) {
                        setDob(d);
                    }
                }
            }
        };

        fetchUserData();
    }, []);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (selectedDate) {
            setDob(selectedDate);
        }
    };

    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const uploadAvatar = async (uri: string): Promise<string | null> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;

            const response = await fetch(uri);
            const blob = await response.blob();
            const arrayBuffer = await new Response(blob).arrayBuffer();

            const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
            const fileName = `${user.id}/avatar.${fileExt}`;
            const contentType = `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;

            const { data, error } = await supabase.storage
                .from('avatars')
                .upload(fileName, arrayBuffer, {
                    cacheControl: '3600',
                    upsert: true,
                    contentType,
                });

            if (error) throw error;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            return urlData.publicUrl;
        } catch (error) {
            console.error('Error uploading avatar:', error);
            return null;
        }
    };

    const handleMakeChanges = async () => {
        setIsLoading(true);
        try {
            let finalAvatarUrl = avatarUrl;

            // Check if avatar is a local file (changed by user)
            if (avatarUrl && avatarUrl.startsWith('file://')) {
                const uploadedUrl = await uploadAvatar(avatarUrl);
                if (uploadedUrl) {
                    finalAvatarUrl = uploadedUrl;
                }
            }

            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName,
                    dob: dob?.toISOString(),
                    avatar_url: finalAvatarUrl,
                },
            });

            if (error) throw error;

            Toast.show({
                type: 'success',
                text1: 'Profile updated successfully',
                position: 'top',
                visibilityTime: 2000,
            });

            onGoBack();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error updating profile',
                text2: error.message,
                position: 'top',
                visibilityTime: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const avatarNode = useMemo(() => {
        if (avatarUrl) {
            return (
                <Image
                    source={{ uri: avatarUrl }}
                    style={styles.avatarImage}
                    resizeMode="cover"
                />
            );
        }
        return <ProfileActive width={96} height={96} />;
    }, [avatarUrl]);

    const handleChangePhoto = async () => {
        Alert.alert(
            'Update Profile Picture',
            'Choose an option',
            [
                {
                    text: 'Take Photo',
                    onPress: async () => {
                        const { status } = await ImagePicker.requestCameraPermissionsAsync();
                        if (status !== 'granted') {
                            Toast.show({
                                type: 'error',
                                text1: 'Camera permission required',
                                position: 'top',
                            });
                            return;
                        }
                        const result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 0.8,
                        });
                        if (!result.canceled && result.assets[0]) {
                            setAvatarUrl(result.assets[0].uri);
                        }
                    },
                },
                {
                    text: 'Choose from Library',
                    onPress: async () => {
                        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if (status !== 'granted') {
                            Toast.show({
                                type: 'error',
                                text1: 'Gallery permission required',
                                position: 'top',
                            });
                            return;
                        }
                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 0.8,
                        });
                        if (!result.canceled && result.assets[0]) {
                            setAvatarUrl(result.assets[0].uri);
                        }
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={[colors.mainScreensBGElement, styles.background]}>
                <View style={GlobalStyles.mainScreenTitleDescContainer}>
                    <Text style={GlobalStyles.mainScreenTitle}>Edit Profile</Text>
                </View>

                <View style={styles.contentWrapper}>
                    <View style={styles.card}>
                        <View style={styles.avatarSection}>
                            <TouchableOpacity
                                style={styles.avatarWrapper}
                                onPress={handleChangePhoto}
                                activeOpacity={0.8}
                            >
                                {avatarNode}
                                <View style={styles.avatarOverlay}>
                                    <Text style={styles.avatarUpdateText}>Update</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formSection}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Your full name"
                                    placeholderTextColor={colors.black06}
                                    value={fullName}
                                    onChangeText={setFullName}
                                    autoCapitalize="words"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={[styles.input, { color: colors.black06 }]}
                                    placeholder="your@email.com"
                                    placeholderTextColor={colors.black06}
                                    value={email}
                                    editable={false}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Date of Birth</Text>
                                <TouchableOpacity
                                    style={styles.dobInputContainer}
                                    onPress={() => setShowDatePicker(true)}
                                    activeOpacity={0.8}
                                >
                                    <TextInput
                                        style={[styles.input, styles.dobInput]}
                                        placeholder="dd/mm/yyyy"
                                        placeholderTextColor={colors.black06}
                                        value={formatDate(dob)}
                                        editable={false}
                                        pointerEvents="none"
                                    />
                                    <View style={styles.calendarIcon}>
                                        <CalendarIcon width={20} height={20} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.buttonsSection}>
                            <PrimaryButton
                                title={isLoading ? 'Saving...' : 'Make Changes'}
                                onPress={handleMakeChanges}
                                style={styles.makeChangesButton}
                                disabled={isLoading}
                            />

                            <SecondaryButton
                                title="Go Back"
                                onPress={onGoBack}
                                style={styles.goBackButton}
                            />
                        </View>
                    </View>
                </View>

                <View style={GlobalStyles.BottomNavContainer}>
                    {!hideBottomNav && <BottomTabNav activeTab="Profile" onTabPress={onTabChange} />}
                </View>
            </View>

            {Platform.OS === 'ios' && showDatePicker && (
                <Modal transparent animationType="slide">
                    <View style={styles.pickerOverlay}>
                        <View style={styles.pickerContainer}>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(false)}
                                style={{ alignSelf: 'flex-end', padding: 12 }}
                            >
                                <Text style={{ color: colors.purple01, fontWeight: '600' }}>Done</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                value={dob || new Date(1995, 0, 1)}
                                mode="date"
                                display="spinner"
                                onChange={handleDateChange}
                                maximumDate={new Date()}
                            />
                        </View>
                    </View>
                </Modal>
            )}

            {Platform.OS === 'android' && showDatePicker && (
                <DateTimePicker
                    value={dob || new Date(1995, 0, 1)}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                />
            )}
        </View>
    );
};

export default EditProfileScreen;
