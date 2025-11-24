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
import colors, { commonScreenStyles } from '@/styles/colors';
import PrimaryButton from '@/components/PrimaryButton';
import { LinearGradient } from 'expo-linear-gradient';
import CircleLogo from '../../../assets/logo/Circle_shape.svg';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { signUp } from '@/services/supabase/client';
import { Modal, TouchableWithoutFeedback, Alert } from 'react-native';

const SignUp: React.FC = () => {
    const navigation = useNavigation<any>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const formatDate = (d: Date) => {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const handleDateChange = (event: any, date?: Date | undefined) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            setDob(formatDate(date));
        }
    };

    const handleCreateAccount = async () => {
        if (!email || !password || !name) {
            console.warn('Please fill required fields');
            return;
        }
        setLoading(true);
        try {
            const metadata = { full_name: name, dob: selectedDate?.toISOString() ?? null };
            const resp = await signUp(email, password, metadata);
            console.log('signUp response', resp);
            if (resp.error) {
                console.warn('Sign up error:', resp.error);
                Alert.alert('Sign up failed', resp.error.message || 'Unable to create account');
            } else {
                // Notify the user
                Alert.alert('Sign up successful', 'Your account was created.', [
                    {
                        text: 'OK',
                        onPress: () => {
                            // If a session was returned, Supabase likely signed-in the user
                            // and the auth listener in App.tsx will switch to the
                            // authenticated navigator. If that hasn't happened yet
                            // but the current navigator already knows about `Chat`,
                            // reset to it explicitly.
                            const hasSession = !!(resp?.data?.session ?? resp?.data?.user);
                            const state = navigation.getState?.();
                            const routeNames: string[] = state?.routeNames ?? [];
                            if (hasSession && routeNames.includes('Chat')) {
                                navigation.reset({ index: 0, routes: [{ name: 'Chat' }] });
                            } else if (!hasSession) {
                                // No session -> go to SignIn so the user can verify / login
                                navigation.replace('SignIn');
                            }
                        },
                    },
                ]);
            }
        } catch (err) {
            console.error('Unexpected sign up error', err);
        } finally {
            setLoading(false);
        }
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
                colors={colors.commonScreensBGConfig.colors}
                start={colors.commonScreensBGConfig.start}
                end={colors.commonScreensBGConfig.end}
                style={colors.commonScreensBGElement}>
                <CircleLogo style={commonScreenStyles.logoElement}></CircleLogo>

                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={commonScreenStyles.safeArea}>
                    <View style={{ flex: 1, width: '100%' }}>
                        <Text style={commonScreenStyles.title}>Timeloon</Text>
                        <Text style={commonScreenStyles.description}>Create Your Timeline Identity</Text>

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
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <TextInput
                                pointerEvents="none"
                                editable={false}
                                value={dob}
                                placeholder="dd/mm/yyyy"
                                placeholderTextColor={colors.muted}
                                style={styles.input}
                            />
                        </TouchableOpacity>
                        {/* Date picker handling: Android shows native dialog when rendered; iOS should render in a bottom modal overlay */}
                        {showDatePicker && Platform.OS === 'android' && (
                            <DateTimePicker
                                value={selectedDate ?? new Date(1990, 0, 1)}
                                mode="date"
                                display="calendar"
                                maximumDate={new Date()}
                                onChange={handleDateChange}
                            />
                        )}

                        {showDatePicker && Platform.OS === 'ios' && (
                            <Modal transparent animationType="slide" visible onRequestClose={() => setShowDatePicker(false)}>
                                <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
                                    <View style={styles.pickerOverlay}>
                                        <TouchableWithoutFeedback>
                                            <View style={styles.pickerContainer}>
                                                <DateTimePicker
                                                    value={selectedDate ?? new Date(1990, 0, 1)}
                                                    mode="date"
                                                    display="spinner"
                                                    maximumDate={new Date()}
                                                    onChange={handleDateChange}
                                                    style={{ width: '100%' }}
                                                />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>
                        )}

                        <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Create password"
                            placeholderTextColor={colors.muted}
                            style={styles.input}
                        />

                        <PrimaryButton title={loading ? 'Creating...' : 'Create Account'} onPress={handleCreateAccount} style={styles.createButton} disabled={loading} />

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
