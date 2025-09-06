import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  onMenuPress?: () => void; // abre menu lateral, se tiver
};

export default function Header({ onMenuPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      {/* Botão menu */}
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Logo central */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logoFleur.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/images/logoText.png")}
          style={styles.text}
          resizeMode="contain"
        />
      </View>

      {/* Espaço vazio p/ balancear layout */}
      <View style={{ width: 28 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#762C61",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    elevation: 4, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  menuButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 6,
  },
  text: {
    width: 60,
    height: 20,
  },
});
