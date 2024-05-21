import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PagesStyles';
import ConfigAPI from '../config/services/ConfigAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isReturningUser, setIsReturningUser] = useState(false);
  const navigation = useNavigation();

  //funcao para verificar se usuario esta de volta
  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem('token');
      setIsReturningUser(!!token);
    }
    checkToken();
  }, []);

  const handleLogin = async () => { //Tem que definir como funcao assincrona para API funcionar
    //confirma que usuario passou os campos preenchidos
    if (!username || !password) {
          alert("Campos não preenchidos!")
          return
    }

    //define um parametro unico que passara as infos pra API
    const user = { email: username, password: password };

    try {
      //faz a chamada da API
      const response = await ConfigAPI.post('/', user);

      if (response.data) { // Verifica se deu sucesso na chamada da API, login autenticado
        const token = response.data.token; //pega token de autenticacao

        //Passos para salvar token e definir data de expiração
        await AsyncStorage.setItem('token', token);
        const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000;
        await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());
        //Salvar usuario logado
        await AsyncStorage.setItem('loggedUser', username);
        //console.log('Autenticado, token: ', token); //log apenas para manutencao

        navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] }); //define tela apos autenticacao, usando reset pro usuario nao poder voltar pro login apos deslogar

      } else {
        console.log('Erro: Falha na autenticacao');
      }
    } catch (error) {
      console.error('Error');
    }
 };

  return (
   <View style={styles.containerLoginPage}>
      {/* entrada da logo */}
      <View style={styles.logoContainerLoginPage}>
        <Image style={styles.logoLoginPage} source={require('../assets/images/logos/feedup-login.png')} />
      </View>

      {/* entrada do titulo e subtitulo */}
      <View style={styles.titleContainerLoginPage}>
        <View>
          {/*Trata  se o token de autenticacao esta nos cookies, se sim aparecerá "Bem vindo de volta"*/}
          <Text style={styles.titleLoginPage}>Bem vindo {isReturningUser ? 'de volta ao' : 'ao'} FeedUp!</Text>
          <Text style={styles.titleSecondaryLoginPage}>A comunidade de feedbacks da ioasys!</Text>
          <Text style={styles.titleSecondaryLoginPage}>Complete seus dados abaixo</Text>
        </View>
      </View>

      {/* inputs de usuário e senha */}
      <View style={styles.inputContainerLoginPage}>
        <TextInput
          style={styles.inputLoginPage}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.inputLoginPage}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.forgotTextLoginPage}>Esqueceu a senha?</Text>

        {/* botao de login*/}
        <TouchableOpacity style={styles.loginButtonLoginPage} onPress={handleLogin}>
          <Text style={styles.buttonTextLoginPage}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

