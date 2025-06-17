import FiltersModal from '@/components/FiltersModal';
import LoginModal from '@/components/LoginModal';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
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
const HEADER_HEIGHT = Platform.OS === 'ios' ? 100 : 80;
const HERO_HEIGHT = height * 0.45;

const HomeScreen = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('stays');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Animated header styles
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HERO_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, - (HERO_HEIGHT - HEADER_HEIGHT)],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HERO_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, HERO_HEIGHT - HEADER_HEIGHT],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  // Fake data for Dominican Republic properties
  const categories = [
    { id: '1', name: 'Playa', icon: 'umbrella-beach', color: '#FF9E7D' },
    { id: '2', name: 'Montaña', icon: 'mountain', color: '#4ECDC4' },
    { id: '3', name: 'Piscinas', icon: 'swimming-pool', color: '#45B7D1' },
    { id: '4', name: 'Casitas', icon: 'home', color: '#FFA07A' },
    { id: '5', name: 'Lujo', icon: 'crown', color: '#D4A5A5' },
    { id: '6', name: 'Campo', icon: 'tree', color: '#81B29A' },
    { id: '7', name: 'Vistas', icon: 'binoculars', color: '#F4A261' },
    { id: '8', name: 'Ciudad', icon: 'city', color: '#9B59B6' },
  ];

  const savedProperties = [
    {
      id: '1',
      title: 'Villa frente al mar en Punta Cana',
      location: 'Punta Cana',
      price: 250,
      rating: 4.92,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      savedDaysAgo: 3,
      isSuperhost: true,
    },
    {
      id: '2',
      title: 'Retiro en las montañas de Jarabacoa',
      location: 'Jarabacoa',
      price: 180,
      rating: 4.85,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      savedDaysAgo: 1,
    },
  ];

  const properties = [
    {
      id: '1',
      title: 'Penthouse en Santo Domingo con vista al mar',
      location: 'Santo Domingo',
      price: 150,
      rating: 4.88,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      dates: 'Jun 15-20',
      isSuperhost: true,
    },
    {
      id: '2',
      title: 'Casa en la playa - Las Terrenas',
      location: 'Las Terrenas',
      price: 220,
      rating: 4.95,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      dates: 'Jul 5-10',
    },
    {
      id: '3',
      title: 'Loft colonial en Zona Colonial',
      location: 'Zona Colonial',
      price: 120,
      rating: 4.78,
      reviews: 65,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      dates: 'Aug 15-20',
      isSuperhost: true,
    },
    {
      id: '4',
      title: 'Eco Lodge en Samaná con acceso privado a playa',
      location: 'Samaná',
      price: 95,
      rating: 4.82,
      reviews: 53,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      dates: 'Sep 3-10',
    },
  ];

  const deals = [
    {
      id: '1',
      title: 'Villa con piscina en Cabarete',
      location: 'Cabarete',
      price: 350,
      discount: 25,
      discountedPrice: 262,
      rating: 4.92,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      dates: 'Jun 10-15',
      lastBooked: 'Hace 2 horas',
      isSuperhost: true,
    },
    {
      id: '2',
      title: 'Penthouse en Puerto Plata con vista al océano',
      location: 'Puerto Plata',
      price: 280,
      discount: 15,
      discountedPrice: 238,
      rating: 4.88,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      dates: 'Jul 5-10',
      lastBooked: 'Solo 1 disponible',
    },
    {
      id: '3',
      title: 'Bungalow en Bayahibe frente al mar',
      location: 'Bayahibe',
      price: 200,
      discount: 20,
      discountedPrice: 160,
      rating: 4.85,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      dates: 'Aug 12-18',
      lastBooked: 'Oferta popular',
      isSuperhost: true,
    },
  ];

  const experiences = [
    {
      id: '1',
      title: 'Clase de cocina dominicana con chef local',
      location: 'Santo Domingo',
      price: 65,
      rating: 4.98,
      reviews: 120,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      type: 'Experiencia culinaria',
    },
    {
      id: '2',
      title: 'Excursión a la cascada El Limón',
      location: 'Samaná',
      price: 40,
      rating: 4.92,
      reviews: 85,
      image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
      type: 'Aventura',
    },
    {
      id: '3',
      title: 'Tour de ron dominicano con degustación',
      location: 'Punta Cana',
      price: 55,
      rating: 4.89,
      reviews: 210,
      image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
      type: 'Degustación',
    },
    {
      id: '4',
      title: 'Tour de café en las montañas de Jarabacoa',
      location: 'Jarabacoa',
      price: 35,
      rating: 4.87,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80',
      type: 'Cultural',
    },
  ];

  const testimonials = [
    {
      id: '1',
      name: 'María García',
      location: 'Santiago',
      rating: 5,
      text: "La villa en Punta Cana fue increíble. El anfitrión fue muy atento y la ubicación perfecta. ¡Volveremos seguro!",
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '2',
      name: 'Juan Pérez',
      location: 'Santo Domingo',
      rating: 5,
      text: "La clase de cocina fue lo mejor de nuestro viaje. Aprendimos mucho sobre la gastronomía dominicana y la comida estaba deliciosa.",
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '3',
      name: 'Sophie Martin',
      location: 'París, Francia',
      rating: 5,
      text: "El retiro en Jarabacoa era acogedor y tenía todo lo necesario. Las vistas eran impresionantes y el anfitrión nos dio excelentes recomendaciones.",
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      activeOpacity={0.8}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <FontAwesome name={item.icon} size={20} color="white" />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.propertyCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('PropertyDetail', { property: item })}
    >
      <View style={styles.propertyImageContainer}>
        <Image source={{ uri: item.image }} style={styles.propertyImage} />
        <TouchableOpacity style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
        {item.isSuperhost && (
          <View style={styles.superhostBadge}>
            <Text style={styles.superhostText}>SUPERHOST</Text>
          </View>
        )}
      </View>
      <View style={styles.propertyInfo}>
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <Text style={styles.propertyDates}>{item.dates}</Text>
        <Text style={styles.propertyPrice}>
          <Text style={styles.propertyPriceBold}>${item.price}</Text> noche
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSavedProperty = ({ item }) => (
    <TouchableOpacity 
      style={styles.savedPropertyCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('PropertyDetail', { property: item })}
    >
      <View style={styles.savedPropertyImageContainer}>
        <Image source={{ uri: item.image }} style={styles.savedPropertyImage} />
        <TouchableOpacity style={styles.savedHeartIcon}>
          <FontAwesome name="heart" size={20} color="#FF385C" />
        </TouchableOpacity>
        {item.isSuperhost && (
          <View style={styles.superhostBadge}>
            <Text style={styles.superhostText}>SUPERHOST</Text>
          </View>
        )}
      </View>
      <View style={styles.savedPropertyInfo}>
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <Text style={styles.propertyDates}>Guardado hace {item.savedDaysAgo} días</Text>
        <Text style={styles.propertyPrice}>
          <Text style={styles.propertyPriceBold}>${item.price}</Text> noche
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderDealCard = ({ item }) => (
    <View style={styles.dealCard}>
      <View style={styles.dealImageContainer}>
        <Image source={{ uri: item.image }} style={styles.dealImage} />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{item.discount}%</Text>
        </View>
        {item.isSuperhost && (
          <View style={styles.superhostBadge}>
            <Text style={styles.superhostText}>SUPERHOST</Text>
          </View>
        )}
      </View>
      <View style={styles.dealInfo}>
        <Text style={styles.dealTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.dealLocation}>{item.location}</Text>
        <View style={styles.dealRating}>
          <FontAwesome name="star" size={14} color="#FFD700" />
          <Text style={styles.dealRatingText}>
            {item.rating} ({item.reviews} reseñas)
          </Text>
        </View>
        <View style={styles.dealPriceContainer}>
          <Text style={styles.dealOriginalPrice}>${item.price}</Text>
          <Text style={styles.dealDiscountedPrice}>
            ${item.discountedPrice} noche
          </Text>
        </View>
        <Text style={styles.dealDates}>
          {item.dates} · {item.lastBooked}
        </Text>
      </View>
    </View>
  );

  const renderExperienceCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.experienceCard}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.experienceImage} />
      <View style={styles.experienceInfo}>
        <Text style={styles.experienceType}>{item.type}</Text>
        <Text style={styles.experienceTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.experienceLocation}>{item.location}</Text>
        <View style={styles.experienceRating}>
          <FontAwesome name="star" size={14} color="#FFD700" />
          <Text style={styles.experienceRatingText}>
            {item.rating} ({item.reviews} reseñas)
          </Text>
        </View>
        <Text style={styles.experiencePrice}>
          <Text style={styles.propertyPriceBold}>${item.price}</Text> por persona
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderTestimonialCard = ({ item }) => (
    <View style={styles.testimonialCard}>
      <View style={styles.testimonialHeader}>
        <Image source={{ uri: item.avatar }} style={styles.testimonialAvatar} />
        <View>
          <Text style={styles.testimonialName}>{item.name}</Text>
          <Text style={styles.testimonialLocation}>{item.location}</Text>
          <View style={styles.testimonialStars}>
            {[...Array(item.rating)].map((_, i) => (
              <FontAwesome key={i} name="star" size={14} color="#FFD700" />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.testimonialText}>{item.text}</Text>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stays':
        return (
          <View style={styles.tabContent}>
            {/* Saved Properties */}
            <View style={styles.savedPropertiesContainer}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Tus alojamientos guardados</Text>
                  <Text style={styles.sectionSubtitle}>
                    Vuelve a explorar propiedades que guardaste antes
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>Ver todos</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={savedProperties}
                renderItem={renderSavedProperty}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.savedPropertiesList}
              />
            </View>

            {/* All Properties */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Explora República Dominicana</Text>
                <View style={styles.sectionActions}>
                  <TouchableOpacity style={styles.sectionAction}>
                    <Text style={styles.sectionActionText}>Mapa</Text>
                    <MaterialIcons name="map" size={18} color={theme.colors.gray700} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sectionAction}>
                    <Text style={styles.sectionActionText}>Guardar</Text>
                    <FontAwesome name="bookmark" size={16} color={theme.colors.gray700} />
                  </TouchableOpacity>
                </View>
              </View>
              <FlatList
                data={properties}
                renderItem={renderPropertyCard}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.propertiesGrid}
                scrollEnabled={false}
              />
              <TouchableOpacity style={styles.showAllButton}>
                <Text style={styles.showAllButtonText}>Mostrar todo (200+)</Text>
              </TouchableOpacity>
            </View>

            {/* Deals */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ofertas exclusivas</Text>
              <Text style={styles.sectionSubtitle}>Reserva ahora y ahorra en tu próximo viaje</Text>
              <FlatList
                data={deals}
                renderItem={renderDealCard}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dealsList}
              />
            </View>
          </View>
        );
      case 'experiences':
        return (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experiencias únicas en RD</Text>
              <Text style={styles.sectionSubtitle}>Actividades memorables con anfitriones locales</Text>
              <FlatList
                data={experiences}
                renderItem={renderExperienceCard}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.propertiesGrid}
                scrollEnabled={false}
              />
              <TouchableOpacity style={styles.showAllButton}>
                <Text style={styles.showAllButtonText}>Mostrar todas las experiencias</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return (
          <View style={[styles.tabContent, styles.comingSoonContainer]}>
            <MaterialCommunityIcons name="hammer-wrench" size={48} color={theme.colors.gray500} />
            <Text style={styles.comingSoonText}>Próximamente</Text>
            <Text style={styles.comingSoonSubtext}>Estamos trabajando en esta sección</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[
        styles.header,
        { 
          transform: [{ translateY: headerTranslateY }],
          opacity: headerOpacity,
          backgroundColor: theme.colors.white,
        }
      ]}>
        <TouchableOpacity style={styles.headerButton}
          onPress={() => setShowFiltersModal(true)}
        >
          <Ionicons name="search" size={20} color={theme.colors.gray900} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setShowFiltersModal(true)}
        >
          <MaterialIcons name="tune" size={20} color={theme.colors.gray900} />
        </TouchableOpacity>
      </Animated.View>

      {/* Hero Section */}
      <Animated.View style={[styles.heroContainer, { opacity: heroOpacity }]}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80' }} 
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Descubre la belleza de República Dominicana</Text>
          <Text style={styles.heroSubtitle}>Encuentra alojamientos, experiencias y lugares únicos</Text>
          <TouchableOpacity 
            style={styles.searchButton}
            activeOpacity={0.9}
          >
            <View style={styles.searchButtonContent}>
              <Ionicons name="search" size={20} color={theme.colors.gray700} />
              <View>
                <Text style={styles.searchButtonText}>¿A dónde vas?</Text>
                <Text style={styles.searchButtonSubtext}>Cualquier lugar · Cualquier fecha · 1 huésped</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView 
        style={styles.mainContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } }}],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={{ height: HERO_HEIGHT }} /> {/* Spacer for hero section */}

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'stays' && styles.activeTabButton]}
              onPress={() => setActiveTab('stays')}
            >
              <Text style={[styles.tabText, activeTab === 'stays' && styles.activeTabText]}>Alojamientos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'flights' && styles.activeTabButton]}
              onPress={() => setActiveTab('flights')}
            >
              <Text style={[styles.tabText, activeTab === 'flights' && styles.activeTabText]}>Vuelos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'rentals' && styles.activeTabButton]}
              onPress={() => setActiveTab('rentals')}
            >
              <Text style={[styles.tabText, activeTab === 'rentals' && styles.activeTabText]}>Autos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'experiences' && styles.activeTabButton]}
              onPress={() => setActiveTab('experiences')}
            >
              <Text style={[styles.tabText, activeTab === 'experiences' && styles.activeTabText]}>Experiencias</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Host Section */}
        <View style={styles.hostContainer}>
          <View style={styles.hostContent}>
            <Text style={styles.hostTitle}>Conviértete en anfitrión</Text>
            <Text style={styles.hostSubtitle}>
              Gana ingresos adicionales y aprovecha nuevas oportunidades compartiendo tu espacio.
            </Text>
            <TouchableOpacity 
              style={styles.hostButton}
              activeOpacity={0.8}
            >
              <Text style={styles.hostButtonText}>Más información</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80' }} 
            style={styles.hostImage}
          />
        </View>

      </ScrollView>

      {/* Login Modal */}
      <LoginModal 
        visible={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {/* Filters Modal */}
      <FiltersModal 
        visible={showFiltersModal} 
        onClose={() => setShowFiltersModal(false)} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'white',
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  searchButton: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  searchButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginLeft: 12,
  },
  searchButtonSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginLeft: 12,
    marginTop: 2,
  },
  mainContent: {
    flex: 1,
  },
  categoriesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  categoriesList: {
    paddingHorizontal: 24,
  },
  categoryItem: {
    width: 80,
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#333333',
    textAlign: 'center',
  },
  tabsContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#F7F9FA',
  },
  tabText: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#666666',
  },
  activeTabText: {
    color: '#2EC0CE',
    fontFamily: 'Inter-SemiBold',
  },
  tabContent: {
    paddingBottom: 20,
  },
  section: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  sectionSubtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 8,
  },
  seeAllText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#2EC0CE',
  },
  sectionActions: {
    flexDirection: 'row',
  },
  sectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  sectionActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    marginRight: 4,
  },
  savedPropertiesContainer: {
    padding: 24,
    backgroundColor: '#F7F9FA',
    marginBottom: 8,
  },
  savedPropertiesList: {
    paddingRight: 24,
  },
  savedPropertyCard: {
    width: width - 120,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  savedPropertyImageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  savedPropertyImage: {
    width: '100%',
    height: '100%',
  },
  savedPropertyInfo: {
    padding: 16,
  },
  savedHeartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'white',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  propertiesGrid: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  propertyCard: {
    width: (width - 72) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  propertyImageContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  superhostBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  superhostText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#333333',
  },
  propertyInfo: {
    padding: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  propertyTitle: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    flex: 1,
    marginRight: 8,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333333',
    marginLeft: 4,
  },
  propertyLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 4,
  },
  propertyDates: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  propertyPriceBold: {
    fontFamily: 'Inter-Bold',
  },
  dealCard: {
    width: width - 80,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dealImageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF385C',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  discountText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  dealInfo: {
    padding: 16,
  },
  dealTitle: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
    lineHeight: 22,
  },
  dealLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 8,
  },
  dealRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dealRatingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333333',
    marginLeft: 4,
  },
  dealPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dealOriginalPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  dealDiscountedPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FF385C',
  },
  dealDates: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  dealsList: {
    paddingRight: 24,
  },
  showAllButton: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  showAllButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  experienceCard: {
    width: (width - 72) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  experienceImage: {
    width: '100%',
    height: 140,
  },
  experienceInfo: {
    padding: 16,
  },
  experienceType: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#2EC0CE',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  experienceTitle: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
    lineHeight: 20,
    height: 40,
  },
  experienceLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 8,
  },
  experienceRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  experienceRatingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333333',
    marginLeft: 4,
  },
  experiencePrice: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  comingSoonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  comingSoonText: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginTop: 16,
  },
  comingSoonSubtext: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    marginVertical: 24,
    backgroundColor: '#F7F9FA',
    borderRadius: 16,
    marginHorizontal: 24,
  },
  hostContent: {
    flex: 1,
    paddingRight: 16,
  },
  hostTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  hostSubtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 16,
    lineHeight: 22,
  },
  hostButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    backgroundColor: '#2EC0CE',
  },
  hostButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  hostImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  testimonialsContainer: {
    padding: 24,
  },
  testimonialsTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  testimonialsSubtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 16,
    textAlign: 'center',
  },
  testimonialsList: {
    paddingRight: 24,
  },
  testimonialCard: {
    width: width - 80,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  testimonialAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  testimonialName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  testimonialLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 4,
  },
  testimonialStars: {
    flexDirection: 'row',
  },
  testimonialText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 22,
  },
  newsletterContainer: {
    padding: 24,
    marginTop: 24,
    backgroundColor: '#F7F9FA',
    alignItems: 'center',
  },
  newsletterTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  newsletterSubtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  newsletterForm: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    marginBottom: 8,
  },
  newsletterInput: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 14,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  newsletterButton: {
    paddingHorizontal: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#2EC0CE',
  },
  newsletterButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  newsletterFooter: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    textAlign: 'center',
  },
});

export default HomeScreen;