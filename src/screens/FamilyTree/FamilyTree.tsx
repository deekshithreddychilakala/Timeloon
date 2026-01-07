import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FamilyTreeStyles as styles } from './FamilyTree.styles';
import BottomTabNav from '@/components/BottomTabNav';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/styles/colors';
import { GlobalStyles } from '@/styles/Global.styles';

interface FamilyTreeScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
    hideBottomNav?: boolean;
}

const FamilyTreeScreen: React.FC<FamilyTreeScreenProps> = ({ onTabChange, hideBottomNav }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={colors.commonScreensBGConfig.colors}
                start={colors.commonScreensBGConfig.start}
                end={colors.commonScreensBGConfig.end}
                style={colors.mainScreensBGElement}>
                <View style={GlobalStyles.mainScreenTitleDescContainer}>
                    <Text style={GlobalStyles.mainScreenTitle}>Memory Tree</Text>
                    <Text style={GlobalStyles.mainScreenDescription}>Explore connections and reveal memories</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No memories found</Text>
                        <Text style={styles.emptySubtext}>Start a conversation to build your memory tree</Text>
                    </View>
                </ScrollView>

                <View style={GlobalStyles.BottomNavContainer}>
                    {!hideBottomNav && <BottomTabNav activeTab="MemoryTree" onTabPress={onTabChange} />}
                </View>
            </LinearGradient>
        </View>
    );
};

export default FamilyTreeScreen;
