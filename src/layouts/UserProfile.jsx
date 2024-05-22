import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfigAPI from '../config/services/ConfigAPI';

const UserProfiler = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [feedbackReceived, setFeedbackReceived] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await ConfigAPI.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.users[0]);
        setFeedbackReceived(response.data.feedback_received);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null; // Você pode substituir por um componente de carregamento
  }

  return (
    <ScrollView style={styles.container}>
       <Image
          source={require('../assets/images/logos/mini-logo.png')}
          style={styles.logoProfile}
          resizeMode="contain"
       />
      {userData && (
        <View>
          {/* Perfil do usuário */}
          <View style={styles.profileContainer}>
            <View style={styles.profileContent}>
              <Image source={require('../assets/images/icons/icon-user.png')} style={styles.profilePicture} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userTeam}>{userData.role}</Text>
              </View>
            </View>
          </View>

          {/* Feedbacks Recebidos */}
          <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackTitle}>Feedbacks Recebidos</Text>
              {feedbackReceived.length > 0 ? (
                <View>
                  {(() => {
                    const feedbackViews = [];
                    for (let i = 0; i < feedbackReceived.length; i++) {
                      const feedback = feedbackReceived[i];
                      feedbackViews.push(
                        <View key={i} style={styles.feedback}>
                          <Text style={styles.feedbackDate}>{new Date(feedback.created_at).toLocaleDateString()}</Text>
                          <Text style={styles.feedbackSender}>{feedback.sender_name}</Text>
                          <Text style={styles.feedbackMessage}>{feedback.message}</Text>
                        </View>
                      );
                    }
                    return feedbackViews;
                  })()}
                </View>
              ) : (
                <Text style={styles.noFeedback}>Nenhum feedback recebido ainda</Text>
              )}
            </View>
          </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 80,
    marginRight: 10,
  },
  logoProfile: {
    width: 150,
    height: 38,
    marginLeft: 90,
    marginBottom: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    color: '#4B4B4B',
  },
  userTeam: {
    fontSize: 12,
    color: '#9C9C9C',
    fontFamily: 'Poppins-Regular',
  },
  feedbackContainer: {
    marginBottom: 20,
  },
  feedbackTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4B4B4B',
  },
  feedback: {
    backgroundColor: '#FFF',
    borderRadius: 13,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  feedbackValue: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#4B4B4B',
  },
  feedbackMessage: {
    paddingTop: 17,
    fontSize: 12,
    marginLeft: 50,
    marginRight: 34,
    fontFamily: 'Poppins-Regular',
    color: '#4B4B4B',
  },
  feedbackSender: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#4B4B4B',
  },
  feedbackDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9C9C9C',
    marginLeft: 260,
  },
  noFeedback: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#9C9C9C',
  },
});

export default UserProfiler;
