import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfigAPI from '../config/services/ConfigAPI';

// Função que retorna o Feed de posts e ranking
export default function FeedScreen() {

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null; // Você pode substituir por um componente de carregamento
  }

  const [posts, setPosts] = useState([]); // Posts
  const [userInfos, setUserInfos] = useState([]); // Informações dos usuários
  const [likedPosts, setLikedPosts] = useState({}); // Posts curtidos pelo usuário
  const [expandedComments, setExpandedComments] = useState({}); // Comentários expandidos de cada post
  const [newComments, setNewComments] = useState({}); // Novos comentários de cada post
  const [comments, setComments] = useState({}); // Comentários de cada post
  const [loggedUserEmail, setLoggedUserEmail] = useState(''); // Email do usuário logado

  // Função para buscar os posts e usuários
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const loggedUser = await AsyncStorage.getItem('loggedUser');
        setLoggedUserEmail(loggedUser);
        // Busca de posts
        const response = await ConfigAPI.get('/home', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data.feedupFound);
        setUserInfos(response.data.users);
      } catch (error) {
        console.error('Erro na busca pelos feedbacks', error);
      }
    };
    // Busca os posts ao carregar a tela - Está vazia para não ficar chamando toda hora
    fetchPosts();
  }, []);

  // Função para buscar informações de um usuário
  const getUserInfo = async (userId) => {
    try {
      const user = userInfos.find(user => user.id === userId);
      return user ? user.username : 'Usuário Desconhecido';
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
      return 'Usuário Desconhecido';
    }
  };

  // Função para buscar os comentários de um post
  const fetchComments = async (postId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await ConfigAPI.get(`/comments/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      // Se não houver comentários, retorna um array vazio ao clicar em "Ver comentários"
      if (!response.data || response.data.length === 0) {
        return [];
      }
      // Mapeia os comentários para buscar o nome do usuário que comentou
      const comments = await Promise.all(response.data.map(async (comment) => {
        const userName = await getUserInfo(comment.id_usercommented);
        return {
          message: comment.message,
          created_at: comment.created_at,
          username: userName,
        };
      }));

      return comments;

    } catch (error) {
      return [];
    }
  };

  // Função para curtir um post
  const handleLike = (postId) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.findIndex(post => post.id === postId);
    if (index !== -1) { // Se o post foi encontrado, atualiza o número de curtidas
      if (likedPosts[postId]) {
        updatedPosts[index] = { ...updatedPosts[index], likes: updatedPosts[index].likes - 1 };
        const updatedLikedPosts = { ...likedPosts };
        updatedLikedPosts[postId] = false;
        setLikedPosts(updatedLikedPosts);
      } else { // Se o post não foi curtido, incrementa o número de curtidas
        updatedPosts[index] = { ...updatedPosts[index], likes: updatedPosts[index].likes + 1 };
        const updatedLikedPosts = { ...likedPosts };
        updatedLikedPosts[postId] = true;
        setLikedPosts(updatedLikedPosts);
      }
      setPosts(updatedPosts);
    }
  };

  // Função para adicionar um comentário
  const handleComment = async (postId) => {
    const commentText = newComments[postId];

    if (!commentText.trim()) {
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await ConfigAPI.post(`/comments/${postId}`, { message: commentText }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Se o comentário foi adicionado com sucesso, atualiza a lista de comentários
      if (response.status === 201) {
        const newComment = {
          message: commentText,
          created_at: new Date().toISOString(),
          username: loggedUserEmail,
        };
        // Adiciona o novo comentário à lista de comentários
        setComments((prevComments) => ({ ...prevComments, [postId]: [...(prevComments[postId] || []), newComment] }));
        setNewComments((prevComments) => ({ ...prevComments, [postId]: '' }));
      }
    } catch (error) { // Em caso de erro, exibe uma mensagem no console
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  // Função para lidar com a mudança de texto em um comentário
  const handleCommentChange = (postId, text) => {
    setNewComments({ ...newComments, [postId]: text });
  };

  // Função para expandir ou recolher os comentários de um post
  const toggleComments = async (postId) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    // Se os comentários ainda não foram carregados, busca-os
    if (!expandedComments[postId]) {
      try { // Busca os comentários do post
        const comments = await fetchComments(postId);
        setComments((prevComments) => ({ ...prevComments, [postId]: comments }));
      } catch (error) { // Em caso de erro, exibe uma mensagem no console
        console.error('Erro ao buscar comentários:', error);
      }
    }
  };

  // Função para renderizar um post
  const renderPost = ({ item }) => (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={require('../assets/images/icons/icon-user.png')} style={styles.postUserImage} />
          <View>
            {/* Nome do usuário que enviou o feedback */}
            <Text style={styles.postUserName}>{item.sender_username}</Text>
            {/* Data de envio do feedback */}
            <Text style={styles.postTimestamp}>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: ptBR })}</Text>
          </View>
        </View>
        {/* Conteúdo do feedback + a marcação do Colaborador usando um "@" */}
        <Text style={styles.postContent}>@{item.receiver_username}:{'\n'} {item.message}</Text>
        <View style={styles.actions}>
          {/* Botão de curtir */}
          <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
            <Image source={require('../assets/images/icons/heart.png')} style={[styles.heartIcon, likedPosts[item.id] && styles.likedHeartIcon]} />
            <Text style={styles.likeText}>{likedPosts[item.id] ? 'Curtiu' : 'Curtir'}</Text>
          </TouchableOpacity>
          {/* Botão de comentários */}
          <TouchableOpacity onPress={() => toggleComments(item.id)} style={styles.commentButton}>
            {/* Ícone de chat */}
            <Image source={require('../assets/images/icons/feed-chat.png')} style={styles.chatIcon} />
            {/* Texto para expandir e ver os comentários */}
            <Text>Ver comentários</Text>
          </TouchableOpacity>
        </View>
        {expandedComments[item.id] && comments[item.id] && (
            <View style={styles.commentsContainer}>
              {comments[item.id].map((comment, index) => ( // Mapeia os comentários para exibição
                  <View key={index} style={styles.comment}>
                    <Text style={styles.commentUser}>{comment.username}: </Text>
                    <Text>{comment.message.replace(/[{}]/g, '')}</Text> {/* Remove caracteres especiais do comentário */}
                    {/* Exibe a data de envio do comentário em relação ao tempo atual */}
                    <Text style={styles.commentTimestamp}>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ptBR })}</Text>
                  </View>
              ))}
            </View>
        )}
        <View style={styles.commentSection}>
          <TextInput
              style={styles.input}
              placeholder="Adicionar um comentário..."
              value={newComments[item.id] || ''}
              onChangeText={(text) => handleCommentChange(item.id, text)}
          />
          <TouchableOpacity onPress={() => handleComment(item.id)}>
            <Text style={styles.commentPost}>Comentar</Text>
          </TouchableOpacity>
        </View>
      </View>
  );

  // Obtém os 3 usuários com mais feedbacks enviados
  const topUsers = userInfos
      .map(user => ({
        ...user,
        feedbackCount: posts.filter(post => post.id_usersend === user.id).length,
      }))
      .sort((a, b) => b.feedbackCount - a.feedbackCount)
      .slice(0, 2);

  const loggedInUser = userInfos.find(user => user.email === loggedUserEmail);

  return (
      <View style={styles.container}>
        <Image
            source={require('../assets/images/logos/mini-logo.png')}
            style={styles.logo}
            resizeMode="contain"
        />
        <Text style={styles.title}>Ranking de Envio de Feedbacks</Text>
        {/* Container do ranking */}
        <View style={styles.rankingContainer}>
          {/* Top 3 mais envios de feedback */}
          {topUsers.length > 0 ? (
              <>
                <View style={styles.userRow}>
                  <Text style={styles.rank}>1</Text>
                  <Image source={require('../assets/images/icons/icon-user.png')} style={styles.userImage} />
                  <Text style={styles.userName}>{topUsers[0].name}</Text>
                  <Text style={styles.userScore}>{topUsers[0].feedbackCount}</Text>
                </View>
                {topUsers.length > 1 && (
                    <View style={styles.userRow}>
                      <Text style={styles.rank}>2</Text>
                      <Image source={require('../assets/images/icons/icon-user.png')} style={styles.userImage} />
                      <Text style={styles.userName}>{topUsers[1].name}</Text>
                      <Text style={styles.userScore}>{topUsers[1].feedbackCount}</Text>
                    </View>
                )}
                {topUsers.length > 2 && (
                    <View style={styles.userRow}>
                      <Text style={styles.rank}>3</Text>
                      <Image source={require('../assets/images/icons/icon-user.png')} style={styles.userImage} />
                      <Text style={styles.userName}>{topUsers[2].name}</Text>
                      <Text style={styles.userScore}>{topUsers[2].feedbackCount}</Text>
                    </View>
                )}
              </>
          ) : null}
          {/* Exibe o ranking do usuário logado: sua posição e quantidade de feedbacks enviados */}
          {loggedInUser && (
              <View style={[styles.userRow, styles.loggedInUserRow]}>
                <Text style={styles.rank}>Você</Text>
                <Image source={require('../assets/images/icons/icon-user.png')} style={styles.userImage} />
                {/* Exibe o nome do usuário logado */}
                <Text style={styles.userName}>{loggedInUser.name}</Text>
                {/* Exibe a quantidade de feedbacks enviados pelo usuário logado */}
                <Text style={styles.userScore}>{posts.filter(post => post.id_usersend === loggedInUser.id).length}</Text>
              </View>
          )}
        </View>
        <Text style={styles.title}>Feedbacks fornecidos</Text>
        {/* Lista de posts */}
        <FlatList
            data={posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.postsContainer}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: { // Estilo do container principal
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
  },
  rankingContainer: { // Estilo do container do ranking
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#4B4B4B',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 16,
  },
  logo: { // Estilo do logo
    width: 150,
    height: 50,
    marginLeft: 90,
    marginBottom: 40,
  },
  title: { // Estilo do título
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#4B4B4B',
    marginBottom: 10,
  },
  userRow: { // Estilo da linha do usuário
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  loggedInUserRow: { // Estilo da linha do usuário logado
    backgroundColor: '#4B4B4B',
    borderBottomWidth: 0,
  },
  rank: { // Estilo do ranking
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    width: 24,
    textAlign: 'center',
  },
  userImage: { // Estilo da imagem do usuário
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  userName: { // Estilo do nome do usuário
    flex: 1,
    fontSize: 12,
    fontFamily: 'Poppins-Regular'
  },
  userScore: { // Estilo da pontuação do usuário
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  postContainer: { // Estilo do container do post
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: { // Estilo do cabeçalho do post
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postUserImage: { // Estilo da imagem do usuário do post
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  postUserName: { // Estilo do nome do usuário do post
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  postTimestamp: { // Estilo do carimbo de data/hora do post
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#828282',
  },
  postContent: { // Estilo do conteúdo do post
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
    marginBottom: 16,
  },
  actions: { // Estilo das ações do post
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeButton: { // Estilo do botão de curtir
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: { // Estilo do ícone de coração
    width: 20,
    height: 20,
    marginRight: 4,
  },
  likedHeartIcon: { // Estilo do ícone de coração curtido
    tintColor: 'red',
  },
  likeText: { // Estilo do texto de curtir
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#5271FF',
  },
  commentButton: { // Estilo do botão de comentários
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatIcon: { // Estilo do ícone de chat
    width: 18,
    height: 18,
    marginRight: 8
  },
  commentsContainer: { // Estilo do container de comentários
    marginTop: 8,
  },
  comment: { // Estilo do comentário
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentUser: { // Estilo do nome do usuário do comentário
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginRight: 4,
  },
  commentTimestamp: { // Estilo do carimbo de data/hora do comentário
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#828282',
    marginLeft: 8,
  },
  commentSection: { // Estilo da seção de comentários
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: { // Estilo do campo de entrada de texto
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentPost: {  // Estilo do botão de postar comentário
    width: 90,
    height: 30,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#5271FF',
    opacity: 0.4,
    color: '#000000',
    borderRadius: 15,
    paddingTop: 5,
    paddingLeft: 12,
  },
});