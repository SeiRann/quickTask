import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Stack
      screenOptions={{
        title: "Tasks",
        headerTitleAlign: "center",
        headerTransparent: true,
        headerBlurEffect:"regular",
      }}
    />
  );
}