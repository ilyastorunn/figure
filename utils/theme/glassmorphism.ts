import { Platform } from 'react-native';

export const Glassmorphism = {
  // Card styles with glassmorphism effect
  card: {
    base: {
      borderRadius: 16,
      overflow: 'hidden' as const,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
  },

  // Button styles
  button: {
    base: {
      borderRadius: 24,
      overflow: 'hidden' as const,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    primary: {
      light: {
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.3)',
      },
      dark: {
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(96, 165, 250, 0.3)',
      },
    },
    secondary: {
      light: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
      dark: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },

  // Modal/Sheet styles
  modal: {
    base: {
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      overflow: 'hidden' as const,
    },
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    dark: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
  },

  // Navigation bar styles
  tabBar: {
    base: {
      borderRadius: 32,
      overflow: 'hidden' as const,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    dark: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

export const BlurIntensity = {
  light: Platform.OS === 'ios' ? 20 : 10,
  medium: Platform.OS === 'ios' ? 40 : 20,
  heavy: Platform.OS === 'ios' ? 80 : 30,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  xxxxl: 64,
};

export const BorderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const Shadows = {
  sm: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
};