import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Configuracoes() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Página Configurações</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold'
    }
});