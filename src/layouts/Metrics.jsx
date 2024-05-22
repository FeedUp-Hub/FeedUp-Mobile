import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList  } from 'react-native';
import { BarChart, XAxis, YAxis, Grid, PieChart  } from 'react-native-svg-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfigAPI from '../config/services/ConfigAPI';
import styles from '../styles/MetricsStyles';

export default function Metrics() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = () => {
      AsyncStorage.getItem('token')
        .then(token => {
          return ConfigAPI.get('/home', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        })
        .then(response => {
          setFeedbacks(response.data.feedupFound);
        })
        .catch(error => {
          console.error('Erro ao buscar feedbacks:', error);
        });
    };

    fetchFeedbacks();
  }, []);

  const calculateFeedbacksPorHora = () => {
    const feedbacksPorHora = {};

    feedbacks.forEach(feedback => {
      const hour = new Date(feedback.created_at).getHours();
      if (feedbacksPorHora[hour]) {
        feedbacksPorHora[hour] += 1;
      } else {
        feedbacksPorHora[hour] = 1;
      }
    });

    const dataBarras = Object.keys(feedbacksPorHora).map(hour => ({
      value: feedbacksPorHora[hour],
      label: `${hour}:00`
    }));

    return dataBarras.sort((a, b) => b.value - a.value);
  };

  const dataBarras = calculateFeedbacksPorHora();

  const calculateFeedbacksPorValor = () => {
    const feedbacksPorValor = {};

    feedbacks.forEach(feedback => {
      const value = feedback.value;
      if (feedbacksPorValor[value]) {
        feedbacksPorValor[value] += 1;
      } else {
        feedbacksPorValor[value] = 1;
      }
    });

    const blueTones = ['#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', '#3D9970'];

    const dataPie = Object.keys(feedbacksPorValor).map((key, index) => ({
      key: `${key}`,
      value: feedbacksPorValor[key],
      svg: { fill: blueTones[index % blueTones.length] },
      arc: { outerRadius: '100%', padAngle: 0 },
    }));

    return dataPie.sort((a, b) => b.value - a.value);
  };

  const dataPie = calculateFeedbacksPorValor();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/logos/mini-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Métricas</Text>
      <Text style={styles.subtitle}>Aqui você pode visualizar os indicadores de engajamento do aplicativo.</Text>

      <Text style={styles.chartTitle}>Engajamento em Feedbacks</Text>
      {feedbacks.length > 0 && (
        <View style={{ height: 300, flexDirection: 'row' }}>
          <YAxis
            data={dataBarras}
            yAccessor={({ item }) => item.value}
            contentInset={{ top: 30, bottom: 30 }}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={value => `${value}`}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={{ flex: 1 }}
              data={dataBarras}
              yAccessor={({ item }) => item.value}
              svg={{ fill: 'rgba(82, 113, 255, 0.8)' }}
              contentInset={{ top: 30, bottom: 30 }}
              gridMin={0}
            >
            </BarChart>
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={dataBarras}
              xAccessor={({ index }) => index}
              formatLabel={(value, index) => dataBarras[index]?.label || ''}
              contentInset={{ left: 15, right: 15 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        </View>
      )}

      <Text style={styles.chartTitle}>Valores mais atribuídos</Text>
     {feedbacks.length > 0 && (
        <View style={{ alignItems: 'center', width: '100%' }}>
          <PieChart
            style={{ height: 300, width: '100%' }}
            data={dataPie}
            innerRadius="30%"
            outerRadius="80%"
            labelRadius="90%"
          />
          <FlatList
            data={dataPie}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <Text style={styles.pieChartText}>
                {item.key}: {item.value}
              </Text>
            )}
          />
        </View>
      )}

    </ScrollView>
  );
}