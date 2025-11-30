import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import { ChatStyles as styles } from './ChatScreen.styles';
import BottomTabNav from '@/components/BottomTabNav';
import { supabase } from '@/services/supabase/client';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import TypingIndicator from '@/components/TypingIndicator';
import PlusIcon from '../../../assets/icons/plus.svg';
import ArrowRightIcon from '../../../assets/icons/arrow_right.svg';
import colors from '@/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyles } from '@/styles/Global.styles';
import AttachmentSheet from '@/components/AttachmentSheet';
import UploadProgress from '@/components/UploadProgress';

interface Message {
    id: string;
    user_id: string | null;
    content: string;
    role: 'user' | 'assistant';
    created_at: string;
    type?: 'text' | 'image';
    image_path?: string;
}

function formatTimestamp(ts?: string | number | Date | null): string {
    try {
        const d = ts ? new Date(ts as any) : new Date();
        let hours = d.getHours();
        const minutes = d.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        if (hours === 0) hours = 12;
        const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
        return `${hours}:${mm} ${ampm}`;
    } catch {
        return '';
    }
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
    const [uploadProgress, setUploadProgress] = useState(0);
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
                    position: 'top',
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
                    position: 'top',
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

                        if (newMessage.role === 'assistant') {
                            setWaitingForResponse(false);
                        }

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

    const [attachmentVisible, setAttachmentVisible] = useState(false);
    const openAttachmentSheet = () => setAttachmentVisible(true);
    const closeAttachmentSheet = () => setAttachmentVisible(false);

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
                    position: 'top',
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
                    position: 'top',
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
                    closeAttachmentSheet();
                }
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to take photo',
                position: 'top',
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
                    position: 'top',
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
                    closeAttachmentSheet();
                }
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to select image',
                position: 'top',
            });
        }
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true, multiple: false });
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                Toast.show({
                    type: 'info',
                    text1: 'File attachments',
                    text2: `${asset.name} selected. Support coming soon`,
                    position: 'top',
                });
            }
        } catch (error) {
            console.error('Error picking file:', error);
            Toast.show({ type: 'error', text1: 'Failed to select file', position: 'top' });
        } finally {
            closeAttachmentSheet();
        }
    };

    const uploadImage = async (uri: string): Promise<string | null> => {
        if (!userId) return null;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const response = await fetch(uri);
            const arrayBuffer = await response.arrayBuffer();
            const fileExt = uri.split('.').pop() || 'jpg';
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            // Determine content type
            const contentType = fileExt === 'png' ? 'image/png' : 'image/jpeg';

            // Simulate progress (Supabase doesn't provide upload progress callback)
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            const { data, error } = await supabase.storage
                .from('message_images')
                .upload(filePath, arrayBuffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: contentType,
                });

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (error) throw error;

            return data.path;
        } catch (error) {
            console.error('Error uploading image:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to upload image',
                position: 'top',
            });
            return null;
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
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
                position: 'top',
            });
            setWaitingForResponse(false);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = (message: Message) => {
        const isUserMessage = message.role === 'user';
        const imageUrl = message.image_path ? imageUrls[message.image_path] : null;

        const userColors = [
            'rgba(255,255,255,0.90)',
            'rgba(255,233,197,0.85)',
            'rgba(255,223,166,0.77)'
        ];
        const assistantColors = [
            'rgba(255,223,166,0.28)',
            'rgba(255,223,166,0.14)',
            'rgba(255,223,166,0.34)'
        ];

        const gradientProps = isUserMessage
            ? { colors: userColors, start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } }
            : { colors: assistantColors, start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };

        const timestamp = formatTimestamp((message as any).createdAt || (message as any).created_at || (message as any).timestamp || null);
        return (
            <View key={message.id} style={[styles.messageBubbleShadowWrapper, styles.messageBubble, isUserMessage ? styles.userMessage : styles.assistantMessage]}>
                <View style={styles.messageBubbleClip}>
                    <LinearGradient {...gradientProps} style={styles.messageBubbleGradient}>
                        <View style={styles.messageBubbleInner}>
                            {message.type === 'image' && imageUrl && (
                                <Image source={{ uri: imageUrl }} style={styles.messageImage} resizeMode="cover" />
                            )}
                            {message.content ? (
                                <Text
                                    style={[
                                        styles.messageText,
                                        isUserMessage ? styles.userMessageText : styles.assistantMessageText,
                                        (message.type === 'image' && imageUrl) ? styles.messageTextWithImage : null,
                                    ]}
                                >
                                    {message.content}
                                </Text>
                            ) : null}
                            {timestamp ? (
                                <Text style={styles.messageTimestamp}>{timestamp}</Text>
                            ) : null}
                        </View>
                    </LinearGradient>
                </View>
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
                            {messages.map((message, idx) => {
                                const prev = messages[idx - 1];
                                const currDate = new Date(message.created_at);
                                const prevDate = prev ? new Date(prev.created_at) : null;
                                const changedDay = !prevDate || currDate.toDateString() !== prevDate.toDateString();

                                const dateLabel = `${currDate.toLocaleString('default', { month: 'long' })} ${currDate.getDate()}, ${currDate.getFullYear()}`;

                                return (
                                    <React.Fragment key={message.id}>
                                        {changedDay ? (
                                            <View style={styles.dateSeparatorContainer}>
                                                <Text style={styles.dateSeparatorText}>{dateLabel}</Text>
                                            </View>
                                        ) : null}
                                        {renderMessage(message)}
                                    </React.Fragment>
                                );
                            })}
                            {isUploading && (
                                <View style={[styles.messageBubble, styles.userMessage]}>
                                    <UploadProgress progress={uploadProgress} />
                                </View>
                            )}
                            {waitingForResponse && (
                                <View style={[styles.messageBubble, styles.assistantMessage]}>
                                    <TypingIndicator />
                                </View>
                            )}
                        </View>
                    )}

                </ScrollView>

                <View style={styles.inputBottomNav}>
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
                            <TextInput
                                style={styles.input}
                                placeholder="How can I help you today?"
                                placeholderTextColor="#B8B8B8"
                                value={messageText}
                                onChangeText={setMessageText}
                                multiline
                                editable={!isLoading && !isUploading}
                            />

                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={openAttachmentSheet}
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
                        </LinearGradient>
                    </View>

                    <AttachmentSheet
                        visible={attachmentVisible}
                        onClose={closeAttachmentSheet}
                        onCamera={pickImageFromCamera}
                        onLibrary={pickImageFromLibrary}
                        onFile={pickDocument}
                    />

                    <BottomTabNav activeTab="Chat" onTabPress={onTabChange} />
                </View>
            </LinearGradient>
        </View>
    );
};

export default ChatScreen;
