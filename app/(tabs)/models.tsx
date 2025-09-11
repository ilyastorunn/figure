import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/utils/theme/colors';

const { width } = Dimensions.get('window');

const AI_MODELS = [
  {
    id: 'ancient',
    title: 'Ancient & Renaissance',
    description: 'Transform into classical masterpieces',
    icon: '🎨',
    gradient: ['#8B5CF6', '#A78BFA'],
    examples: ['Leonardo da Vinci style', 'Oil painting texture', 'Classical lighting'],
  },
  {
    id: 'action-figure',
    title: 'Plastic Action Figure',
    description: 'Turn into collectible toy style',
    icon: '🎭',
    gradient: ['#F59E0B', '#FBBF24'],
    examples: ['Glossy plastic finish', 'Vivid toy colors', 'Action figure pose'],
  },
  {
    id: 'lofi',
    title: 'Lofi Aesthetic',
    description: 'Dreamy pastel vibes',
    icon: '🌸',
    gradient: ['#EC4899', '#F472B6'],
    examples: ['Soft pastel colors', 'Vintage film grain', 'Nostalgic atmosphere'],
  },
];

export default function ModelsScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const handleModelSelect = (modelId: string) => {
    // TODO: Navigate to image picker with selected model
    console.log('Selected model:', modelId);
    // router.push(`/(modal)/image-picker?model=${modelId}`);
  };

  return (
    <GradientBackground variant="secondary">
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              AI Models
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Choose your transformation style
            </Text>
          </View>

          {/* Models Grid */}
          <View style={styles.modelsContainer}>
            {AI_MODELS.map((model, index) => (
              <ModelCard
                key={model.id}
                model={model}
                colors={colors}
                onPress={() => handleModelSelect(model.id)}
                index={index}
              />
            ))}
          </View>

          {/* Coming Soon */}
          <GlassCard variant="outlined" style={styles.comingSoonCard}>
            <Text style={[styles.comingSoonTitle, { color: colors.text }]}>
              More Styles Coming Soon! ✨
            </Text>
            <Text style={[styles.comingSoonDescription, { color: colors.textSecondary }]}>
              We&apos;re working on exciting new AI transformation styles. 
              Stay tuned for updates!
            </Text>
            <View style={styles.upcomingStyles}>
              <Text style={[styles.upcomingTitle, { color: colors.text }]}>
                Upcoming:
              </Text>
              <Text style={[styles.upcomingText, { color: colors.textMuted }]}>
                • Anime Style • Watercolor • Sketch Art • Pop Art
              </Text>
            </View>
          </GlassCard>

          {/* Bottom spacing for tab bar */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

interface ModelCardProps {
  model: typeof AI_MODELS[0];
  colors: any;
  onPress: () => void;
  index: number;
}

function ModelCard({ model, colors, onPress, index }: ModelCardProps) {
  return (
    <GlassCard 
      variant="elevated" 
      style={(index > 0 ? [styles.modelCard, { marginTop: 16 }] : styles.modelCard) as ViewStyle}
    >
      <View style={styles.modelHeader}>
        <View style={styles.modelIconContainer}>
          <Text style={styles.modelIcon}>{model.icon}</Text>
        </View>
        <View style={styles.modelInfo}>
          <Text style={[styles.modelTitle, { color: colors.text }]}>
            {model.title}
          </Text>
          <Text style={[styles.modelDescription, { color: colors.textSecondary }]}>
            {model.description}
          </Text>
        </View>
      </View>

      <View style={styles.modelFeatures}>
        {model.examples.map((example, idx) => (
          <View key={idx} style={styles.featureItem}>
            <Text style={styles.featureBullet}>•</Text>
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              {example}
            </Text>
          </View>
        ))}
      </View>

      <GlassButton
        title="Try This Style"
        variant="primary"
        size="md"
        fullWidth
        onPress={onPress}
        style={styles.modelButton}
      />
    </GlassCard>
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
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  modelsContainer: {
    marginBottom: 32,
  },
  modelCard: {
    padding: 24,
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modelIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  modelIcon: {
    fontSize: 28,
  },
  modelInfo: {
    flex: 1,
  },
  modelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modelDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  modelFeatures: {
    marginBottom: 24,
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureBullet: {
    fontSize: 16,
    color: '#3B82F6',
    marginRight: 8,
    width: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  modelButton: {
    marginTop: 8,
  },
  comingSoonCard: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  comingSoonDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  upcomingStyles: {
    alignItems: 'center',
  },
  upcomingTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  upcomingText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 120, // Space for tab bar
  },
});