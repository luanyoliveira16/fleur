import { Tabs } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from "react-native";

import { HapticTab } from '@/components/HapticTab';

import TabBarBackground from '@/components/ui/TabBarBackground';
import { colors } from '../../constants/colorApp';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.gray[300],
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: colors.backgroundTela,
          borderTopColor: "transparent",
          height: 80,
          paddingBottom: 15,
          paddingTop: 3,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),

        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Sair",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="log-out" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
