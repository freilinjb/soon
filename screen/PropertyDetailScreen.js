import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
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
  const [expandedDescription, setExpandedDescription] = useState(false);
  const scrollY = new Animated.Value(0);

  const images = [
    property.image,
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ];

  const amenities = [
    { id: '1', name: 'WiFi', icon: 'wifi', available: true },
    { id: '2', name: 'Cocina equipada', icon: 'utensils', available: true },
    { id: '3', name: 'Lavadora', icon: 'tshirt', available: true },
    { id: '4', name: 'Aire acondicionado', icon: 'snowflake', available: true },
    { id: '5', name: 'Piscina', icon: 'swimming-pool', available: true },
    { id: '6', name: 'Estacionamiento gratis', icon: 'parking', available: true },
    { id: '7', name: 'TV Smart', icon: 'tv', available: true },
    { id: '8', name: 'Jacuzzi', icon: 'hot-tub', available: true },
    { id: '9', name: 'Desayuno incluido', icon: 'coffee', available: false },
    { id: '10', name: 'Gimnasio', icon: 'dumbbell', available: false },
    { id: '11', name: 'Mascotas permitidas', icon: 'paw', available: false },
    { id: '12', name: 'Accesible', icon: 'wheelchair', available: true },
  ];

  const houseRules = [
    { id: '1', rule: 'Check-in: 15:00 - 20:00', icon: 'clock-outline' },
    { id: '2', rule: 'Check-out: 11:00', icon: 'clock-outline' },
    { id: '3', rule: 'No se permiten fiestas', icon: 'party-popper' },
    { id: '4', rule: 'No fumar', icon: 'smoking-off' },
    { id: '5', rule: 'Máximo 2 huéspedes', icon: 'account-group' },
  ];

  const reviews = [
    {
      id: '1',
      name: 'María García',
      date: 'Marzo 2023',
      rating: 5,
      text: "¡La cabaña era absolutamente perfecta! Las vistas eran impresionantes y el jacuzzi era muy relajante después de un día de caminata. El anfitrión fue muy receptivo y proporcionó excelentes recomendaciones para restaurantes locales. ¡No podemos esperar para volver!",
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      cleanliness: 5,
      accuracy: 5,
      location: 5,
      communication: 5,
      checkin: 5,
      value: 5
    },
    {
      id: '2',
      name: 'Juan Pérez',
      date: 'Febrero 2023',
      rating: 5,
      text: "Esta fue nuestra segunda estancia en esta cabaña y fue tan maravillosa como la primera vez. La ubicación es perfecta: lo suficientemente apartada para sentirse privada pero lo suficientemente cerca del pueblo para mayor comodidad. El diseño moderno es hermoso y todo estaba impecable cuando llegamos.",
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      cleanliness: 5,
      accuracy: 5,
      location: 4,
      communication: 5,
      checkin: 5,
      value: 5
    },
    {
      id: '3',
      name: 'Ana Martínez',
      date: 'Enero 2023',
      rating: 4,
      text: "Muy buena experiencia en general. El lugar es exactamente como en las fotos. El único detalle fue que el WiFi era un poco lento, pero no fue un problema mayor ya que íbamos a desconectarnos. Volvería sin duda.",
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      cleanliness: 5,
      accuracy: 4,
      location: 4,
      communication: 5,
      checkin: 4,
      value: 4
    },
  ];

  const renderAmenities = () => (
    <View style={styles.amenitiesGrid}>
      {amenities.map((item) => (
        <View key={item.id} style={styles.amenityItem}>
          <View style={[styles.amenityIcon, !item.available && styles.amenityIconDisabled]}>
            <FontAwesome 
              name={item.icon} 
              size={16} 
              color={item.available ? PRIMARY_COLOR : '#CCCCCC'} 
            />
          </View>
          <Text style={[styles.amenityText, !item.available && styles.amenityTextDisabled]}>
            {item.name}
          </Text>
          {!item.available && (
            <View style={styles.notAvailableBadge}>
              <Text style={styles.notAvailableText}>No disponible</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderHouseRules = () => (
    <View style={styles.houseRulesContainer}>
      {houseRules.map((item) => (
        <View key={item.id} style={styles.ruleItem}>
          <MaterialCommunityIcons 
            name={item.icon} 
            size={20} 
            color={PRIMARY_COLOR} 
            style={styles.ruleIcon}
          />
          <Text style={styles.ruleText}>{item.rule}</Text>
        </View>
      ))}
    </View>
  );

  const renderReviewDetails = (review) => (
    <View style={styles.reviewDetails}>
      <View style={styles.reviewDetailItem}>
        <Text style={styles.reviewDetailLabel}>Limpieza</Text>
        <View style={styles.reviewDetailStars}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome 
              key={`clean-${i}`} 
              name="star" 
              size={12} 
              color={i < review.cleanliness ? PRIMARY_COLOR : "#DDDDDD"} 
            />
          ))}
        </View>
      </View>
      
      <View style={styles.reviewDetailItem}>
        <Text style={styles.reviewDetailLabel}>Precisión</Text>
        <View style={styles.reviewDetailStars}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome 
              key={`acc-${i}`} 
              name="star" 
              size={12} 
              color={i < review.accuracy ? PRIMARY_COLOR : "#DDDDDD"} 
            />
          ))}
        </View>
      </View>
      
      <View style={styles.reviewDetailItem}>
        <Text style={styles.reviewDetailLabel}>Comunicación</Text>
        <View style={styles.reviewDetailStars}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome 
              key={`comm-${i}`} 
              name="star" 
              size={12} 
              color={i < review.communication ? PRIMARY_COLOR : "#DDDDDD"} 
            />
          ))}
        </View>
      </View>
      
      <View style={styles.reviewDetailItem}>
        <Text style={styles.reviewDetailLabel}>Ubicación</Text>
        <View style={styles.reviewDetailStars}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome 
              key={`loc-${i}`} 
              name="star" 
              size={12} 
              color={i < review.location ? PRIMARY_COLOR : "#DDDDDD"} 
            />
          ))}
        </View>
      </View>
      
      <View style={styles.reviewDetailItem}>
        <Text style={styles.reviewDetailLabel}>Check-in</Text>
        <View style={styles.reviewDetailStars}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome 
              key={`checkin-${i}`} 
              name="star" 
              size={12} 
              color={i < review.checkin ? PRIMARY_COLOR : "#DDDDDD"} 
            />
          ))}
        </View>
      </View>
      
      <View style={styles.reviewDetailItem}>
        <Text style={styles.reviewDetailLabel}>Valor</Text>
        <View style={styles.reviewDetailStars}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome 
              key={`value-${i}`} 
              name="star" 
              size={12} 
              color={i < review.value ? PRIMARY_COLOR : "#DDDDDD"} 
            />
          ))}
        </View>
      </View>
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
          
          {renderReviewDetails(item)}
          
          <Text style={styles.reviewText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
    const handleScroll = (event) => {
    if (Platform.OS === 'web') {
      const { contentOffset } = event.nativeEvent;
      scrollY.setValue(contentOffset.y);
    }
  };
  const [webScrollEnabled, setWebScrollEnabled] = useState(true);

  useEffect(() => {
    if (Platform.OS === 'web' && scrollViewRef.current) {
      // Habilitar el scroll en web
      scrollViewRef.current.getScrollableNode().addEventListener('wheel', (e) => {
        if (!webScrollEnabled) {
          e.preventDefault();
        }
      });
    }
  }, [webScrollEnabled]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.propertyDescription} numberOfLines={expandedDescription ? undefined : 3}>
              {property.description || `Esta propiedad moderna es el escape perfecto en ${property.location}. Disfruta de impresionantes vistas desde las ventanas de piso a techo, relájate en la piscina privada o acurrúcate en la cómoda área de estar. El espacio de concepto abierto cuenta con una cocina totalmente equipada, área de estar cómoda y lujosos dormitorios. La propiedad ha sido recientemente renovada con materiales de alta calidad y diseño contemporáneo.`}
            </Text>
            
            {!expandedDescription && (
              <TouchableOpacity 
                style={styles.readMoreButton}
                onPress={() => setExpandedDescription(true)}
              >
                <Text style={styles.readMoreText}>Mostrar más</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color={PRIMARY_COLOR} />
              </TouchableOpacity>
            )}
            
            <Text style={styles.sectionTitle}>Lo que ofrece este lugar</Text>
            {renderAmenities()}
            
            <Text style={styles.sectionTitle}>Normas de la casa</Text>
            {renderHouseRules()}
            
            <Text style={styles.sectionTitle}>Disponibilidad</Text>
            <View style={styles.calendarPlaceholder}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/600x300?text=Calendario+de+Disponibilidad' }} 
                style={styles.calendarImage}
              />
            </View>
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
                  <Text style={styles.ratingBarLabel}>Comunicación</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBarFill, { width: '97%' }]} />
                  </View>
                  <Text style={styles.ratingBarValue}>4.9</Text>
                </View>
                
                <View style={styles.ratingBarItem}>
                  <Text style={styles.ratingBarLabel}>Ubicación</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBarFill, { width: '92%' }]} />
                  </View>
                  <Text style={styles.ratingBarValue}>4.8</Text>
                </View>
                
                <View style={styles.ratingBarItem}>
                  <Text style={styles.ratingBarLabel}>Check-in</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBarFill, { width: '96%' }]} />
                  </View>
                  <Text style={styles.ratingBarValue}>4.9</Text>
                </View>
                
                <View style={styles.ratingBarItem}>
                  <Text style={styles.ratingBarLabel}>Valor</Text>
                  <View style={styles.ratingBarContainer}>
                    <View style={[styles.ratingBarFill, { width: '94%' }]} />
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
            
            <Text style={styles.sectionTitle}>Qué hay cerca</Text>
            
            <View style={styles.nearbyPlaces}>
              <View style={styles.nearbyPlaceItem}>
                <View style={styles.nearbyPlaceIcon}>
                  <MaterialIcons name="restaurant" size={20} color={PRIMARY_COLOR} />
                </View>
                <View style={styles.nearbyPlaceInfo}>
                  <Text style={styles.nearbyPlaceName}>Restaurante La Terraza</Text>
                  <Text style={styles.nearbyPlaceDistance}>A 5 minutos caminando</Text>
                </View>
              </View>
              
              <View style={styles.nearbyPlaceItem}>
                <View style={styles.nearbyPlaceIcon}>
                  <MaterialIcons name="local-grocery-store" size={20} color={PRIMARY_COLOR} />
                </View>
                <View style={styles.nearbyPlaceInfo}>
                  <Text style={styles.nearbyPlaceName}>Supermercado Fresh</Text>
                  <Text style={styles.nearbyPlaceDistance}>A 10 minutos caminando</Text>
                </View>
              </View>
              
              <View style={styles.nearbyPlaceItem}>
                <View style={styles.nearbyPlaceIcon}>
                  <MaterialIcons name="beach-access" size={20} color={PRIMARY_COLOR} />
                </View>
                <View style={styles.nearbyPlaceInfo}>
                  <Text style={styles.nearbyPlaceName}>Playa Escondida</Text>
                  <Text style={styles.nearbyPlaceDistance}>A 15 minutos en auto</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.showMoreButton}>
              <Text style={styles.showMoreText}>Mostrar más lugares cercanos</Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} color={PRIMARY_COLOR} />
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS === 'web' && styles.webScrollContent
        ]}
        showsVerticalScrollIndicator={Platform.OS !== 'web'}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        scrollEnabled={Platform.OS !== 'web' || webScrollEnabled}
        nestedScrollEnabled={true}
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
          
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {images.findIndex(img => img === selectedImage) + 1}/{images.length}
            </Text>
          </View>
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
              activeOpacity={0.7}
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
              <Text style={styles.featureLabel}>Tipo de propiedad</Text>
              <Text style={styles.featureValue}>Casa completa - 2 huéspedes · 1 dormitorio · 1 cama · 1 baño</Text>
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
              <Text style={styles.featureValue}>90% de los huéspedes recientes dieron 5 estrellas a la ubicación</Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <FontAwesome name='calendar-check-o' size={16} color={PRIMARY_COLOR} />
            </View>
            <View>
              <Text style={styles.featureLabel}>Check-in sin problemas</Text>
              <Text style={styles.featureValue}>El 95% de los huéspedes recientes calificó el proceso de check-in con 5 estrellas</Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <FontAwesome name='wifi' size={16} color={PRIMARY_COLOR} />
            </View>
            <View>
              <Text style={styles.featureLabel}>WiFi rápido</Text>
              <Text style={styles.featureValue}>Velocidad promedio de 100 Mbps, ideal para trabajo remoto</Text>
            </View>
          </View>
        </View>
        
        {/* Pestañas */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'about' && styles.activeTabButton]}
            onPress={() => setActiveTab('about')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>Descripción</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'reviews' && styles.activeTabButton]}
            onPress={() => setActiveTab('reviews')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reseñas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'location' && styles.activeTabButton]}
            onPress={() => setActiveTab('location')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === 'location' && styles.activeTabText]}>Ubicación</Text>
          </TouchableOpacity>
        </View>
        
        {/* Contenido de pestañas */}
        {renderTabContent()}
        
        {/* Sección de precios */}
        <View style={styles.priceDetails}>
          <Text style={styles.sectionTitle}>Detalles del precio</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>${property.price} x 5 noches</Text>
            <Text style={styles.priceValue}>${property.price * 5}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tarifa de limpieza</Text>
            <Text style={styles.priceValue}>$25</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tarifa de servicio</Text>
            <Text style={styles.priceValue}>$18</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Impuestos</Text>
            <Text style={styles.priceValue}>$32</Text>
          </View>
          
          <View style={styles.totalPriceRow}>
            <Text style={styles.totalPriceLabel}>Total</Text>
            <Text style={styles.totalPriceValue}>${property.price * 5 + 25 + 18 + 32}</Text>
          </View>
        </View>
        
        {/* Política de cancelación */}
        <View style={styles.cancellationPolicy}>
          <Text style={styles.sectionTitle}>Política de cancelación</Text>
          <Text style={styles.cancellationText}>
            Cancelación gratuita hasta 24 horas antes del check-in. Después, cancela antes del check-in y recibe un reembolso del 50%, menos la tarifa de servicio.
          </Text>
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreText}>Mostrar más</Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de reserva */}
      <View style={styles.bookingBar}>
        <View style={styles.bookingInfo}>
          <View style={styles.priceContainer}>
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
        
        <View style={styles.datesContainer}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>CHECK-IN</Text>
            <Text style={styles.dateValue}>15 jun 2023</Text>
          </View>
          
          <View style={styles.dateSeparator}>
            <View style={styles.dateSeparatorLine} />
            <View style={styles.dateSeparatorArrow}>
              <MaterialIcons name="arrow-forward" size={16} color={PRIMARY_COLOR} />
            </View>
          </View>
          
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>CHECK-OUT</Text>
            <Text style={styles.dateValue}>20 jun 2023</Text>
          </View>
        </View>
      </View>
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
        display: 'flex',
        flexDirection: 'column',
      },
      default: {
        minHeight: '100%',
      }
    }),
  },
  scrollView: {
    flex: 1,
    ...Platform.select({
      web: {
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }
    }),
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 180,
    ...(Platform.OS === 'web' && {
      display: 'flex',
      flexDirection: 'column',
    }),
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
    ...(Platform.OS === 'web' && {
      position: 'fixed',
    }),
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
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  headerRightButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  mainImageContainer: {
    height: height * 0.4,
    width: '100%',
    position: 'relative',
    ...(Platform.OS === 'web' && {
      height: '40vh',
      maxHeight: 400,
    }),
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  floatingBackButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 50,
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
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  imageCounter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  imageCounterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  thumbnailsList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...(Platform.OS === 'web' && {
      display: 'flex',
      flexDirection: 'row',
    }),
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EEEEEE',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      flexShrink: 0,
    }),
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
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
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
    marginBottom: 8,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginRight: 4,
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
    position: 'relative',
  },
  amenityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 192, 206, 0.1)',
  },
  amenityIconDisabled: {
    backgroundColor: 'rgba(204, 204, 204, 0.1)',
  },
  amenityText: {
    fontSize: 14,
    color: '#333333',
    flexShrink: 1,
  },
  amenityTextDisabled: {
    color: '#CCCCCC',
  },
  notAvailableBadge: {
    position: 'absolute',
    top: -4,
    right: 0,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  notAvailableText: {
    fontSize: 10,
    color: '#999999',
  },
  houseRulesContainer: {
    marginTop: 8,
    gap: 12,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ruleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 192, 206, 0.1)',
  },
  ruleText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  calendarPlaceholder: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    width: 100,
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
  reviewDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  reviewDetailItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewDetailLabel: {
    fontSize: 12,
    color: '#666666',
    width: 80,
  },
  reviewDetailStars: {
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
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
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
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
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
    marginBottom: 16,
  },
  nearbyPlaces: {
    gap: 16,
    marginBottom: 16,
  },
  nearbyPlaceItem: {
    flexDirection: 'row',
    gap: 12,
  },
  nearbyPlaceIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 192, 206, 0.1)',
  },
  nearbyPlaceInfo: {
    flex: 1,
  },
  nearbyPlaceName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 2,
  },
  nearbyPlaceDistance: {
    fontSize: 12,
    color: '#666666',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  priceDetails: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
  cancellationPolicy: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  cancellationText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  webScrollContent: {
    overflow: 'visible',
    minHeight: 'calc(100vh - 180px)',
  },
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 16,
    ...(Platform.OS === 'web' && {
      position: 'fixed',
    }),
    ...Platform.select({
      web: {
        position: 'fixed',
        zIndex: 100,
      },
      default: {}
    }),
  },
  bookingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceContainer: {
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
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
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
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
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
});

export default PropertyDetailScreen;