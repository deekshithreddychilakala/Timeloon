import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import Logo from '../../assets/logo/timeloon_logo.svg';

/**
 * A CSS-based gradient circle with logo for auth screens.
 * Replaces the CircleLogo SVG with a pure CSS implementation.
 */
const GradientCircleLogo: React.FC = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFFFFF', 'rgba(241, 231, 255, 0.95)', 'rgba(140, 67, 255, 0.85)']}
                locations={[0, 0.4, 1]}
                start={{ x: 0.35, y: 0.35 }}
                end={{ x: 0.9, y: 0.9 }}
                style={styles.gradient}
            >
                <View style={styles.logoContainer}>
                    {/* <Logo width={100} height={100} /> */}
                </View>
            </LinearGradient>
        </View>
    );
};

export default GradientCircleLogo;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 26,
        top: -149,
        width: 338,
        height: 338,
        borderRadius: 169,
        // Outer shadow
        shadowColor: '#A475EF',
        shadowOffset: { width: 0, height: 31.688 },
        shadowOpacity: 0.2,
        shadowRadius: 84.5,
        elevation: 20,
    },
    gradient: {
        width: 338,
        height: 338,
        borderRadius: 169,
        alignItems: 'center',
        justifyContent: 'center',
        // Inner shadows approximation via border
        borderWidth: 0,
    },
    logoContainer: {
        marginTop: 50,
        marginLeft: -20,
    },
});
