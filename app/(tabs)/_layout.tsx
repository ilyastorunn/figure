import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { AnimatedTabBar } from '@/components/ui/animated-tab-bar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { GradientBackground } from '@/components/ui/gradient-background';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GradientBackground variant="subtle">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide default tab bar
        }}
        tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol size={size || 24} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="models"
          options={{
            title: 'Models',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol size={size || 24} name="sparkles" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <IconSymbol size={size || 24} name="person.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </GradientBackground>
  );
}
