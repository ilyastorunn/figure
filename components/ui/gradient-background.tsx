import React from 'react';
import { View, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/utils/theme/colors';

interface GradientBackgroundProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'subtle';
  direction?: 'vertical' | 'horizontal' | 'diagonal';
}

export function GradientBackground({
  children,
  variant = 'subtle',
  direction = 'vertical',
  style,
  ...props
}: GradientBackgroundProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return isDark 
          ? ['#1e40af', '#3b82f6', '#60a5fa']
          : ['#dbeafe', '#bfdbfe', '#93c5fd'];
      
      case 'secondary':
        return isDark
          ? ['#7c3aed', '#8b5cf6', '#a78bfa']
          : ['#ede9fe', '#ddd6fe', '#c4b5fd'];
      
      case 'accent':
        return isDark
          ? ['#d97706', '#f59e0b', '#fbbf24']
          : ['#fef3c7', '#fde68a', '#fcd34d'];
      
      case 'subtle':
      default:
        return isDark
          ? [colors.background, colors.surface, colors.surfaceVariant]
          : [colors.background, colors.surfaceSecondary, colors.surface];
    }
  };

  const getGradientDirection = () => {
    switch (direction) {
      case 'horizontal':
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };
      case 'diagonal':
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
      case 'vertical':
      default:
        return { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } };
    }
  };

  return (
    <View style={[{ flex: 1 }, style]} {...props}>
      <LinearGradient
        colors={getGradientColors()}
        {...getGradientDirection()}
        style={{ flex: 1, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      {children}
    </View>
  );
}