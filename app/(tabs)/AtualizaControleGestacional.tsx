import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { createGestacaoControle, updateGestacaoControle, GestacaoControleData } from '../../services/gestacaoService';

export default function AtualizaControleGestacional() {
    const router = useRouter();
    const [etapa, setEtapa] = useState(1);

    const [dataMenstruacao, setDataMenstruacao] = useState('');
    const [dataConsulta, setDataConsulta] = useState('');
    const [pesoJoao, setPesoJoao] = useState('');
    const [compJoao, setCompJoao] = useState('');
    const [pesoMaria, setPesoMaria] = useState('');
    const [compMaria, setCompMaria] = useState('');
    const [idadeGestacional, setIdadeGestacional] = useState('');
    const [observacoes, setObservacoes] = useState('');

    async function salvarControle() {
        try {
            // UID fixo da gestante
            const uid = "gm8UTKShHYZnbAQWMS15dEIUtJG2";

            const data: GestacaoControleData = {
                uid,
                dataUltimaMenstruacao: dataMenstruacao,
                dataConsulta,
                idadeGestacionalConsulta: idadeGestacional,
                observacoesConsulta: observacoes,
                bebes: [
                    { nome: "João", peso: Number(pesoJoao), comprimento: Number(compJoao) },
                    { nome: "Maria", peso: Number(pesoMaria), comprimento: Number(compMaria) },
                ],
            };

            // tenta atualizar, se não existir cria
            await updateGestacaoControle(uid, data).catch(async () => {
                await createGestacaoControle(uid, data);
            });

            Alert.alert("Sucesso", "Controle gestacional salvo com sucesso!");
            router.back();
        } catch (err) {
            console.error(err);
            Alert.alert("Erro", "Não foi possível salvar os dados.");
        }
    }

    const renderEtapa1 = () => (
        <>
            <Text style={styles.label}>Data da última menstruação:</Text>
            <TextInput
                placeholder="__/__/____"
                value={dataMenstruacao}
                onChangeText={setDataMenstruacao}
                style={styles.input}
                placeholderTextColor="#A78BCA"
            />

            <Text style={styles.label}>Data da consulta ou exame mais recente:</Text>
            <TextInput
                placeholder="__/__/____"
                value={dataConsulta}
                onChangeText={setDataConsulta}
                style={styles.input}
                placeholderTextColor="#A78BCA"
            />

            <Text style={[styles.label, { color: '#6B21A8' }]}>Informações do João:</Text>
            <Text style={styles.label}>Peso:</Text>
            <TextInput
                placeholder="Em gramas ou quilos"
                value={pesoJoao}
                onChangeText={setPesoJoao}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#A78BCA"
            />
            <Text style={styles.label}>Comprimento estimado:</Text>
            <TextInput
                placeholder="Em cm"
                value={compJoao}
                onChangeText={setCompJoao}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#A78BCA"
            />

            <Text style={[styles.label, { color: '#6B21A8', marginTop: 16 }]}>Informações da Maria:</Text>
            <Text style={styles.label}>Peso:</Text>
            <TextInput
                placeholder="Em gramas ou quilos"
                value={pesoMaria}
                onChangeText={setPesoMaria}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#A78BCA"
            />
            <Text style={styles.label}>Comprimento estimado:</Text>
            <TextInput
                placeholder="Em cm"
                value={compMaria}
                onChangeText={setCompMaria}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#A78BCA"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => setEtapa(2)}
            >
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
        </>
    );

    const renderEtapa2 = () => (
        <>
            <Text style={styles.label}>Idade gestacional no momento da consulta:</Text>
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
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                multiline
                placeholderTextColor="#A78BCA"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={salvarControle}
            >
                <Text style={styles.buttonText}>Salvar e Gerar</Text>
            </TouchableOpacity>
        </>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFAF8' }}>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Controle Gestacional</Text>
                <Text style={styles.description}>
                    Adicione algumas informações da sua última consulta médica, referentes a você e aos seus bebês:
                </Text>

                <View style={styles.formBox}>
                    {etapa === 1 ? renderEtapa1() : renderEtapa2()}
                </View>
            </ScrollView>
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
        width: 180,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '700',
        fontFamily: 'Manjari_700Bold',
    },
});
