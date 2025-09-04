import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/Header"; 

export default function GuidePart1() {
  const router = useRouter();

  return (


     <View style={styles.container}>
      <Header /> {/* ✅ Usando o componente Header importado */}
      <ScrollView>

      <View style={styles.content}>
        <Text style={styles.title}>Guia da Gestante</Text>
        <Text style={styles.paragraph}>
          Conhecer seus direitos e se informar sobre todas as possibilidades é
          essencial para uma gestação mais segura e acolhedora. Este guia reúne orientações importantes sobre saúde, apoio legal e emocional. Clique nas opções abaixo e saiba mais
        </Text>

        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Acompanhante no Parto</Text>
            <Text style={styles.cardText}>
              Você sabia que a gestante tem direito a um acompanhante no momento do parto?
            </Text>
          </View>
          <Image source={require("../assets/images/acompanhante.png")} style={styles.cardImg} />
        </View>

        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Salário Maternidade</Text>
            <Text style={styles.cardText}>
              Muitas mães não sabem mas têm direito ao salário maternidade. Confira se tem direito.
            </Text>
          </View>
          <Image source={require("../assets/images/salario.png")} style={styles.cardImg} />
        </View>

        

        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Mãe Paulistana</Text>
            <Text style={styles.cardText}>
              Gestantes de São Paulo têm direito ao Programa Mãe Paulistana. Saiba como acessar!
            </Text>
          </View>
          <Image source={require("../assets/images/mae.png")} style={styles.cardImg} />
        </View>

        <TouchableOpacity onPress={() => router.push("/mental-health")}>
  <Text style={styles.prevLink}>⬅ Voltar para Saúde Mental</Text>
</TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/guide2")}>
          <Text style={styles.nextLink}>➤ Próxima página</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
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
  nextLink: { color: "#5c1b54", textAlign: "right", marginTop: 8, fontWeight: "500" },
});
