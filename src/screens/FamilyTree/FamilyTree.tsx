import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { FamilyTreeStyles as styles } from './FamilyTree.styles';
import BottomTabNav from '@/components/BottomTabNav';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/styles/colors';
import { GlobalStyles } from '@/styles/Global.styles';
import { supabase } from '@/services/supabase/client';
import Toast from 'react-native-toast-message';
import ProfileIcon from '../../../assets/icons/profile.svg';
import OuterGlow from '../../../assets/icons/familytree/outer-glow.svg';
import WhiteBlur from '../../../assets/icons/familytree/white-blur.svg';
import InnerGlow from '../../../assets/icons/familytree/inner-glow.svg';

interface Entity {
    id: number;
    user_id: string;
    type: string;
    name: string;
    relation: string;
    metadata: any;
    created_at: string;
    updated_at: string;
    rekognition_face_id: string;
    rekognition_image_id: string;
    bounding_box: any;
    confidence: number;
    description: string;
}

interface FamilyTreeScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
}

const FamilyTreeScreen: React.FC<FamilyTreeScreenProps> = ({ onTabChange }) => {
    const [entities, setEntities] = useState<Entity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    // Get current user
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) throw error;
                setUserId(user?.id || null);
            } catch (error) {
                console.error('Error getting user:', error);
            }
        };

        getUser();
    }, []);

    // Fetch entities
    useEffect(() => {
        const fetchEntities = async () => {
            if (!userId) return;

            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('entities')
                    .select('*')
                    .eq('user_id', userId);

                if (error) throw error;

                console.log('Entities fetched:', data);
                console.log('Total entities:', data?.length || 0);

                // Log detailed info for each entity
                data?.forEach((entity, index) => {
                    console.log(`Entity ${index + 1}:`, {
                        id: entity.id,
                        name: entity.name,
                        type: entity.type,
                        relation: entity.relation,
                        confidence: entity.confidence,
                        description: entity.description,
                        metadata: entity.metadata,
                    });
                });

                setEntities(data || []);
            } catch (error: any) {
                console.error('Error fetching entities:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Error loading entities',
                    text2: error.message,
                    position: 'top',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntities();
    }, [userId]);

    // Generate positions for entities in a circular pattern
    const generateEntityPositions = (count: number) => {
        if (count === 0) return [];
        if (count === 1) return [{ top: 300, left: 114 }]; // Center position

        const positions = [];
        const centerX = 200; // Approximate center X
        const centerY = 350; // Approximate center Y
        const radius = 180; // Distance from center

        // First entity at center
        positions.push({ top: 300, left: 114 });

        // Distribute remaining entities in a circle
        for (let i = 1; i < count; i++) {
            const angle = ((i - 1) / (count - 1)) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) - 27; // Adjust for avatar size
            const y = centerY + radius * Math.sin(angle) - 27;
            positions.push({ top: y, left: x });
        }

        return positions;
    };

    const entityPositions = generateEntityPositions(entities.length);

    const renderEntity = (entity: Entity, index: number) => {
        const position = entityPositions[index];
        const isCenter = index === 0;
        const size = isCenter ? 164 : (45 + (index % 3) * 5);

        return (
            <View key={entity.id}>
                {isCenter && (
                    <>
                        {/* Outer purple glow SVG */}
                        <View
                            style={[
                                styles.outerGlowContainer,
                                {
                                    top: position.top + size / 2 - 171,
                                    left: position.left + size / 2 - 171,
                                },
                            ]}
                        >
                            <OuterGlow width={342} height={342} />
                        </View>

                        {/* White blur SVG */}
                        <View
                            style={[
                                styles.whiteBlurContainer,
                                {
                                    top: position.top + size / 2 - 102,
                                    left: position.left + size / 2 - 102,
                                },
                            ]}
                        >
                            <WhiteBlur width={204} height={204} />
                        </View>
                    </>
                )}

                {/* Avatar container */}
                <View
                    style={[
                        styles.avatarContainer,
                        {
                            top: position.top,
                            left: position.left,
                            width: size,
                            height: size,
                        },
                    ]}
                >
                    {/* Avatar border */}
                    <View style={[styles.avatarBorder, isCenter && styles.centerAvatarBorder]}>
                        {/* Avatar content */}
                        <View style={styles.avatarContent}>
                            <View style={styles.avatarIconContainer}>
                                <ProfileIcon
                                    width={size * 0.45}
                                    height={size * 0.45}
                                    fill={colors.black}
                                />
                            </View>
                        </View>

                        {/* Inner glow overlay */}
                        {isCenter && (
                            <View style={styles.innerGlowContainer}>
                                <InnerGlow width={164} height={164} />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={colors.commonScreensBGConfig.colors}
                start={colors.commonScreensBGConfig.start}
                end={colors.commonScreensBGConfig.end}
                style={colors.mainScreensBGElement}>
                <View style={GlobalStyles.mainScreenTitleDescContainer}>
                    <Text style={GlobalStyles.mainScreenTitle}>Family Tree</Text>
                    <Text style={GlobalStyles.mainScreenDescription}>Explore connections and reveal memories</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[
                        styles.scrollContent,
                        { minHeight: 800, minWidth: 400 },
                    ]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <ScrollView
                        nestedScrollEnabled
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.treeContainer}>
                            {isLoading ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color={colors.activeTabIcon} />
                                </View>
                            ) : entities.length === 0 ? (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>No family members found</Text>
                                    <Text style={styles.emptySubtext}>Add memories to build your tree</Text>
                                </View>
                            ) : (
                                entities.map((entity, index) => renderEntity(entity, index))
                            )}
                        </View>
                    </ScrollView>
                </ScrollView>

                <View style={GlobalStyles.BottomNavContainer}>
                    <BottomTabNav activeTab="MemoryTree" onTabPress={onTabChange} />
                </View>
            </LinearGradient>
        </View>
    );
};

export default FamilyTreeScreen;
