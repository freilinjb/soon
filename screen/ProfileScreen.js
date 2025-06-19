import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const theme = useContext(ThemeContext);
  const [editing, setEditing] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Estado de autenticación
  const [user, setUser] = useState({
    firstName: 'Freilin Jose',
    lastName: 'Jerez Brito',
    email: 'freilinjb@gmail.com',
    phone: '+1 (829) 526-1234',
    dob: '09/03/1995'
  });

  // Animaciones
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideUpAnim = useState(new Animated.Value(30))[0];
  const logoScale = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleLogoPress = () => {
    // Animación al presionar el logo
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleInputChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditing(false);
    // Aquí iría la lógica para guardar los cambios
  };

  const handleLogin = () => {
    // Animación de login
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setLoggedIn(true);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleRegister = () => {
    // Lógica de registro
    console.log('Register pressed');
  };

  if (!loggedIn) {
    return (
      <Animated.View style={[styles.loginContainer, { 
        backgroundColor: theme.colors.background,
        opacity: fadeAnim,
        transform: [{ translateY: slideUpAnim }]
      }]}>
        <TouchableOpacity onPress={handleLogoPress} activeOpacity={0.9}>
          <Animated.Image 
            source='https://soonproperties.com/public/assets/img/icono_fondo_blanco_poonProperties_fav.png' // Reemplaza con tu logo
            // source={require('../assets/logo-app.png')} // Reemplaza con tu logo
            style={[styles.logo, { 
              transform: [{ scale: logoScale }] 
            }]}
          />
        </TouchableOpacity>
        
        <Text style={[styles.welcomeText, { color: theme.colors.gray900 }]}>
          Bienvenido a nuestra app
        </Text>
        
        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.loginInput, { 
              backgroundColor: theme.colors.white,
              color: theme.colors.gray900,
              borderColor: theme.colors.gray300
            }]}
            placeholder="Correo electrónico"
            placeholderTextColor={theme.colors.gray400}
            keyboardType="email-address"
          />
          
          <TextInput
            style={[styles.loginInput, { 
              backgroundColor: theme.colors.white,
              color: theme.colors.gray900,
              borderColor: theme.colors.gray300
            }]}
            placeholder="Contraseña"
            placeholderTextColor={theme.colors.gray400}
            secureTextEntry
          />
          
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: '#2EC0CE' }]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          
          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.gray300 }]} />
            <Text style={[styles.dividerText, { color: theme.colors.gray500 }]}>o</Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.gray300 }]} />
          </View>
          
          <TouchableOpacity 
            style={[styles.registerButton, { 
              backgroundColor: 'transparent',
              borderColor: '#2EC0CE'
            }]}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: '#2EC0CE' }]}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={[styles.forgotPasswordText, { color: theme.colors.gray600 }]}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.profileHeader}>
        <Animated.View 
          style={[
            styles.avatarContainer,
            { opacity: fadeAnim }
          ]}
        >
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.avatar}
          />
          {editing && (
            <TouchableOpacity style={styles.cameraIcon}>
              <FontAwesome name="camera" size={18} color="white" />
            </TouchableOpacity>
          )}
        </Animated.View>
        
        <Animated.Text 
          style={[
            styles.profileName, 
            { 
              color: theme.colors.gray900,
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          {user.firstName} {user.lastName}
        </Animated.Text>
        <Animated.Text 
          style={[
            styles.profileMemberSince, 
            { 
              color: theme.colors.gray600,
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          Member since June 2023
        </Animated.Text>
        
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }}
        >
          <TouchableOpacity 
            style={[styles.editButton, editing ? { backgroundColor: '#f0f0f0' } : { backgroundColor: '#2EC0CE' }]}
            onPress={() => setEditing(!editing)}
            activeOpacity={0.8}
          >
            <Text style={[styles.editButtonText, editing ? { color: '#333' } : { color: 'white' }]}>
              {editing ? 'Cancel' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View 
        style={[
          styles.section, 
          { 
            backgroundColor: theme.colors.white,
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }
        ]}
      >
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
      </Animated.View>

      <Animated.View 
        style={[
          styles.section, 
          { 
            backgroundColor: theme.colors.white,
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }
        ]}
      >
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
      </Animated.View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
    borderRadius: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 24,
  },
  loginInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2EC0CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  registerButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  forgotPassword: {
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
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
    shadowColor: '#2EC0CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
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
    shadowColor: '#2EC0CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
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