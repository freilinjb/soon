import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const WishlistScreen = () => {
  const theme = useContext(ThemeContext);
  
  const savedProperties = [
    {
      id: '1',
      title: 'Beachfront Villa in Punta Cana',
      location: 'Punta Cana, Dominican Republic',
      price: 250,
      rating: 4.92,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      savedDaysAgo: 3,
    },
    {
      id: '2',
      title: 'Mountain Retreat in Jarabacoa',
      location: 'Jarabacoa, Dominican Republic',
      price: 180,
      rating: 4.85,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      savedDaysAgo: 1,
    },
    {
      id: '3',
      title: 'Modern Loft in Santo Domingo',
      location: 'Santo Domingo, Dominican Republic',
      price: 120,
      rating: 4.78,
      reviews: 64,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      savedDaysAgo: 5,
    },
  ];

  const renderProperty = ({ item }) => (
    <TouchableOpacity 
      style={[styles.propertyCard, { backgroundColor: theme.colors.white }]}
      activeOpacity={0.9}
    >
      <View style={styles.propertyImageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.propertyImage} 
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={[styles.heartIcon, { backgroundColor: 'rgba(255,255,255,0.7)' }]}
          activeOpacity={0.8}
        >
          <FontAwesome name="heart" size={20} color="#ff385c" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.propertyInfo}>
        <View style={styles.propertyHeader}>
          <Text 
            style={[styles.propertyTitle, { color: theme.colors.gray900 }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={12} color="#FFD700" />
            <Text style={[styles.ratingText, { color: theme.colors.gray900 }]}>
              {item.rating} <Text style={styles.reviewsText}>({item.reviews})</Text>
            </Text>
          </View>
        </View>
        
        <Text 
          style={[styles.propertyLocation, { color: theme.colors.gray600 }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.location}
        </Text>
        
        <Text style={[styles.propertyDates, { color: theme.colors.gray500 }]}>
          Saved {item.savedDaysAgo} {item.savedDaysAgo === 1 ? 'day' : 'days'} ago
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={[styles.propertyPrice, { color: theme.colors.gray900 }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>${item.price}</Text>
            <Text style={{ fontSize: 14 }}> / night</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.gray900 }]}>
          Your Wishlist
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.gray600 }]}>
          {savedProperties.length} saved {savedProperties.length === 1 ? 'property' : 'properties'}
        </Text>
      </View>
      
      {savedProperties.length > 0 ? (
        <FlatList
          data={savedProperties}
          renderItem={renderProperty}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconContainer, { backgroundColor: theme.colors.lightBackground }]}>
            <Ionicons name="heart" size={48} color="#2EC0CE" />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.colors.gray800 }]}>Your wishlist is empty</Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.gray600 }]}>
            When you find a property you love, tap the heart icon to save it here.
          </Text>
          <TouchableOpacity 
            style={[styles.exploreButton, { backgroundColor: '#2EC0CE' }]}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreButtonText}>Explore properties</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  propertyCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  propertyImageContainer: {
    height: width * 0.6,
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyInfo: {
    padding: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '600',
  },
  reviewsText: {
    fontWeight: 'normal',
    color: '#666',
  },
  propertyLocation: {
    fontSize: 14,
    marginBottom: 4,
  },
  propertyDates: {
    fontSize: 12,
    marginBottom: 8,
  },
  priceContainer: {
    marginTop: 8,
  },
  propertyPrice: {
    fontSize: 14,
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
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
  },
  exploreButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WishlistScreen;