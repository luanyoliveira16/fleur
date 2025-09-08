import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createGestante, GestanteData } from "../services/gestanteService";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type Params = { uid?: string };

export default function CadastrarGestante() {
  const router = useRouter();
  const { uid } = useLocalSearchParams<Params>();
  const safeUid = uid || "TEST_UID";

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    semanasGestacao: "",
    tipoGestacao: "única",
    dataParto: "",
    condicoesSaude: "",
    hospital: "",
  });

  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dataParto, setDataParto] = useState<Date>();
  const [showPartoPicker, setShowPartoPicker] = useState(false);
  const [bebes, setBebes] = useState([""]);

  useEffect(() => {
    if (formData.tipoGestacao === "gemelar") {
      setBebes(prev => (prev.length < 2 ? ["", ""] : prev));
    } else {
      setBebes([""]);
    }
  }, [formData.tipoGestacao]);

  const handleChange = (name: string, value: string) =>
    setFormData({ ...formData, [name]: value });

  const handleBebeChange = (index: number, value: string) => {
    const novosBebes = [...bebes];
    novosBebes[index] = value;
    setBebes(novosBebes);
  };

  const adicionarBebe = () => setBebes([...bebes, ""]);

  const handleSubmit = async () => {
    if (!formData.nomeCompleto || !dataNascimento || !formData.semanasGestacao) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const tipoGestacaoLower = formData.tipoGestacao.toLowerCase() as "única" | "gemelar";
      const nomesBebes =
        tipoGestacaoLower === "gemelar" ? bebes.filter(b => b.trim() !== "") : [];

      const gestanteData: GestanteData = {
        nomeCompleto: formData.nomeCompleto,
        dataNascimento: dataNascimento.toISOString(),
        semanasGestacao: Number(formData.semanasGestacao),
        tipoGestacao: tipoGestacaoLower,
        nomesBebes,
        condicoesSaude: formData.condicoesSaude,
        hospital: formData.hospital,
        dataPrevistaParto: formData.dataParto,
      };

      await createGestante(safeUid, gestanteData);

      alert("Cadastro enviado! Dados salvos com sucesso!");
      router.replace("/HomeScreen");
    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar os dados.");
    }
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#fffaf8" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../assets/images/logoFleur.png")}
          style={styles.logoAbsolute}
        />

        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title}>Perfil da Gestante</ThemedText>
        </ThemedView>

        {/* Nome completo */}
        <ThemedView style={styles.inputField}>
          <ThemedText style={styles.label}>
            Nome completo: <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
            value={formData.nomeCompleto}
            onChangeText={text => handleChange("nomeCompleto", text)}
          />
        </ThemedView>

        {/* Data de nascimento */}
        <ThemedView style={styles.inputField}>
          <ThemedText style={styles.label}>
            Data de nascimento: <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <ThemedText style={[styles.dateText, { color: dataNascimento ? "#762C61" : "#999" }]}>
              {dataNascimento ? dataNascimento.toLocaleDateString() : "DD/MM/AAAA"}
            </ThemedText>
            <FontAwesome name="calendar" size={24} color="#762C61" />
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
        </ThemedView>

        {/* Semanas de gestação */}
        <ThemedView style={styles.inputField}>
          <ThemedText style={styles.label}>
            Semanas de gestação: <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ex.: 20"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={formData.semanasGestacao}
            onChangeText={text => handleChange("semanasGestacao", text)}
          />
        </ThemedView>

        {/* Tipo de gestação */}
        <ThemedView style={styles.inputField}>
          <ThemedText style={styles.label}>
            Tipo de gestação: <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <ThemedView style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => handleChange("tipoGestacao", "única")}
            >
              <ThemedView
                style={[
                  styles.radioCircle,
                  formData.tipoGestacao === "única" && styles.radioSelected,
                ]}
              />
              <ThemedText style={styles.radioLabel}>Única</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => handleChange("tipoGestacao", "gemelar")}
            >
              <ThemedView
                style={[
                  styles.radioCircle,
                  formData.tipoGestacao === "gemelar" && styles.radioSelected,
                ]}
              />
              <ThemedText style={styles.radioLabel}>Gemelar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Nomes dos bebês */}
        {(formData.tipoGestacao === "gemelar" || formData.tipoGestacao === "única") && (
          <ThemedView style={{ marginBottom: 15 }}>
            <ThemedText style={[styles.label, { marginBottom: 5 }]}>
              {formData.tipoGestacao === "gemelar" ? "Nome dos bebês:" : "Nome do bebê:"}
            </ThemedText>
            {bebes.map((bebe, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={
                  formData.tipoGestacao === "única"
                    ? "Nome do bebê"
                    : `Bebê ${index + 1}`
                }
                placeholderTextColor="#999"
                value={bebe}
                onChangeText={text => handleBebeChange(index, text)}
              />
            ))}
            {formData.tipoGestacao === "gemelar" && (
              <TouchableOpacity style={styles.addButton} onPress={adicionarBebe}>
                <ThemedText style={styles.addButtonText}>
                  + Adicionar outro bebê
                </ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>
        )}

        {/* Data prevista parto */}
        <ThemedView style={styles.inputField}>
          <ThemedText style={styles.label}>Data prevista para o parto:</ThemedText>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowPartoPicker(true)}
          >
            <ThemedText style={[styles.dateText, { color: dataParto ? "#762C61" : "#999" }]}>
              {dataParto ? dataParto.toLocaleDateString() : "DD/MM/AAAA"}
            </ThemedText>
            <FontAwesome name="calendar" size={24} color="#762C61" />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showPartoPicker}
            mode="date"
            minimumDate={new Date()}
            date={dataParto || new Date()}
            onConfirm={date => {
              setDataParto(date);
              setFormData({ ...formData, dataParto: date.toISOString() });
              setShowPartoPicker(false);
            }}
            onCancel={() => setShowPartoPicker(false)}
          />
        </ThemedView>

        {/* Condições saúde */}
        <ThemedView style={styles.inputField}>
          <ThemedText style={styles.label}>Condições de saúde relevantes:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ex.: diabetes gestacional, hipertensão..."
            placeholderTextColor="#999"
            value={formData.condicoesSaude}
            onChangeText={text => handleChange("condicoesSaude", text)}
          />
        </ThemedView>

        {/* Hospital */}
        <ThemedView style={styles.inputField}>
          <ThemedText style={styles.label}>Hospital:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Maternidade escolhida/desejada"
            placeholderTextColor="#999"
            value={formData.hospital}
            onChangeText={text => handleChange("hospital", text)}
          />
        </ThemedView>

        {/* Botão Próximo */}
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
            <ThemedText style={styles.buttonText}>Próximo</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 40,
    paddingTop: 100,
    paddingBottom: 80,
    backgroundColor: "#fffaf8",
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#762C61",
    paddingLeft: 30,
    backgroundColor: "#fffaf8",
  },
  logoAbsolute: {
    width: 80,
    height: 90,
    resizeMode: "contain",
    position: "absolute",
    top: 70,
    right: 10,
  },
  inputField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#762C61",
    marginBottom: 5,
    backgroundColor: "#fffaf8",
  },
  required: {
    color: "#ff0000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d8c4ce",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#762C61",
    backgroundColor: "#fff",
    marginBottom: 8,
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
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
    backgroundColor: "#fff",
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  dateText: {
    fontSize: 16,
    backgroundColor: "#fffaf8",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#762C61",
    paddingVertical: 12,
    paddingHorizontal: 30,
    ...Platform.select({
      android: {
        elevation: 0, // Remove listra preta no botão
      },
      ios: {
        shadowColor: "transparent",
      },
    }),
  },
  buttonText: {
    color: "#f8f4f0",
    fontWeight: "bold",
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#762C61",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: "#762C61",
  },
  radioLabel: {
    fontSize: 16,
    color: "#762C61",
  },
  addButton: {
    marginTop: 5,
    marginBottom: 15,
    alignSelf: "flex-end",
  },
  addButtonText: {
    color: "#a0a0a0",
    fontWeight: "bold",
  },
});



