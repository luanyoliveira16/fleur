import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function MenuFlutuante() {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const navigation = useNavigation();

  const menuItems = [
    { label: "Calendário de Vacinas", route: "CalendarioVacinas" },
    { label: "Controle Gestacional", route: "ControleGestacional" },
    { label: "Plano de Parto", route: "PlanoParto" },
    { label: "Saúde Mental", route: "SaudeMental" },
    { label: "Guia da Gestante", route: "GuiaGestante" },
    { label: "Configurações", route: "Configuracoes" },
  ];

  const openMenu = () => {
    setMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuOpen(false));
  };

  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
    closeMenu();
  };

  return (
    <View style={styles.wrapper}>
      {/* Botão de abrir menu */}
      <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Menu flutuante */}
      {menuOpen && (
        <Animated.View style={[styles.menuContainer, { left: slideAnim }]}>
          {menuOpen && (
            <>
              <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                <Ionicons name="close" size={30} color="#fff" />
              </TouchableOpacity>

              <Text style={styles.menuTitle}>Menu</Text>

              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleNavigate(item.route)}
                >
                  <Image
                    source={require("../../fleur/assets/images/logoFleur.png")}
                    style={styles.icon}
                  />

                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
                <Ionicons
                  name="exit-outline"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.menuText}>Sair</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 30, //Ajustar quando colocar o Header
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "transparent", // só para testes
  },

  menuButton: {
    padding: 10,
    backgroundColor: "#762C61",
    borderRadius: 10,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "80%",
    backgroundColor: "rgba(118, 44, 97, 0.9)",
    padding: 20,
    paddingTop: 60,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: 999,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 102,
  },
  menuTitle: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  icon: {
    width: 30, 
    height: 30, 
    resizeMode: "contain",
    marginRight: 10,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
});
