import React, { useState } from 'react';
import { Image } from 'react-native';

import {
  Alert,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

// Validação
const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas não coincidem')
    .required('Campo obrigatório'),
});

export default function CreateAccountScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const errorColor = '#ff3b30';
  const placeholderColor = '#999';
  const borderColor ='#DDDDDD';

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);

        Alert.alert('Conta criada com sucesso!');
        
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente mais tarde.');
    } finally {
        setLoading(false);
    }
};

  return (
    <ThemedView style={styles.container}>
      <Image
    source={require('../assets/images/icon_flor.jpg')}
    style={styles.logo} 
    resizeMode="contain" 
  />
      <ThemedText type="title" style={styles.title}>
        Criar conta
      </ThemedText>
      <ThemedText type="default" style={styles.subtitle}>
        Faça parte do Fleur! Uma comunidade de apoio à maternidade de gestantes num geral.{'\n'}
        Aqui você vai ter muita troca, conhecimento e aconchego para você e sua rede de apoio.
      </ThemedText>

      {/* Campo E-mail */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <ThemedView style={styles.inputWrapper}>
              <FontAwesome
              name="user-o"
              size={18}
              color="#762C61"
              style={styles.iconRight}
              />

              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#762C61"
                style={[styles.input, { borderColor: errors.email ? errorColor : borderColor,
                  
                }]}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            {errors.email && (
              <ThemedText style={{ color: errorColor, fontSize: 12, marginTop: 4}}>
                {errors.email.message}
                  </ThemedText>
                  )}
                </ThemedView>
          </>
        )}
      />

      {/* Campo Senha */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
          <ThemedView style={styles.inputWrapper}>
  <TextInput
    placeholder="Senha"
    placeholderTextColor="#762C61"
    style={[styles.input, { borderColor: errors.password ? errorColor : borderColor }]}
    secureTextEntry={!showPassword}
    value={value}
    onChangeText={onChange}
  />
  <TouchableOpacity
    onPress={() => setShowPassword(!showPassword)}
    style={styles.iconRightTouchable} 
  >
    <MaterialIcons
  name={showConfirmPassword ? 'visibility-off' : 'visibility'}
  size={22}
  color="#762C61"
  style={styles.iconRight}
/>

  </TouchableOpacity>

            {errors.password && (
              <ThemedText style={{ color: errorColor, fontSize: 12, marginTop: 4 }}>
                {errors.password.message}
                </ThemedText>
                  )}
                </ThemedView>
          </>
        )}
      />
      {/* Campo Confirmar Senha */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <>
            <ThemedView style={styles.inputWrapper}>
              <TextInput
                placeholder="Confirmar Senha"
                placeholderTextColor="#762C61"
                style={[styles.input, { borderColor: errors.confirmPassword ? errorColor : borderColor }]}
                secureTextEntry={!showConfirmPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}
    style={styles.iconRightTouchable} 
  >
                <MaterialIcons
                name={showPassword ? 'visibility-off' : 'visibility'}
                size={22}
                color="#762C61"
                style={styles.iconRight}
                />

              </TouchableOpacity>
            
            {errors.confirmPassword && (
              <ThemedText style={{ color: errorColor, fontSize: 12, marginTop: 4 }}>
                {errors.confirmPassword.message}
                </ThemedText>
                  )}
                </ThemedView>
          </>
        )}
      />

      {/* Botão */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? 'Criando...' : 'Próximo'}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
    title: {
    marginBottom: 14,
    color: '#762C61',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6D6D6D',
    marginBottom: 25,
  },
  inputWrapper: {
 width: '100%',
    maxWidth: 400,
    marginBottom: 20,
    flexDirection: 'row', // Adicionado para alinhar o TextInput e o ícone
    alignItems: 'center', // Adicionado para alinhar verticalmente
    borderWidth: 1.5,
    borderRadius: 24,
    borderColor: '#DDDDDD', // Cor padrão da borda
    paddingLeft: 44,
    paddingRight: 44,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 4,
        },
        android: {
            elevation: 2,
        },
    }),
}, 
input: {
    flex: 1, 
    height: 48,
    color: '#762C61',
  },
iconLeft: {
    position: 'absolute',
    left: 14,
},
iconRight: {
    position: 'absolute',
    right: 14,
},
errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
},
  button: {
    backgroundColor: '#762C61',
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 12,
    marginBottom: 8,   
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#AA86A8',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  iconRightTouchable: {
  position: 'absolute',
  right: 1,
  top: '20%',
  transform: [{ translateY: -11 }], 
  padding: 4, 
  zIndex: 1,
},
logo: {
    width: 100,
    height: 80,
    marginBottom: 1,
  },
});
