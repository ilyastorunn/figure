import React from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  Easing,
} from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/utils/theme/colors';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  style?: ViewStyle;
}

export function LoadingSpinner({ 
  size = 'md', 
  color,
  style 
}: LoadingSpinnerProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  const rotation = useSharedValue(0);

  const sizeConfig = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  const spinnerSize = sizeConfig[size];
  const spinnerColor = color || colors.primary;

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <Animated.View style={[animatedStyle]}>
        <View
          style={{
            width: spinnerSize,
            height: spinnerSize,
            borderRadius: spinnerSize / 2,
            borderWidth: 3,
            borderColor: `${spinnerColor}20`,
            borderTopColor: spinnerColor,
          }}
        />
      </Animated.View>
    </View>
  );
}

interface LoadingDotsProps {
  color?: string;
  size?: number;
  style?: ViewStyle;
}

export function LoadingDots({ 
  color, 
  size = 8, 
  style 
}: LoadingDotsProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  const dot1 = useSharedValue(0.3);
  const dot2 = useSharedValue(0.3);
  const dot3 = useSharedValue(0.3);

  const dotColor = color || colors.primary;

  React.useEffect(() => {
    const animate = () => {
      dot1.value = withTiming(1, { duration: 600 }, () => {
        dot1.value = withTiming(0.3, { duration: 600 });
      });
      
      setTimeout(() => {
        dot2.value = withTiming(1, { duration: 600 }, () => {
          dot2.value = withTiming(0.3, { duration: 600 });
        });
      }, 200);
      
      setTimeout(() => {
        dot3.value = withTiming(1, { duration: 600 }, () => {
          dot3.value = withTiming(0.3, { duration: 600 });
        });
      }, 400);
    };

    animate();
    const interval = setInterval(animate, 1800);
    
    return () => clearInterval(interval);
  }, []);

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1.value,
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2.value,
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3.value,
  }));

  const dotStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: dotColor,
    marginHorizontal: size / 2,
  };

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      <Animated.View style={[dotStyle, dot1Style]} />
      <Animated.View style={[dotStyle, dot2Style]} />
      <Animated.View style={[dotStyle, dot3Style]} />
    </View>
  );
}