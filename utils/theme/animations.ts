import { withTiming, withSpring, Easing } from 'react-native-reanimated';

export const AnimationConfig = {
  // Timing configurations
  timing: {
    fast: {
      duration: 200,
      easing: Easing.out(Easing.quad),
    },
    medium: {
      duration: 300,
      easing: Easing.out(Easing.quad),
    },
    slow: {
      duration: 500,
      easing: Easing.out(Easing.quad),
    },
  },

  // Spring configurations
  spring: {
    gentle: {
      damping: 20,
      stiffness: 200,
      mass: 1,
    },
    bouncy: {
      damping: 15,
      stiffness: 300,
      mass: 1,
    },
    precise: {
      damping: 25,
      stiffness: 400,
      mass: 1,
    },
  },
};

// Helper functions for common animations
export const createTimingAnimation = (
  toValue: number,
  config: keyof typeof AnimationConfig.timing = 'medium'
) => {
  return withTiming(toValue, AnimationConfig.timing[config]);
};

export const createSpringAnimation = (
  toValue: number,
  config: keyof typeof AnimationConfig.spring = 'gentle'
) => {
  return withSpring(toValue, AnimationConfig.spring[config]);
};

// Animation presets for common UI elements
export const Animations = {
  fadeIn: (duration: number = 300) => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration, easing: Easing.out(Easing.quad) },
  }),

  slideInFromBottom: (duration: number = 300) => ({
    from: { opacity: 0, transform: [{ translateY: 100 }] },
    to: { opacity: 1, transform: [{ translateY: 0 }] },
    config: { duration, easing: Easing.out(Easing.quad) },
  }),

  slideInFromRight: (duration: number = 300) => ({
    from: { opacity: 0, transform: [{ translateX: 100 }] },
    to: { opacity: 1, transform: [{ translateX: 0 }] },
    config: { duration, easing: Easing.out(Easing.quad) },
  }),

  scaleIn: (duration: number = 300) => ({
    from: { opacity: 0, transform: [{ scale: 0.8 }] },
    to: { opacity: 1, transform: [{ scale: 1 }] },
    config: { duration, easing: Easing.out(Easing.back(1.2)) },
  }),

  buttonPress: {
    pressIn: { transform: [{ scale: 0.95 }] },
    pressOut: { transform: [{ scale: 1 }] },
    config: { duration: 100, easing: Easing.out(Easing.quad) },
  },

  tabBarShrink: {
    expanded: { height: 90, paddingBottom: 20 },
    collapsed: { height: 60, paddingBottom: 8 },
    config: { duration: 300, easing: Easing.out(Easing.quad) },
  },
};