import { Tabs } from "expo-router";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colorsApp";
import { useMenu } from "@/hooks/MenuContext";


export default function Layout() {
  const { openMenu } = useMenu();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          backgroundColor: colors.backgroundTela,
          borderTopColor: "transparent",
          height: 70,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: () => (
            <Image
              source={require("../../assets/images/logotipo.png")}
              style={{ width: 130, height: 32 }}
            />
          ),
          headerStyle: { backgroundColor: colors.purple },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
    headerLeft: () => {
      const { openMenu } = useMenu();
      return (
        <TouchableOpacity onPress={openMenu} style={{ marginLeft: 15 }}>
          <Ionicons name="menu" size={24} color={colors.white} />
        </TouchableOpacity>
      );
    },

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
