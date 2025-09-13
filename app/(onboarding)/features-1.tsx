import { GlassButton } from '@/components/ui/glass-button';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Features1Screen() {
  // Animation values
  const titleOpacity = useSharedValue(0);
  const cardsOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 600 });
    cardsOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    buttonOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleOpacity.value === 0 ? 20 : 0 }],
  }));

  const cardsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardsOpacity.value,
    transform: [{ translateY: cardsOpacity.value === 0 ? 30 : 0 }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonOpacity.value === 0 ? 20 : 0 }],
  }));

  const handleNext = () => {
    router.push('/(onboarding)/get-started');
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Title */}
          <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
            <Text style={styles.title}>
              Discover your favorite style
            </Text>
          </Animated.View>

          {/* Cards Grid */}
          <Animated.View style={[styles.cardsContainer, cardsAnimatedStyle]}>
            <View style={styles.grid}>
              <StyleCard
                title="Photo to Figure"
                emoji="🎭"
                bgColor="#4A90E2"
              />
              <StyleCard
                title="Photo to Action Toy"
                emoji="🤖"
                bgColor="#F5A623"
              />
              <StyleCard
                title="Photo to Lofi"
                emoji="🌸"
                bgColor="#D0021B"
              />
              <StyleCard
                title="Photo to Renaissance Art"
                emoji="🎨"
                bgColor="#7ED321"
              />
            </View>
          </Animated.View>

          {/* Navigation Buttons */}
          <Animated.View style={[styles.navigation, buttonAnimatedStyle]}>
            <GlassButton
              title="Skip"
              variant="secondary"
              size="md"
              onPress={handleSkip}
              style={styles.skipButton}
              textStyle={styles.skipButtonText}
            />
            <GlassButton
              title="Next"
              variant="primary"
              size="md"
              onPress={handleNext}
              style={styles.nextButton}
              textStyle={styles.nextButtonText}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function StyleCard({ title, emoji, bgColor }: { title: string; emoji: string; bgColor: string }) {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={styles.cardEmoji}>{emoji}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
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
  titleContainer: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    width: (width - 64) / 2,
    height: 160,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 40,
  },
  skipButton: {
    backgroundColor: 'rgba(64, 64, 64, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    backdropFilter: 'blur(20px)',
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
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