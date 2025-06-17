import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const TripsScreen = () => {
  const theme = useContext(ThemeContext);

  const upcomingTrips = [
    {
      id: '1',
      title: 'Beachfront Villa in Punta Cana',
      location: 'Punta Cana, Dominican Republic',
      date: 'Jun 15 - 20, 2023',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      status: 'Confirmed',
      guests: 4,
      price: 1250,
    },
    {
      id: '2',
      title: 'Mountain Cabin in Jarabacoa',
      location: 'Jarabacoa, Dominican Republic',
      date: 'Aug 5 - 10, 2023',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      status: 'Confirmed',
      guests: 2,
      price: 900,
    },
  ];

  const pastTrips = [
    {
      id: '3',
      title: 'City Apartment in Santo Domingo',
      location: 'Santo Domingo, Dominican Republic',
      date: 'Mar 10 - 15, 2023',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      status: 'Completed',
      guests: 3,
      price: 600,
    },
    {
      id: '4',
      title: 'Luxury Resort in Puerto Plata',
      location: 'Puerto Plata, Dominican Republic',
      date: 'Dec 20 - 27, 2022',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      status: 'Completed',
      guests: 2,
      price: 1750,
    },
  ];

  const renderTripCard = ({ item }) => (
    <View style={[styles.tripCard, { backgroundColor: theme.colors.white }]}>
      <Image source={{ uri: item.image }} style={styles.tripImage} />
      
      <View style={styles.tripContent}>
        <View style={styles.tripHeader}>
          <Text style={[styles.tripStatus, { 
            color: item.status === 'Confirmed' ? '#2EC0CE' : theme.colors.gray600 
          }]}>
            {item.status}
          </Text>
          <Text style={[styles.tripDate, { color: theme.colors.gray600 }]}>
            <Ionicons name="calendar" size={14} color={theme.colors.gray600} /> {item.date}
          </Text>
        </View>
        
        <Text style={[styles.tripTitle, { color: theme.colors.gray900 }]} numberOfLines={1}>
          {item.title}
        </Text>
        
        <Text style={[styles.tripLocation, { color: theme.colors.gray600 }]}>
          <Ionicons name="location" size={14} color={theme.colors.gray600} /> {item.location}
        </Text>
        
        <View style={styles.tripFooter}>
          <Text style={[styles.tripGuests, { color: theme.colors.gray600 }]}>
            <FontAwesome name="users" size={14} color={theme.colors.gray600} /> {item.guests} guests
          </Text>
          <Text style={[styles.tripPrice, { color: theme.colors.gray900 }]}>
            ${item.price}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.tripButton, { 
            backgroundColor: item.status === 'Confirmed' ? '#2EC0CE' : theme.colors.gray200 
          }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tripButtonText, { 
            color: item.status === 'Confirmed' ? 'white' : theme.colors.gray700 
          }]}>
            {item.status === 'Confirmed' ? 'View details' : 'Leave a review'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {upcomingTrips.length > 0 || pastTrips.length > 0 ? (
        <FlatList
          ListHeaderComponent={
            <>
              {upcomingTrips.length > 0 && (
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: theme.colors.gray900 }]}>
                    Upcoming trips
                  </Text>
                </View>
              )}
            </>
          }
          data={upcomingTrips}
          renderItem={renderTripCard}
          keyExtractor={item => item.id}
          ListFooterComponent={
            <>
              {pastTrips.length > 0 && (
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: theme.colors.gray900 }]}>
                    Past trips
                  </Text>
                </View>
              )}
              {pastTrips.length > 0 && (
                <FlatList
                  data={pastTrips}
                  renderItem={renderTripCard}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              )}
            </>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconContainer, { backgroundColor: '#EBF9FA' }]}>
            <Ionicons name="airplane" size={48} color="#2EC0CE" />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.colors.gray800 }]}>
            No trips booked...yet!
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.gray600 }]}>
            Time to dust off your bags and start planning your next adventure
          </Text>
          <TouchableOpacity 
            style={[styles.exploreButton, { backgroundColor: '#2EC0CE' }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.exploreButtonText, { color: 'white' }]}>
              Start searching
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
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tripCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tripImage: {
    width: '100%',
    height: width * 0.5,
  },
  tripContent: {
    padding: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tripStatus: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tripDate: {
    fontSize: 13,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  tripLocation: {
    fontSize: 14,
    marginBottom: 12,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tripGuests: {
    fontSize: 14,
  },
  tripPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tripButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tripButtonText: {
    fontSize: 15,
    fontWeight: '600',
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
  },
});

export default TripsScreen;