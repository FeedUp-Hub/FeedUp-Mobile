import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFonts } from "expo-font";
import FONTS from "../styles/fonts/fonts";

import AsyncStorage from '@react-native-async-storage/async-storage'; //para pegar token de autenticacao, ja salvo
import ConfigAPI from '../config/services/ConfigAPI'; //para buscar feedbacks via api

export default function FeedScreen() {

    let [fontsLoaded] = useFonts({
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    });

    if (!fontsLoaded) {
      return <AppLoading />;
    }

  const [posts, setPosts] = useState([]);
  const [userInfos, setUserInfo] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [comments, setComments] = useState({});
  const [loggedUserEmail, setLoggedUserEmail] = useState('');


  <Image source={require('../assets/images/icons/heart.png')} />

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //pega token pra autenticar
        const token = await AsyncStorage.getItem('token');
        const loggedUser = await AsyncStorage.getItem('loggedUser'); //pra pegar o usuario logado, sera usado no momento de adicionar comentario
        setLoggedUserEmail(loggedUser);

        //chamada da api pra pegar feedups salvos
        const response = await ConfigAPI.get('/home', {
          headers: {
            Authorization: `Bearer ${token}` //parametro passando token pra autenticacao
          }
        });

        //console.log('pegou feedbacks', response.data.feedupFound); //para manutencao

        //pega os feedbacks e usuarios via API
        setPosts(response.data.feedupFound);
        setUserInfo(response.data.users);

      } catch (error) {
        console.error('Erro na busca pelos feedbacks', error);
      }
    };

    fetchPosts(); // Chame a função para buscar os posts quando o componente for montado
  }, []); // Passando um array vazio como segundo argumento, garantimos que a chamada à API só será feita uma vez

//busca informações do usuário pelo ID
const getUserInfo = async (userId) => {
  try {
    const user = userInfos.find(user => user.id === userId);
    return user ? user.username : 'Usuário Desconhecido';
  } catch (error) {
    console.error('Erro ao buscar informações do usuário:', error);
    return 'Usuário Desconhecido'; // Retorna 'Usuário Desconhecido' em caso de erro
  }
};

