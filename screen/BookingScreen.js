import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const BookingScreen = ({ route }) => {
  const navigation = useNavigation();
  const { property } = route.params;
  
  // Datos de ejemplo para RD
  const propertyDetails = {
    id: '1',
    title: 'Villa de lujo frente al mar en Punta Cana',
    location: 'Punta Cana, República Dominicana',
    price: 350,
    rating: 4.98,
    reviews: 142,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    ],
    description: 'Hermosa villa frente al mar con piscina privada, ubicada en el exclusivo complejo turístico de Punta Cana. Disfruta de las mejores playas de República Dominicana con todos los lujos y comodidades.',
    amenities: [
      { icon: 'wifi', name: 'WiFi rápido' },
      { icon: 'snowflake-o', name: 'Aire acondicionado' },
      { icon: 'swimming-pool', name: 'Piscina privada' },
      { icon: 'umbrella-beach', name: 'Acceso directo a playa' },
      { icon: 'parking', name: 'Estacionamiento gratuito' },
      { icon: 'kitchen', name: 'Cocina equipada' },
    ],
    host: {
      name: 'Carlos Rodríguez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      joined: '2018',
      superhost: true,
      responseRate: '100%',
      responseTime: 'en menos de 1 hora'
    },
    rules: [
      'Check-in después de las 3:00 PM',
      'Check-out antes de las 11:00 AM',
      'Máximo 6 huéspedes',
      'No se permiten fiestas',
      'No fumar dentro de la propiedad'
    ]
  };

  // Estados para fechas y huéspedes
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000 * 3));
  const [guests, setGuests] = useState(2);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(null);
    if (selectedDate) {
      if (showDatePicker === 'checkIn') {
        setCheckInDate(selectedDate);
        // Si checkout es antes del nuevo checkin, ajustar checkout
        if (checkOutDate < selectedDate) {
          setCheckOutDate(new Date(selectedDate.getTime() + 86400000));
        }
      } else if (showDatePicker === 'checkOut') {
        // No permitir checkout antes de checkin
        if (selectedDate >= checkInDate) {
          setCheckOutDate(selectedDate);
        }
      }
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateNights = () => {
    const diffTime = Math.abs(checkOutDate - checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = propertyDetails.price * nights;
    const cleaningFee = 50;
    const serviceFee = subtotal * 0.12;
    return {
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      total: subtotal + cleaningFee + serviceFee
    };
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Mira esta hermosa propiedad en ${propertyDetails.location}: ${propertyDetails.title} - ${propertyDetails.price} USD por noche`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleBook = () => {
    // Animación al reservar
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(300),
    ]).start(() => {
      navigation.navigate('BookingConfirmation', {
        property: propertyDetails,
        bookingDetails: {
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guests,
          total: calculateTotal().total
        }
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.header,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }] 
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Ionicons name="share-social" size={20} color="#333" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scrollView}>
        {/* Galería de imágenes */}
        <Animated.View 
          style={[
            styles.imageGalleryContainer,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Image 
            source={{ uri: propertyDetails.images[activeImageIndex] }} 
            style={styles.mainImage}
          />
          <View style={styles.imagePagination}>
            {propertyDetails.images.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.paginationDot,
                  index === activeImageIndex && styles.activeDot
                ]}
              />
            ))}
          </View>
        </Animated.View>

        {/* Información principal */}
        <Animated.View 
          style={[
            styles.contentContainer,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.title}>{propertyDetails.title}</Text>
          
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{propertyDetails.rating}</Text>
            <Text style={styles.reviewsText}>({propertyDetails.reviews} reseñas)</Text>
            <View style={styles.superhostBadge}>
              <Text style={styles.superhostText}>SUPERHOST</Text>
            </View>
          </View>
          
          <Text style={styles.locationText}>
            <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
            {propertyDetails.location}
          </Text>
        </Animated.View>

        {/* Selector de fechas */}
        <Animated.View 
          style={[
            styles.datesContainer,
            { transform: [{ translateY: slideUpAnim }] }
          ]}
        >
          <View style={styles.dateSelectionRow}>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowDatePicker('checkIn')}
            >
              <Text style={styles.dateLabel}>CHECK-IN</Text>
              <Text style={styles.dateValue}>{formatDate(checkInDate)}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowDatePicker('checkOut')}
            >
              <Text style={styles.dateLabel}>CHECK-OUT</Text>
              <Text style={styles.dateValue}>{formatDate(checkOutDate)}</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.guestsInput}>
            <Text style={styles.dateLabel}>HUÉSPEDES</Text>
            <Text style={styles.dateValue}>{guests} {guests === 1 ? 'huésped' : 'huéspedes'}</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Descripción */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Acerca de este alojamiento</Text>
          <Text 
            style={styles.descriptionText}
            numberOfLines={showFullDescription ? undefined : 3}
          >
            {propertyDetails.description}
          </Text>
          <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
            <Text style={styles.readMoreText}>
              {showFullDescription ? 'Mostrar menos' : 'Mostrar más'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Comodidades */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Comodidades</Text>
          <View style={styles.amenitiesGrid}>
            {propertyDetails.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <FontAwesome name={amenity.icon} size={20} color="#333" />
                <Text style={styles.amenityText}>{amenity.name}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Anfitrión */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Tu anfitrión</Text>
          <View style={styles.hostContainer}>
            <Image 
              source={{ uri: propertyDetails.host.avatar }} 
              style={styles.hostAvatar}
            />
            <View style={styles.hostInfo}>
              <Text style={styles.hostName}>{propertyDetails.host.name}</Text>
              <Text style={styles.hostDetail}>Anfitrión desde {propertyDetails.host.joined}</Text>
              <Text style={styles.hostDetail}>
                Tasa de respuesta: {propertyDetails.host.responseRate} • 
                Responde {propertyDetails.host.responseTime}
              </Text>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Contactar al anfitrión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Reglas */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Normas de la casa</Text>
          <View style={styles.rulesContainer}>
            {propertyDetails.rules.map((rule, index) => (
              <View key={index} style={styles.ruleItem}>
                <MaterialIcons name="done" size={18} color="#333" />
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Barra de reserva */}
      <Animated.View 
        style={[
          styles.bookingBar,
          { transform: [{ translateY: slideUpAnim }] }
        ]}
      >
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${propertyDetails.price}</Text>
          <Text style={styles.nightText}> / noche</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBook}
        >
          <Text style={styles.bookButtonText}>Reservar</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Date Pickers */}
      {showDatePicker && (
        <DateTimePicker
          value={showDatePicker === 'checkIn' ? checkInDate : checkOutDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={showDatePicker === 'checkOut' ? checkInDate : new Date()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80, // Espacio para la barra de reserva
  },
  imageGalleryContainer: {
    height: 300,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imagePagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 12,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 4,
  },
  superhostBadge: {
    marginLeft: 10,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  superhostText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 16,
  },
  datesContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  dateSelectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateInput: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
  },
  guestsInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
  readMoreText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2EC0CE',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  amenityText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
    marginLeft: 12,
  },
  hostContainer: {
    flexDirection: 'row',
  },
  hostAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 4,
  },
  hostDetail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 4,
  },
  contactButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contactButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  rulesContainer: {
    marginTop: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
    marginLeft: 8,
  },
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  nightText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#FF385C',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
});

export default BookingScreen;