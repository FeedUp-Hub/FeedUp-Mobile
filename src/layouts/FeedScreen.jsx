import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfigAPI from '../config/services/ConfigAPI';

//Função que retorna o Feed de posts e ranking
export default function FeedScreen() {

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
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
        // Atualiza os estados de posts e usuários
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
          <Text style={styles.postUserName}>{item.sender_username}</Text> {/* Nome do usuário que enviou o feedback */}
          <Text style={styles.postTimestamp}>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: ptBR })}</Text> {/* Data de envio do feedback */}
        </View>
      </View>
      <Text style={styles.postContent}>@{item.receiver_username}:{'\n'} {item.message}</Text> {/* Conteúdo do feedback + a marcação do Colaborador usando um "@" */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}> {/* Botão de curtir */}
          <Image source={require('../assets/images/icons/heart.png')} style={[styles.heartIcon, likedPosts[item.id] && styles.likedHeartIcon]} />
          <Text style={styles.likeText}>{likedPosts[item.id] ? 'Curtiu' : 'Curtir'}</Text>  {/* Comparação para status entre "Curtir" e "Curtiu" - Um ou outro */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleComments(item.id)} style={styles.commentButton}> {/* Botão de comentários */}
          <Image source={require('../assets/images/icons/feed-chat.png')} style={styles.chatIcon} /> {/* Ícone de chat */}
          <Text>Ver comentários</Text> {/* Texto para expandir e ver os comentários */}
        </TouchableOpacity>
      </View>
      {expandedComments[item.id] && comments[item.id] && ( // Se os comentários foram expandidos e existem comentários, eles serão exibidos
        <View style={styles.commentsContainer}>
          {comments[item.id].map((comment, index) => ( // Mapeia os comentários para exibição
            <View key={index} style={styles.comment}> {/* Exibe o nome do usuário que comentou, o comentário e sua data de envio */}
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
    .slice(0, 3);

  const loggedInUser = userInfos.find(user => user.email === loggedUserEmail);

  return (
    <View style={styles.container}>
      {/* Container do ranking */}
      <View style={styles.rankingContainer}>
        {/* Top 3 mais envios de feedback */}
        {topUsers.map((user, index) => (
          <View key={user.id} style={styles.userRow}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Image source={require('../assets/images/icons/icon-user.png')} style={styles.userImage} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userScore}>{user.feedbackCount}</Text>
          </View>
        ))}
        {/* Exibe o ranking do usuário logado: sua posição e quantidade de feedbacks enviados */}
        {loggedInUser && (
          <View style={[styles.userRow, styles.loggedInUserRow]}>
            <Text style={styles.rank}>Você</Text>
            <Image source={require('../assets/images/icons/icon-user.png')} style={styles.userImage} />
            <Text style={styles.userName}>{loggedInUser.name}</Text> {/* Exibe o nome do usuário logado */}
            <Text style={styles.userScore}>{posts.filter(post => post.id_usersend === loggedInUser.id).length}</Text> {/* Exibe a quantidade de feedbacks enviados pelo usuário logado */}
          </View>
        )}
      </View>
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
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
  },
  rankingContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#4B4B4B',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 16,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  loggedInUserRow: {
    backgroundColor: '#5271FF',
    borderBottomWidth: 0,
  },
  rank: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    width: 24,
    textAlign: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  userName: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Poppins-Regular'
  },
  userScore: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular'
  },
  postContainer: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  postUserName: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  postTimestamp: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#828282',
  },
  postContent: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  likedHeartIcon: {
    tintColor: 'red',
  },
  likeText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#5271FF',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatIcon: {
    width: 18,
    height: 18,
    marginRight: 8
  },
  commentsContainer: {
    marginTop: 8,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentUser: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginRight: 4,
  },
  commentTimestamp: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#828282',
    marginLeft: 8,
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentPost: {
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
