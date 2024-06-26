import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';

import styles from './src/styles/PagesStyles';
import AppNavigation from './src/routes/AppNavigation';

//Configuração da tela de splash
const SplashScreen = () => {
  return <View style={styles.splashLogo}>
    <Image source={require('./src/assets/images/logos/splash-logo.png')} />
    <Text style={styles.splashTitle}>FeedUp</Text>
  </View>
}
function App() {

  const [isLoading, setIsLoading] = useState(true) // Estado para verificar se a tela de splash está ativa

  // Timer para tela de splash durar alguns segundos ao iniciar
  useEffect(() => {const timeout = setTimeout(() => {setIsLoading(false)}, 2000)
    return () => { clearTimeout(timeout) }
  }, [])

  // Verifica se a tela de splash está ativa
  if (isLoading)
    return <SplashScreen />
  return <AppNavigation initialRoute={'Feed'} />
}

export default App;