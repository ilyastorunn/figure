import { GlassButton } from '@/components/ui/glass-button';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  // Animation values
  const logoScale = useSharedValue(0);
  const logoFloat = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const descriptionOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    // Sequence of animations
    logoScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    logoFloat.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000 }),
        withTiming(10, { duration: 2000 })
      ),
      -1,
      true
    );
    
    titleOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    descriptionOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    buttonOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { translateY: logoFloat.value }
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleOpacity.value === 0 ? 20 : 0 }],
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: descriptionOpacity.value,
    transform: [{ translateY: descriptionOpacity.value === 0 ? 20 : 0 }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonOpacity.value === 0 ? 20 : 0 }],
  }));

  const handleContinue = () => {
    router.push('/(onboarding)/features-1');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Center Content */}
          <View style={styles.centerContent}>
            {/* App Name */}
            <Animated.Text style={[styles.appName, titleAnimatedStyle]}>
              Figure
            </Animated.Text>
            
            {/* Logo with Animation */}
            <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>📸</Text>
              </View>
            </Animated.View>
            
            {/* Description */}
            <Animated.Text style={[styles.description, descriptionAnimatedStyle]}>
              Your photos, redefined by AI.{"\n"}Unleash your creativity.
            </Animated.Text>
          </View>

          {/* Next Button */}
          <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
            <GlassButton
              title="Next"
              variant="primary"
              size="md"
              onPress={handleContinue}
              style={styles.nextButton}
              textStyle={styles.nextButtonText}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121418',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoText: {
    fontSize: 48,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 24,
  },
  nextButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    backdropFilter: 'blur(20px)',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});