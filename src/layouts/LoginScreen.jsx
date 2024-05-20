import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PagesStyles'

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === '123' && password === '123') {
      //Quando clicar em login vai para Home (feed), o navigation reset é para prevenir que um usuario volte
       navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
    } else {
      alert('Credenciais inválidas. Tente novamente.');
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
          <Text style={styles.titleLoginPage}>Bem vindo ao FeedUp!</Text>
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

