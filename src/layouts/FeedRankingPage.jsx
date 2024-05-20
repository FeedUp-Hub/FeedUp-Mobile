import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const initialPosts = [
  {
    id: '1',
    content: 'Este é o primeiro post.',
    likes: 0,
    comments: [],
    userImage: require('../assets/image.png'),
    userName: 'Usuário 1',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    content: 'Este é o segundo post.',
    likes: 0,
    comments: [],
    userImage: require('../assets/image.png'),
    userName: 'Usuário 2',
    timestamp: new Date().toISOString()
  },
  {
    id: '3',
    content: 'Este é o terceiro post.',
    likes: 0,
    comments: [],
    userImage: require('../assets/image.png'),
    userName: 'Usuário 3',
    timestamp: new Date().toISOString()
  }
];

const topUsers = [
  { id: '1', name: 'Usuário A', feedbackCount: 25 },
  { id: '2', name: 'Usuário B', feedbackCount: 20 },
  { id: '3', name: 'Usuário C', feedbackCount: 15 }
];

const onlineUser = { id: '4', name: 'Usuário Online', feedbackCount: 10 };

export default function FeedScreen() {
  const [posts, setPosts] = useState(initialPosts);
  const [newComments, setNewComments] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [likedComments, setLikedComments] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setPosts([...posts]);
    }, 10000);
    return () => clearInterval(interval);
  }, [posts]);

  const handleLike = (postId) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.findIndex(post => post.id === postId);
    if (index !== -1) {
      if (likedPosts[postId]) {
        updatedPosts[index] = { ...updatedPosts[index], likes: updatedPosts[index].likes - 1 };
        const updatedLikedPosts = { ...likedPosts };
        delete updatedLikedPosts[postId];
        setLikedPosts(updatedLikedPosts);
      } else {
        updatedPosts[index] = { ...updatedPosts[index], likes: updatedPosts[index].likes + 1 };
        setLikedPosts({ ...likedPosts, [postId]: true });
      }
      setPosts(updatedPosts);
    }
  };

  const handleComment = (postId) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.findIndex(post => post.id === postId);
    if (index !== -1) {
      const commentText = newComments[postId];
      if (commentText.trim().length > 0) {
        updatedPosts[index] = {
          ...updatedPosts[index],
          comments: [
            ...updatedPosts[index].comments,
            {
              text: commentText,
              user: 'Nome do Usuário',
              timestamp: new Date().toISOString()
            }
          ]
        };
        setPosts(updatedPosts);
        setNewComments({ ...newComments, [postId]: '' });
      }
    }
  };

  const handleCommentChange = (postId, text) => {
    setNewComments({ ...newComments, [postId]: text });
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleLikeComment = (postId, commentIndex) => {
    const updatedPosts = [...posts];
    const postIndex = updatedPosts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      const updatedComments = [...updatedPosts[postIndex].comments];
      if (likedComments[postId] && likedComments[postId][commentIndex]) {
        updatedComments[commentIndex] = { ...updatedComments[commentIndex], likes: updatedComments[commentIndex].likes - 1 };
        const updatedLikedComments = { ...likedComments };
        updatedLikedComments[postId][commentIndex] = false;
        setLikedComments(updatedLikedComments);
      } else {
        updatedComments[commentIndex] = { ...updatedComments[commentIndex], likes: updatedComments[commentIndex].likes + 1 };
        const updatedLikedComments = { ...likedComments };
        if (!updatedLikedComments[postId]) updatedLikedComments[postId] = {};
        updatedLikedComments[postId][commentIndex] = true;
        setLikedComments(updatedLikedComments);
      }
      updatedPosts[postIndex] = { ...updatedPosts[postIndex], comments: updatedComments };
      setPosts(updatedPosts);
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={item.userImage} style={styles.userImage} />
        <View style={styles.postDetails}>
          <Text style={styles.postTimestamp}>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: ptBR })}</Text>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.postContent}>{item.content}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
          <Image source={require('../assets/images/icons/heart.png')} style={[styles.heartIcon, likedPosts[item.id] && styles.likedHeartIcon]} />
          <Text style={styles.likeCount}>{item.likes}</Text>
          <Text style={styles.likeText}>{likedPosts[item.id] ? 'Curtiu' : 'Curtir'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleComments(item.id)} style={styles.commentButton}>
          <Image source={require('../assets/images/icons/feed-chat.png')} style={styles.chatIcon} />
          <Text>Ver comentários</Text>
        </TouchableOpacity>
      </View>
      {expandedComments[item.id] && (
        <View style={styles.comments}>
          {item.comments.map((comment, index) => (
            <View key={index} style={styles.comment}>
              <Text style={styles.commentUser}>{comment.user}: </Text>
              <Text>{comment.text}</Text>
              <Text style={styles.commentTimestamp}>{formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true, locale: ptBR })}</Text>
              <TouchableOpacity onPress={() => handleLikeComment(item.id, index)} style={styles.likeButton}>
                <Image source={require('../assets/images/icons/heart.png')} style={[styles.heartIcon, likedComments[item.id]?.[index] && styles.likedHeartIcon]} />
                <Text style={styles.likeCount}>{comment.likes}</Text>
              </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      {/* Container com informações */}
      <View style={styles.infoContainer}>
        {/* Top 3 mais envios de feedback */}
        {topUsers.map((user, index) => (
          <View key={user.id} style={styles.infoRow}>
            <Text style={styles.infoData}>{index + 1}</Text>
            <Text style={styles.infoData}>{user.name}</Text>
            <Text style={styles.infoData}>{user.feedbackCount}</Text>
          </View>
        ))}
        {/* Informações do usuário online */}
        <View style={styles.infoUser}>
          <Text style={styles.infoData}>Você</Text>
          <Text style={styles.infoData}>{onlineUser.name}</Text>
          <Text style={styles.infoData}>{onlineUser.feedbackCount}</Text>
        </View>
      </View>

      {/* FlatList dos posts */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    width: 327,
    height: 187,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  infoUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 10,
  },
  infoData: {
    fontSize: 16,
  },
  postsContainer: {
    paddingHorizontal: 10,
  },
  post: {
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 24,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  postTimestamp: {
    fontSize: 11,
    color: '#828282',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  likeText: {
    marginLeft: 5,
  },
  heartIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: 'grey', // Default color
  },
  likedHeartIcon: {
    tintColor: 'red', // Liked color
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  likeCount: {
    fontSize: 16,
    paddingLeft: 5,
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
  commentButtonText: {
    marginRight: 150,
    padding: 5,
  },
  comments: {
    marginTop: 10,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
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
});