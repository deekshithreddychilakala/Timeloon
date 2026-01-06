import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ProfileStyles as styles } from './Profile.styles';
import BottomTabNav from '@/components/BottomTabNav';
import { supabase } from '@/services/supabase/client';
import Toast from 'react-native-toast-message';
import colors from '@/styles/colors';
import { GlobalStyles } from '@/styles/Global.styles';
import ProfileActive from '../../../assets/icons/profile_active.svg';
import LoginAccountIcon from '../../../assets/icons/login_account.svg';
import MemoryTreeIcon from '../../../assets/icons/memory_tree_active.svg';
import NotificationSettingsIcon from '../../../assets/icons/notification_settings.svg';
import ChevronRightIcon from '../../../assets/icons/chevron_right.svg';

interface ProfileScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onTabChange }) => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [userDob, setUserDob] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email || '');
                setUserName(user.user_metadata?.full_name || '');
                setAvatarUrl(user.user_metadata?.avatar_url || '');
                const dobIso = user.user_metadata?.dob;
                if (dobIso) {
                    const d = new Date(dobIso);
                    if (!isNaN(d.getTime())) {
                        setUserDob(
                            d.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })
                        );
                    }
                }
            }
        };

        fetchUserData();
    }, []);

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            Toast.show({
                type: 'success',
                text1: 'Signed out successfully',
                position: 'top',
                visibilityTime: 2000,
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error signing out',
                text2: error.message,
                position: 'top',
                visibilityTime: 3000,
            });
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

    return (
        <View style={styles.container}>
            <View style={[colors.mainScreensBGElement, styles.background]}>
                <View style={GlobalStyles.mainScreenTitleDescContainer}>
                    <Text style={GlobalStyles.mainScreenTitle}>Profile</Text>
                    <Text style={GlobalStyles.mainScreenDescription}>View your profile, personal info, and settings</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        <View style={styles.avatarWrapper}>{avatarNode}</View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{userName || 'Your name'}</Text>
                            <Text style={styles.userEmail}>{userEmail || 'Email not available'}</Text>
                            <Text style={styles.userDob}>{userDob || 'Add your birthday'}</Text>
                            <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                                <Text style={styles.editButtonText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.settingsSection}>
                        <Text style={styles.settingsTitle}>Settings</Text>

                        <View style={styles.settingsList}>
                            <TouchableOpacity style={styles.settingItem} activeOpacity={0.8}>
                                <View style={styles.settingIconBg}>
                                    <LoginAccountIcon width={24} height={24} />
                                </View>
                                <Text style={styles.settingLabel}>Login & Account</Text>
                                <ChevronRightIcon width={20} height={20} style={styles.chevron} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.settingItem} activeOpacity={0.8}>
                                <View style={styles.settingIconBg}>
                                    <MemoryTreeIcon width={24} height={24} />
                                </View>
                                <Text style={styles.settingLabel}>Memory Management</Text>
                                <ChevronRightIcon width={20} height={20} style={styles.chevron} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.settingItem} activeOpacity={0.8}>
                                <View style={styles.settingIconBg}>
                                    <NotificationSettingsIcon width={24} height={24} />
                                </View>
                                <Text style={styles.settingLabel}>Notification Settings</Text>
                                <ChevronRightIcon width={20} height={20} style={styles.chevron} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.85}>
                        <Text style={styles.signOutText}>Sign out</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={GlobalStyles.BottomNavContainer}>
                    <BottomTabNav activeTab="Profile" onTabPress={onTabChange} />
                </View>
            </View>

        </View>
    );
};

export default ProfileScreen;
