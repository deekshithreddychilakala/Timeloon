import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CameraGoldIcon from '../../assets/icons/camera_gold.svg';
import { Fonts } from '@/utils/fonts';

export type UploadProgressProps = {
    progress: number; // 0-100
};

const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(255, 223, 166, 0.30)', 'rgba(255, 223, 166, 0.15)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoContainer}
            >
                <CameraGoldIcon width={26.42} height={26.42} />
            </LinearGradient>

            <View style={styles.textAndProgressContainer}>
                <Text style={styles.title}>Upload progress</Text>
                <View style={styles.progressRow}>
                    <Text style={styles.percentText}>{Math.round(progress)}%</Text>
                    <View style={styles.progressBarTrack}>
                        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 285.15,
        maxWidth: 331.577,
        height: 80.53,
        padding: 15.5,
        alignItems: 'center',
        gap: 14,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#FFDFA6',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.04,
        shadowRadius: 18,
        elevation: 4,
        alignSelf: 'flex-start',
    },
    logoContainer: {
        width: 49.53,
        height: 49.53,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderRadius: 9.906,
    },
    textAndProgressContainer: {
        flex: 1,
        gap: 6,
    },
    title: {
        color: '#1C1C1E',
        fontFamily: Fonts.medium,
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.13,
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    percentText: {
        color: '#1C1C1E',
        fontFamily: Fonts.medium,
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: -0.13,
    },
    progressBarTrack: {
        flex: 1,
        height: 6,
        borderRadius: 30,
        backgroundColor: '#E1E1E1',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 30,
        backgroundColor: '#E5AB47',
    },
});

export default UploadProgress;