//busca os comentários de um feedback específico
const fetchComments = async (postId) => {
  //console.log('check de parametro', postId);
  try {
    const token = await AsyncStorage.getItem('token');

    // Faz a chamada à API para buscar os comentários do feedback com o ID postId
    const response = await ConfigAPI.get(`/comments/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}` //parametro passando token pra autenticacao
      },
    });

    // Verifica se a requisicao veio vazia (nao ha comentarios para aquele feedback)
    if (!response.data || response.data.length === 0) {
      //console.log('Nenhum comentário encontrado.');
      return []; //Retorna uma lista vazia se não houver comentários
    }

    //Extrai as informações relevantes dos comentários
   const comments = await Promise.all(response.data.map(async (comment) => {
      const userName = await getUserInfo(comment.id_usercommented);
      return {
        message: comment.message,
        created_at: comment.created_at,
        username: userName,
      };
    }));

    //Retorna os comentários
    return comments;

  } catch (error) {
    //console.error('Erro ao buscar comentários:', error);
    return []; //Retorna uma lista vazia em caso de erro
  }
};

  // Função para curtir um post
  const handleLike = (postId) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.findIndex(post => post.id === postId);
    if (index !== -1) {
      if (likedPosts[postId]) {
        updatedPosts[index] = { ...updatedPosts[index], likes: updatedPosts[index].likes - 1 };
        const updatedLikedPosts = { ...likedPosts };
        updatedLikedPosts[postId] = false; // Altera para não curtido
        setLikedPosts(updatedLikedPosts);
      } else {
        updatedPosts[index] = { ...updatedPosts[index], likes: updatedPosts[index].likes + 1 };
        const updatedLikedPosts = { ...likedPosts };
        updatedLikedPosts[postId] = true; // Altera para curtido
        setLikedPosts(updatedLikedPosts);
      }
      setPosts(updatedPosts);
    }
};


  // Função para adicionar um comentário a um post
  const handleComment = async (postId) => {
    const commentText = newComments[postId];

    if (!commentText.trim()) {
      return; //não adiciona comentários vazios
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const response = await ConfigAPI.post(`/comments/${postId}`,
        { message: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        //201 = comentário adicionado com sucesso
        const newComment = {
          message: commentText,
          created_at: new Date().toISOString(),
          username: loggedUserEmail,
        };

        setComments((prevComments) => ({...prevComments,[postId]: [...(prevComments[postId] || []), newComment],}));

        // limpa o campo de comentário após adicionar
        setNewComments((prevComments) => ({ ...prevComments, [postId]: '',}));
      }
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
};

  // Função para atualizar o texto do comentário
  const handleCommentChange = (postId, text) => {
    setNewComments({ ...newComments, [postId]: text });
  };

   // Função para expandir ou recolher os comentários de um post
  const toggleComments = async (postId) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));

    if (!expandedComments[postId]) {
      // Se os comentários estão sendo expandidos, buscar os comentários desse post
      try {
        const comments = await fetchComments(postId);
        setComments((prevComments) => ({...prevComments,[postId]: comments,}));
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    }
  };

  // Função para renderizar um post
  const renderPost = ({ item }) => (
    //parte para trazer feedbacks
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={require('../assets/images/icons/icon-user.png')} style={styles.postUserImage} />
        <View>
          <Text style={styles.postUserName}>{item.sender_username}</Text>
          <Text style={styles.postTimestamp}>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: ptBR })}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>@{item.receiver_username}:{'\n'} {item.message}</Text>

      {/*parte para botoes de curtir e comentar*/}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
          <Image source={require('../assets/images/icons/heart.png')} style={[styles.heartIcon, likedPosts[item.id] && styles.likedHeartIcon]} />
          {/*<Text style={styles.likeCount}>{item.likes}</Text> ainda nao tem likes na api */}
          <Text style={styles.likeText}>{likedPosts[item.id] ? 'Curtiu' : 'Curtir'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleComments(item.id)} style={styles.commentButton}>
          <Image source={require('../assets/images/icons/feed-chat.png')} style={styles.chatIcon} />
          <Text>Ver comentários</Text>
        </TouchableOpacity>
      </View>

      {/*expandir comentarios*/}
      {expandedComments[item.id] && comments[item.id] && (
        <View style={styles.commentsContainer}>

          {/*percorre comentarios do feedback*/}
          {comments[item.id].map((comment, index) => (
            <View key={index} style={styles.comment}>

              {/*pega usuario que enviou comentario*/}
              <Text style={styles.commentUser}>{comment.username}: </Text>

              {/*pega mensagem do comentario*/}
              <Text>{comment.message.replace(/[{}]/g, '')}</Text>

              {/*pega data do comentario*/}
              <Text style={styles.commentTimestamp}>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ptBR })}</Text>

            </View>
          ))}
        </View>
      )}

      {/*novo comentario*/}
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

  // Renderiza a tela
  return (
  <View style={styles.container}>
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
    backgroundColor: '#F9F9F9', // Cor de fundo clara
    padding: 15, // Padding geral ao redor
  },
  rankingContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E0E0E0',
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
    fontSize: 16,
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
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
  userScore: {
    fontSize: 16,
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
    elevation: 2, // Sombra em Android
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
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  postTimestamp: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#828282',
  },
  postContent: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  likedHeartIcon: {
    tintColor: 'red',
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#5271FF',
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
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#828282',
    marginLeft: 8,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  chatIcon: {
    width: 18,
    height: 18,
    marginRight: 8
  },
  addCommentInput: {
    flex: 1,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addCommentButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#5271FF',
    borderRadius: 8,
  },
  addCommentButtonText: {
    color: '#FFF',
  },
  likeCount: {
    fontSize: 16,
    paddingLeft: 5,
  },
  likeText: {
    marginLeft: 5,
  },
  likeButton: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#5271FF',
    opacity: 0.4,
    color: '#000000',
    borderRadius: 15,
  },
  heartIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: 'grey', // Default color
  },
  commentButton: {
    width: 150,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#5271FF',
    opacity: 0.4,
    color: '#000000',
    borderRadius: 15,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
   comments: {
    marginTop: 10,
  },
});