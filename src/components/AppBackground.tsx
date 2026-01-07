import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

interface AppBackgroundProps {
    children: React.ReactNode;
}

/**
 * Unified app background with radial gradient effect.
 * Creates a subtle warm glow in the center of the screen.
 */
const AppBackground: React.FC<AppBackgroundProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            {/* Base background */}
            <View style={styles.background}>
                {/* Radial gradient effect - approximated with overlapping gradients */}
                <View style={styles.gradientContainer}>
                    <LinearGradient
                        colors={[
                            'rgba(255, 223, 166, 0.02)',
                            'rgba(255, 223, 166, 0.015)',
                            'rgba(255, 223, 166, 0.005)',
                            'rgba(255, 223, 166, 0)',
                        ]}
                        locations={[0, 0.3, 0.5, 0.7]}
                        style={styles.radialGradient}
                        start={{ x: 0.5, y: 0.5 }}
                        end={{ x: 1, y: 1 }}
                    />
                    {/* Blur overlay for soft effect */}
                    <BlurView
                        intensity={30}
                        tint="light"
                        style={StyleSheet.absoluteFill}
                    />
                </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

export default AppBackground;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    gradientContainer: {
        position: 'absolute',
        width: width * 1.2,
        height: height * 1.2,
        left: -width * 0.1,
        top: -height * 0.1,
        borderRadius: width,
    },
    radialGradient: {
        flex: 1,
        borderRadius: width,
    },
    content: {
        flex: 1,
    },
});
