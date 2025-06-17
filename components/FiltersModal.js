import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';


// Usamos un slider diferente para web y para móvil
let SliderComponent;
if (Platform.OS === 'web') {
  SliderComponent = require('@react-native-community/slider').default;
} else {
  SliderComponent = require('@react-native-community/slider').default;
}

const FiltersModal = ({ visible, onClose }) => {
  const theme = useContext(ThemeContext);
  const [priceRange, setPriceRange] = useState(500);
  const [selectedBedrooms, setSelectedBedrooms] = useState(null);
  const [selectedBeds, setSelectedBeds] = useState(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [amenities, setAmenities] = useState({
    wifi: false,
    kitchen: false,
    washer: false,
    ac: false
  });

  if (!visible) return null;

  const toggleAmenity = (amenity) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  const handleClearAll = () => {
    setPriceRange(500);
    setSelectedBedrooms(null);
    setSelectedBeds(null);
    setSelectedBathrooms(null);
    setSelectedPropertyType(null);
    setAmenities({
      wifi: false,
      kitchen: false,
      washer: false,
      ac: false
    });
  };

  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      bedrooms: selectedBedrooms,
      beds: selectedBeds,
      bathrooms: selectedBathrooms,
      propertyType: selectedPropertyType,
      amenities
    };
    console.log('Applied filters:', filters);
    onClose();
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
      activeOpacity={0.8}
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
      activeOpacity={0.8}
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
      activeOpacity={0.8}
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

  return (
    <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
      <View style={[styles.modalContainer, { backgroundColor: theme.colors.white }]}>
        <View style={styles.modalHeader}>
          <Text style={[styles.modalTitle, { color: theme.colors.gray900 }]}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.colors.gray500} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Price Range */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Price range</Text>
            <View style={styles.priceRangeLabels}>
              <Text style={[styles.priceRangeLabel, { color: theme.colors.gray600 }]}>$0</Text>
              <Text style={[styles.priceRangeLabel, { color: theme.colors.gray600 }]}>$2,000+</Text>
            </View>
            {/* <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={2000}
              step={50}
              value={priceRange}
              onValueChange={setPriceRange}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.gray200}
              thumbTintColor={theme.colors.primary}
            /> */}
            <Text style={[styles.priceRangeValue, { color: theme.colors.gray900 }]}>
              $0 - ${priceRange}
            </Text>
          </View>

          {/* Property Type */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Property type</Text>
            <View style={styles.propertyTypeGrid}>
              {renderPropertyTypeButton('home', 'house', 'House')}
              {renderPropertyTypeButton('building', 'apartment', 'Apartment')}
              {renderPropertyTypeButton('hotel', 'hotel', 'Hotel')}
              {renderPropertyTypeButton('igloo', 'cabin', 'Cabin')}
            </View>
          </View>

          {/* Rooms and Beds */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Rooms and beds</Text>
            
            <View style={styles.filterSubsection}>
              <Text style={[styles.filterSubtitle, { color: theme.colors.gray700 }]}>Bedrooms</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderOptionButton(null, selectedBedrooms, setSelectedBedrooms, 'Any')}
                {renderOptionButton('1', selectedBedrooms, setSelectedBedrooms)}
                {renderOptionButton('2', selectedBedrooms, setSelectedBedrooms)}
                {renderOptionButton('3', selectedBedrooms, setSelectedBedrooms)}
                {renderOptionButton('4', selectedBedrooms, setSelectedBedrooms)}
                {renderOptionButton('5+', selectedBedrooms, setSelectedBedrooms)}
              </ScrollView>
            </View>
            
            <View style={styles.filterSubsection}>
              <Text style={[styles.filterSubtitle, { color: theme.colors.gray700 }]}>Beds</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderOptionButton(null, selectedBeds, setSelectedBeds, 'Any')}
                {renderOptionButton('1', selectedBeds, setSelectedBeds)}
                {renderOptionButton('2', selectedBeds, setSelectedBeds)}
                {renderOptionButton('3', selectedBeds, setSelectedBeds)}
                {renderOptionButton('4', selectedBeds, setSelectedBeds)}
                {renderOptionButton('5+', selectedBeds, setSelectedBeds)}
              </ScrollView>
            </View>
            
            <View style={styles.filterSubsection}>
              <Text style={[styles.filterSubtitle, { color: theme.colors.gray700 }]}>Bathrooms</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderOptionButton(null, selectedBathrooms, setSelectedBathrooms, 'Any')}
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
            <Text style={[styles.filterTitle, { color: theme.colors.gray900 }]}>Amenities</Text>
            {renderAmenityOption('wifi', 'WiFi', 'wifi')}
            {renderAmenityOption('cutlery', 'Kitchen', 'kitchen')}
            {renderAmenityOption('gears', 'Washer', 'washer')}
            {renderAmenityOption('snowflake-o', 'Air conditioning', 'ac')}
          </View>
        </ScrollView>

        <View style={[styles.modalFooter, { borderTopColor: theme.colors.gray200 }]}>
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={[styles.footerButtonText, { color: theme.colors.primary }]}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
            activeOpacity={0.8}
            onPress={handleApplyFilters}
          >
            <Text style={[styles.applyButtonText, { color: theme.colors.white }]}>Show results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalContainer: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '85%',
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
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
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  amenityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  checkbox: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },
  amenityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  applyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FiltersModal;