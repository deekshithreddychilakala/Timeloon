import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FamilyTreeStyles as styles } from './FamilyTree.styles';
import BottomTabNav from '@/components/BottomTabNav';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/styles/colors';
import { GlobalStyles } from '@/styles/Global.styles';

interface FamilyTreeScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
}

const FamilyTreeScreen: React.FC<FamilyTreeScreenProps> = ({ onTabChange }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={colors.commonScreensBGConfig.colors}
                start={colors.commonScreensBGConfig.start}
                end={colors.commonScreensBGConfig.end}
                style={colors.mainScreensBGElement}>
                <View style={GlobalStyles.mainScreenTitleDescContainer}>
                    <Text style={GlobalStyles.mainScreenTitle}>Memory Tree</Text>
                    <Text style={GlobalStyles.mainScreenDescription}>Your family memories and connections</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <Text style={styles.placeholder}>Memory Tree visualization coming soon...</Text>
                    </View>
                </ScrollView>
                <View style={GlobalStyles.BottomNavContainer}>
                    <BottomTabNav activeTab="MemoryTree" onTabPress={onTabChange} />
                </View>
            </LinearGradient>
        </View>
    );
};

export default FamilyTreeScreen;
