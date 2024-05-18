import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserProfiler = () => {
    const navigation = useNavigation();

    const userData = {
        name: 'Nome do Usuário',
        team: 'Equipe do Usuário',
        profilePicture: require('../assets/image.png'), // Substitua pelo caminho da foto de perfil real
        feedbacks: [
            { id: 1, text: 'Feedback 1' },
            { id: 2, text: 'Feedback 2' },
            { id: 3, text: 'Feedback 3' },
        ],
    };
    return (

        <View style={styles.container}>
            {/* Perfil do usuário */}
            <View style={styles.profileContainer}>
                <View style={styles.profileContent}>
                    <Image source={userData.profilePicture} style={styles.profilePicture} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{userData.name}</Text>
                        <Text style={styles.userTeam}>{userData.team}</Text>
                    </View>
                </View>
            </View>

            {/* Feedbacks */}
            <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackTitle}>Seus Feedbacks</Text>
                {userData.feedbacks.length > 0 ? (
                    userData.feedbacks.map(feedback => (
                        <Text key={feedback.id} style={styles.feedback}>{feedback.text}</Text>
                    ))
                ) : (
                    <Text style={styles.noFeedback}>Nenhum feedback recebido ainda</Text>
                )}
            </View>

            {/* Novo Feedback */}
            <View style={styles.newFeedbackContainer}>
                <Text style={styles.newFeedbackTitle}>New Feedback</Text>
                {/* Componente NewFeedUp aqui */}
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        backGroundColor: '#FFFFFF',
    },
    profileContainer: {
        marginBottom: 20,
    },
    profileContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePicture: {
        width: 35,
        height: 35,
        borderRadius: 35,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4B4B4B'
    },
    userTeam: {
        fontSize: 12,
        color: '#9C9C9C',
    },
    feedbackContainer: {
        marginBottom: 20,
    },
    feedbackTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    feedback: {
        fontSize: 16,
        marginBottom: 5,
    },
    newFeedbackContainer: {
        marginBottom: 20,
    },
    newFeedbackTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default UserProfiler;
