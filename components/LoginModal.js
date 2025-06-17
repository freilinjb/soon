// src/components/LoginModal.js
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const LoginModal = ({ visible, onClose }) => {
  const theme = useContext(ThemeContext);

  if (!visible) return null;

  return (
    <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
      <View style={[styles.modalContainer, { backgroundColor: theme.colors.white }]}>
        <View style={styles.modalHeader}>
          <Text style={[styles.modalTitle, { color: theme.colors.gray900 }]}>Welcome to Soon</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.colors.gray500} />
          </TouchableOpacity>
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity 
            style={[styles.socialButton, { borderColor: theme.colors.gray300 }]}
            activeOpacity={0.8}
          >
            <FontAwesome name="google" size={20} color="#DB4437" />
            <Text style={[styles.socialButtonText, { color: theme.colors.gray900 }]}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, { borderColor: theme.colors.gray300 }]}
            activeOpacity={0.8}
          >
            <FontAwesome name="facebook" size={20} color="#4267B2" />
            <Text style={[styles.socialButtonText, { color: theme.colors.gray900 }]}>Continue with Facebook</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.gray300 }]} />
            <Text style={[styles.dividerText, { color: theme.colors.gray500 }]}>or</Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.gray300 }]} />
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.gray700 }]}>Email</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.gray900, borderColor: theme.colors.gray300 }]}
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.gray400}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.gray700 }]}>Password</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.gray900, borderColor: theme.colors.gray300 }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.gray400}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, { backgroundColor: theme.colors.primary }]}
              activeOpacity={0.8}
            >
              <Text style={[styles.loginButtonText, { color: theme.colors.white }]}>Continue</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.signupText, { color: theme.colors.gray600 }]}>
            Dont have an account? <Text style={[styles.signupLink, { color: theme.colors.primary }]}>Sign up</Text>
          </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  socialButtons: {
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  socialButtonText: {
    marginLeft: 12,
    fontSize: 16,
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
    marginHorizontal: 12,
    fontSize: 14,
  },
  form: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  loginButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 14,
    textAlign: 'center',
  },
  signupLink: {
    fontWeight: 'bold',
  },
});

export default LoginModal;