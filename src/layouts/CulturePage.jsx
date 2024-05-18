import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import cultureData from '../components/cultureData';

export default function CulturePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/logos/mini-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Ioasys</Text>
      <Text style={styles.subtitle}>A ioasys é uma empresa de pessoas para pessoas, buscamos sempre garantir uma cultura de trabalho fidedigna disso, através dos nossos valores</Text>
      <Text style={styles.subtitleBold}>Quais são os valores que compartilhamos?</Text>

      {/* Valores da empresa*/}
      {renderValores(cultureData)}
    </ScrollView>
  );
};

const renderValores = (data) => {
  const valores = [];
  for (let i = 0; i < data.length; i++) {
    valores.push(
      <View key={data[i].id} style={styles.box}>
        <Image source={data[i].image} style={styles.boxLogo} />
        <Text style={styles.boxText}>{data[i].text}</Text>
      </View>
    );
  }
  return valores;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  subtitleBold: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 23,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  boxLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  boxText: {
    fontSize: 16,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});