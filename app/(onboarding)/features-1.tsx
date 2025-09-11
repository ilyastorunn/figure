import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/utils/theme/colors';

const { width } = Dimensions.get('window');

export default function Features1Screen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  // Animation values
  const headerOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const imageScale = useSharedValue(0.8);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    cardOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    imageScale.value = withDelay(600, withTiming(1, { duration: 600 }));
    buttonOpacity.value = withDelay(900, withTiming(1, { duration: 600 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerOpacity.value === 0 ? 20 : 0 }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardOpacity.value === 0 ? 30 : 0 }],
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonOpacity.value === 0 ? 20 : 0 }],
  }));

  const handleNext = () => {
    router.push('/(onboarding)/features-2');
  };

  const handleSkip = () => {
    router.push('/(onboarding)/get-started');
  };

  return (
    <GradientBackground variant="secondary">
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <Text style={[styles.stepIndicator, { color: colors.textSecondary }]}>
              1 of 3
            </Text>
            <Text style={[styles.title, { color: colors.text }]}>
              Transform into Art
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Turn your photos into classical masterpieces
            </Text>
          </Animated.View>

          {/* Feature Card */}
          <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
            <GlassCard variant="elevated" style={styles.featureCard}>
              {/* Demo Image Placeholder */}
              <Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
                <View style={[styles.beforeImage, { backgroundColor: colors.surfaceVariant }]}>
                  <Text style={[styles.imageLabel, { color: colors.text }]}>
                    📸 Your Photo
                  </Text>
                </View>
                
                <View style={styles.arrowContainer}>
                  <Text style={styles.arrow}>→</Text>
                </View>
                
                <View style={[styles.afterImage, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.imageLabel, { color: colors.surface }]}>
                    🎨 Renaissance Art
                  </Text>
                </View>
              </Animated.View>

              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Ancient & Renaissance Style
                </Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  Our AI transforms your photos using techniques inspired by Leonardo da Vinci, 
                  Michelangelo, and other Renaissance masters. Experience the magic of classical 
                  art with modern technology.
                </Text>
                
                <View style={styles.highlights}>
                  <HighlightItem 
                    icon="🎭" 
                    text="Classical painting techniques" 
                    textColor={colors.text}
                  />
                  <HighlightItem 
                    icon="✨" 
                    text="Oil painting textures & effects" 
                    textColor={colors.text}
                  />
                  <HighlightItem 
                    icon="🖼️" 
                    text="Museum-quality results" 
                    textColor={colors.text}
                  />
                </View>
              </View>
            </GlassCard>
          </Animated.View>

          {/* Navigation */}
          <Animated.View style={[styles.navigation, buttonAnimatedStyle]}>
            <GlassButton
              title="Skip"
              variant="secondary"
              size="md"
              onPress={handleSkip}
              style={styles.skipButton}
            />
            <GlassButton
              title="Next"
              variant="primary"
              size="md"
              onPress={handleNext}
              style={styles.nextButton}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

function HighlightItem({ icon, text, textColor }: { icon: string; text: string; textColor: string }) {
  return (
    <View style={styles.highlightItem}>
      <Text style={styles.highlightIcon}>{icon}</Text>
      <Text style={[styles.highlightText, { color: textColor }]}>{text}</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  cardContainer: {
    flex: 1,
  },
  featureCard: {
    padding: 24,
    marginHorizontal: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  beforeImage: {
    width: (width - 120) / 3,
    height: 100,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  afterImage: {
    width: (width - 120) / 3,
    height: 100,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    width: 40,
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: '#666',
  },
  imageLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  featureContent: {
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlights: {
    gap: 12,
    width: '100%',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  highlightIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  highlightText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 24,
  },
  skipButton: {
    flex: 0.4,
  },
  nextButton: {
    flex: 0.4,
  },
});