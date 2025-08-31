import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header"; 

export default function GuidePart2() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Fleur</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Guia da Gestante</Text>
        <Text style={styles.paragraph}>
          É importante conhecer seus direitos e saber o que é legalmente permitido durante a gestação.
          Veja abaixo dois temas importantes:
        </Text>

        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Aborto legal no Brasil</Text>
            <Text style={styles.cardText}>
              Entenda em quais casos o aborto é permitido por lei e quais os seus direitos.
            </Text>
          </View>
          <Image source={require("../assets/images/aborto-legal.png")} style={styles.cardImg} />
        </View>

        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Aborto espontâneo</Text>
            <Text style={styles.cardText}>
              Saiba como lidar emocional e fisicamente com a perda gestacional.
            </Text>
          </View>
          <Image source={require("../assets/images/aborto-espontaneo.png")} style={styles.cardImg} />
        </View>

        <TouchableOpacity onPress={() => router.push("/guide1")}>
          <Text style={styles.prevLink}>⬅ Página anterior</Text>
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
  paragraph: { color: "#444", marginBottom: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 12,
  },
  cardTitle: { fontWeight: "600", marginBottom: 4 },
  cardText: { fontSize: 12, color: "#333" },
  cardImg: { width: 60, height: 60, borderRadius: 8, marginLeft: 10 },
  prevLink: { color: "#5c1b54", marginTop: 8, fontWeight: "500" },
  nextLink: { color: "#5c1b54", marginTop: 8, fontWeight: "500", textAlign: "right" },
});