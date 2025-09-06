import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity,} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header
      <View style={styles.header}>
        <Text style={styles.menu}>☰</Text>
        <Text style={styles.logo}>Fleur</Text>
      </View> */}

      {/* Saudação */}
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Olá, Julia! Seja bem-vinda!</Text>

      {/* Imagem do Ultrassom */}
      <Image
        source={require('../assets/images/ultrassomGemelar.jpg')}
        style={styles.ultrasound}
        resizeMode="cover"
      />

      {/* Nome dos bebês e semanas */}
      <Text style={styles.babyName}>João e Maria</Text>
      <Text style={styles.weeks}>30 semanas</Text>

      {/* Emojis de humor */}
      <Text style={styles.question}>Como está seu humor hoje?</Text>
      <View style={styles.emojis}>
        {['😀', '😊', '😐', '😢', '😠'].map((emoji, index) => (
          <Text key={index} style={styles.emoji}>{emoji}</Text>
        ))}
      </View>

      {/* Cards com informações */}
      <Text style={styles.infoTitle}>Confira informações importantes:</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.iconBox}>
            <Image source={require('../assets/images/agenda.png')} style={styles.icon} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>SUA AGENDA</Text>
            <Text style={styles.arrow}>&gt;</Text> 
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={styles.iconBox}>
            <Image source={require('../assets/images/baby-bag.png')} style={styles.icon} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>BOLSA DE MATERNIDADE</Text>
            <Text style={styles.arrow}>&gt;</Text> 
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={styles.iconBox}>
            <Image source={require('../assets/images/guide-book.png')} style={styles.icon} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>CARTEIRA DA GESTANTE</Text>
            <Text style={styles.arrow}>&gt;</Text>
          </View> 
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFAF8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#762C61',
    marginTop: 20,
    marginBottom: 5, 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    margin: 15,
    textAlign: 'center',
  },
  ultrasound: {
    width: width - 40,
    height: 180,
    borderRadius: 5,
    marginBottom: 5,
  },
  babyName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#762C61',
    textAlign: 'left',
  },
  weeks: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#762C61',
  },
  emojis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  emoji: {
    fontSize: 28,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#762C61',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#fafafaff',
    borderRadius: 5,
    padding: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  card: {
  flexDirection: 'row',
  alignItems: 'center',
},

cardContent: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

cardText: {
  fontSize: 16,
  color: '#333',
},

arrow: {
  fontSize: 20,
  color: '#802C65',
  marginLeft: 10,
},

  iconBox: {
    backgroundColor: '#D9D9D9',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginRight: 10,
    width: 40,
    height: 40,
  },
  icon: {
    width: 28,
    height: 28,
    margin: 5,
    alignContent: 'center',
  },

});
