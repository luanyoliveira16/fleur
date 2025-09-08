import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { colors } from "../constants/colorApp";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import "../config/calendarLocale";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

// Função para formatar a data no estilo brasileiro com dia da semana
function formatarDataCompleta(data: string): string {
  const dateObj = parse(data, "yyyy-MM-dd", new Date());
  const formatado = format(dateObj, "EEEE, dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  return formatado.charAt(0).toUpperCase() + formatado.slice(1);
}

export default function Agenda() {
  const router = useRouter();
  const [dataSelecionada, setDataSelecionada] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const [eventos, setEventos] = useState<Record<string, string[]>>({
    "2025-09-15": ["Consulta com obstetra às 10h"],
    "2025-09-24": ["Ultrassom morfológico às 14h"],
  });

  const adicionarEvento = () => {
    Alert.prompt("Novo Evento", "Digite o compromisso:", (texto) => {
      if (texto) {
        setEventos((prev) => ({
          ...prev,
          [dataSelecionada]: [...(prev[dataSelecionada] || []), texto],
        }));
      }
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        style={{
          flex: 1,
          padding: 20,
          marginTop: 30,
          backgroundColor: colors.backgroundTela,
        }}
      >
        {/* Botão de voltar */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
        >
          <Feather name="arrow-left" size={24} color={colors.purple} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.purple,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Sua Agenda
        </Text>

        <Calendar
          onDayPress={(day) => setDataSelecionada(day.dateString)}
          markedDates={{
            [dataSelecionada]: {
              selected: true,
              selectedColor: colors.purple,
            },
          }}
          theme={{
            todayTextColor: colors.purple,
            arrowColor: colors.purple,
          }}
        />

        <View style={{ marginTop: 20, flex: 1, marginBottom: 50 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
            Compromissos em {formatarDataCompleta(dataSelecionada)}:
          </Text>

          <FlatList
            data={eventos[dataSelecionada] || []}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                {/* Bolinha */}
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: colors.purple,
                    marginRight: 10,
                  }}
                />

                {/* Texto do compromisso */}
                <Text style={{ color: colors.purple, fontSize: 16 }}>
                  {item}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ color: colors.gray[300] }}>
                Nenhum compromisso para este dia.
              </Text>
            }
          />

          <TouchableOpacity
            onPress={adicionarEvento}
            style={{
              backgroundColor: colors.purple,
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              Adicionar Evento
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
