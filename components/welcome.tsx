import { Image } from 'expo-image';
import {StyleSheet } from 'react-native';

import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  return (
 <View style={styles.container}>

      {/*Logo*/}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/icon flor.jpg')} 
          style={styles.logo}
          accessibilityLabel="Logo Fleur"
        />
      </View>

      {/* Boas-vindas */}
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Boas vindas!</Text>
        <Text style={styles.subtitleText}>Vamos começar?</Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/create-account')}
          accessibilityLabel="Cadastrar"
        >
          <Text style={styles.primaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/login')}
          accessibilityLabel="entrar na conta"
        >
          <Text style={styles.secondaryButtonText}>Entrar na conta</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    position:  'absolute',
    top: 40,
    left: 300,
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  textContainer: {
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '300',
    color: '#762C61',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#762C61',
  },
  buttonContainer: {
    width: '50%',
  },
  primaryButton: {
    backgroundColor: '#762C61',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#762C61',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#762C61',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
