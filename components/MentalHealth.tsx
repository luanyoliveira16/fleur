import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import MenuFlutuante from "../components/MenuFlutuante";

const ICONS = [
  require("../assets/images/icon1.png"),
  require("../assets/images/icon2.png"),
  require("../assets/images/icon3.png"),
  require("../assets/images/icon4.png"),
  require("../assets/images/icon5.png"),
  require("../assets/images/icon6.png"),
];

export default function MentalHealth() {
  const [menuVisible, setMenuVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(-screenWidth * 0.8)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -screenWidth * 0.8,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const router = useRouter();

  const items = [
    "Sobre o Puerpério",
    "Luto",
    "Autolesão e aceitação",
    "Quando buscar ajuda?",
    "Ansiedade na Gestação",
    "Apoio Emocional",
  ];

  return (
    <View style={styles.container}>
      {/* HEADER NO TOPO */}
      <Header onMenuPress={toggleMenu} />
      

      {/* CONTEÚDO COM ESPAÇO RESERVADO */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Saúde Mental</Text>
          <Text style={styles.paragraph}>
            Cuidar da saúde mental durante a gestação e o puerpério é
            fundamental, pois esses períodos trazem mudanças físicas, emocionais
            e hormonais que podem impactar significativamente o bem-estar da
            mulher. Manter a mente saudável ajuda a lidar com ansiedade,
            estresse e inseguranças comuns, promovendo um vínculo mais positivo
            com o bebê e maior qualidade de vida .
          </Text>
          <Text style={styles.highlight}>
            Confira algumas informações sobre o puerpério e dicas para cuidar da
            sua saúde mental:
          </Text>

          <View style={styles.grid}>
            {items.map((text, idx) => (
              <View key={idx} style={styles.card}>
                <Image source={ICONS[idx]} style={styles.icon} />
                <Text style={styles.cardText}>{text}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={() => router.push("/guide1")}>
            <Text style={styles.nextLink}>Mais informações ➤</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {menuVisible && (
        <MenuFlutuante
          visible={menuVisible}
          toggleMenu={toggleMenu}
          slideAnim={slideAnim}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf8",
  },
  headerContainer: {
    width: "100%",
    backgroundColor: "#762C61",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transform: [{ translateY: -15 }],
  },
  scrollView: {
    flex: 1,
    paddingTop: 8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 0,
  },
  paragraph: {
    color: "#444",
    marginBottom: 8,
    lineHeight: 20,
  },
  highlight: {
    marginTop: 12,
    color: "#5c1b54",
    fontWeight: "600",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // marginTop: 6,
  },
  card: {
    width: "48%",
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  cardText: {
    textAlign: "center",
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  nextLink: {
    color: "#5c1b54",
    marginTop: 16,
    fontWeight: "500",
    textAlign: "right",
  },
});
