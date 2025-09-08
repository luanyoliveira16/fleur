import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Animated,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../constants/colorApp";
import { getAuth, signOut } from "firebase/auth";

const screenWidth = Dimensions.get("window").width;

interface MenuProps {
  visible: boolean;
  toggleMenu: () => void;
  slideAnim: Animated.Value;
}

const menuItems = [
  { label: "Início", route: "/HomeScreen", iconName: "home-outline" },
  {
    label: "Calendário de Vacinas",
    external: true,
    url: "https://www.gov.br/saude/pt-br/vacinacao/calendario",
  },
  { label: "Controle Gestacional", route: "/ControleGestacional" },
  {
    label: "Plano de Parto",
    external: true,
    url: "https://www.despertardoparto.com.br/modelo-de-plano-de-parto.html",
  },
  { label: "Saúde Mental", route: "/mental-health" },
  { label: "Guia da Gestante", route: "/guide1" },
  { label: "Configurações", route: "/configuracoes" },
  { label: "Sair", action: "logout", iconName: "log-out-outline" },
];

export default function MenuFlutuante({
  visible,
  toggleMenu,
  slideAnim,
}: MenuProps) {
  const router = useRouter();

  return (
    <Animated.View style={[styles.menuContainer, { left: slideAnim }]}>
      <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
        <Ionicons name="close" size={30} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.menuTitle}>Menu</Text>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={async () => {
            if (item.external && item.url) {
              Linking.openURL(item.url);
            } else if (item.route) {
              router.push(item.route);
            } else if (item.action === "logout") {
              Alert.alert("Sair", "Tem certeza que deseja sair?", [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Sair",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      const auth = getAuth();
                      await signOut(auth);
                      router.replace("/login");
                    } catch (error) {
                      console.error("Erro ao sair:", error);
                    }
                  },
                },
              ]);
            }

            toggleMenu();
          }}
        >
          {item.iconName ? (
            <Ionicons
              name={item.iconName}
              size={24}
              color="#fff"
              style={styles.icon}
            />
          ) : (
            <Image
              source={require("../assets/images/logoFleur.png")}
              style={styles.icon}
            />
          )}
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: screenWidth * 0.8,
    backgroundColor: "rgba(118, 44, 97, 0.95)",
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 999,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
  },
  menuTitle: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    width: 28,
    height: 28,
    margin: 5,
    alignContent: "center",
  },
});
