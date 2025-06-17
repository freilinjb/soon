import { createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors: {
      primary: '#2EC0CE',
      primaryDark: '#1DA1AF',
      primaryLight: '#E8F7F9',
      secondary: '#FF9A76',
      success: '#4CAF50',
      dark: '#1E293B',
      white: '#FFFFFF',
      gray100: '#F5F5F5',
      gray200: '#EEEEEE',
      gray300: '#E0E0E0',
      gray400: '#BDBDBD',
      gray500: '#9E9E9E',
      gray600: '#757575',
      gray700: '#616161',
      gray800: '#424242',
      gray900: '#212121',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 40,
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 20,
    },
    text: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};