import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header"; 

const ICONS = [
  require("../assets/images/icon1.png"),
  require("../assets/images/icon2.png"),
  require("../assets/images/icon3.png"),
  require("../assets/images/icon4.png"),
  require("../assets/images/icon5.png"),
  require("../assets/images/icon6.png"),
];

export default function MentalHealth() {
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Fleur</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Saúde Mental</Text>
        <Text style={styles.paragraph}>
          Cuidar da saúde mental durante a gestação e o puerpério é fundamental, pois esses períodos trazem mudanças físicas, emocionais e hormonais que podem impactar significativamente o bem-estar da mulher. Manter a mente saudável ajuda a lidar com ansiedade, estresse e inseguranças comuns, promovendo um vínculo mais positivo com o bebê e maior qualidade de vida.
        </Text>
        <Text style={styles.highlight}>
          Confira algumas informações sobre o puerpério e dicas para cuidar da sua saúde mental:
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
  <Text style={styles.nextLink}>Ir para Guia Parte 1 ➤</Text>
</TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfdfd" },
  header: { backgroundColor: "#5c1b54", padding: 16 },
  logo: { color: "#fff", fontWeight: "bold", fontSize: 20 },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  paragraph: { color: "#444" },
  highlight: { marginTop: 12, color: "#5c1b54", fontWeight: "600" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 16 },
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
  icon: { width: 40, height: 40, marginBottom: 8 },
  cardText: { textAlign: "center", fontSize: 12, color: "#333" },
  prevLink: { color: "#5c1b54", marginTop: 16, fontWeight: "500" },
});
