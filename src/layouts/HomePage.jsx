import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, Alert } from 'react-native';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((json) => {
        if (json && Array.isArray(json)) {
          setData(json);
        } else {
          Alert.alert('Error', 'Invalid data received');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomePage;
