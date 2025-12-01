import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CameraGoldIcon from '../../assets/icons/camera_gold.svg';
import RetryIcon from '../../assets/icons/retry_icon.svg';
import { Fonts } from '@/utils/fonts';

export type UploadFailedProps = {
    onRetry: () => void;
};

const UploadFailed: React.FC<UploadFailedProps> = ({ onRetry }) => {
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

            <View style={styles.textAndButtonContainer}>
                <Text style={styles.title}>Upload failed</Text>
                <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.7}>
                    <RetryIcon width={16} height={16} />
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
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
    textAndButtonContainer: {
        flex: 1,
        gap: 8,
    },
    title: {
        color: '#1C1C1E',
        fontFamily: Fonts.medium,
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.13,
    },
    retryButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#545050',
        backgroundColor: '#F6F6F6',
    },
    retryText: {
        color: '#1C1C1E',
        fontFamily: Fonts.medium,
        fontSize: 12,
        fontWeight: '500',
    },
});

export default UploadFailed;
