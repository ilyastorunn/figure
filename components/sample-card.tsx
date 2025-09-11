import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface SampleCardProps {
  title: string;
  description: string;
  onPress?: () => void;
}

export default function SampleCard({ title, description, onPress }: SampleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 m-2 shadow-lg active:scale-95 transition-transform"
    >
      <View className="space-y-2">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </Text>
        <Text className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </Text>
        <View className="pt-2">
          <View className="bg-blue-500 rounded-lg px-4 py-2 self-start">
            <Text className="text-white font-semibold">Learn More</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}