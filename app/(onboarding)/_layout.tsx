import { Stack } from 'expo-router';
import { GradientBackground } from '@/components/ui/gradient-background';

export default function OnboardingLayout() {
  return (
    <GradientBackground variant="subtle">
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="features-1" />
        <Stack.Screen name="features-2" />
        <Stack.Screen name="get-started" />
      </Stack>
    </GradientBackground>
  );
}