import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const PRIMARY_COLOR = '#2EC0CE';

const PropertyDetailScreen = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { property } = route.params;
  const scrollViewRef = useRef();

  const [selectedImage, setSelectedImage] = useState(property.image);
  const [activeTab, setActiveTab] = useState('about');
  const scrollY = new Animated.Value(0);

  const images = [
    property.image,
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ];

  const amenities = [
    { id: '1', name: 'WiFi', icon: 'wifi' },
    { id: '2', name: 'Cocina', icon: 'utensils' },
    { id: '3', name: 'Lavadora', icon: 'tshirt' },
    { id: '4', name: 'Aire acondicionado', icon: 'snowflake' },
    { id: '5', name: 'Piscina', icon: 'swimming-pool' },
    { id: '6', name: 'Parqueo gratis', icon: 'parking' },
    { id: '7', name: 'TV', icon: 'tv' },
    { id: '8', name: 'Jacuzzi', icon: 'hot-tub' },
  ];

  const reviews = [
    {
      id: '1',
      name: 'María García',
      date: 'Marzo 2023',
      rating: 5,
      text: "¡La cabaña era absolutamente perfecta! Las vistas eran impresionantes y el jacuzzi era muy relajante después de un día de caminata. El anfitrión fue muy receptivo y proporcionó excelentes recomendaciones para restaurantes locales. ¡No podemos esperar para volver!",
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '2',
      name: 'Juan Pérez',
      date: 'Febrero 2023',
      rating: 5,
      text: "Esta fue nuestra segunda estancia en esta cabaña y fue tan maravillosa como la primera vez. La ubicación es perfecta: lo suficientemente apartada para sentirse privada pero lo suficientemente cerca del pueblo para mayor comodidad. El diseño moderno es hermoso y todo estaba impecable cuando llegamos.",
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
  ];

  const renderAmenities = () => (
    <View style={styles.amenitiesGrid}>
      {amenities.map((item) => (
        <View key={item.id} style={styles.amenityItem}>
          <View style={styles.amenityIcon}>
            <FontAwesome name={item.icon} size={16} color={PRIMARY_COLOR} />
          </View>
          <Text style={styles.amenityText}>{item.name}</Text>
        </View>
      ))}
    </View>
  );

  const renderReviews = () => (
    <View>
      {reviews.map((item) => (
        <View key={item.id} style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Image source={{ uri: item.avatar }} style={styles.reviewAvatar} />
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewName}>{item.name}</Text>
              <Text style={styles.reviewDate}>{item.date}</Text>
            </View>
            <View style={styles.reviewStars}>
              {[...Array(item.rating)].map((_, i) => (
                <FontAwesome key={i} name="star" size={14} color={PRIMARY_COLOR} />
              ))}
            </View>
          </View>
          <Text style={styles.reviewText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.propertyDescription}>
              Esta propiedad moderna es el escape perfecto en {property.location}. Disfruta de impresionantes vistas desde las ventanas de piso a techo, relájate en la piscina privada o acurrúcate en la cómoda área de estar. El espacio de concepto abierto cuenta con una cocina totalmente equipada, área de estar cómoda y lujosos dormitorios.
            </Text>
            
            <Text style={styles.sectionTitle}>Comodidades</Text>
            {renderAmenities()}
          </View>
        );
      case 'reviews':
        return (
          <View style={styles.tabContent}>
            <View style={styles.ratingOverview}>
              <Text style={styles.ratingNumber}>{property.rating}</Text>
              <View style={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome 
                    key={i} 
                    name="star" 
                    size={20} 
                    color={i < Math.floor(property.rating) ? PRIMARY_COLOR : "#DDDDDD"} 
                  />
                ))}
              </View>
              <Text style={styles.ratingCount}>({property.reviews} reseñas)</Text>
              
              <View style={styles.ratingBars}>
                <View style={styles.ratingBarItem}>
                  <Text style={styles.ratingBarLabel}>Limpieza</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBarFill, { width: '95%' }]} />
                  </View>
                  <Text style={styles.ratingBarValue}>4.9</Text>
                </View>
                
                <View style={styles.ratingBarItem}>
                  <Text style={styles.ratingBarLabel}>Precisión</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBarFill, { width: '98%' }]} />
                  </View>
                  <Text style={styles.ratingBarValue}>5.0</Text>
                </View>
                
                <View style={styles.ratingBarItem}>
                  <Text style={styles.ratingBarLabel}>Ubicación</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBarFill, { width: '92%' }]} />
                  </View>
                  <Text style={styles.ratingBarValue}>4.8</Text>
                </View>
              </View>
            </View>
            
            {renderReviews()}
            
            <TouchableOpacity style={styles.showAllReviews}>
              <Text style={styles.showAllReviewsText}>
                Mostrar todas las {property.reviews} reseñas
              </Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} color={PRIMARY_COLOR} />
            </TouchableOpacity>
          </View>
        );
      case 'location':
        return (
          <View style={styles.tabContent}>
            <View style={styles.mapPlaceholder}>
              <Image 
                source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=18.7357,-70.1627&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7C18.7357,-70.1627&key=YOUR_API_KEY' }} 
                style={styles.mapImage}
              />
              <TouchableOpacity style={styles.mapOverlay}>
                <Text style={styles.mapOverlayText}>Ver en Google Maps</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.locationDescription}>
              Ubicada en el corazón de {property.location}, esta propiedad ofrece el equilibrio perfecto entre conveniencia y tranquilidad. El vecindario es vibrante con restaurantes locales, tiendas y atracciones culturales a poca distancia.
            </Text>
            <TouchableOpacity style={styles.showMoreButton}>
              <Text style={styles.showMoreText}>Mostrar más</Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} color={PRIMARY_COLOR} />
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header animado */}
      <Animated.View style={[styles.header, { 
        opacity: scrollY.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
          extrapolate: 'clamp'
        })
      }]}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <View style={styles.headerRightButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-social" size={20} color="#333333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart" size={24} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* ScrollView principal - Solución definitiva */}
      <ScrollView 
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagen principal */}
        <View style={styles.mainImageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.mainImage} />
          <TouchableOpacity 
            style={styles.floatingBackButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
        </View>
        
        {/* Miniaturas de imágenes - ScrollView horizontal */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailsList}
        >
          {images.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.imageThumbnail,
                selectedImage === item && styles.selectedThumbnail
              ]}
              onPress={() => setSelectedImage(item)}
            >
              <Image source={{ uri: item }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Información de la propiedad */}
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <View style={styles.propertyMeta}>
            <View style={styles.ratingBadge}>
              <FontAwesome name="star" size={12} color="white" />
              <Text style={styles.ratingText}>{property.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>({property.reviews} reseñas)</Text>
            <Text style={styles.superhostText}>· Superhost</Text>
            <Text style={styles.locationText}>· {property.location}</Text>
          </View>
        </View>
        
        {/* Características */}
        <View style={styles.propertyFeatures}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <FontAwesome name="home" size={16} color={PRIMARY_COLOR} />
            </View>
            <View>
              <Text style={styles.featureLabel}>Casa completa</Text>
              <Text style={styles.featureValue}>2 huéspedes · 1 dormitorio · 1 cama · 1 baño</Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <FontAwesome name='briefcase' size={16} color={PRIMARY_COLOR} />
            </View>
            <View>
              <Text style={styles.featureLabel}>Limpieza avanzada</Text>
              <Text style={styles.featureValue}>Este anfitrión se comprometió con un riguroso protocolo de limpieza</Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <FontAwesome name='map-marker' size={16} color={PRIMARY_COLOR} />
            </View>
            <View>
              <Text style={styles.featureLabel}>Excelente ubicación</Text>
              <Text style={styles.featureValue}>90% de los huéspedes recientes dieron 5 estrellas</Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <FontAwesome name='calendar-check-o' size={16} color={PRIMARY_COLOR} />
            </View>
            <View>
              <Text style={styles.featureLabel}>Cancelación gratuita</Text>
              <Text style={styles.featureValue}>Cancela hasta 24 horas antes del check-in</Text>
            </View>
          </View>
        </View>
        
        {/* Pestañas */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'about' && styles.activeTabButton]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>Descripción</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'reviews' && styles.activeTabButton]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reseñas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'location' && styles.activeTabButton]}
            onPress={() => setActiveTab('location')}
          >
            <Text style={[styles.tabText, activeTab === 'location' && styles.activeTabText]}>Ubicación</Text>
          </TouchableOpacity>
        </View>
        
        {/* Contenido de pestañas */}
        {renderTabContent()}

        {/* Espaciador final */}
        <View style={{ height: 30 }} />
      </ScrollView>
      
      {/* Barra de reserva fija */}
      <View style={styles.bookingBar}>
        <View style={styles.bookingPrice}>
          <Text style={styles.priceText}>
            ${property.price} <Text style={styles.nightText}>/noche</Text>
          </Text>
          <View style={styles.bookingRating}>
            <FontAwesome name="star" size={14} color={PRIMARY_COLOR} />
            <Text style={styles.ratingText}>{property.rating} · {property.reviews} reseñas</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRightButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  mainImageContainer: {
    height: height * 0.4,
    width: '100%',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  floatingBackButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnailsList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EEEEEE',
  },
  selectedThumbnail: {
    borderColor: PRIMARY_COLOR,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  propertyHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  propertyTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  propertyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: PRIMARY_COLOR,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#666666',
    marginRight: 8,
  },
  superhostText: {
    fontSize: 12,
    color: '#666666',
    marginRight: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
  },
  propertyFeatures: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 192, 206, 0.1)',
  },
  featureLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  featureValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY_COLOR,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999999',
  },
  activeTabText: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
  },
  propertyDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  amenityItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  amenityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 192, 206, 0.1)',
  },
  amenityText: {
    fontSize: 14,
    color: '#333333',
    flexShrink: 1,
  },
  ratingOverview: {
    marginBottom: 24,
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333333',
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  ratingBars: {
    width: '100%',
    marginTop: 16,
    gap: 12,
  },
  ratingBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingBarLabel: {
    width: 80,
    fontSize: 12,
    color: '#666666',
  },
  ratingBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: PRIMARY_COLOR,
  },
  ratingBarValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    width: 30,
  },
  reviewItem: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  reviewAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  showAllReviews: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  showAllReviewsText: {
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  mapPlaceholder: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
    alignItems: 'center',
  },
  mapOverlayText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  locationDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 8,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bookingPrice: {
    flex: 1,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  nightText: {
    fontSize: 14,
    color: '#666666',
  },
  bookingRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  bookButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: PRIMARY_COLOR,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PropertyDetailScreen;