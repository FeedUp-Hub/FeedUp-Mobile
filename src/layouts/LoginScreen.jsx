import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import FeedScreen from './FeedScreen';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
      if (username === '123' && password === '123') {
        navigation.navigate('Feed');
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }
    };

  const backToSignupPage = () => {
     navigation.navigate('Cadastro'); // Volta para a tela de cadastro
  };

    return (
      <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/image.png')} />
        <Text style={styles.title}>Bem vindo ao FeedUp!</Text>
        <Text style={styles.titleSecondary}>A comunidade de feedbacks da ioasys!</Text>
        <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.forgotText}>Esqueceu o usuário?</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
         </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Não tem acesso? </Text>
           <TouchableOpacity>
           <Text style={styles.loginText} onPress={backToSignupPage}>Cadastre-se</Text>
        </TouchableOpacity>

      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
    },
    titleSecondary: {
      fontSize: 15,
      marginBottom: 20,
    },
    inputContainer: {
      width: '80%',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      backgroundColor: '#c2c2c2',
      borderColor: 'gray',
      borderRadius: 20,
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    loginText: {
        fontSize: 14,
        color: '#454B60',
        fontWeight: 'bold',
        marginLeft: 5,
      },
    forgotText: {
      textAlign: 'right',
      fontSize: 14,
      color: '#333',
    },
    loginButton: {
      width: '80%',
      height: 50,
      backgroundColor: '#333',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
  });