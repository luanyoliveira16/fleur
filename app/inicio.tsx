import React, {useEffect } from 'react';
import { Image } from 'react-native';

import {
  StyleSheet,
  } from 'react-native';
import { View,} from 'react-native';
import { useRouter } from 'expo-router';

const InicioScreen: React.FC = () => {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/welcome');
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Início.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default InicioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#762C61', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 24,
  },
});

