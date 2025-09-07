import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { createGestante } from "../services/gestanteService";

type Params = {
  uid: string;
};

export default function CadastrarGestante() {
  const router = useRouter();
  const { uid } = useLocalSearchParams<Params>(); // <- pega UID da rota

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    semanasGestacao: "",
    tipoGestacao: "única",
    condicoesSaude: "",
    hospital: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!uid) {
      Alert.alert("Erro", "UID do usuário não encontrado.");
      return;
    }

    if (!formData.nomeCompleto || !formData.semanasGestacao) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await createGestante(uid, {
        nomeCompleto: formData.nomeCompleto,
        semanasGestacao: Number(formData.semanasGestacao),
        tipoGestacao: formData.tipoGestacao,
        condicoesSaude: formData.condicoesSaude,
        hospital: formData.hospital,
      });

      Alert.alert("Sucesso!", "Dados da gestante salvos.");
      router.replace("/HomeScreen"); // volta para home ou outra tela
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro da Gestante</Text>

      <TextInput
        placeholder="Nome completo"
        value={formData.nomeCompleto}
        onChangeText={(text) => handleChange("nomeCompleto", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Semanas de gestação"
        keyboardType="numeric"
        value={formData.semanasGestacao}
        onChangeText={(text) => handleChange("semanasGestacao", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Tipo de gestação (única/gemelar)"
        value={formData.tipoGestacao}
        onChangeText={(text) => handleChange("tipoGestacao", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Condições de saúde"
        value={formData.condicoesSaude}
        onChangeText={(text) => handleChange("condicoesSaude", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Hospital"
        value={formData.hospital}
        onChangeText={(text) => handleChange("hospital", text)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#762C61",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#762C61",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});


