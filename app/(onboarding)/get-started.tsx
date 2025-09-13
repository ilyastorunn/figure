import { GlassButton } from '@/components/ui/glass-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GetStartedScreen() {
  // Animation values
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    // Animation sequence
    titleOpacity.value = withTiming(1, { duration: 600 });
    subtitleOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    buttonOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleOpacity.value === 0 ? 20 : 0 }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleOpacity.value === 0 ? 20 : 0 }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonOpacity.value === 0 ? 20 : 0 }],
  }));

  const handleTryNow = async () => {
    try {
      // Mark onboarding as completed
      await AsyncStorage.setItem('onboarding_completed', 'true');
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving onboarding state:', error);
      // Navigate anyway
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Center Content */}
          <View style={styles.centerContent}>
            {/* Title */}
            <Animated.Text style={[styles.title, titleAnimatedStyle]}>
              Ready to Transform?
            </Animated.Text>
            
            {/* Subtitle */}
            <Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>
              Start your creative journey now!
            </Animated.Text>
            
            {/* Illustration */}
            <Animated.View style={[styles.illustrationContainer, buttonAnimatedStyle]}>
              <View style={styles.illustration}>
                <Text style={styles.illustrationEmoji}>🚀✨</Text>
                <Text style={styles.illustrationText}>Transform & Create</Text>
              </View>
            </Animated.View>
            
            {/* Get Started Button */}
            <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
              <GlassButton
                title="Get Started"
                variant="primary"
                size="lg"
                onPress={handleTryNow}
                style={styles.getStartedButton}
                textStyle={styles.getStartedButtonText}
              />
            </Animated.View>
          </View>
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
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: -20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  illustrationContainer: {
    marginVertical: 20,
  },
  illustration: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  illustrationEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  illustrationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  getStartedButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 48,
    paddingVertical: 16,
    backdropFilter: 'blur(20px)',
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});