import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert, Dimensions, Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import {
  createGestacaoControle,
  updateGestacaoControle,
  GestacaoControleData,
} from '../services/gestacaoService';
import { getGestante, GestanteData } from '../services/gestanteService';
import { useAuthUser } from '../hooks/useAuthUser';
import MenuFlutuante from "../components/MenuFlutuante";



function removeUndefined(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export default function AtualizaControleGestacional() {
  const router = useRouter();
  const user = useAuthUser();

  const [step, setStep] = useState(1);

  const [dataMenstruacao, setDataMenstruacao] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [idadeGestacional, setIdadeGestacional] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(-screenWidth * 0.8)).current;
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);


  const [bebes, setBebes] = useState<{ nome: string; peso: string; comprimento: string }[]>([]);


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


  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const gestante: GestanteData | null = await getGestante(user.uid);
      if (!gestante) {
        console.log('Nenhuma gestante encontrada');
        return;
      }

      setIdadeGestacional(gestante.semanasGestacao?.toString() || '');
      setDataMenstruacao('');
      setDataConsulta('');
      setObservacoes('');

      const bebess = gestante.nomesBebes && gestante.nomesBebes.length > 0
          ? gestante.nomesBebes.map((nome: string) => ({
            nome,
            peso: '',
            comprimento: ''
          }))
          : [{ nome: 'Bebê 1', peso: '', comprimento: '' }];

      setBebes(bebess);
    };

    fetchData();
  }, [user]);

  const atualizarBebe = (index: number, campo: 'peso' | 'comprimento' | 'nome', valor: string) => {
    const novosBebes = [...bebes];
    novosBebes[index][campo] = valor;
    setBebes(novosBebes);
  };

  const salvarControle = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const uid = user.uid;

    const data: Partial<GestacaoControleData> = {
      uid,
      dataUltimaMenstruacao: dataMenstruacao || undefined,
      dataConsulta: dataConsulta || undefined,
      idadeGestacionalConsulta: idadeGestacional || undefined,
      observacoesConsulta: observacoes || undefined,
      bebes: bebes.map(b => ({
        nome: b.nome,
        peso: b.peso ? Number(b.peso) : undefined,
        comprimento: b.comprimento ? Number(b.comprimento) : undefined
      }))
    };

    try {
      await updateGestacaoControle(uid, removeUndefined(data));
      Alert.alert('Sucesso', 'Controle gestacional salvo com sucesso!');
      router.back();
    } catch {
      await createGestacaoControle(uid, removeUndefined(data) as GestacaoControleData);
      Alert.alert('Sucesso', 'Controle gestacional criado com sucesso!');
      router.back();
    }
  };

  return (
      <View style={{ flex: 1, backgroundColor: '#FFFAF8' }}>
        <Header onMenuPress={toggleMenu}/>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Controle Gestacional</Text>
          <Text style={styles.description}>
            Adicione algumas informações da sua última consulta médica, referentes
            a você e aos seus bebês:
          </Text>

          <View style={styles.formBox}>
            {step === 1 && (
                <>
                  <Text style={styles.label}>Data da última menstruação:</Text>
                  <TextInput
                      placeholder="__/__/____"
                      value={dataMenstruacao}
                      onChangeText={setDataMenstruacao}
                      style={styles.input}
                      placeholderTextColor="#A78BCA"
                  />

                  <Text style={styles.label}>
                    Data da consulta ou exame mais recente:
                  </Text>
                  <TextInput
                      placeholder="__/__/____"
                      value={dataConsulta}
                      onChangeText={setDataConsulta}
                      style={styles.input}
                      placeholderTextColor="#A78BCA"
                  />

                  {bebes.map((bebe, index) => (
                      <View key={index}>
                        <Text style={styles.subTitle}>
                          Informações do {bebe.nome || `Bebê ${index + 1}`}:
                        </Text>

                        <Text style={styles.label}>Nome:</Text>
                        <TextInput
                            placeholder={`Bebê ${index + 1}`}
                            value={bebe.nome}
                            onChangeText={(val) => atualizarBebe(index, 'nome', val)}
                            style={styles.input}
                            placeholderTextColor="#A78BCA"
                        />

                        <Text style={styles.label}>Peso:</Text>
                        <TextInput
                            placeholder="Em gramas ou quilos"
                            value={bebe.peso}
                            onChangeText={(val) => atualizarBebe(index, 'peso', val)}
                            style={styles.input}
                            placeholderTextColor="#A78BCA"
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Comprimento estimado:</Text>
                        <TextInput
                            placeholder="Em cm"
                            value={bebe.comprimento}
                            onChangeText={(val) => atualizarBebe(index, 'comprimento', val)}
                            style={styles.input}
                            placeholderTextColor="#A78BCA"
                            keyboardType="numeric"
                        />
                      </View>
                  ))}

                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => setStep(2)}
                  >
                    <Text style={styles.buttonText}>Continuar</Text>
                  </TouchableOpacity>
                </>
            )}

            {step === 2 && (
                <>
                  <Text style={styles.label}>
                    Idade gestacional no momento da consulta:
                  </Text>
                  <TextInput
                      placeholder="Semanas e dias"
                      value={idadeGestacional}
                      onChangeText={setIdadeGestacional}
                      style={styles.input}
                      placeholderTextColor="#A78BCA"
                  />

                  <Text style={styles.label}>Observações adicionais:</Text>
                  <TextInput
                      value={observacoes}
                      onChangeText={setObservacoes}
                      style={[
                        styles.input,
                        { height: 100, textAlignVertical: 'top' },
                      ]}
                      multiline
                      placeholder="Digite suas observações..."
                      placeholderTextColor="#A78BCA"
                  />

                  <TouchableOpacity style={styles.button} onPress={salvarControle}>
                    <Text style={styles.buttonText}>Salvar e Gerar</Text>
                  </TouchableOpacity>
                </>
            )}
          </View>
        </ScrollView>
        <Text>...</Text>
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
    padding: 20,
    backgroundColor: '#FEF9FA',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#5C1E72',
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: 'Manjari_700Bold',
  },
  description: {
    color: '#4B3B52',
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
    maxWidth: 320,
    fontFamily: 'Manjari_400Regular',
  },
  formBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
  },
  label: {
    fontWeight: '600',
    color: '#5C1E72',
    marginBottom: 6,
    marginTop: 12,
    fontFamily: 'Manjari_400Regular',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B21A8',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Manjari_700Bold',
  },
  input: {
    backgroundColor: '#FAF9FB',
    borderColor: '#9F7AEA',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#5C1E72',
    fontSize: 15,
    fontFamily: 'Manjari_400Regular',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#6B21A8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Manjari_700Bold',
  },
});