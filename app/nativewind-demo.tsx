import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import SampleCard from '@/components/sample-card';

export default function NativeWindDemoScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🎨 NativeWind Demo
          </Text>
          <Text className="text-gray-600 dark:text-gray-300 text-base">
            Tailwind CSS styling for React Native with Expo
          </Text>
        </View>

        {/* Features Grid */}
        <View className="space-y-4 mb-8">
          <SampleCard
            title="🚀 Fast Setup"
            description="NativeWind brings the power of Tailwind CSS to React Native, allowing you to style your components with utility classes."
            onPress={() => console.log('Fast Setup pressed')}
          />
          
          <SampleCard
            title="🌙 Dark Mode"
            description="Built-in dark mode support with automatic theme switching based on system preferences."
            onPress={() => console.log('Dark Mode pressed')}
          />
          
          <SampleCard
            title="📱 Cross Platform"
            description="Works seamlessly across iOS, Android, and Web platforms with consistent styling."
            onPress={() => console.log('Cross Platform pressed')}
          />
        </View>

        {/* Color Palette Demo */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Color Palette
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-red-500 w-12 h-12 rounded-lg" />
            <View className="bg-blue-500 w-12 h-12 rounded-lg" />
            <View className="bg-green-500 w-12 h-12 rounded-lg" />
            <View className="bg-yellow-500 w-12 h-12 rounded-lg" />
            <View className="bg-purple-500 w-12 h-12 rounded-lg" />
            <View className="bg-pink-500 w-12 h-12 rounded-lg" />
            <View className="bg-indigo-500 w-12 h-12 rounded-lg" />
            <View className="bg-gray-500 w-12 h-12 rounded-lg" />
          </View>
        </View>

        {/* Interactive Buttons */}
        <View className="space-y-3">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Elements
          </Text>
          
          <Pressable className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 active:scale-95">
            <Text className="text-white font-bold text-center text-lg">
              Primary Button
            </Text>
          </Pressable>
          
          <Pressable className="border-2 border-blue-500 rounded-xl p-4 active:bg-blue-50 dark:active:bg-gray-800">
            <Text className="text-blue-500 font-bold text-center text-lg">
              Secondary Button
            </Text>
          </Pressable>
          
          <Pressable className="bg-red-500 rounded-xl p-4 active:bg-red-600">
            <Text className="text-white font-bold text-center text-lg">
              Destructive Button
            </Text>
          </Pressable>
        </View>

        {/* Spacing Demo */}
        <View className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Spacing & Layout
          </Text>
          <View className="flex-row justify-between items-center">
            <View className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <Text className="text-blue-800 dark:text-blue-200 font-medium">Flex</Text>
            </View>
            <View className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <Text className="text-green-800 dark:text-green-200 font-medium">Layout</Text>
            </View>
            <View className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <Text className="text-purple-800 dark:text-purple-200 font-medium">Utils</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}