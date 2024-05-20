import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import cultureData from '../components/cultureData';
import { useFonts } from 'expo-font';
import FONTS from "../styles/fonts/fonts";

export default function UsageTerms() {

   let [fontsLoaded] = useFonts({
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
   });

   if (!fontsLoaded) {
      return <AppLoading />;
   }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/logos/mini-logo.png')} style={styles.logo} />
      <Text style={styles.title}>FeedUp</Text>
      <Text style={styles.subtitleBold}>Termos de Uso</Text>
      <Text style={styles.subtitle}>DEV: ADICIONE AQUI OS TERMOS DE USO!</Text>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 51,
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular'
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  subtitleBold: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20
  },
});