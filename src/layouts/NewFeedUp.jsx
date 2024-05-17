import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PagesStyles'

export default function NewFeedUp() {
  const navigation = useNavigation();

  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState('');
  const [value, setValue] = useState(''); //inicializacao da variavel do menu dropdown

  const saveFeedUp = () => {
    //Verifica se dados estao sendo inseridos
    if (!recipient.trim() || !message.trim() ) {
      alert('Por favor, verifique se você preencheu todos os campos.');
    return}

    {/*AJUSTAR PARA ENVIAR FEEDUP VIA API PARA BASE DE DADOS*/}
    console.log('Recipient:', recipient);
    console.log('Message:', message);
    console.log('Valor:', value);
    console.log('Anonymous:', setIsAnonymous);

    navigation.navigate('Thank You');
  };

  return (
    <View style={styles.containerNewFeedup}>



      <Text style={styles.headerTextNewFeedup}NewFeedup>Deixe um feedback para um colaborador</Text>
      <Text style={styles.subtitleNewFeedup}>Espalhe o reconhecimento! Deixe um feedback,{'\n'}positivo ou construtivo, para um colaborador da {'\n'}sua equipe com base nos valores da empresa.</Text>

      <TextInput
        style={styles.inputNewFeedup}
        placeholder="Menção"
        value={recipient}
        onChangeText={setRecipient}
      />

      {/* Menu dropdown de valores */}
      <View style={styles.pickerGeralNewFeedup}>
      <Picker selectedValue={value} onValueChange={(itemValue) => setValue(itemValue)} numberOfLines={3} >
        <Picker.Item label="Comportamento atribuído" value="" />
        <Picker.Item label="Se importa e cuida de todas as pessoas da comunidade." value="valor1" />
        <Picker.Item label="Tem a capacidade de dialogar com pares, liderados e lideranças sobre estratégias,
                            metas e o que é necessário para alcançá-las." value="valor2" />
        <Picker.Item label="Reconhece, respeita e empodera o bom trabalho e empenho dos colegas em todas as esfera." value="valor3" />
        <Picker.Item label="Aposta na ideia que estar na ioasys significa transformar o mundo." value="valor4" />
        <Picker.Item label="Traz as melhores práticas do mercado para dentro da ioasys,
                            tornando-as ainda melhores dentro do nosso ecossistema." value="valor5" />
        <Picker.Item label="Conduz a comunidade na direção do sucesso, sempre com muito engajamento e brilho no olho." value="valor6" />
        <Picker.Item label="Ajuda as pessoas a desenvolverem ainda mais as suas soft skills" value="valor7" />
        <Picker.Item label="Se torna técnica e profissionalmente a cada dia mais forte." value="valor8" />
        <Picker.Item label="Mensura e acompanha todas as etapas de projetos e processos para garantir ajustes rápidos." value="valor9" />
        <Picker.Item label="Busca conhecer e agir de forma ética, respeitando todos os princípios
                            de governança da ioasys e do grupo Alpargatas" value="valor10" />
        <Picker.Item label="Busca tornar os caminhos mais simples para obter resultados mais assertivos." value="valor11" />
        <Picker.Item label="É brilhante na tratativa de relacionamento com os clientes,
                            fornecedores e outros cocriadores." value="valor12" />
        <Picker.Item label="Zela por um ambiente que abrace a diversidade e a pluralidade integralmente." value="valor13" />
        <Picker.Item label="Assume a responsabilidade de que sua jornada pessoal e comportamento ajudam a construir a ioasys que
                            todos queremos ter." value="valor14" />
        <Picker.Item label="Entende que inovação deve estar presente em tudo,
                            desde um simples texto até os projetos mais complexos." value="valor15" />
        <Picker.Item label="Entende que sustentabilidade não é só sobre ecologia,
                            mas sim todos os aspectos que regem nossas vidas." value="valor16" />
        <Picker.Item label="Performa de forma surpreendente e acima do esperado." value="valor17" />
        <Picker.Item label="Possui conhecimento técnico notável e compartilha
                            com as pessoas, tornando toda comunidade mais forte." value="valor18" />
        <Picker.Item label="Prioriza os ritos ágeis em todas as ações do dia a dia." value="valor19" />
        <Picker.Item label="Acredita 100% na liberdade para errar e aprender." value="valor20" />
        <Picker.Item label="Acredita no poder do desenvolvimento pessoal e no aprendizado contínuo." value="valor21" />
        <Picker.Item label="Ajuda a construir um ambiente de trabalho cada dia mais agradável e produtivo." value="valor22" />
        <Picker.Item label="Sempre fomenta novas experiências para surpreender os clientes nas entregas." value="valor23" />
      </Picker>
      </View>

      <TextInput
        style={[styles.inputNewFeedup, styles.textAreaNewFeedup]}
        multiline
        numberOfLines={4}
        placeholder="Deixe aqui o seu feedback"
        value={message}
        onChangeText={setMessage}
      />

      {/* Define mensagem anonima */}
      <View style={styles.pickerGeralNewFeedup}>
        <Picker style={styles.pickerNewFeedup} selectedValue={isAnonymous} onValueChange={(itemValue) => setIsAnonymous(itemValue)} >
          <Picker.Item label="Visibilidade" value="" />
          <Picker.Item label="Não (default)" value={false} />
          <Picker.Item label="Sim" value={true} />
        </Picker>
       </View>

      <TouchableOpacity style={styles.buttonNewFeedup} onPress={saveFeedUp}>
        <Text style={styles.buttonTextNewFeedup}>Enviar FeedUp!</Text>
      </TouchableOpacity>
    </View>
  );
};