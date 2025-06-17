import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const InboxScreen = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const messages = [
    {
      id: '1',
      sender: 'Maria García',
      property: 'Beachfront Villa in Punta Cana',
      preview: 'Hi there! Just confirming your reservation for next week...',
      time: '2h ago',
      unread: true,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      propertyImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: '2',
      sender: 'Carlos Rodríguez',
      property: 'Mountain Cabin in Jarabacoa',
      preview: 'Thanks for your message! The cabin will be ready for...',
      time: '1d ago',
      unread: false,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      propertyImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: '3',
      sender: 'Airbnb',
      property: 'Your upcoming trip to Santo Domingo',
      preview: 'Your trip is coming up soon! Here are some recommendations...',
      time: '3d ago',
      unread: false,
      avatar: 'https://logo.clearbit.com/airbnb.com',
      propertyImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: '4',
      sender: 'Lucía Fernández',
      property: 'Downtown Loft in Santiago',
      preview: 'Welcome to our loft! Here are the check-in instructions...',
      time: '1w ago',
      unread: false,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  const renderMessage = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.messageCard, 
        { 
          backgroundColor: theme.colors.white,
          borderLeftWidth: item.unread ? 4 : 0,
          borderLeftColor: item.unread ? '#2EC0CE' : 'transparent'
        }
      ]}
      onPress={() => navigation.navigate('Chat', { 
        sender: item.sender,
        avatar: item.avatar,
        property: item.property,
        propertyImage: item.propertyImage
      })}
      activeOpacity={0.8}
    >
      <View style={styles.messageContent}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        
        <View style={styles.messageInfo}>
          <View style={styles.messageHeader}>
            <Text 
              style={[
                styles.senderName, 
                { 
                  color: theme.colors.gray900,
                  fontWeight: item.unread ? '600' : '400'
                }
              ]}
            >
              {item.sender}
            </Text>
            <Text style={[styles.messageTime, { color: theme.colors.gray500 }]}>
              {item.time}
            </Text>
          </View>
          
          <Text 
            style={[
              styles.propertyTitle, 
              { 
                color: theme.colors.gray700,
                fontWeight: item.unread ? '600' : '400'
              }
            ]}
            numberOfLines={1}
          >
            {item.property}
          </Text>
          
          <Text 
            style={[
              styles.messagePreview, 
              { 
                color: theme.colors.gray600,
                fontWeight: item.unread ? '500' : '400'
              }
            ]}
            numberOfLines={1}
          >
            {item.preview}
          </Text>
        </View>
        
        <Image source={{ uri: item.propertyImage }} style={styles.propertyThumbnail} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {messages.length > 0 ? (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={[styles.headerTitle, { color: theme.colors.gray900 }]}>
                Messages
              </Text>
              <View style={styles.tabs}>
                <TouchableOpacity 
                  style={[styles.tab, styles.activeTab]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.tabText, { color: '#2EC0CE' }]}>Inbox</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.tab}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.tabText, { color: theme.colors.gray600 }]}>Updates</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconContainer, { backgroundColor: '#EBF9FA' }]}>
            <Ionicons name="mail-open" size={48} color="#2EC0CE" />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.colors.gray800 }]}>
            No messages yet
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.gray600 }]}>
            When you contact hosts or have reservations, your messages will appear here
          </Text>
          <TouchableOpacity 
            style={[styles.exploreButton, { backgroundColor: '#2EC0CE' }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.exploreButtonText, { color: 'white' }]}>
              Explore properties
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingBottom: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2EC0CE',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  messageCard: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  messageInfo: {
    flex: 1,
    marginRight: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    flex: 1,
  },
  messageTime: {
    fontSize: 13,
  },
  propertyTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  messagePreview: {
    fontSize: 14,
  },
  propertyThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  exploreButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default InboxScreen;