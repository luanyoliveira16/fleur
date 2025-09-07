import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Animated, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colorApp';

const screenWidth = Dimensions.get('window').width;

interface MenuProps {
  visible: boolean;
  toggleMenu: () => void;
  slideAnim: Animated.Value;
}

const menuItems = [
  { label: "Calendário de Vacinas", external: true, url: "https://www.gov.br/saude/pt-br/vacinacao/calendario" },
  { label: "Controle Gestacional", route: "/ControleGestacional" },
  { label: "Plano de Parto", external: true, url: "https://www.despertardoparto.com.br/modelo-de-plano-de-parto.html" },
  { label: "Saúde Mental", route: "/mental-health" },
  { label: "Guia da Gestante", route: "/guide1" },
  { label: "Configurações", route: "/configuracoes" },
];

export default function MenuFlutuante({ visible, toggleMenu, slideAnim }: MenuProps) {
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
          onPress={() => {
            if (item.external && item.url) {
              Linking.openURL(item.url);
            } else if (item.route) {
              router.push(item.route);
            }
            toggleMenu();
          }}
        >
          <Image source={require('../assets/images/logoFleur.png')} style={styles.icon} />
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: screenWidth * 0.8,
    backgroundColor: 'rgba(118, 44, 97, 0.95)',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 999,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    width: 28,
    height: 28,
    margin: 5,
    alignContent: 'center',
  },
});