import { useState } from "react";
import { View } from "react-native";
import MenuFlutuante from "@/components/MenuFlutuante";
import HomeScreen from "../HomeScreen";
import { useMenu } from "@/hooks/MenuContext";


export default function Index() {
  const { visible, closeMenu } = useMenu();

  return (
    <View style={{ flex: 1 }}>
      {visible && <MenuFlutuante onClose={closeMenu} />}
      <HomeScreen />
    </View>
  );
}
