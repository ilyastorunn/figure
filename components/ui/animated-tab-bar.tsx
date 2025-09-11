import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/utils/theme/colors';
import { Glassmorphism } from '@/utils/theme/glassmorphism';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface AnimatedTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  isScrolling?: boolean;
}

export function AnimatedTabBar({ 
  state, 
  descriptors, 
  navigation,
  isScrolling = false
}: AnimatedTabBarProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  
  const tabBarHeight = useSharedValue(90);
  const tabBarScale = useSharedValue(1);
  const labelOpacity = useSharedValue(1);

  React.useEffect(() => {
    if (isScrolling) {
      tabBarHeight.value = withSpring(60, { damping: 20, stiffness: 300 });
      tabBarScale.value = withSpring(0.9, { damping: 20, stiffness: 300 });
      labelOpacity.value = withSpring(0, { damping: 20, stiffness: 300 });
    } else {
      tabBarHeight.value = withSpring(90, { damping: 20, stiffness: 300 });
      tabBarScale.value = withSpring(1, { damping: 20, stiffness: 300 });
      labelOpacity.value = withSpring(1, { damping: 20, stiffness: 300 });
    }
  }, [isScrolling]);

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    height: tabBarHeight.value,
    transform: [{ scale: tabBarScale.value }],
  }));

  const glassStyle = colorScheme === 'dark' 
    ? Glassmorphism.tabBar.dark 
    : Glassmorphism.tabBar.light;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Animated.View style={[tabBarAnimatedStyle]}>
        <BlurView
          intensity={40}
          tint={colorScheme === 'dark' ? 'dark' : 'light'}
          style={[
            styles.tabBar,
            Glassmorphism.tabBar.base,
            glassStyle,
          ]}
        >
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TabBarItem
                key={route.key}
                label={label}
                icon={options.tabBarIcon}
                isFocused={isFocused}
                onPress={onPress}
                colors={colors}
                labelOpacity={labelOpacity}
                isMinimized={isScrolling}
              />
            );
          })}
        </BlurView>
      </Animated.View>
    </View>
  );
}

interface TabBarItemProps {
  label: string;
  icon: any;
  isFocused: boolean;
  onPress: () => void;
  colors: any;
  labelOpacity: Animated.SharedValue<number>;
  isMinimized: boolean;
}

function TabBarItem({
  label,
  icon,
  isFocused,
  onPress,
  colors,
  labelOpacity,
  isMinimized,
}: TabBarItemProps) {
  const scale = useSharedValue(1);
  const iconScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
    transform: [
      {
        translateY: interpolate(
          labelOpacity.value,
          [0, 1],
          [10, 0]
        ),
      },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 20, stiffness: 400 });
    iconScale.value = withSpring(1.1, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
    iconScale.value = withSpring(1, { damping: 20, stiffness: 400 });
    runOnJS(onPress)();
  };

  return (
    <AnimatedTouchableOpacity
      style={[styles.tabItem, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
        {icon && icon({ 
          color: isFocused ? colors.primary : colors.textSecondary,
          size: isMinimized ? 20 : 24
        })}
      </Animated.View>
      
      {!isMinimized && (
        <Animated.Text
          style={[
            styles.label,
            {
              color: isFocused ? colors.primary : colors.textSecondary,
              fontWeight: isFocused ? '600' : '500',
            },
            labelAnimatedStyle,
          ]}
        >
          {label}
        </Animated.Text>
      )}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 1000,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});