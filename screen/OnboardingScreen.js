import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const onboardingSlides = [
  {
    id: '1',
    title: 'Encuentra lugares únicos',
    description: 'Descubre alojamientos especiales que no encontrarás en ningún otro lugar.',
    image: require('../assets/onboarding1.png'), // Reemplaza con tus imágenes
    color: '#FFFFFF'
  },
  {
    id: '2',
    title: 'Reserva con confianza',
    description: 'Con nuestro sistema de reservas seguro y fácil de usar.',
    image: require('../assets/onboarding2.png'), // Reemplaza con tus imágenes
    color: '#FFFFFF'
  },
  {
    id: '3',
    title: 'Viaja como local',
    description: 'Vive experiencias auténticas en tus destinos favoritos.',
    image: require('../assets/onboarding3.png'), // Reemplaza con tus imágenes
    color: '#FFFFFF'
  }
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Auth');
    }
  };

  const skipOnboarding = () => {
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      {/* Header con botón de saltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={skipOnboarding}>
          <Text style={styles.skipText}>Saltar</Text>
        </TouchableOpacity>
      </View>

      {/* Slider de onboarding */}
      <View style={{ flex: 3 }}>
        <FlatList
          data={onboardingSlides}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width }]}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      {/* Indicadores de paginación */}
      <View style={styles.indicatorContainer}>
        {onboardingSlides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp'
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={i.toString()}
              style={[
                styles.indicator,
                { width: dotWidth, opacity },
                currentIndex === i && styles.activeIndicator
              ]}
            />
          );
        })}
      </View>

      {/* Botón de siguiente */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={scrollTo} activeOpacity={0.8}>
          <Ionicons
            name={currentIndex === onboardingSlides.length - 1 ? 'checkmark' : 'arrow-forward'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10
  },
  skipText: {
    color: '#2EC0CE',
    fontSize: 16,
    fontWeight: '500'
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 40
  },
  textContainer: {
    paddingHorizontal: 40,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2EC0CE',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'HelveticaNeue-Bold'
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  indicator: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2EC0CE',
    marginHorizontal: 5
  },
  activeIndicator: {
    backgroundColor: '#2EC0CE'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2EC0CE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2EC0CE',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  }
});

export default OnboardingScreen;