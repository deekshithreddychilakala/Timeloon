import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
} from 'react-native';
import { SignInStyles as styles } from './SignIn.styles';
import colors from '@/styles/colors';
import PrimaryButton from '@/components/PrimaryButton';
import { signIn } from '@/services/supabase/client';
import { LinearGradient } from 'expo-linear-gradient';
import CircleLogo from '../../../assets/logo/Circle_shape.svg';

const SignIn: React.FC = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            if (email && password) {
                console.log('Attempting sign in:', { email });
                const response = await signIn(email, password);
                // Log the full response for debugging as requested
                console.log('Supabase signIn response:', response);

                if (response.error) {
                    console.error('Sign in error:', response.error);
                } else {
                    console.log('Sign in success data:', response.data);
                }
            } else {
                // Error message for empty fields
                console.error('Error, empty fields');
            }
        } catch (err) {
            console.error('Unexpected sign in error', err);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <LinearGradient
                colors={['#FAFAFA', '#FAFAFA']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.gradientBg}>
                <CircleLogo style={styles.logoElement}></CircleLogo>

                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={styles.safeArea}>
                    <View style={{ flex: 1, width: '100%' }}>
                        <Text style={styles.title}>Timeloon</Text>
                        <Text style={styles.description}>Create Your Timeline Identity</Text>

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="your@email.com"
                            placeholderTextColor={colors.black06}
                            style={styles.input}
                        />

                        <Text style={[styles.label]}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Enter your password"
                            placeholderTextColor={colors.black06}
                            style={[styles.input, styles.passwordInput]}
                        />

                        <PrimaryButton title="Sign in" onPress={handleSignIn} />

                        <TouchableOpacity style={styles.forgotWrap}>
                            <View style={styles.linkContainer}>
                                <Text style={styles.forgot}>Forgot Password?</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.footerRow}>
                            <Text style={styles.small}>New to Timeloon? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <View style={styles.createAccLinkContainer}>
                                    <Text style={styles.link}>Create Account</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <Text style={styles.notice}>Your data never leaves your control.</Text>
                </SafeAreaView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export default SignIn;
