import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Image, ActionSheetIOS, Platform, Alert } from 'react-native';
import { ChatStyles as styles } from './ChatScreen.styles';
import BottomTabNav from '@/components/BottomTabNav';
import { supabase } from '@/services/supabase/client';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import TypingIndicator from '@/components/TypingIndicator';
import PlusIcon from '../../../assets/icons/plus.svg';
import ArrowRightIcon from '../../../assets/icons/arrow_right.svg';
import colors from '@/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyles } from '@/styles/Global.styles';

interface Message {
    id: string;
    user_id: string | null;
    content: string;
    role: 'user' | 'assistant';
    created_at: string;
    type?: 'text' | 'image';
    image_path?: string;
}

interface ChatScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onTabChange }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const suggestionPrompts = [
        "What memory stands out from this week?",
        "Who in your family influenced you the most growing up?",
        "Tell me a moment from childhood you never want to forget."
    ];

    // Get current user
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) throw error;
                setUserId(user?.id || null);
            } catch (error) {
                console.error('Error getting user:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Authentication error',
                    position: 'bottom',
                });
            }
        };

        getUser();
    }, []);

    // Load messages
    useEffect(() => {
        const loadMessages = async () => {
            setIsInitialLoading(true);
            try {
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (error) throw error;
                setMessages(data || []);
            } catch (error) {
                console.error('Error loading messages:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Failed to load messages',
                    position: 'bottom',
                });
            } finally {
                setIsInitialLoading(false);
            }
        };

        loadMessages();
    }, []);

    // Subscribe to real-time changes
    useEffect(() => {
        const channel = supabase
            .channel('messages')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages'
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        const newMessage = payload.new as Message;
                        setMessages(prev => [...prev, newMessage]);

                        // If assistant message received, stop waiting
                        if (newMessage.role === 'assistant') {
                            setWaitingForResponse(false);
                        }

                        // Auto scroll to bottom on new message
                        setTimeout(() => {
                            scrollViewRef.current?.scrollToEnd({ animated: true });
                        }, 100);
                    } else if (payload.eventType === 'UPDATE') {
                        setMessages(prev =>
                            prev.map(msg =>
                                msg.id === (payload.new as Message).id ? payload.new as Message : msg
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setMessages(prev =>
                            prev.filter(msg => msg.id !== (payload.old as { id: string }).id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const selectImageSource = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Take Photo', 'Choose from Library'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        pickImageFromCamera();
                    } else if (buttonIndex === 2) {
                        pickImageFromLibrary();
                    }
                }
            );
        } else {
            Alert.alert(
                'Select Image',
                'Choose an option',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Take Photo', onPress: pickImageFromCamera },
                    { text: 'Choose from Library', onPress: pickImageFromLibrary },
                ],
                { cancelable: true }
            );
        }
    };

    const validateImageSize = async (uri: string): Promise<boolean> => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const sizeInMB = blob.size / (1024 * 1024);

            if (sizeInMB > 5) {
                Toast.show({
                    type: 'error',
                    text1: 'Image too large',
                    text2: 'Please select an image smaller than 5MB',
                    position: 'bottom',
                    visibilityTime: 3000,
                });
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error validating image size:', error);
            return true; // Allow upload if validation fails
        }
    };

    const pickImageFromCamera = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== 'granted') {
                Toast.show({
                    type: 'error',
                    text1: 'Permission denied',
                    text2: 'We need camera permissions to take photos',
                    position: 'bottom',
                });
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const isValid = await validateImageSize(result.assets[0].uri);
                if (isValid) {
                    setImageUri(result.assets[0].uri);
                }
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to take photo',
                position: 'bottom',
            });
        }
    };

    const pickImageFromLibrary = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Toast.show({
                    type: 'error',
                    text1: 'Permission denied',
                    text2: 'We need camera roll permissions',
                    position: 'bottom',
                });
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const isValid = await validateImageSize(result.assets[0].uri);
                if (isValid) {
                    setImageUri(result.assets[0].uri);
                }
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to select image',
                position: 'bottom',
            });
        }
    };

    const uploadImage = async (uri: string): Promise<string | null> => {
        if (!userId) return null;

        setIsUploading(true);

        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const fileExt = uri.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            const { data, error } = await supabase.storage
                .from('message_images')
                .upload(filePath, blob, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) throw error;

            return data.path;
        } catch (error) {
            console.error('Error uploading image:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to upload image',
                position: 'bottom',
            });
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const getSignedUrl = async (path: string): Promise<string> => {
        try {
            const { data, error } = await supabase.storage
                .from('message_images')
                .createSignedUrl(path, 3600);

            if (error) throw error;
            return data.signedUrl;
        } catch (error) {
            console.error('Error getting signed URL:', error);
            return '';
        }
    };

    // Load image URLs for messages
    useEffect(() => {
        const loadImageUrls = async () => {
            const pathsToFetch: string[] = [];

            for (const message of messages) {
                if (message.type === 'image' && message.image_path && message.user_id === userId) {
                    if (!imageUrls[message.image_path]) {
                        pathsToFetch.push(message.image_path);
                    }
                }
            }

            if (pathsToFetch.length === 0) return;

            try {
                const urls: Record<string, string> = {};
                for (const path of pathsToFetch) {
                    const url = await getSignedUrl(path);
                    if (url) urls[path] = url;
                }

                if (Object.keys(urls).length > 0) {
                    setImageUrls(prev => ({ ...prev, ...urls }));
                }
            } catch (error) {
                console.error('Error loading image URLs:', error);
            }
        };

        if (userId && messages.length > 0) {
            loadImageUrls();
        }
    }, [messages, userId]);

    const handleSendMessage = async () => {
        if ((!messageText.trim() && !imageUri) || !userId) return;

        setIsLoading(true);
        const content = messageText.trim();

        try {
            let imagePath = null;

            if (imageUri) {
                imagePath = await uploadImage(imageUri);
                if (!imagePath && !content) {
                    setIsLoading(false);
                    return;
                }
            }

            const { error } = await supabase
                .from('messages')
                .insert({
                    user_id: userId,
                    content: content,
                    role: 'user',
                    type: imageUri ? 'image' : 'text',
                    image_path: imagePath,
                });

            if (error) throw error;

            setMessageText('');
            setImageUri(null);
            setWaitingForResponse(true);

            // Scroll to bottom after sending
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        } catch (error) {
            console.error('Error sending message:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to send message',
                position: 'bottom',
            });
            setWaitingForResponse(false);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = (message: Message) => {
        const isUserMessage = message.role === 'user';
        const imageUrl = message.image_path ? imageUrls[message.image_path] : null;

        return (
            <View
                key={message.id}
                style={[
                    styles.messageBubble,
                    isUserMessage ? styles.userMessage : styles.assistantMessage
                ]}
            >
                {message.type === 'image' && imageUrl && (
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.messageImage}
                        resizeMode="cover"
                    />
                )}
                {message.content ? (
                    <Text style={[
                        styles.messageText,
                        isUserMessage ? styles.userMessageText : styles.assistantMessageText,
                        (message.type === 'image' && imageUrl) ? styles.messageTextWithImage : null
                    ]}>
                        {message.content}
                    </Text>
                ) : null}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={colors.commonScreensBGConfig.colors}
                start={colors.commonScreensBGConfig.start}
                end={colors.commonScreensBGConfig.end}
                style={colors.mainScreensBGElement}>
                <View style={GlobalStyles.mainScreenTitleDescContainer}>
                    <Text style={GlobalStyles.mainScreenTitle}>Timeloon AI</Text>
                    <Text style={GlobalStyles.mainScreenDescription}>Ask anything. Reflect. Capture memories.</Text>
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    onContentSizeChange={() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }}
                >
                    {isInitialLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={colors.activeTabIcon} />
                        </View>
                    ) : messages.length === 0 ? (
                        <View style={styles.suggestionsContainer}>
                            <Text style={styles.centerText}>
                                Start a conversation to capture your memories
                            </Text>

                            <View style={styles.promptsContainer}>
                                {suggestionPrompts.map((prompt, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.promptButton}
                                        onPress={() => setMessageText(prompt)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.promptText}>{prompt}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ) : (
                        <View style={styles.messagesContainer}>
                            {messages.map(renderMessage)}
                            {waitingForResponse && (
                                <View style={[styles.messageBubble, styles.assistantMessage]}>
                                    <TypingIndicator />
                                </View>
                            )}
                        </View>
                    )}

                </ScrollView>

                <View style={styles.inputShadowContainer}>
                    <LinearGradient
                        colors={['#FFF7EA', '#FFF']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.inputContainer}
                    >
                        {imageUri && (
                            <View style={styles.imagePreviewContainer}>
                                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={() => setImageUri(null)}
                                >
                                    <Text style={styles.removeImageText}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={styles.inputRow}>
                            <View style={styles.inputField}>
                                <TouchableOpacity
                                    style={styles.imageButton}
                                    onPress={selectImageSource}
                                    disabled={isLoading || isUploading}
                                >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#E5AB47" />
                                    ) : (
                                        <PlusIcon width={20} height={20} />
                                    )}
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    placeholder="How can I help you today?"
                                    placeholderTextColor="#B8B8B8"
                                    value={messageText}
                                    onChangeText={setMessageText}
                                    multiline
                                    editable={!isLoading && !isUploading}
                                />
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={selectImageSource}
                                    disabled={isLoading || isUploading}
                                >
                                    <PlusIcon width={24} height={24} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.sendButton, (isLoading || isUploading || waitingForResponse || (!messageText.trim() && !imageUri)) && styles.sendButtonDisabled]}
                                    onPress={handleSendMessage}
                                    activeOpacity={0.7}
                                    disabled={isLoading || isUploading || waitingForResponse || (!messageText.trim() && !imageUri)}
                                >
                                    {isLoading || isUploading ? (
                                        <ActivityIndicator size="small" color="#000" />
                                    ) : (
                                        <ArrowRightIcon width={24} height={24} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
                <BottomTabNav activeTab="Chat" onTabPress={onTabChange} />
            </LinearGradient>
        </View>
    );
};

export default ChatScreen;
