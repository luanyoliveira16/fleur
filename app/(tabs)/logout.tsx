// app/logout.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function LogoutScreen() {
  useEffect(() => {
    // Aqui você pode limpar dados, tokens, etc.
    console.log('Deslogando...');
    // router.replace('/login'); // se quiser redirecionar
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Você saiu com sucesso.</Text>
    </View>
  );
}