import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import styles from "../styles/PagesStyles"; //importa estilos
import AsyncStorage from '@react-native-async-storage/async-storage'; //para pegar token de autenticacao, ja salvo
import ConfigAPI from '../config/services/ConfigAPI'; //para buscar feedbacks via api

export default function NewFeedUp() {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  const [recipient, setRecipient] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [isConstructive, setIsConstructive] = useState(false);

    const enviarFeedback = async () => {
        if (!recipient || !message || !value || isConstructive === null || isAnonymous === null) {
          alert('Por favor, preencha todos os campos antes de enviar o feedback.');
          return;
        }

        try {
              const feedbackInput = {
              username_userreceived: recipient,
              value: value,
              message: message,
              isanonymous: isAnonymous,
              isconstructive: isConstructive
            };
        const token = await AsyncStorage.getItem('token');

              const response = await ConfigAPI.post('/forms', feedbackInput,
               {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

    if (response.status === 201) {
            //console.log('autenticou');
            navigation.navigate('Thank You');
          } else {
            console.log('Erro ao enviar feedback. Por favor, tente novamente.');
            //console.log('Status code:', response.status);
            //console.log('Response data:', response.data);
          }
         } catch (error) {
          console.error('Erro ao enviar feedback:', error);
          if (error.response) {
            console.error('Error response data:', error.response.data);
            //console.error('Error response status:', error.response.status);
            //console.error('Error response headers:', error.response.headers);
          } else if (error.request) {
            console.error('Error request:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
        }
    };

    return (
      <ScrollView>
          <View style={styles.containerNewFeedup}>
          <Image source={require('../assets/images/logos/mini-logo.png')} style={styles.logoNewFeedup} />
            <Text style={styles.headerTextNewFeedup}>
              Deixe um feedback para um colaborador
            </Text>
            <Text style={styles.subtitleNewFeedup}>
              Espalhe o reconhecimento! Deixe um feedback,{"\n"}positivo ou
              construtivo, para um colaborador da sua equipe com base nos valores da
              empresa.{"\n\n"}

              Feedbacks construtivos serão apresentados apenas no perfil individual do colaborador.
            </Text>

            <TextInput
              style={styles.inputNewFeedup}
              placeholder="Usuário do colaborador"
              value={recipient}
              onChangeText={setRecipient}
            />
            {/* Picker para escolher se o feedback é construtivo */}
            <View style={styles.pickerGeralNewFeedup}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => setValue(itemValue)}
                numberOfLines={3}
              >
                <Picker.Item label="Valor cultural atribuído" value="" />
                <Picker.Item
                  label="Se importa e cuida de todas as pessoas da comunidade."
                  value="Se importa e cuida de todas as pessoas da comunidade."
                />
                <Picker.Item
                  label="Tem a capacidade de dialogar com pares, liderados e lideranças sobre estratégias,
                                    metas e o que é necessário para alcançá-las."
                  value="Tem a capacidade de dialogar com pares, liderados e lideranças sobre estratégias, metas e o que é necessário para alcançá-las."
                />
                <Picker.Item
                  label="Reconhece, respeita e empodera o bom trabalho e empenho dos colegas em todas as esfera."
                  value="Reconhece, respeita e empodera o bom trabalho e empenho dos colegas em todas as esfera."
                />
                <Picker.Item
                  label="Aposta na ideia que estar na ioasys significa transformar o mundo."
                  value="Aposta na ideia que estar na ioasys significa transformar o mundo."
                />
                <Picker.Item
                  label="Traz as melhores práticas do mercado para dentro da ioasys,
                                    tornando-as ainda melhores dentro do nosso ecossistema."
                  value="Traz as melhores práticas do mercado para dentro da ioasys, tornando-as ainda melhores dentro do nosso ecossistema."
                />
                <Picker.Item
                  label="Conduz a comunidade na direção do sucesso, sempre com muito engajamento e brilho no olho."
                  value="Conduz a comunidade na direção do sucesso, sempre com muito engajamento e brilho no olho."
                />
                <Picker.Item
                  label="Ajuda as pessoas a desenvolverem ainda mais as suas soft skills"
                  value="Ajuda as pessoas a desenvolverem ainda mais as suas soft skills"
                />
                <Picker.Item
                  label="Se torna técnica e profissionalmente a cada dia mais forte."
                  value="Se torna técnica e profissionalmente a cada dia mais forte."
                />
                <Picker.Item
                  label="Mensura e acompanha todas as etapas de projetos e processos para garantir ajustes rápidos."
                  value="Mensura e acompanha todas as etapas de projetos e processos para garantir ajustes rápidos."
                />
                <Picker.Item
                  label="Busca conhecer e agir de forma ética, respeitando todos os princípios
                                    de governança da ioasys e do grupo Alpargatas"
                  value="Busca conhecer e agir de forma ética, respeitando todos os princípios de governança da ioasys e do grupo Alpargatas"
                />
                <Picker.Item
                  label="Busca tornar os caminhos mais simples para obter resultados mais assertivos."
                  value="Busca tornar os caminhos mais simples para obter resultados mais assertivos."
                />
                <Picker.Item
                  label="É brilhante na tratativa de relacionamento com os clientes,
                                    fornecedores e outros cocriadores."
                  value="É brilhante na tratativa de relacionamento com os clientes, fornecedores e outros cocriadores."
                />
                <Picker.Item
                  label="Zela por um ambiente que abrace a diversidade e a pluralidade integralmente."
                  value="Zela por um ambiente que abrace a diversidade e a pluralidade integralmente."
                />
                <Picker.Item
                  label="Assume a responsabilidade de que sua jornada pessoal e comportamento ajudam a construir a ioasys que
                                    todos queremos ter."
                  value="Assume a responsabilidade de que sua jornada pessoal e comportamento ajudam a construir a ioasys que todos queremos ter."
                />
                <Picker.Item
                  label="Entende que inovação deve estar presente em tudo,
                                    desde um simples texto até os projetos mais complexos."
                  value="Entende que inovação deve estar presente em tudo, desde um simples texto até os projetos mais complexos."
                />
                <Picker.Item
                  label="Entende que sustentabilidade não é só sobre ecologia,
                                    mas sim todos os aspectos que regem nossas vidas."
                  value="Entende que sustentabilidade não é só sobre ecologia, mas sim todos os aspectos que regem nossas vidas."
                />
                <Picker.Item
                  label="Performa de forma surpreendente e acima do esperado."
                  value="Performa de forma surpreendente e acima do esperado."
                />
                <Picker.Item
                  label="Possui conhecimento técnico notável e compartilha
                                    com as pessoas, tornando toda comunidade mais forte."
                  value="Possui conhecimento técnico notável e compartilha com as pessoas, tornando toda comunidade mais forte."
                />
                <Picker.Item
                  label="Prioriza os ritos ágeis em todas as ações do dia a dia."
                  value="Prioriza os ritos ágeis em todas as ações do dia a dia."
                />
                <Picker.Item
                  label="Acredita 100% na liberdade para errar e aprender."
                  value="Acredita 100% na liberdade para errar e aprender."
                />
                <Picker.Item
                  label="Acredita no poder do desenvolvimento pessoal e no aprendizado contínuo."
                  value="Acredita no poder do desenvolvimento pessoal e no aprendizado contínuo."
                />
                <Picker.Item
                  label="Ajuda a construir um ambiente de trabalho cada dia mais agradável e produtivo."
                  value="Ajuda a construir um ambiente de trabalho cada dia mais agradável e produtivo."
                />
                <Picker.Item
                  label="Sempre fomenta novas experiências para surpreender os clientes nas entregas."
                  value="Sempre fomenta novas experiências para surpreender os clientes nas entregas."
                />
                <Picker.Item
                  label="Trabalha de forma íntegra e transparente, sempre alinhando expectativas e restrições, seguindo planos concretos."
                  value="Trabalha de forma íntegra e transparente, sempre alinhando expectativas e restrições, seguindo planos concretos."
                />
              </Picker>
            </View>

            <TextInput
              style={[styles.inputNewFeedup, styles.textAreaNewFeedup]}
              multiline
              numberOfLines={4}
              placeholder="Deixe aqui o seu feedback!"
              value={message}
              onChangeText={setMessage}
            />
            {/*Picker para definir feedback anonimo e escolher se o feedback é construtivo*/}
              <View style={styles.pickerGeralNewFeedup}>
                <Picker
                  selectedValue={isConstructive}
                  onValueChange={(itemValue) => setIsConstructive(itemValue)}
                  style={styles.pickerNewFeedup}
                >
                <Picker.Item label="Tipo de feedback" value=""/>
                  <Picker.Item label="Reconhecimento" value={false} />
                  <Picker.Item label="Construtivo" value={true} />
                </Picker>
                </View>

               {/*Picker para definir feedback anonimo e escolher se o feedback é construtivo*/}
                <View style={styles.pickerGeralNewFeedup}>
                <Picker
                  selectedValue={isAnonymous}
                  onValueChange={(itemValue) => setIsAnonymous(itemValue)}
                  style={styles.pickerNewFeedup}
                >
                  <Picker.Item label="Feedback anônimo?" value="" />
                  <Picker.Item label="Não" value={false} />
                  <Picker.Item label="Sim" value={true} />
                </Picker>
              </View>

              <TouchableOpacity style={styles.buttonNewFeedup} onPress={enviarFeedback}>
                <Text style={styles.buttonTextNewFeedup}>Enviar FeedUp!</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
    );
  }