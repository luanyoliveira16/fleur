import { FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";


export default function Configuracoes() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fffaf8" }}>
          <Header />

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      {/* Conta */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="account-circle" size={28} color="#762c61" />
          <Text style={styles.sectionTitle}>Conta</Text>
        </View>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Alterar dados da Gestante</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>E-mail cadastrado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Atualizar senha</Text>
        </TouchableOpacity>
      </View>

      {/* Preferências do Aplicativo */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="notifications" size={26} color="#762c61" />
          <Text style={styles.sectionTitle}>Preferências do Aplicativo</Text>
        </View>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Tema</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Acessibilidade</Text>
        </TouchableOpacity>
      </View>

      {/* Gestação Atual */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome5 name="baby" size={24} color="#762c61" />
          <Text style={styles.sectionTitle}>Gestação Atual</Text>
        </View>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Interrupção da gestação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Excluir dados da gestação atual</Text>
        </TouchableOpacity>
      </View>

      {/* Central de Ajuda */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="help-circle" size={26} color="#762c61" />
          <Text style={styles.sectionTitle}>Central de Ajuda</Text>
        </View>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Sobre o aplicativo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Falar com o suporte</Text>
        </TouchableOpacity>
      </View>

      {/* Sair */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="sign-out" size={26} color="#762c61" />
          <Text style={styles.sectionTitle}>Sair do aplicativo</Text>
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 40,
    paddingTop: 30,
    backgroundColor: "#fffaf8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#762c61",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#762c61",
  },
  item: {
    paddingLeft: 35,
    paddingVertical: 6,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});
