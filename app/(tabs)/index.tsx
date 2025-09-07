import React, { useEffect } from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function InicioScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // depois de 2 segundos vai para a Home (seu menu)
      router.replace('/welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/inicio.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#762C61',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 400, height: 400, marginBottom: 24 },
});
