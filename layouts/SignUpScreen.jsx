import Checkbox from 'expo-checkbox';
import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();

      //inicializacao as variaveis do cadastro
      const [nome, setNome] = useState('');
      const [email, setEmail] = useState('');
      const [equipe, setEquipe] = useState('');
      const [senha, setSenha] = useState('');
      const RepeteSenha = useState(''); //essa sera usada apenas para verificacao, nao ira para o banco
      const [termosAceitos, setTermosAceitos] = useState(false);

    const handleSignup = () => {
      //Verifica se dados estao sendo inseridos
      if (!nome.trim() || !email.trim() || !equipe.trim() || !senha.trim() || senha ===  RepeteSenha || !termosAceitos) {
        alert('Por favor, verifique se você:\n - Preencheu todos os campos. \n - Digitou senhas iguais. \n - Li e concordei com os Termos de Uso.');
      return;
    }

      //Ajustar com logica para enviar cadastro para o banco via API
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Equipe:', equipe);
      console.log('Senha:', senha);
    };

    const toggleTermosAceitos = () => {
      setTermosAceitos(!termosAceitos);
    };

    const backToLoginPage = () => {
          navigation.navigate('Login'); // Navega para a tela de login
      };

    const goToUsageTerms = () => {
          navigation.navigate('Termos de Uso'); // Navega para a tela de login
      };

    return (
      <View style={styles.container}>
       <Image style={styles.logo} source={require('../assets/image.png')} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Crie sua conta</Text>
          <Text style={styles.headerText2}>Insira suas informações para cadastro:</Text>
          <View style={styles.fields}>
            <View style={{ marginBottom: 10 }}>
              <TextInput style={styles.input}
                placeholder="Nome"
                value={nome}
              />
            </View>

            <View style={{ marginBottom: 10 }}>
              <TextInput style={styles.input}
                placeholder="E-mail"
                value={email}
              />
            </View>

            {/* Equipe */}
            <View style={{ marginBottom: 10 }}>
              <TextInput style={styles.input}
                placeholder="Equipe"
                value={equipe}
              />
            </View>

            <View style={{ marginBottom: 10 }}>
              <TextInput  style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
              />
            </View>

            <View style={{ marginBottom: 10 }}>
              <TextInput style={styles.input}
                placeholder="Repita a senha"
                secureTextEntry
                value={RepeteSenha}
              />
            </View>
          </View>
          {/* Concordo com termos e condições */}
          <TouchableOpacity onPress={toggleTermosAceitos} style={styles.checkboxContainer}>
            <View style={[styles.checkbox, { backgroundColor: termosAceitos ? '#007bff' : '#fff' }]}>
              {termosAceitos && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.label}>Li e concordo com os</Text>
              <TouchableOpacity>
                <Text style={styles.loginText} onPress={goToUsageTerms}>Termos de Uso</Text>
              </TouchableOpacity>
          </TouchableOpacity>

          {/* Botão para cadastrar */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.TextButton} >Cadastrar</Text>
          </TouchableOpacity>

          {/* Texto "Já possui conta?" e botão "Login" */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.loginText}>Já possui conta?</Text>
            <TouchableOpacity onPress={backToLoginPage}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 113
  },
  header: {
    marginBottom: 20
  },
  headerText: {
    fontSize: 24,
    paddingTop: 32.2,
    //fontFamily: 'Poppins-Bold'
  },
  headerText2: {
    fontSize: 14,
    paddingTop: 45
  },
  fields: {
    paddingTop: 22,
    marginBottom: 10,
  },
  input: {
    width: 327,
    height: 35,
    padding: 10,
    fontSize: 12,
    borderRadius: 20,
    backgroundColor: '#c2c2c2'
  },
  checkboxContainer: {
    justifyContent: 'space-araound',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: '#fff',
  },
  button: {
    width: 327,
    height: 35,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingStart: 24,
    paddingEnd: 24,
    borderRadius: 20,

  },
  loginText: {
    fontSize: 14,
    color: '#454B60',
    fontWeight: 'bold',
    marginLeft: 5,
  },
   logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  TextButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});
