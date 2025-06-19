import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const PRIMARY_COLOR = '#2EC0CE';

const BookingConfirmation = ({ navigation, route }) => {
  // Datos de ejemplo (en una app real vendrían de route.params o de un estado global)
  const bookingDetails = {
    property: {
      id: '1',
      title: 'Modern Cabin with Mountain Views',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      location: 'Jarabacoa, Dominican Republic',
      rating: 4.92,
      reviews: 128,
    },
    dates: {
      checkIn: '2023-06-15',
      checkOut: '2023-06-20',
      nights: 5,
    },
    guests: 2,
    totalPrice: 625,
    cleaningFee: 25,
    serviceFee: 18,
    taxes: 32,
    paymentMethod: '•••• •••• •••• 4242',
    confirmationNumber: 'ABC123XYZ',
    host: {
      name: 'Carlos Rodríguez',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      responseRate: '100%',
      responseTime: 'within an hour'
    }
  };

  const formattedCheckIn = new Date(bookingDetails.dates.checkIn).toLocaleDateString('es-ES', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });
  
  const formattedCheckOut = new Date(bookingDetails.dates.checkOut).toLocaleDateString('es-ES', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const handleViewItinerary = () => {
    // Navegar a la vista de itinerario
    navigation.navigate('Itinerary');
  };

  const handleMessageHost = () => {
    // Navegar al chat con el anfitrión
    navigation.navigate('Messages', { host: bookingDetails.host });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={Platform.OS !== 'web'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={PRIMARY_COLOR} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reserva confirmada</Text>
        </View>

        {/* Card de confirmación */}
        <View style={styles.confirmationCard}>
          <View style={styles.successIcon}>
            <MaterialIcons name="check-circle" size={48} color={PRIMARY_COLOR} />
          </View>
          <Text style={styles.confirmationTitle}>¡Tu reserva está confirmada!</Text>
          <Text style={styles.confirmationNumber}>Número de confirmación: {bookingDetails.confirmationNumber}</Text>
          
          <View style={styles.hostContainer}>
            <Image 
              source={{ uri: bookingDetails.host.avatar }} 
              style={styles.hostAvatar} 
            />
            <View style={styles.hostInfo}>
              <Text style={styles.hostName}>Anfitrión: {bookingDetails.host.name}</Text>
              <Text style={styles.hostResponse}>
                Tasa de respuesta: {bookingDetails.host.responseRate} • Responde {bookingDetails.host.responseTime}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.messageButton}
            onPress={handleMessageHost}
          >
            <Text style={styles.messageButtonText}>Enviar mensaje al anfitrión</Text>
          </TouchableOpacity>
        </View>

        {/* Detalles de la reserva */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu viaje</Text>
          
          <View style={styles.propertyCard}>
            <Image 
              source={{ uri: bookingDetails.property.image }} 
              style={styles.propertyImage} 
            />
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyType}>Casa completa</Text>
              <Text style={styles.propertyTitle}>{bookingDetails.property.title}</Text>
              <View style={styles.propertyRating}>
                <FontAwesome name="star" size={14} color={PRIMARY_COLOR} />
                <Text style={styles.ratingText}>{bookingDetails.property.rating}</Text>
                <Text style={styles.reviewsText}>({bookingDetails.property.reviews} reseñas)</Text>
              </View>
              <Text style={styles.propertyLocation}>{bookingDetails.property.location}</Text>
            </View>
          </View>
          
          <View style={styles.datesContainer}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>CHECK-IN</Text>
              <Text style={styles.dateValue}>{formattedCheckIn}</Text>
              <Text style={styles.dateTime}>Después de las 15:00</Text>
            </View>
            
            <View style={styles.dateSeparator}>
              <View style={styles.dateSeparatorLine} />
              <View style={styles.dateSeparatorArrow}>
                <MaterialIcons name="arrow-forward" size={16} color={PRIMARY_COLOR} />
              </View>
            </View>
            
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>CHECK-OUT</Text>
              <Text style={styles.dateValue}>{formattedCheckOut}</Text>
              <Text style={styles.dateTime}>Antes de las 11:00</Text>
            </View>
          </View>
          
          <View style={styles.guestsContainer}>
            <Text style={styles.guestsLabel}>Huéspedes</Text>
            <Text style={styles.guestsValue}>{bookingDetails.guests} {bookingDetails.guests > 1 ? 'huéspedes' : 'huésped'}</Text>
          </View>
        </View>

        {/* Detalles de pago */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de pago</Text>
          
          <View style={styles.paymentMethod}>
            <View style={styles.paymentIcon}>
              <FontAwesome name="credit-card" size={20} color={PRIMARY_COLOR} />
            </View>
            <Text style={styles.paymentText}>Método de pago: {bookingDetails.paymentMethod}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>${bookingDetails.property.price} x {bookingDetails.dates.nights} noches</Text>
            <Text style={styles.priceValue}>${bookingDetails.property.price * bookingDetails.dates.nights}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tarifa de limpieza</Text>
            <Text style={styles.priceValue}>${bookingDetails.cleaningFee}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tarifa de servicio</Text>
            <Text style={styles.priceValue}>${bookingDetails.serviceFee}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Impuestos</Text>
            <Text style={styles.priceValue}>${bookingDetails.taxes}</Text>
          </View>
          
          <View style={styles.totalPriceRow}>
            <Text style={styles.totalPriceLabel}>Total</Text>
            <Text style={styles.totalPriceValue}>
              ${bookingDetails.property.price * bookingDetails.dates.nights + 
                bookingDetails.cleaningFee + 
                bookingDetails.serviceFee + 
                bookingDetails.taxes}
            </Text>
          </View>
        </View>

        {/* Información importante */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información importante</Text>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="house" size={20} color={PRIMARY_COLOR} />
            </View>
            <Text style={styles.infoText}>
              Recibirás las instrucciones para el check-in el día de tu llegada.
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="cancel" size={20} color={PRIMARY_COLOR} />
            </View>
            <Text style={styles.infoText}>
              Cancelación gratuita hasta 24 horas antes del check-in.
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="security" size={20} color={PRIMARY_COLOR} />
            </View>
            <Text style={styles.infoText}>
              Tu reserva está protegida por nuestra Política de Protección al Huésped.
            </Text>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleViewItinerary}
          >
            <Text style={styles.primaryButtonText}>Ver itinerario</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Explore')}
          >
            <Text style={styles.secondaryButtonText}>Explorar más propiedades</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      web: {
        height: '100vh',
        overflow: 'hidden',
      },
      default: {}
    }),
  },
  scrollView: {
    flex: 1,
    ...Platform.select({
      web: {
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      },
      default: {}
    }),
  },
  scrollContent: {
    paddingBottom: 120,
    ...Platform.select({
      web: {
        paddingBottom: 160,
      },
      default: {}
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    ...Platform.select({
      web: {
        paddingTop: 8,
      },
      default: {}
    }),
  },
  backButton: {
    marginRight: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
      default: {}
    }),
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  confirmationCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  successIcon: {
    marginBottom: 16,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmationNumber: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  hostAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  hostResponse: {
    fontSize: 12,
    color: '#666666',
  },
  messageButton: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 8,
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  section: {
    margin: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  propertyCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyType: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  propertyRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 4,
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666666',
  },
  propertyLocation: {
    fontSize: 14,
    color: '#666666',
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  dateValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 12,
    color: '#666666',
  },
  dateSeparator: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dateSeparatorLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#DDDDDD',
  },
  dateSeparatorArrow: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  guestsContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
  },
  guestsLabel: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  guestsValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  paymentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 192, 206, 0.1)',
    marginRight: 12,
  },
  paymentText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  totalPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  totalPriceLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  totalPriceValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 192, 206, 0.1)',
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    lineHeight: 20,
  },
  actionsContainer: {
    margin: 16,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
      default: {}
    }),
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
      default: {}
    }),
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
});

export default BookingConfirmation;