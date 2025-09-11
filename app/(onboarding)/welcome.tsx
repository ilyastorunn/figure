import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/utils/theme/colors';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  // Animation values
  const logoScale = useSharedValue(0);
  const logoRotation = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    // Sequence of animations
    logoScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    logoRotation.value = withSequence(
      withTiming(360, { duration: 1000 }),
      withTiming(0, { duration: 0 })
    );
    
    titleOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    cardOpacity.value = withDelay(1100, withTiming(1, { duration: 600 }));
    buttonOpacity.value = withDelay(1400, withTiming(1, { duration: 600 }));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotateZ: `${logoRotation.value}deg` }
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleOpacity.value === 0 ? 20 : 0 }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleOpacity.value === 0 ? 20 : 0 }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardOpacity.value === 0 ? 30 : 0 }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonOpacity.value === 0 ? 20 : 0 }],
  }));

  const handleContinue = () => {
    router.push('/(onboarding)/features-1');
  };

  return (
    <GradientBackground variant="primary">
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
              <View style={[styles.logo, { backgroundColor: colors.primary }]}>
                <Text style={[styles.logoText, { color: colors.surface }]}>
                  AI
                </Text>
              </View>
            </Animated.View>
            
            <Animated.Text 
              style={[styles.appName, { color: colors.text }, titleAnimatedStyle]}
            >
              Photo Transformer
            </Animated.Text>
            
            <Animated.Text 
              style={[styles.tagline, { color: colors.textSecondary }, subtitleAnimatedStyle]}
            >
              Transform your photos with the power of AI
            </Animated.Text>
          </View>

          {/* Welcome Card */}
          <Animated.View style={[cardAnimatedStyle, { flex: 1 }]}>
            <GlassCard 
              variant="elevated" 
              style={styles.welcomeCard}
            >
              <Text style={[styles.welcomeTitle, { color: colors.text }]}>
                Welcome to the Future
              </Text>
              <Text style={[styles.welcomeDescription, { color: colors.textSecondary }]}>
                Discover the magic of AI-powered photo transformation. 
                Turn your ordinary photos into extraordinary art pieces 
                with just one tap.
              </Text>
              
              <View style={styles.features}>
                <FeatureItem 
                  icon="🎨" 
                  text="Ancient & Renaissance Art" 
                  textColor={colors.text}
                />
                <FeatureItem 
                  icon="🎭" 
                  text="Plastic Action Figures" 
                  textColor={colors.text}
                />
                <FeatureItem 
                  icon="🌸" 
                  text="Lofi Aesthetic Vibes" 
                  textColor={colors.text}
                />
              </View>
            </GlassCard>
          </Animated.View>

          {/* Continue Button */}
          <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
            <GlassButton
              title="Get Started"
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleContinue}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

function FeatureItem({ icon, text, textColor }: { icon: string; text: string; textColor: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={[styles.featureText, { color: textColor }]}>{text}</Text>
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
    paddingBottom: 32,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  welcomeCard: {
    padding: 32,
    margin: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  features: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 24,
  },
});