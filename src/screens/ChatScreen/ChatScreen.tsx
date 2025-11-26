import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { ChatStyles as styles } from './ChatScreen.styles';
import BottomTabNav from '@/components/BottomTabNav';
import { supabase } from '@/services/supabase/client';
import Toast from 'react-native-toast-message';

interface Message {
    id: string;
    user_id: string | null;
    content: string;
    role: 'user' | 'assistant';
    created_at: string;
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
    const scrollViewRef = useRef<ScrollView>(null);

    const suggestionPrompts = [
        "Tell me about your childhood",
        "What was your first job?",
        "Share a favorite family memory"
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
                        setMessages(prev => [...prev, payload.new as Message]);
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

    const handleSendMessage = async () => {
        if (!messageText.trim() || !userId) return;

        setIsLoading(true);
        const content = messageText.trim();

        try {
            const { error } = await supabase
                .from('messages')
                .insert({
                    user_id: userId,
                    content: content,
                    role: 'user'
                });

            if (error) throw error;

            setMessageText('');

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
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = (message: Message) => {
        const isUserMessage = message.role === 'user';

        return (
            <View
                key={message.id}
                style={[
                    styles.messageBubble,
                    isUserMessage ? styles.userMessage : styles.assistantMessage
                ]}
            >
                <Text style={[
                    styles.messageText,
                    isUserMessage ? styles.userMessageText : styles.assistantMessageText
                ]}>
                    {message.content}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Timeloon AI</Text>
                <Text style={styles.subtitle}>Ask anything. Reflect. Capture memories.</Text>
            </View>

            <ScrollView
                ref={scrollViewRef}
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
                onContentSizeChange={() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }}
            >
                {isInitialLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#E5AB47" />
                    </View>
                ) : messages.length === 0 ? (
                    <View style={styles.content}>
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
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    placeholderTextColor="#999"
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline
                    editable={!isLoading}
                />
                <TouchableOpacity
                    style={[styles.sendButton, (isLoading || !messageText.trim()) && styles.sendButtonDisabled]}
                    onPress={handleSendMessage}
                    activeOpacity={0.7}
                    disabled={isLoading || !messageText.trim()}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                        <Text style={styles.sendButtonText}>Send</Text>
                    )}
                </TouchableOpacity>
            </View>

            <BottomTabNav activeTab="Chat" onTabPress={onTabChange} />
        </View>
    );
};

export default ChatScreen;
