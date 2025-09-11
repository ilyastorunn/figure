import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Glassmorphism } from '@/utils/theme/glassmorphism';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  intensity?: 'light' | 'medium' | 'heavy';
  blur?: boolean;
  style?: ViewStyle;
}

export function GlassCard({ 
  children, 
  variant = 'default',
  intensity = 'medium',
  blur = true,
  style,
  ...props 
}: GlassCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const glassStyle = isDark 
    ? Glassmorphism.card.dark 
    : Glassmorphism.card.light;

  const baseStyle = {
    ...Glassmorphism.card.base,
    ...glassStyle,
  };

  // Variant-specific styles
  const variantStyles: Record<string, ViewStyle> = {
    default: {},
    elevated: {
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    },
    outlined: {
      borderWidth: 2,
      borderColor: isDark 
        ? 'rgba(255, 255, 255, 0.2)' 
        : 'rgba(0, 0, 0, 0.1)',
    },
  };

  const blurIntensity = {
    light: 20,
    medium: 40,
    heavy: 80,
  }[intensity];

  if (!blur) {
    return (
      <View 
        style={[baseStyle, variantStyles[variant], style]} 
        {...props}
      >
        {children}
      </View>
    );
  }

  return (
    <View style={[{ borderRadius: 16 }, style]}>
      <BlurView
        intensity={blurIntensity}
        tint={isDark ? 'dark' : 'light'}
        style={[baseStyle, variantStyles[variant]]}
        {...props}
      >
        {children}
      </BlurView>
    </View>
  );
}