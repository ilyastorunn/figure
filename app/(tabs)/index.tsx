import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { GradientBackground } from '@/components/ui/gradient-background';
import { AnimatedTabBar } from '@/components/ui/animated-tab-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/utils/theme/colors';

const { width, height } = Dimensions.get('window');

const FEATURED_TRANSFORMATIONS = [
  {
    id: 1,
    title: 'Renaissance Portrait',
    description: 'Classical art meets modern photography',
    icon: '🎨',
    color: '#8B5CF6',
  },
  {
    id: 2,
    title: 'Action Figure',
    description: 'Transform into a collectible toy',
    icon: '🎭',
    color: '#F59E0B',
  },
  {
    id: 3,
    title: 'Lofi Aesthetic',
    description: 'Dreamy pastel vibes',
    icon: '🌸',
    color: '#EC4899',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      isScrolling.value = event.contentOffset.y > 50;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.8],
      'clamp'
    );
    
    const translateY = interpolate(
      scrollY.value,
      [0, 200],
      [0, -50],
      'clamp'
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const handleQuickStart = () => {
    router.push('/models' as any);
  };

  const handleFeaturePress = (featureId: number) => {
    // TODO: Navigate to specific transformation
    console.log('Feature pressed:', featureId);
    router.push('/models' as any);
  };

  return (
    <GradientBackground variant="primary">
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <Animated.View style={[styles.hero, headerAnimatedStyle]}>
            <Text style={[styles.heroTitle, { color: colors.text }]}>
              Transform Your Photos
            </Text>
            <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
              AI-powered magic at your fingertips
            </Text>
            
            <GlassButton
              title="Start Creating"
              variant="primary"
              size="lg"
              onPress={handleQuickStart}
              style={styles.heroButton}
              rightIcon={<Text style={{ color: colors.primary }}>✨</Text>}
            />
          </Animated.View>

          {/* Stats Section */}
          <GlassCard variant="elevated" style={styles.statsCard}>
            <Text style={[styles.statsTitle, { color: colors.text }]}>
              Join the Creative Community
            </Text>
            <View style={styles.statsGrid}>
              <StatItem 
                number="10K+" 
                label="Transformations" 
                icon="🎨" 
                colors={colors}
              />
              <StatItem 
                number="5K+" 
                label="Happy Users" 
                icon="😊" 
                colors={colors}
              />
              <StatItem 
                number="3" 
                label="AI Models" 
                icon="🤖" 
                colors={colors}
              />
            </View>
          </GlassCard>

          {/* Featured Transformations */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Popular Transformations
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Discover what&apos;s trending
            </Text>
            
            <View style={styles.featuresGrid}>
              {FEATURED_TRANSFORMATIONS.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  colors={colors}
                  onPress={() => handleFeaturePress(feature.id)}
                />
              ))}
            </View>
          </View>

          {/* How It Works */}
          <GlassCard variant="default" style={styles.howItWorksCard}>
            <Text style={[styles.howItWorksTitle, { color: colors.text }]}>
              How It Works
            </Text>
            <View style={styles.steps}>
              <StepItem
                number="1"
                title="Choose Photo"
                description="Camera or gallery"
                colors={colors}
              />
              <StepItem
                number="2"
                title="Select Style"
                description="Pick transformation"
                colors={colors}
              />
              <StepItem
                number="3"
                title="Get Result"
                description="AI magic happens"
                colors={colors}
              />
            </View>
          </GlassCard>

          {/* Free Trial CTA */}
          <GlassCard variant="elevated" style={styles.trialCard}>
            <View style={styles.trialContent}>
              <Text style={styles.trialEmoji}>🎁</Text>
              <Text style={[styles.trialTitle, { color: colors.text }]}>
                Start Your Free Trial
              </Text>
              <Text style={[styles.trialDescription, { color: colors.textSecondary }]}>
                Get 3 free transformations to explore the magic of AI
              </Text>
              <GlassButton
                title="Try Free Now"
                variant="primary"
                size="md"
                fullWidth
                onPress={handleQuickStart}
                style={styles.trialButton}
              />
            </View>
          </GlassCard>

          {/* Bottom spacing for tab bar */}
          <View style={styles.bottomSpacing} />
        </Animated.ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

interface StatItemProps {
  number: string;
  label: string;
  icon: string;
  colors: any;
}

function StatItem({ number, label, icon, colors }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statNumber, { color: colors.text }]}>{number}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

interface FeatureCardProps {
  feature: typeof FEATURED_TRANSFORMATIONS[0];
  colors: any;
  onPress: () => void;
}

function FeatureCard({ feature, colors, onPress }: FeatureCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <GlassCard variant="default" style={styles.featureCard}>
        <View style={[styles.featureIconContainer, { backgroundColor: feature.color + '20' }]}>
          <Text style={styles.featureIcon}>{feature.icon}</Text>
        </View>
        <Text style={[styles.featureTitle, { color: colors.text }]}>
          {feature.title}
        </Text>
        <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
          {feature.description}
        </Text>
      </GlassCard>
    </TouchableOpacity>
  );
}

interface StepItemProps {
  number: string;
  title: string;
  description: string;
  colors: any;
}

function StepItem({ number, title, description, colors }: StepItemProps) {
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 44,
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
  },
  heroButton: {
    paddingHorizontal: 32,
  },
  statsCard: {
    padding: 24,
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    padding: 20,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  howItWorksCard: {
    padding: 24,
    marginBottom: 24,
  },
  howItWorksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  steps: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 14,
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
  trialCard: {
    padding: 32,
    marginBottom: 32,
  },
  trialContent: {
    alignItems: 'center',
  },
  trialEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  trialTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  trialDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  trialButton: {
    paddingHorizontal: 32,
  },
  bottomSpacing: {
    height: 120, // Space for tab bar
  },
});
