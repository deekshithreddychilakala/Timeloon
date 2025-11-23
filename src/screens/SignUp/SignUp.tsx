import React, { useState } from 'react';
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
import { SignUpStyles as styles } from './SignUp.styles';
import colors from '@/styles/colors';
import PrimaryButton from '@/components/PrimaryButton';
import { LinearGradient } from 'expo-linear-gradient';
import CircleLogo from '../../../assets/logo/Circle_shape.svg';
import { useNavigation } from '@react-navigation/native';

const SignUp: React.FC = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = () => {
        // placeholder: form submission / validation will go here
        console.log('Create account pressed', { name, email, dob });
    };

    const handleBackToSignIn = () => {
        // Use goBack so we don't create another instance of SignIn on the stack
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <LinearGradient
                colors={[colors.background, colors.background]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.gradientBg}
            >
                <CircleLogo style={styles.logoElement} />

                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={styles.safeArea}>
                    <View style={{ flex: 1, width: '100%' }}>
                        <Text style={styles.title}>Timeloon</Text>
                        <Text style={styles.description}>Create Your Timeline Identity</Text>

                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Your full name"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                        />

                        <Text style={[styles.label, { marginTop: 16 }]}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="your@email.com"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                        />

                        <Text style={[styles.label, { marginTop: 16 }]}>Date of Birth</Text>
                        <TextInput
                            value={dob}
                            onChangeText={setDob}
                            placeholder="dd/mm/yyyy"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                        />

                        <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Create password"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                        />

                        <PrimaryButton title="Create Account" onPress={handleCreateAccount} style={styles.createButton} />

                        <View style={styles.footerRow}>
                            <Text style={styles.small}>Already have an account? </Text>
                            <TouchableOpacity onPress={handleBackToSignIn}>
                                <Text style={styles.link}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.notice}>Your data never leaves your control.</Text>
                </SafeAreaView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export default SignUp;
