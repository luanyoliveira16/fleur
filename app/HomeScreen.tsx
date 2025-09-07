import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { useRouter, useNavigation } from "expo-router";
import {
  View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity,
  Linking, Animated
} from 'react-native';
import { colors } from "../constants/colorApp";
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [humorSelecionado, setHumorSelecionado] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? 0 : -screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [menuVisible]);

  const toggleMenu = () => setMenuVisible(prev => !prev);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <Image
          source={require('@/assets/images/logotipo.png')}
          style={{ width: 130, height: 32 }}
        />
      ),
      headerStyle: { backgroundColor: '#762C61' },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerLeft: () => (
        <TouchableOpacity onPress={toggleMenu} style={{ marginLeft: 15 }}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, toggleMenu]);

  const menuItems = [
    { label: "Calendário de Vacinas", external: true, url: "https://www.gov.br/saude/pt-br/vacinacao/calendario" },
    { label: "Controle Gestacional", route: "/ControleGestacional" },
    { label: "Plano de Parto", external: true, url: "https://www.despertardoparto.com.br/modelo-de-plano-de-parto.html" },
    { label: "Saúde Mental", route: "/mental-health" },
    { label: "Guia da Gestante", route: "/guide1" },
    { label: "Configurações", route: "/configuracoes" },
  ];

  return (
    <View style={{ flex: 1 }}>
      Menu Flutuante
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
              setMenuVisible(false);
            }}
          >
            <Image
              source={require("../assets/images/logoFleur.png")}
              style={styles.icon}
            />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Conteúdo principal com Scroll */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>Olá, Julia! Seja bem-vinda!</Text>

        <Image
          source={require('../assets/images/ultrassomGemelar.jpg')}
          style={styles.ultrassom}
          resizeMode="cover"
        />

        <Text style={styles.babyName}>João e Maria</Text>
        <Text style={styles.weeks}>30 semanas</Text>

        <Text style={styles.question}>Como está seu humor hoje?</Text>
        <View style={styles.emojis}>
          {['😀', '😊', '😐', '😢', '😠'].map((emoji, index) => (
            <TouchableOpacity key={index} onPress={() => setHumorSelecionado(emoji)}>
              <Text
                style={{
                  fontSize: humorSelecionado === emoji ? 36 : 32,
                  color: humorSelecionado === emoji ? colors.purple : colors.gray[500],
                  transform: [{ scale: humorSelecionado === emoji ? 1.1 : 1 }],
                }}
              >
                {emoji}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.infoTitle}>Confira informações importantes:</Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => router.push("/agenda")} style={styles.card}>
            <View style={styles.iconBox}>
              <Image source={require('../assets/images/agenda.png')} style={styles.icon} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>SUA AGENDA</Text>
              <Text style={styles.arrow}>&gt;</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.ifraldas.com.br/o-que-levar-para-a-maternidade/?utm_term=&utm_campaign=Nova+Performance+Max&utm_source=Google-Ads&utm_medium=Pesquisa+Display")
            }
            style={styles.card}
          >
            <View style={styles.iconBox}>
              <Image source={require('../assets/images/baby-bag.png')} style={styles.icon} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>BOLSA DE MATERNIDADE</Text>
              <Text style={styles.arrow}>&gt;</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://bvsms.saude.gov.br/bvs/publicacoes/caderneta_gestante_8ed_rev.pdf")
            }
            style={styles.card}
          >
            <View style={styles.iconBox}>
              <Image source={require('../assets/images/guide-book.png')} style={styles.icon} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>CARTEIRA DA GESTANTE</Text>
              <Text style={styles.arrow}>&gt;</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 1,
    backgroundColor: colors.backgroundTela,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.purple,
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    margin: 15,
    textAlign: 'center',
  },
  ultrassom: {
    width: 320,
    height: 180,
    borderRadius: 5,
    marginBottom: 5,
  },
  babyName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.purple,
    textAlign: 'left',
  },
  weeks: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: colors.purple,
  },
  emojis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.purple,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: colors.gray[500],
  },
  arrow: {
    fontSize: 20,
    color: colors.purple,
    marginLeft: 10,
  },
  iconBox: {
    backgroundColor: colors.gray[100],
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginRight: 10,
    width: 40,
    height: 40,
  },
  icon: {
    width: 28,
    height: 28,
    margin: 5,
    alignContent: 'center',
  },
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
});
