import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  Text, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Glassmorphism, FontSizes } from '@/utils/theme/glassmorphism';
import { Colors } from '@/utils/theme/colors';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface GlassButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  blur?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function GlassButton({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  blur = true,
  style,
  textStyle,
  onPress,
  disabled,
  ...props
}: GlassButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scale = useSharedValue(1);

  const colors = isDark ? Colors.dark : Colors.light;

  // Size configurations
  const sizeConfig = {
    sm: { height: 36, paddingHorizontal: 16, fontSize: FontSizes.sm },
    md: { height: 48, paddingHorizontal: 24, fontSize: FontSizes.base },
    lg: { height: 56, paddingHorizontal: 32, fontSize: FontSizes.lg },
  };

  const config = sizeConfig[size];

  // Variant styles
  const getVariantStyle = () => {
    const baseGlass = isDark 
      ? Glassmorphism.button.base 
      : Glassmorphism.button.base;

    switch (variant) {
      case 'primary':
        return {
          ...baseGlass,
          ...(isDark ? Glassmorphism.button.primary.dark : Glassmorphism.button.primary.light),
        };
      case 'secondary':
        return {
          ...baseGlass,
          ...(isDark ? Glassmorphism.button.secondary.dark : Glassmorphism.button.secondary.light),
        };
      case 'outline':
        return {
          ...baseGlass,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary,
        };
      default:
        return baseGlass;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.text;
      case 'outline':
        return colors.primary;
      default:
        return colors.text;
    }
  };

  const buttonStyle: ViewStyle = {
    ...getVariantStyle(),
    height: config.height,
    paddingHorizontal: config.paddingHorizontal,
    width: fullWidth ? '100%' : undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled || loading ? 0.6 : 1,
  };

  const textStyles: TextStyle = {
    fontSize: config.fontSize,
    fontWeight: '600',
    color: getTextColor(),
    marginLeft: leftIcon ? 8 : 0,
    marginRight: rightIcon ? 8 : 0,
    ...textStyle,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = (event: any) => {
    if (onPress && !disabled && !loading) {
      runOnJS(onPress)(event);
    }
  };

  if (!blur) {
    return (
      <AnimatedTouchableOpacity
        style={[buttonStyle, animatedStyle, style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        {leftIcon}
        <Text style={textStyles}>
          {loading ? 'Loading...' : title}
        </Text>
        {rightIcon}
      </AnimatedTouchableOpacity>
    );
  }

  return (
    <AnimatedTouchableOpacity
      style={[{ borderRadius: 24 }, animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={1}
      {...props}
    >
      <BlurView
        intensity={40}
        tint={isDark ? 'dark' : 'light'}
        style={buttonStyle}
      >
        {leftIcon}
        <Text style={textStyles}>
          {loading ? 'Loading...' : title}
        </Text>
        {rightIcon}
      </BlurView>
    </AnimatedTouchableOpacity>
  );
}