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

export default function Features2Screen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  // Animation values
  const headerOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const imagesScale = useSharedValue(0.8);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    cardOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    imagesScale.value = withDelay(600, withTiming(1, { duration: 600 }));
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

  const imagesAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imagesScale.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonOpacity.value === 0 ? 20 : 0 }],
  }));

  const handleNext = () => {
    router.push('/(onboarding)/get-started');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <GradientBackground variant="accent">
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <Text style={[styles.stepIndicator, { color: colors.textSecondary }]}>
              2 of 3
            </Text>
            <Text style={[styles.title, { color: colors.text }]}>
              Multiple Styles
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Choose from various AI transformation styles
            </Text>
          </Animated.View>

          {/* Feature Card */}
          <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
            <GlassCard variant="elevated" style={styles.featureCard}>
              {/* Three Styles Demo */}
              <Animated.View style={[styles.stylesContainer, imagesAnimatedStyle]}>
                <StyleDemo
                  icon="🎭"
                  title="Action Figure"
                  description="Plastic toy style"
                  color={colors.secondary}
                  textColor={colors.surface}
                />
                <StyleDemo
                  icon="🌸"
                  title="Lofi Aesthetic"
                  description="Dreamy pastel vibes"
                  color={colors.accent}
                  textColor={colors.text}
                />
                <StyleDemo
                  icon="🎨"
                  title="Renaissance"
                  description="Classical art style"
                  color={colors.primary}
                  textColor={colors.surface}
                />
              </Animated.View>

              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Endless Possibilities
                </Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  From classical Renaissance paintings to modern lofi aesthetics, 
                  our AI can transform your photos into any style you imagine. 
                  Each transformation is unique and tailored to your image.
                </Text>
                
                <View style={styles.benefits}>
                  <BenefitItem 
                    icon="⚡" 
                    text="Lightning fast processing" 
                    textColor={colors.text}
                  />
                  <BenefitItem 
                    icon="🎯" 
                    text="High-quality results every time" 
                    textColor={colors.text}
                  />
                  <BenefitItem 
                    icon="🔄" 
                    text="Try different styles instantly" 
                    textColor={colors.text}
                  />
                </View>
              </View>
            </GlassCard>
          </Animated.View>

          {/* Navigation */}
          <Animated.View style={[styles.navigation, buttonAnimatedStyle]}>
            <GlassButton
              title="Back"
              variant="secondary"
              size="md"
              onPress={handleBack}
              style={styles.backButton}
            />
            <GlassButton
              title="Continue"
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

function StyleDemo({ 
  icon, 
  title, 
  description, 
  color, 
  textColor 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  color: string; 
  textColor: string; 
}) {
  return (
    <View style={[styles.styleDemo, { backgroundColor: color }]}>
      <Text style={styles.styleDemoIcon}>{icon}</Text>
      <Text style={[styles.styleDemoTitle, { color: textColor }]}>{title}</Text>
      <Text style={[styles.styleDemoDescription, { color: textColor, opacity: 0.8 }]}>
        {description}
      </Text>
    </View>
  );
}

function BenefitItem({ icon, text, textColor }: { icon: string; text: string; textColor: string }) {
  return (
    <View style={styles.benefitItem}>
      <Text style={styles.benefitIcon}>{icon}</Text>
      <Text style={[styles.benefitText, { color: textColor }]}>{text}</Text>
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
  stylesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 8,
  },
  styleDemo: {
    flex: 1,
    aspectRatio: 0.8,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleDemoIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  styleDemoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  styleDemoDescription: {
    fontSize: 10,
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
  benefits: {
    gap: 12,
    width: '100%',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  benefitText: {
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
  backButton: {
    flex: 0.4,
  },
  nextButton: {
    flex: 0.4,
  },
});