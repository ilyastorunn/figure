import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/utils/theme/colors';

export default function GetStartedScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  // Animation values
  const headerOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.9);
  const buttonOpacity = useSharedValue(0);
  const sparkleRotation = useSharedValue(0);

  useEffect(() => {
    // Animation sequence
    headerOpacity.value = withTiming(1, { duration: 600 });
    cardOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    cardScale.value = withDelay(300, withTiming(1, { duration: 800 }));
    buttonOpacity.value = withDelay(900, withTiming(1, { duration: 600 }));
    
    // Continuous sparkle rotation
    sparkleRotation.value = withSequence(
      withDelay(1200, 
        withTiming(360, { duration: 2000 }, () => {
          sparkleRotation.value = 0;
        })
      )
    );
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerOpacity.value === 0 ? 20 : 0 }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { scale: cardScale.value },
      { translateY: cardOpacity.value === 0 ? 50 : 0 }
    ],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonOpacity.value === 0 ? 30 : 0 }],
  }));

  const sparkleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${sparkleRotation.value}deg` }],
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

  const handleBack = () => {
    router.back();
  };

  return (
    <GradientBackground variant="primary">
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <Text style={[styles.stepIndicator, { color: colors.textSecondary }]}>
              3 of 3
            </Text>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: colors.text }]}>
                Ready to Create Magic?
              </Text>
              <Animated.Text style={[styles.sparkle, sparkleAnimatedStyle]}>
                ✨
              </Animated.Text>
            </View>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Your creative journey starts now
            </Text>
          </Animated.View>

          {/* CTA Card */}
          <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
            <GlassCard variant="elevated" style={styles.ctaCard}>
              <View style={styles.ctaContent}>
                <Text style={[styles.ctaTitle, { color: colors.text }]}>
                  Start Your First Transformation
                </Text>
                <Text style={[styles.ctaDescription, { color: colors.textSecondary }]}>
                  Take a photo or choose one from your gallery, and watch as our AI 
                  transforms it into something extraordinary. It&apos;s that simple!
                </Text>
                
                {/* Steps */}
                <View style={styles.steps}>
                  <StepItem
                    number="1"
                    title="Choose a Photo"
                    description="Camera or gallery"
                    colors={colors}
                  />
                  <StepItem
                    number="2"
                    title="Select Style"
                    description="Pick your favorite"
                    colors={colors}
                  />
                  <StepItem
                    number="3"
                    title="Get Result"
                    description="AI magic happens"
                    colors={colors}
                  />
                </View>

                {/* Free Trial Info */}
                <View style={[styles.trialInfo, { backgroundColor: colors.glass.background }]}>
                  <Text style={[styles.trialTitle, { color: colors.primary }]}>
                    🎁 Free Trial
                  </Text>
                  <Text style={[styles.trialDescription, { color: colors.textSecondary }]}>
                    Start with 3 free transformations. No credit card required!
                  </Text>
                </View>
              </View>
            </GlassCard>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View style={[styles.actions, buttonAnimatedStyle]}>
            <GlassButton
              title="Try It Now!"
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleTryNow}
              style={styles.tryButton}
            />
            
            <GlassButton
              title="Back"
              variant="secondary"
              size="md"
              onPress={handleBack}
              style={styles.backButton}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

function StepItem({ 
  number, 
  title, 
  description, 
  colors 
}: { 
  number: string; 
  title: string; 
  description: string; 
  colors: any; 
}) {
  return (
    <View style={styles.stepItem}>
      <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
        <Text style={[styles.stepNumberText, { color: colors.surface }]}>
          {number}
        </Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={[styles.stepTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 8,
  },
  sparkle: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  cardContainer: {
    flex: 1,
  },
  ctaCard: {
    padding: 32,
    marginHorizontal: 8,
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  steps: {
    gap: 20,
    marginBottom: 32,
    width: '100%',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 14,
  },
  trialInfo: {
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  trialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trialDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  actions: {
    paddingBottom: 32,
    paddingTop: 24,
    gap: 16,
  },
  tryButton: {
    marginBottom: 8,
  },
  backButton: {
    opacity: 0.7,
  },
});