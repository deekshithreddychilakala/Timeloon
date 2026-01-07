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
import { ResetStyles as styles } from './ResetPassword.styles';
import colors, { commonScreenStyles } from '@/styles/colors';
import PrimaryButton from '@/components/PrimaryButton';
import { LinearGradient } from 'expo-linear-gradient';
import GradientCircleLogo from '@/components/GradientCircleLogo';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { sendPasswordReset } from '@/services/supabase/client';

const ResetPassword: React.FC = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!email) {
            Toast.show({ type: 'error', text1: 'Enter an email', text2: 'Please provide your account email.', position: 'top' });
            return;
        }
        setLoading(true);
        try {
            const resp = await sendPasswordReset(email);
            // Many supabase implementations return { data, error }
            if (resp?.error) {
                Toast.show({ type: 'error', text1: 'Reset failed', text2: resp.error.message || 'Unable to send reset email.', position: 'top' });
            } else {
                // show inline message and toast
                setSent(true);
                Toast.show({ type: 'success', text1: 'Reset email sent', text2: 'Check your inbox for a password reset link.', position: 'top' });
            }
        } catch (err: any) {
            console.error('Reset password error', err);
            Toast.show({ type: 'error', text1: 'Reset failed', text2: err?.message || 'Unable to send reset email.', position: 'top' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <LinearGradient
                colors={colors.commonScreensBGConfig.colors}
                start={colors.commonScreensBGConfig.start}
                end={colors.commonScreensBGConfig.end}
                style={colors.commonScreensBGElement}>
                <GradientCircleLogo />

                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={commonScreenStyles.safeArea}>
                    <View style={{ flex: 1, width: '100%' }}>
                        <Text style={commonScreenStyles.title}>Timeloon</Text>
                        <Text style={[commonScreenStyles.description, styles.descMargin]}>Create Your Timeline Identity</Text>

                        {!sent ? (
                            <>
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

                                <PrimaryButton title={loading ? 'Sending...' : 'Reset Password'} onPress={handleReset} style={styles.createButton} />
                            </>
                        ) : (
                            <View style={{ paddingVertical: 20 }}>
                                <Text style={{ textAlign: 'center', color: colors.black03 }}>A password reset link has been sent to your email.</Text>
                            </View>
                        )}

                        <View style={styles.footerRow}>
                            <Text style={styles.small}>New to Timeloon? </Text>
                            <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
                                <View style={styles.createAccLinkContainer}>
                                    <Text style={styles.link}>Create Account</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                            <Text style={styles.goBackText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.notice}>Your data never leaves your control.</Text>
                </SafeAreaView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export default ResetPassword;
