import React from 'react';

// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Link } from 'expo-router';
import Welcome from "../../components/welcome"; 
import HomeScreen from '../HomeScreen';

export default function Index() {
  return <Welcome />
  ;
}


// export default function HomeScreen() {
//   return (  
    
//     <View style={styles.menu}>
//   <Link href="/mental-health" asChild>
//     <TouchableOpacity style={styles.menuItem}>
//       <Text style={styles.menuText}>Saúde Mental</Text>
//     </TouchableOpacity>
//   </Link>

//   <Link href="/guide1" asChild>
//     <TouchableOpacity style={styles.menuItem}>
//       <Text style={styles.menuText}>Guia Parte 1</Text>
//     </TouchableOpacity>
//   </Link>

//   <Link href="/guide2" asChild>
//     <TouchableOpacity style={styles.menuItem}>
//       <Text style={styles.menuText}>Guia Parte 2</Text>
//     </TouchableOpacity>
//   </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//   },
//   menu: {
//     width: '80%',
//     gap: 15,
//   },
//   menuItem: {
//     backgroundColor: '#5c1b54',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   menuText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// import Login from '../login'; // ajusta o caminho se necessário

// export default function Index() {
//     return <Login />;
// }

