
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useMenu } from "@/hooks/MenuContext";
import { colors } from "@/styles/colorsApp";
import { useNavigation } from "@react-navigation/native";


const screenWidth = Dimensions.get("window").width;

const menuItems = [
  { label: "Calendário de Vacinas", route: "CalendarioVacinas" },
  { label: "Controle Gestacional", route: "ControleGestacional" },
  { label: "Plano de Parto", route: "PlanoParto" },
  { label: "Saúde Mental", route: "SaudeMental" },
  { label: "Guia da Gestante", route: "GuiaGestante" },
  { label: "Configurações", route: "Configuracoes" },
];


export default function MenuFlutuante() {
  const { visible, closeMenu } = useMenu();
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
    closeMenu();
  };


return (
    <Animated.View style={[styles.container, { left: slideAnim }]}>
      <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
        <Ionicons name="close" size={30} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Menu</Text>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => handleNavigate(item.route)}
        >
          <Image
            source={require("@/assets/images/logoFleur.png")}
            style={styles.icon}
          />
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      {/* <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
        <Ionicons name="exit-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.menuText}>Sair</Text>
      </TouchableOpacity> */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
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
