import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/PagesStyles';

const HomePage = ({ route }) => {
  const { personType } = route.params;
  return (
    <View style={styles.container}>
      {/* Conteúdo principal */}
      {/* 1 = funcionario RH | 2 = Lider | 3 = comum */}
      {personType === 1 && (
        <View style={styles.container}>
          <Text style={styles.title}>FeedUp</Text>
          <Text style={styles.titleSecondary}>As opções abaixo foram escolhidas baseadas no{'\n'}seu perfil:</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../assets/image.png')} />
              <Text style={styles.menuText} numberOfLines={2}>Visualizar FeedUps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../assets/image.png')} />
              <Text style={styles.menuText} numberOfLines={2}>Enviar FeedUp</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../assets/image.png')} />
              <Text style={styles.menuText} numberOfLines={2}>Ranking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../assets/image.png')} />
              <Text style={styles.menuText} numberOfLines={2}>Métricas</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {personType === 2 && (
        <View style={styles.container}>
          <Text style={styles.title}>FeedUp</Text>
          <Text style={styles.titleSecondary}>As opções abaixo foram escolhidas baseadas no{'\n'}seu perfil:</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../assets/image.png')} />
              <Text style={styles.menuText} numberOfLines={2}>Visualizar FeedUps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../assets/image.png')} />
              <Text style={styles.menuText} numberOfLines={2}>Enviar FeedUp</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../assets/image.png')} />
              <Text style={styles.menuText} numberOfLines={2}>Ranking</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {personType === 3 && (
        <View style={styles.container}>
          <Text style={styles.title}>FeedUp</Text>
          <Text style={styles.titleSecondary}>As opções abaixo foram escolhidas baseadas no{'\n'}seu perfil:</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../assets/image.png')} />
              <Text style={styles.menuText} numberOfLines={2}>Visualizar FeedUps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.menuImage} source={require('../assets/image.png')} />
              <Text style={styles.menuText} numberOfLines={2}>Enviar FeedUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 - Grupo 2 | Turma 5 | Camp ioasys </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  menuImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  titleSecondary: {
    fontSize: 15,
    marginBottom: 60,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});

export default HomePage;
