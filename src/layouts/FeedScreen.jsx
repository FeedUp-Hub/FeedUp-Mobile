import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { feedbacksData } from '../components/feedbacksData';

export default function FeedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/image.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewFeedUp')}>
          <Text style={styles.addButtonIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.title}>Feedbacks fornecidos</Text>

      {/* Container do Ranking - Ajustar de acordo com a API */}
      <ScrollView style={styles.rankingContainer}>
        {feedbacksData.map((feedback) => (
          <Feedback
            key={feedback.id}
            author={feedback.author}
            text={feedback.text}
            avatar={feedback.photo}
            dateTime={feedback.dateTime}
            liked={feedback.liked}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const Feedback = ({ username, text, avatar }) => (
  <View style={styles.tweet}>
    <Image source={{ avatar }} style={styles.avatar} />
    {/* Ou */}
    {/* <Image source={{ urir: `${avatar}` }} style={styles.avatar} /> */}
    <View style={styles.tweetContent}>
      <Text style={styles.username}>{username}</Text>
      <Text>{text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 51,
  },
  logo: {
    width: 38,
    height: 38
  },
  addButton: {
    position: 'absolute',
    right: 110,
    width: 33,
    height: 33,
    paddingTop: 20
  },
  addButtonIcon: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    paddingLeft: 20,
    paddingTop: 50,
    fontSize: 15,
    color: '#4B4B4B',
  },
  rankingContainer: {
    width: 327,
    height: 187,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 327,
    height: 47,
  },
  position: {
    paddingLeft: 20,
    fontSize: 12,
    color: '#fff',
  },
  username: {
    flex: 1,
    fontSize: 11,
    color: '#fff',
    textAlign: 'right',
    paddingRight: 9,
  },
  feedbacks: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
    position: 'absolute',
    right: 26,
  },
  thumbnail: {
    width: 27,
    height: 27,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
