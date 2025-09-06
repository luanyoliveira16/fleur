import { Slot } from "expo-router";
import { MenuProvider } from "@/hooks/MenuContext";
import MenuFlutuante from "@/components/MenuFlutuante";

export default function Layout() {
  return (
    <MenuProvider>
      <Slot />
      <MenuFlutuante />
    </MenuProvider>
  );
}