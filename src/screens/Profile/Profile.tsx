import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ProfileStyles as styles } from './Profile.styles';
import BottomTabNav from '@/components/BottomTabNav';
import { supabase } from '@/services/supabase/client';
import Toast from 'react-native-toast-message';

interface ProfileScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onTabChange }) => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email || '');
                setUserName(user.user_metadata?.full_name || '');
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.subtitle}>Manage your account</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Account Information</Text>

                        {userName ? (
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Name</Text>
                                <Text style={styles.infoValue}>{userName}</Text>
                            </View>
                        ) : null}

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{userEmail || 'Not available'}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Actions</Text>

                        <TouchableOpacity
                            style={styles.signOutButton}
                            onPress={handleSignOut}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.signOutButtonText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <BottomTabNav activeTab="Profile" onTabPress={onTabChange} />
        </View>
    );
};

export default ProfileScreen;
