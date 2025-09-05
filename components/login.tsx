import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator, 
    Alert,
    Linking 
} from 'react-native';
import { useRouter } from 'expo-router';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { Image } from 'react-native';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState<string>(''); 
    const [password, setPassword] = useState<string>('');
    const [secureText, setSecureText] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const openLink = async (url: string): Promise<void> => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        Alert.alert('Erro', 'Não foi possível abrir o link.');
    }
};

const router = useRouter();

const handleLogin = async (): Promise<void> => {
    setError('');
    if (!username.trim() || !password.trim()) {
        setError('Preencha usuário e senha corretamente.');
        return;
    }

    setLoading(true);

    try {
        await signInWithEmailAndPassword(auth, username, password);
        setLoading(false);
        Alert.alert('Sucesso', 'Login realizado com sucesso.');
        router.push('/explore');
    } catch (error) {
        setLoading(false);
        setError('Usuário ou senha inválidos.');
    }
};

return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' }}>

<View style={{ alignItems: 'center', marginBottom: 32 }}>
    <Image
    source={require('@/assets/images/icon flor.jpg')}  // 
    style={{ width: 300, height: 80, resizeMode: 'contain' }} 
    />
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#762C61', marginTop: 12 }}>
            Acesse sua conta
        </Text>
        </View>
        
        <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 20,
        marginBottom: 12,
        paddingHorizontal: 12
        }}>
        <TextInput
        placeholder="Nome do usuário"
        placeholderTextColor="#762C61"
        value={username}
        onChangeText={setUsername}
        style={{ flex: 1, paddingVertical: 12 }}
        autoCapitalize="none"
        accessibilityLabel="Campo Nome do Usuário"
        />
        <FontAwesome name="user-o" size={18} color="#7b2e56" />
        </View>

      {/* Campo Senha */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 20,
        marginBottom: 12,
        paddingHorizontal: 12
        }}>

        <TextInput
        placeholder="Senha"
        placeholderTextColor="#762C61"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        style={{ flex: 1, paddingVertical: 12 }}
        accessibilityLabel="Campo Senha"
        />

        <TouchableOpacity
        onPress={() => setSecureText(prev => !prev)}
        accessible
        accessibilityLabel="Mostrar ou ocultar senha"
        >
            <MaterialIcons name={secureText ? "visibility-off" : "visibility"} size={20} color="#762C61" />
        </TouchableOpacity>
        </View>

      {/* Mensagem de erro */}
      {error ? (
        <Text style={{ color: 'red', marginBottom: 12, fontSize: 14 }}>{error}</Text>
        ) : null}

      {/* Botão Entrar */}
      <TouchableOpacity
        style={{
            backgroundColor: '#762C61',
            paddingVertical: 16,
            paddingHorizontal: 60,
            borderRadius: 12,
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 16

        }}
        onPress={handleLogin}
        disabled={loading}
        accessible
        accessibilityLabel="Botão Entrar"
        >
        {loading ? (
            <ActivityIndicator color="#fff" />
        ) : (
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Entrar</Text>
        )}
        </TouchableOpacity>

      {/* Link Criar Conta */}

<TouchableOpacity
onPress={() => router.push('/create-account')}accessible
accessibilityLabel="Criar Conta"
>
    <Text style={{ color: '#762C61', textAlign: 'center', fontWeight: 'bold' }}>
    Criar Conta
    </Text>
</TouchableOpacity>

      {/* Login Social */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24
      }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
        <Text style={{ marginHorizontal: 8, color: '#999' }}>ou</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

        {/* Botão Facebook */}
        <TouchableOpacity
        onPress={() => openLink('https://www.facebook.com')}
        style={{
            backgroundColor: '#762C61',
            width: 45,
            height: 40,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 8
        }}
        
        accessible
        accessibilityLabel="Login com Facebook"
        >
            <FontAwesome name="facebook" size={18} color="#fff" />
        </TouchableOpacity>

        {/* Botão Google */}
        <TouchableOpacity
        onPress={() => openLink('https://mail.google.com/')}
        style={{
            backgroundColor: '#762C61',
            width: 45,
            height: 40,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 8
        }}
        accessible
        accessibilityLabel="Login com Google"
        >
            <FontAwesome name="google" size={18} color="#fff" />
        </TouchableOpacity>
        
        </View>
    </View>
    );
};

export default LoginScreen;
