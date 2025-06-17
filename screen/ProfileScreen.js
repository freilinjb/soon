import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const ProfileScreen = () => {
  const theme = useContext(ThemeContext);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: 'Freilin Jose',
    lastName: 'Jerez Brito',
    email: 'freilinjb@gmail.com',
    phone: '+1 (829) 526-1234',
    dob: '09/03/1995'
  });

  const handleInputChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditing(false);
    // Aquí iría la lógica para guardar los cambios
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.avatar}
          />
          {editing && (
            <TouchableOpacity style={styles.cameraIcon}>
              <FontAwesome name="camera" size={18} color="white" />
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={[styles.profileName, { color: theme.colors.gray900 }]}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={[styles.profileMemberSince, { color: theme.colors.gray600 }]}>
          Member since June 2023
        </Text>
        
        <TouchableOpacity 
          style={[styles.editButton, editing ? { backgroundColor: '#f0f0f0' } : { backgroundColor: '#2EC0CE' }]}
          onPress={() => setEditing(!editing)}
          activeOpacity={0.8}
        >
          <Text style={[styles.editButtonText, editing ? { color: '#333' } : { color: 'white' }]}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.white }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-outline" size={20} color="#2EC0CE" />
          <Text style={[styles.sectionTitle, { color: theme.colors.gray900 }]}>Personal Information</Text>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.colors.gray700 }]}>First Name</Text>
          <View style={[styles.inputContainer, editing ? styles.inputEditing : {}]}>
            <TextInput
              style={[styles.input, { color: theme.colors.gray900 }]}
              value={user.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              editable={editing}
              placeholderTextColor={theme.colors.gray400}
            />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.colors.gray700 }]}>Last Name</Text>
          <View style={[styles.inputContainer, editing ? styles.inputEditing : {}]}>
            <TextInput
              style={[styles.input, { color: theme.colors.gray900 }]}
              value={user.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              editable={editing}
              placeholderTextColor={theme.colors.gray400}
            />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.colors.gray700 }]}>Email Address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { color: theme.colors.gray900 }]}
              value={user.email}
              onChangeText={(text) => handleInputChange('email', text)}
              editable={editing}
              keyboardType="email-address"
              placeholderTextColor={theme.colors.gray400}
            />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.colors.gray700 }]}>Phone Number</Text>
          <View style={[styles.inputContainer, editing ? styles.inputEditing : {}]}>
            <TextInput
              style={[styles.input, { color: theme.colors.gray900 }]}
              value={user.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              editable={editing}
              keyboardType="phone-pad"
              placeholderTextColor={theme.colors.gray400}
            />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.colors.gray700 }]}>Date of Birth</Text>
          <View style={[styles.inputContainer, editing ? styles.inputEditing : {}]}>
            <TextInput
              style={[styles.input, { color: theme.colors.gray900 }]}
              value={user.dob}
              onChangeText={(text) => handleInputChange('dob', text)}
              editable={editing}
              placeholder="MM/DD/YYYY"
              placeholderTextColor={theme.colors.gray400}
            />
          </View>
        </View>
        
        {editing && (
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: '#2EC0CE' }]}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={[styles.saveButtonText, { color: 'white' }]}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.white }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="settings-outline" size={20} color="#2EC0CE" />
          <Text style={[styles.sectionTitle, { color: theme.colors.gray900 }]}>Account Settings</Text>
        </View>
        
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Text style={[styles.menuItemText, { color: theme.colors.gray800 }]}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.gray500} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Text style={[styles.menuItemText, { color: theme.colors.gray800 }]}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.gray500} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Text style={[styles.menuItemText, { color: theme.colors.gray800 }]}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.gray500} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Text style={[styles.menuItemText, { color: theme.colors.gray800 }]}>Privacy Settings</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.gray500} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    marginBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#2EC0CE',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2EC0CE',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileMemberSince: {
    fontSize: 15,
    marginBottom: 16,
    color: '#666',
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  section: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#555',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
  },
  inputEditing: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#2EC0CE',
  },
  input: {
    fontSize: 16,
    paddingVertical: 6,
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default ProfileScreen;