// src/screens/ChatScreen.js
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const ChatScreen = ({ route }) => {
  const theme = useContext(ThemeContext);
  const { sender, avatar, property, propertyImage } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef();

  // Mensajes iniciales ficticios
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I have a question about your property',
        time: '10:30 AM',
        sent: true
      },
      {
        id: '2',
        text: 'Hi there! Thanks for your message. What would you like to know?',
        time: '10:32 AM',
        sent: false
      },
      {
        id: '3',
        text: 'Is the beach easily accessible from the villa?',
        time: '10:33 AM',
        sent: true
      },
      {
        id: '4',
        text: 'Yes! It\'s just a 2-minute walk through our private path',
        time: '10:35 AM',
        sent: false
      }
    ]);
  }, []);

  const handleSend = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simular respuesta automática después de 1 segundo
    setTimeout(() => {
      const replyMessage = {
        id: Date.now().toString(),
        text: 'Thanks for your message! I\'ll get back to you soon with more details.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: false
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble, 
      item.sent ? styles.sentMessage : styles.receivedMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sent ? { color: 'white' } : { color: theme.colors.gray900 }
      ]}>
        {item.text}
      </Text>
      <Text style={[
        styles.messageTime,
        item.sent ? { color: 'rgba(255,255,255,0.7)' } : { color: theme.colors.gray500 }
      ]}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={{ uri: avatar }} style={styles.headerAvatar} />
          <View style={styles.headerText}>
            <Text style={[styles.senderName, { color: theme.colors.gray900 }]}>{sender}</Text>
            <Text style={[styles.propertyText, { color: theme.colors.gray600 }]} numberOfLines={1}>
              {property}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="information-circle-outline" size={24} color={theme.colors.gray700} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.white }]}>
          <TouchableOpacity style={styles.attachmentButton}>
            <MaterialCommunityIcons name="attachment" size={24} color={theme.colors.gray500} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme.colors.gray100,
              color: theme.colors.gray900
            }]}
            placeholder="Type a message..."
            placeholderTextColor={theme.colors.gray500}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              message.trim() === '' ? 
                { backgroundColor: theme.colors.gray300 } : 
                { backgroundColor: '#2EC0CE' }
            ]}
            onPress={handleSend}
            disabled={message.trim() === ''}
          >
            <FontAwesome 
              name="send" 
              size={18} 
              color={message.trim() === '' ? theme.colors.gray500 : 'white'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  propertyText: {
    fontSize: 14,
    marginTop: 2,
  },
  headerButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2EC0CE',
    borderTopRightRadius: 4,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 15,
  },
  attachmentButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;