import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChatStyles as styles } from './ChatScreen.styles';
import { supabase } from '@/services/supabase/client';

const ChatScreen: React.FC = () => {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat</Text>
            <Text style={styles.subtitle}>Welcome to Timeloon chat — you're signed in.</Text>

            <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChatScreen;
