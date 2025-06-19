import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { useContext, useState } from 'react';
import { Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const FiltersModal = ({ visible, onClose, onApplyFilters }) => {
  const theme = useContext(ThemeContext);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBedrooms, setSelectedBedrooms] = useState(null);
  const [selectedBeds, setSelectedBeds] = useState(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000)); // +1 día
  const [showDatePicker, setShowDatePicker] = useState(null); // 'checkIn' o 'checkOut'
  const [amenities, setAmenities] = useState({
    wifi: false,
    kitchen: false,
    washer: false,
    ac: false,
    parking: false,
    pool: false,
    petFriendly: false,
    beachfront: false,
    gym: false,
    fireplace: false,
    breakfast: false,
    elevator: false,
  });
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [guests, setGuests] = useState(1);
  const [selectedInstantBook, setSelectedInstantBook] = useState(false);

  if (!visible) return null;

  const toggleAmenity = (amenity) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  const handleClearAll = () => {
    setPriceRange([0, 500]);
    setSelectedBedrooms(null);
    setSelectedBeds(null);
    setSelectedBathrooms(null);
    setSelectedPropertyType(null);
    setCheckInDate(new Date());
    setCheckOutDate(new Date(Date.now() + 86400000));
    setAmenities({
      wifi: false,
      kitchen: false,
      washer: false,
      ac: false,
      parking: false,
      pool: false,
      petFriendly: false,
      beachfront: false,
      gym: false,
      fireplace: false,
      breakfast: false,
      elevator: false,
    });
    setSelectedRoomType(null);
    setGuests(1);
    setSelectedInstantBook(false);
  };

  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      bedrooms: selectedBedrooms,
      beds: selectedBeds,
      bathrooms: selectedBathrooms,
      propertyType: selectedPropertyType,
      checkIn: checkInDate.toISOString().split('T')[0],
      checkOut: checkOutDate.toISOString().split('T')[0],
      amenities,
      roomType: selectedRoomType,
      guests,
      instantBook: selectedInstantBook,
    };
    
    onApplyFilters(filters);
    onClose();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(null);
    if (selectedDate) {
      if (showDatePicker === 'checkIn') {
        setCheckInDate(selectedDate);
        // Si la fecha de check-out es anterior a la nueva fecha de check-in
        if (checkOutDate < selectedDate) {
          setCheckOutDate(new Date(selectedDate.getTime() + 86400000));
        }
      } else if (showDatePicker === 'checkOut') {
        // No permitir fechas anteriores al check-in
        if (selectedDate >= checkInDate) {
          setCheckOutDate(selectedDate);
        }
      }
    }
  };

  const renderOptionButton = (value, selectedValue, setValue, label) => (
    <TouchableOpacity 
      key={value}
      style={[
        styles.optionButton, 
        { 
          borderColor: theme.colors.gray300,
          backgroundColor: selectedValue === value ? theme.colors.primary : 'transparent'
        }
      ]}
      activeOpacity={0.7}
      onPress={() => setValue(value)}
    >
      <Text style={[
        styles.optionText, 
        { 
          color: selectedValue === value ? theme.colors.white : theme.colors.gray900 
        }
      ]}>
        {label || value}
      </Text>
    </TouchableOpacity>
  );

  const renderAmenityOption = (icon, name, amenityKey) => (
    <TouchableOpacity 
      style={styles.amenityOption}
      activeOpacity={0.7}
      onPress={() => toggleAmenity(amenityKey)}
    >
      <View style={styles.checkbox}>
        {amenities[amenityKey] ? (
          <FontAwesome name="check-square" size={20} color={theme.colors.primary} />
        ) : (
          <FontAwesome name="square-o" size={20} color={theme.colors.gray400} />
        )}
      </View>
      <Text style={[styles.amenityText, { color: theme.colors.gray900 }]}>{name}</Text>
    </TouchableOpacity>
  );

  const renderPropertyTypeButton = (icon, type, label) => (
    <TouchableOpacity 
      style={[
        styles.propertyTypeButton, 
        { 
          borderColor: selectedPropertyType === type ? theme.colors.primary : theme.colors.gray300,
          backgroundColor: selectedPropertyType === type ? theme.colors.lightPrimary : 'transparent'
        }
      ]}
      activeOpacity={0.7}
      onPress={() => setSelectedPropertyType(type)}
    >
      <FontAwesome name={icon} size={20} color={
        selectedPropertyType === type ? theme.colors.primary : theme.colors.gray700
      } />
      <Text style={[
        styles.propertyTypeText, 
        { 
          color: selectedPropertyType === type ? theme.colors.primary : theme.colors.gray900 
        }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderRoomTypeButton = (type, label) => (
    <TouchableOpacity 
      style={[
        styles.roomTypeButton, 
        { 
          borderColor: selectedRoomType === type ? theme.colors.primary : theme.colors.gray300,
          backgroundColor: selectedRoomType === type ? theme.colors.lightPrimary : 'transparent'
        }
      ]}
      activeOpacity={0.7}
      onPress={() => setSelectedRoomType(type)}
    >
      <Text style={[
        styles.roomTypeText, 
        { 
          color: selectedRoomType === type ? theme.colors.primary : theme.colors.gray900 
        }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderGuestsControl = () => (
    <View style={styles.guestsControl}>
      <TouchableOpacity 
        style={styles.guestButton}
        onPress={() => setGuests(prev => Math.max(1, prev - 1))}
        disabled={guests <= 1}
      >
        <Ionicons 
          name="remove" 
          size={20} 
          color={guests <= 1 ? theme.colors.gray400 : theme.colors.primary} 
        />
      </TouchableOpacity>
      <Text style={styles.guestCount}>{guests}</Text>
      <TouchableOpacity 
        style={styles.guestButton}
        onPress={() => setGuests(prev => prev + 1)}
      >
        <Ionicons name="add" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.white }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.gray900 }]}>Filtros</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <Ionicons name="close" size={24} color={theme.colors.gray500} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.modalContent}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Fechas de Check-in y Check-out */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Fechas</Text>
              <View style={styles.dateRow}>
                <View style={styles.dateInputContainer}>
                  <Text style={[styles.dateLabel, { color: theme.colors.gray700 }]}>Check-in</Text>
                  <TouchableOpacity 
                    style={[styles.dateInput, { borderColor: theme.colors.gray300 }]}
                    onPress={() => setShowDatePicker('checkIn')}
                  >
                    <FontAwesome name="calendar" size={16} color={theme.colors.gray600} />
                    <Text style={[styles.dateText, { color: theme.colors.gray900 }]}>
                      {formatDate(checkInDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.dateInputContainer}>
                  <Text style={[styles.dateLabel, { color: theme.colors.gray700 }]}>Check-out</Text>
                  <TouchableOpacity 
                    style={[styles.dateInput, { borderColor: theme.colors.gray300 }]}
                    onPress={() => setShowDatePicker('checkOut')}
                  >
                    <FontAwesome name="calendar" size={16} color={theme.colors.gray600} />
                    <Text style={[styles.dateText, { color: theme.colors.gray900 }]}>
                      {formatDate(checkOutDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Guests */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Huéspedes</Text>
              <View style={styles.guestsRow}>
                <Text style={[styles.guestsLabel, { color: theme.colors.gray700 }]}>Número de huéspedes</Text>
                {renderGuestsControl()}
              </View>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Rango de precios</Text>
              <View style={styles.priceRangeLabels}>
                <Text style={[styles.priceRangeLabel, { color: theme.colors.gray600 }]}>$0</Text>
                <Text style={[styles.priceRangeLabel, { color: theme.colors.gray600 }]}>$2,000+</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={2000}
                step={50}
                value={priceRange[1]}
                onValueChange={(value) => setPriceRange([priceRange[0], value])}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.gray200}
                thumbTintColor={Platform.OS === 'android' ? theme.colors.primary : undefined}
              />
              <Text style={[styles.priceRangeValue, { color: theme.colors.gray900 }]}>
                ${priceRange[0]} - ${priceRange[1]}
              </Text>
            </View>

            {/* Room Type */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Tipo de alojamiento</Text>
              <View style={styles.roomTypeRow}>
                {renderRoomTypeButton('entire', 'Lugar entero')}
                {renderRoomTypeButton('private', 'Habitación privada')}
                {renderRoomTypeButton('shared', 'Habitación compartida')}
              </View>
            </View>

            {/* Instant Book */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Reserva instantánea</Text>
              <TouchableOpacity 
                style={styles.instantBookOption}
                activeOpacity={0.7}
                onPress={() => setSelectedInstantBook(!selectedInstantBook)}
              >
                <View style={styles.checkbox}>
                  {selectedInstantBook ? (
                    <FontAwesome name="check-square" size={20} color={theme.colors.primary} />
                  ) : (
                    <FontAwesome name="square-o" size={20} color={theme.colors.gray400} />
                  )}
                </View>
                <Text style={[styles.amenityText, { color: theme.colors.gray900 }]}>Mostrar solo lugares que se pueden reservar al instante</Text>
              </TouchableOpacity>
            </View>

            {/* Property Type */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Tipo de propiedad</Text>
              <View style={styles.propertyTypeGrid}>
                {renderPropertyTypeButton('home', 'house', 'Casa')}
                {renderPropertyTypeButton('building', 'apartment', 'Apartamento')}
                {renderPropertyTypeButton('hotel', 'hotel', 'Hotel')}
                {renderPropertyTypeButton('tree', 'cabin', 'Cabaña')}
                {renderPropertyTypeButton('ship', 'boat', 'Barco')}
                {renderPropertyTypeButton('globe', 'unique', 'Único')}
              </View>
            </View>

            {/* Rooms and Beds */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Habitaciones y camas</Text>
              
              <View style={styles.filterSubsection}>
                <Text style={[styles.filterSubtitle, { color: theme.colors.gray700 }]}>Dormitorios</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.optionsScroll}
                >
                  {renderOptionButton(null, selectedBedrooms, setSelectedBedrooms, 'Cualquiera')}
                  {renderOptionButton('1', selectedBedrooms, setSelectedBedrooms)}
                  {renderOptionButton('2', selectedBedrooms, setSelectedBedrooms)}
                  {renderOptionButton('3', selectedBedrooms, setSelectedBedrooms)}
                  {renderOptionButton('4', selectedBedrooms, setSelectedBedrooms)}
                  {renderOptionButton('5+', selectedBedrooms, setSelectedBedrooms)}
                </ScrollView>
              </View>
              
              <View style={styles.filterSubsection}>
                <Text style={[styles.filterSubtitle, { color: theme.colors.gray700 }]}>Camas</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.optionsScroll}
                >
                  {renderOptionButton(null, selectedBeds, setSelectedBeds, 'Cualquiera')}
                  {renderOptionButton('1', selectedBeds, setSelectedBeds)}
                  {renderOptionButton('2', selectedBeds, setSelectedBeds)}
                  {renderOptionButton('3', selectedBeds, setSelectedBeds)}
                  {renderOptionButton('4', selectedBeds, setSelectedBeds)}
                  {renderOptionButton('5+', selectedBeds, setSelectedBeds)}
                </ScrollView>
              </View>
              
              <View style={styles.filterSubsection}>
                <Text style={[styles.filterSubtitle, { color: theme.colors.gray700 }]}>Baños</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.optionsScroll}
                >
                  {renderOptionButton(null, selectedBathrooms, setSelectedBathrooms, 'Cualquiera')}
                  {renderOptionButton('1', selectedBathrooms, setSelectedBathrooms)}
                  {renderOptionButton('2', selectedBathrooms, setSelectedBathrooms)}
                  {renderOptionButton('3', selectedBathrooms, setSelectedBathrooms)}
                  {renderOptionButton('4', selectedBathrooms, setSelectedBathrooms)}
                  {renderOptionButton('5+', selectedBathrooms, setSelectedBathrooms)}
                </ScrollView>
              </View>
            </View>

            {/* Amenities */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Comodidades</Text>
              <View style={styles.amenitiesGrid}>
                {renderAmenityOption('wifi', 'WiFi', 'wifi')}
                {renderAmenityOption('cutlery', 'Cocina', 'kitchen')}
                {renderAmenityOption('gears', 'Lavadora', 'washer')}
                {renderAmenityOption('snowflake-o', 'Aire acondicionado', 'ac')}
                {renderAmenityOption('car', 'Estacionamiento', 'parking')}
                {renderAmenityOption('tint', 'Piscina', 'pool')}
                {renderAmenityOption('paw', 'Mascotas permitidas', 'petFriendly')}
                {renderAmenityOption('umbrella', 'Frente a la playa', 'beachfront')}
                {renderAmenityOption('dumbbell', 'Gimnasio', 'gym')}
                {renderAmenityOption('fire', 'Chimenea', 'fireplace')}
                {renderAmenityOption('coffee', 'Desayuno incluido', 'breakfast')}
                {renderAmenityOption('building', 'Ascensor', 'elevator')}
              </View>
            </View>
          </ScrollView>

          <View style={[styles.modalFooter, { borderTopColor: theme.colors.gray200 }]}>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={handleClearAll}
            >
              <Text style={[styles.footerButtonText, { color: theme.colors.primary }]}>Limpiar todo</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
              activeOpacity={0.7}
              onPress={handleApplyFilters}
            >
              <Text style={[styles.applyButtonText, { color: theme.colors.white }]}>Mostrar resultados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: Platform.OS === 'web' ? 8 : 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  filterSection: {
    marginBottom: 24,
    paddingHorizontal: Platform.OS === 'web' ? 8 : 0,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateInputContainer: {
    width: '48%',
  },
  dateLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
  },
  guestsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guestsLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  guestsControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestCount: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 12,
    color: '#333333',
  },
  priceRangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceRangeLabel: {
    fontSize: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceRangeValue: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  roomTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomTypeButton: {
    width: '32%',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  roomTypeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  instantBookOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  propertyTypeButton: {
    width: '48%',
    height: 80,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyTypeText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  filterSubsection: {
    marginBottom: 16,
  },
  filterSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  optionsScroll: {
    paddingRight: Platform.OS === 'web' ? 16 : 0,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    width: '50%',
  },
  checkbox: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },
  amenityText: {
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    paddingHorizontal: Platform.OS === 'web' ? 8 : 0,
  },
  clearButton: {
    padding: 12,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  applyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FiltersModal;