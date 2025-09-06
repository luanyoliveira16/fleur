// colocar em icones todos os conteudos do app 

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Conteudo() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Página Conteúdo</Text>
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