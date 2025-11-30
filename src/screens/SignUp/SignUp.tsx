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
import { Modal, TouchableWithoutFeedback, View as RNView } from 'react-native';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import Toast from 'react-native-toast-message';

const SignUp: React.FC = () => {
    const navigation = useNavigation<any>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempDate, setTempDate] = useState<Date | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const formatDate = (d: Date) => {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const handleDateChange = (event: any, date?: Date | undefined) => {
        if (Platform.OS === 'android') {
            // Android: dialog-style picker selects and closes directly
            setShowDatePicker(false);
            if (date) {
                setSelectedDate(date);
                setDob(formatDate(date));
            }
        } else {
            // iOS: update temporary date only; user confirms with Done
            if (date) setTempDate(date);
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
                Toast.show({ type: 'error', text1: 'Sign up failed', text2: resp.error.message || 'Unable to create account', position: 'top' });
            } else {
                // Show a non-blocking toast for success, then navigate appropriately
                Toast.show({ type: 'success', text1: 'Sign up successful', text2: 'Your account was created.', position: 'top' });
                const hasSession = !!(resp?.data?.session ?? resp?.data?.user);
                // Give the toast a moment to be visible before navigation
                setTimeout(() => {
                    const state = navigation.getState?.();
                    const routeNames: string[] = state?.routeNames ?? [];
                    if (hasSession && routeNames.includes('Chat')) {
                        navigation.reset({ index: 0, routes: [{ name: 'Chat' }] });
                    } else if (!hasSession) {
                        navigation.replace('SignIn');
                    }
                }, 600);
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
                            placeholderTextColor={colors.black06}
                            style={styles.input}
                        />

                        <Text style={[styles.label]}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="your@email.com"
                            placeholderTextColor={colors.black06}
                            style={styles.input}
                        />

                        <Text style={[styles.label]}>Date of Birth</Text>
                        <RNView style={{ position: 'relative', width: '100%' }}>
                            <TouchableOpacity onPress={() => { setTempDate(selectedDate ?? new Date(1990, 0, 1)); setShowDatePicker(true); }} activeOpacity={0.9}>
                                <TextInput
                                    pointerEvents="none"
                                    editable={false}
                                    value={dob}
                                    placeholder="dd/mm/yyyy"
                                    placeholderTextColor={colors.black06}
                                    style={[styles.input, styles.dobInput]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setTempDate(selectedDate ?? new Date(1990, 0, 1)); setShowDatePicker(true); }}
                                style={{ position: 'absolute', right: 12, top: 12, height: 28, width: 28, justifyContent: 'center', alignItems: 'center' }}
                                accessibilityRole="button"
                            >
                                <CalendarIcon width={20} height={20} />
                            </TouchableOpacity>
                        </RNView>
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
                            <Modal transparent animationType="slide" presentationStyle="overFullScreen" visible onRequestClose={() => setShowDatePicker(false)}>
                                <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
                                    <View style={styles.pickerOverlay}>
                                        <TouchableWithoutFeedback>
                                            <View style={styles.pickerContainer}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 8 }}>
                                                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                                        <Text style={{ color: '#007AFF', fontSize: 16 }}>Cancel</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => {
                                                        const apply = tempDate ?? selectedDate ?? new Date(1990, 0, 1);
                                                        setSelectedDate(apply);
                                                        setDob(formatDate(apply));
                                                        setShowDatePicker(false);
                                                    }}>
                                                        <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '600' }}>Done</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <DateTimePicker
                                                    value={tempDate ?? selectedDate ?? new Date(1990, 0, 1)}
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

                        <Text style={[styles.label]}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Create password"
                            placeholderTextColor={colors.black06}
                            style={styles.input}
                        />

                        <PrimaryButton title={loading ? 'Creating...' : 'Create Account'} onPress={handleCreateAccount} style={styles.createButton} disabled={loading} />

                        <View style={styles.footerRow}>
                            <Text style={styles.small}>Already have an account? </Text>
                            <TouchableOpacity onPress={handleBackToSignIn}>
                                <View style={styles.signInLinkContainer}>
                                    <Text style={styles.link}>Sign In</Text>
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

export default SignUp;
