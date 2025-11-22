import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { SignInStyles as styles } from './SignIn.styles';
import colors from '@/styles/colors';
import PrimaryButton from '@/components/PrimaryButton';
import { signIn } from '@/services/supabase/client';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            console.log('Attempting sign in:', { email });
            const response = await signIn(email, password);
            // Log the full response for debugging as requested
            console.log('Supabase signIn response:', response);

            if (response.error) {
                console.warn('Sign in error:', response.error);
            } else {
                console.log('Sign in success data:', response.data);
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
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    <Text style={styles.title}>Sign In</Text>

                    <View style={styles.card}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="your@email.com"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                        />

                        <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Enter your password"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                        />

                        <PrimaryButton title="Sign in" onPress={handleSignIn} style={styles.signInButton} />

                        <TouchableOpacity style={styles.forgotWrap}>
                            <Text style={styles.forgot}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <View style={styles.footerRow}>
                            <Text style={styles.small}>New to Timeloon? </Text>
                            <TouchableOpacity>
                                <Text style={styles.link}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.notice}>Your data never leaves your control.</Text>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default SignIn;
