import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createGestante } from "../services/gestanteService";

type Params = {
  uid: string;
};

export default function CadastrarGestante() {
  const router = useRouter();
  const { uid } = useLocalSearchParams<Params>(); 

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    semanasGestacao: "",
    tipoGestacao: "única",
    dataParto: "",
    condicoesSaude: "",
    hospital: "",
  });

  const [dataNascimento, setDataNascimento] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dataParto, setDataParto] = useState<Date | undefined>();
  const [showPartoPicker, setShowPartoPicker] = useState(false);

  const [bebes, setBebes] = useState(formData.tipoGestacao === "gemelar" ? ["", ""] : [""]);

  useEffect(() => {
    if (formData.tipoGestacao === "gemelar") {
      setBebes(prev => (prev.length < 2 ? ["", ""] : prev));
    } else {
      setBebes([""]);
    }
  }, [formData.tipoGestacao]);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleBebeChange = (index: number, value: string) => {
    const novosBebes = [...bebes];
    novosBebes[index] = value;
    setBebes(novosBebes);
  };

  const adicionarBebe = () => {
    setBebes([...bebes, ""]);
  };

  const handleSubmit = async () => {
    if (!uid) {
      Alert.alert("Erro", "UID do usuário não encontrado.");
      return;
    }

    if (!formData.nomeCompleto || !dataNascimento || !formData.semanasGestacao) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    const semanas = Number(formData.semanasGestacao);
    if (isNaN(semanas) || semanas <= 0) {
      Alert.alert("Atenção", "Informe um número válido de semanas de gestação.");
      return;
    }

    try {
      const tipoGestacaoLower = formData.tipoGestacao.toLowerCase() as "única" | "gemelar";
      const nomesBebes =
        tipoGestacaoLower === "gemelar" ? bebes.filter(b => b.trim() !== "") : [];

      await createGestante(uid, {
        nomeCompleto: formData.nomeCompleto,
        dataNascimento: dataNascimento.toISOString(),
        semanasGestacao: Number(formData.semanasGestacao),
        tipoGestacao: tipoGestacaoLower,
        nomesBebes,
        condicoesSaude: formData.condicoesSaude,
        hospital: formData.hospital,
        dataPrevistaParto: formData.dataParto,
      });

      Alert.alert("Cadastro enviado!", "Dados salvos com sucesso!");

      router.replace("/HomeScreen");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/logoFleur.png")}
        style={styles.logoAbsolute}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Perfil da Gestante</Text>
      </View>

      {/* Nome completo */}
      <View style={styles.inputField}>
        <Text style={styles.label}>
          Nome completo: <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#999"
          value={formData.nomeCompleto}
          onChangeText={text => handleChange("nomeCompleto", text)}
        />
      </View>

      {/* Data de nascimento */}
      <View style={styles.inputField}>
        <Text style={styles.label}>
          Data de nascimento: <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: dataNascimento ? "#333" : "#999" }}>
            {dataNascimento ? dataNascimento.toLocaleDateString() : "DD/MM/AAAA"}
          </Text>
          <FontAwesome
            name="calendar"
            size={24}
            color="#762c61"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          maximumDate={new Date()}
          date={dataNascimento || new Date()}
          onConfirm={date => {
            setDataNascimento(date);
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
        />
      </View>

      {/* Semanas de gestação */}
      <View style={styles.inputField}>
        <Text style={styles.label}>Semanas de gestação: <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: 20"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={formData.semanasGestacao}
          onChangeText={(text) => handleChange("semanasGestacao", text)}
        />
      </View>

      {/* Tipo de gestação */}
      <View style={styles.inputField}>
        <Text style={styles.label}>Tipo de gestação: <Text style={styles.required}>*</Text></Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity style={styles.radioOption} onPress={() => handleChange("tipoGestacao", "única")}>
            <View style={[styles.radioCircle, formData.tipoGestacao === "única" && styles.radioSelected]} />
            <Text style={styles.radioLabel}>Única</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioOption} onPress={() => handleChange("tipoGestacao", "gemelar")}>
            <View style={[styles.radioCircle, formData.tipoGestacao === "gemelar" && styles.radioSelected]} />
            <Text style={styles.radioLabel}>Gemelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nomes dos bebês */}
      {(formData.tipoGestacao === "gemelar" || formData.tipoGestacao === "única") && (
        <View style={{ marginBottom: 15 }}>
          <Text style={[styles.label, { marginBottom: 5 }]}>
            {formData.tipoGestacao === "gemelar" ? "Nome dos bebês:" : "Nome do bebê:"}
          </Text>

          {bebes.map((bebe, index) => {
            const placeholderText =
              formData.tipoGestacao === "única" ? "Nome do bebê" : `Bebê ${index + 1}`;

            return (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={placeholderText}
                placeholderTextColor="#999"
                value={bebe}
                onChangeText={(text) => handleBebeChange(index, text)}
              />
            );
          })}

          {formData.tipoGestacao === "gemelar" && (
            <TouchableOpacity style={styles.addButton} onPress={adicionarBebe}>
              <Text style={styles.addButtonText}>+ Adicionar outro bebê</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Data prevista para o parto */}
      <View style={styles.inputField}>
        <Text style={styles.label}>Data prevista para o parto:</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowPartoPicker(true)}>
          <Text style={{ color: dataParto ? "#333" : "#999" }}>
            {dataParto ? dataParto.toLocaleDateString() : "DD/MM/AAAA"}
          </Text>
          <FontAwesome name="calendar" size={24} color="#762c61" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={showPartoPicker}
          mode="date"
          minimumDate={new Date()}
          date={dataParto || new Date()}
          onConfirm={(date) => { 
            setDataParto(date); 
            setFormData({ ...formData, dataParto: date.toISOString() }); 
            setShowPartoPicker(false); 
          }}
          onCancel={() => setShowPartoPicker(false)}
        />
      </View>

      {/* Condições de saúde */}
      <View style={styles.inputField}>
        <Text style={styles.label}>Condições de saúde relevantes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: diabetes gestacional, hipertensão..."
          placeholderTextColor="#999"
          value={formData.condicoesSaude}
          onChangeText={(text) => handleChange("condicoesSaude", text)}
        />
      </View>

      {/* Hospital */}
      <View style={styles.inputField}>
        <Text style={styles.label}>Hospital:</Text>
        <TextInput
          style={styles.input}
          placeholder="Maternidade escolhida/desejada"
          placeholderTextColor="#999"
          value={formData.hospital}
          onChangeText={(text) => handleChange("hospital", text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 40,
    paddingTop: 100,
    paddingBottom: 80,
    backgroundColor: "#fffaf8",
    justifyContent: "flex-start",
  },
  titleContainer: { marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: "#762c61", paddingLeft: 30 },
  logoAbsolute: { width: 80, height: 90, resizeMode: "contain", position: "absolute", top: 70, right: 10 },
  inputField: { marginBottom: 15 },
  label: { fontSize: 16, color: "#762c61", marginBottom: 5 },
  required: { color: "#ff0000" },
  input: {
    borderWidth: 1,
    borderColor: "#d8c4ce",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "transparent",
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d8c4ce",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  buttonContainer: { alignItems: "center", marginTop: 20, marginBottom: 20 },
  button: { borderRadius: 8, backgroundColor: "#762c61", paddingVertical: 12, paddingHorizontal: 30 },
  buttonText: { color: "#f8f4f0", fontWeight: "bold", fontSize: 16 },
  radioContainer: { flexDirection: "row", gap: 20 },
  radioOption: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioSelected: { backgroundColor: "#000" },
  radioLabel: { fontSize: 16, color: "#000" },
  addButton: { marginTop: 5, marginBottom: 15, alignSelf: "flex-end" },
  addButtonText: { color: "#a0a0a0", fontWeight: "bold" },
});
