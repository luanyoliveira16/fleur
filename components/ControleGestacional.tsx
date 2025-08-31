import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Header from './Header';

import babyImage1 from '../assets/images/baby_left.png';
import babyImage2 from '../assets/images/baby_right.png';

import iconComprimento from '../assets/images/ruler.png';
import iconPeso from '../assets/images/weight.png';
import iconInfo from '../assets/images/info.png';

import { db } from '../services/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { GestacaoControleData } from '../services/gestacaoService';

const imagensBebes = [babyImage1, babyImage2];

const UID_GESTANTE = "gm8UTKShHYZnbAQWMS15dEIUtJG2";

const ControleGestacional = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [controle, setControle] = useState<GestacaoControleData | null>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'gestacaoControle', UID_GESTANTE), (docSnap) => {
            if (docSnap.exists()) {
                setControle(docSnap.data() as GestacaoControleData);
            } else {
                setControle(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#762C61" />
            </View>
        );
    }

    if (!controle) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Nenhum dado encontrado.</Text>
            </View>
        );
    }

    // separa idade gestacional em semanas e dias
    let semanas = 0, dias = 0;
    if (controle.idadeGestacionalConsulta) {
        const match = controle.idadeGestacionalConsulta.match(/(\d+)\s*semanas?\s*e\s*(\d+)\s*dias?/);
        if (match) {
            semanas = Number(match[1]);
            dias = Number(match[2]);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFAF8' }}>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Controle Gestacional</Text>

                <Text style={[styles.subtitle, styles.alignLeft]}>
                    {controle.dataConsulta || '---'} – {semanas || '---'} semanas e {dias || '---'} dias
                </Text>

                <Text style={[styles.sectionTitle, styles.alignLeft]}>
                    Seus bebês nesta semana:
                </Text>

                <View
                    style={[
                        styles.babyImageContainer,
                        controle.bebes?.length === 2 ? styles.babyImageTwo : styles.babyImageMultiple,
                    ]}
                >
                    {controle.bebes?.map((bebe, i) => (
                        <View key={i} style={styles.babyCircle}>
                            <Image
                                source={imagensBebes[i % imagensBebes.length]}
                                style={styles.babyImage}
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </View>

                <View
                    style={[
                        styles.cardsContainer,
                        controle.bebes?.length === 2 ? styles.cardsTwo : null,
                    ]}
                >
                    {controle.bebes?.map((bebe, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardTitle}>{bebe.nome || "---"}</Text>

                            <View style={styles.infoRow}>
                                <Image source={iconComprimento} style={styles.iconImage} />
                                <Text style={styles.infoText}>
                                    Comprimento:{"\n"}
                                    <Text style={styles.infoHighlight}>
                                        {bebe.comprimento ? `${bebe.comprimento} centímetros` : "---"}
                                    </Text>
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Image source={iconPeso} style={styles.iconImage} />
                                <Text style={styles.infoText}>
                                    Peso:{"\n"}
                                    <Text style={styles.infoHighlight}>
                                        {bebe.peso ? `${bebe.peso} quilos` : "---"}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.card}>
                    <View style={styles.infoRow}>
                        <Image source={iconInfo} style={styles.iconImage} />
                        <Text style={styles.infoTextBold}>Informações adicionais:</Text>
                    </View>
                    <Text style={styles.additionalText}>{controle.observacoesConsulta || "---"}</Text>
                </View>

                <Text style={styles.warning}>
                    As medidas são aproximadas e podem variar dentro da faixa normal.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/(tabs)/AtualizaControleGestacional')}
                >
                    <Text style={styles.buttonText}>Atualizar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    alignLeft: {
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#762C61',
        marginBottom: 8,
    },
    subtitle: {
        color: '#616161',
    },
    sectionTitle: {
        color: '#762C61',
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 12,
    },
    babyImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    babyImageTwo: {
        gap: 32,
    },
    babyImageMultiple: {
        flexWrap: 'wrap',
        gap: 16,
    },
    babyCircle: {
        width: 93,
        height: 87,
        backgroundColor: '#FBCFE8',
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        overflow: 'hidden',
    },
    babyImage: {
        width: '100%',
        height: '100%',
    },
    cardsContainer: {
        width: '100%',
        maxWidth: 400,
        flexDirection: 'column',
        gap: 16,
        marginBottom: 16,
    },
    cardsTwo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        flex: 1,
        minWidth: '48%',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 6,
    },
    iconImage: {
        width: 20,
        height: 20,
    },
    infoText: {
        fontWeight: '700',
        color: '#616161',
        fontSize: 14,
        fontFamily: 'Manjari',
    },
    infoTextBold: {
        fontWeight: '600',
        color: '#1F2937',
    },
    infoHighlight: {
        color: '#762C61',
        fontSize: 11,
        fontWeight: '400',
        marginTop: 2,
    },
    additionalText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    warning: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 12,
    },
    button: {
        backgroundColor: '#762C61',
        width: 150,
        height: 43,
        borderRadius: 8,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default ControleGestacional;
