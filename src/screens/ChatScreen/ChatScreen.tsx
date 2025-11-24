import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ChatStyles as styles } from './ChatScreen.styles';
import BottomTabNav from '@/components/BottomTabNav';

interface ChatScreenProps {
    onTabChange: (tab: 'MemoryTree' | 'Chat' | 'Profile') => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onTabChange }) => {
    const [messageText, setMessageText] = React.useState('');

    const suggestionPrompts = [
        "Tell me about your childhood",
        "What was your first job?",
        "Share a favorite family memory"
    ];

    const handleSendMessage = () => {
        if (messageText.trim()) {
            // TODO: Implement message sending logic
            console.log('Sending message:', messageText);
            setMessageText('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Timeloon AI</Text>
                <Text style={styles.subtitle}>Ask anything. Reflect. Capture memories.</Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContent}
            >
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
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    placeholderTextColor="#999"
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                    activeOpacity={0.7}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>

            <BottomTabNav activeTab="Chat" onTabPress={onTabChange} />
        </View>
    );
};

export default ChatScreen;
