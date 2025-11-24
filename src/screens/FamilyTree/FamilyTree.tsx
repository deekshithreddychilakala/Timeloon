import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FamilyTreeStyles as styles } from './FamilyTree.styles';
import BottomTabNav from '@/components/BottomTabNav';

interface FamilyTreeScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
}

const FamilyTreeScreen: React.FC<FamilyTreeScreenProps> = ({ onTabChange }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Memory Tree</Text>
                    <Text style={styles.subtitle}>Your family memories and connections</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.placeholder}>Memory Tree visualization coming soon...</Text>
                </View>
            </ScrollView>

            <BottomTabNav activeTab="MemoryTree" onTabPress={onTabChange} />
        </View>
    );
};

export default FamilyTreeScreen;
