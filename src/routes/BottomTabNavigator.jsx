import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Culture from '../layouts/CulturePage';
import FeedScreen from '../layouts/FeedScreen';
import Profile from '../layouts/UserProfile';
import TermsUsage from '../components/UsageTerms';
import Metrics from '../layouts/Metrics';
import NozesTrading from '../extrasFuture/NozesTrading';
import NewFeedUp from '../layouts/NewFeedUp';

import cultureIcon from '../assets/images/menu/cultureIcon.png';
import feedbackIcon from '../assets/images/menu/feedbackIcon.png';
import homeIcon from '../assets/images/menu/homeIcon.png';
import profileIcon from '../assets/images/menu/profileIcon.png';

const Tab = createBottomTabNavigator(); // Criação do menu inferior
const Stack = createStackNavigator(); // Criação do menu superior

// Definição das telas que serão exibidas no menu superior
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Feed" component={FeedScreen} />
    <Stack.Screen name="TermsUsage" component={TermsUsage} />
    <Stack.Screen name="Metrics" component={Metrics} />
    <Stack.Screen name="NozesTrading" component={NozesTrading} />
  </Stack.Navigator>
);
// Definição das telas que serão exibidas no menu inferior
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={homeIcon} style={{ width: 35, height: 35, tintColor: 'black' }} />
          ),
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={NewFeedUp}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={feedbackIcon} style={{ width: 24, height: 24, tintColor: 'black' }} />
          ),
        }}
      />
      <Tab.Screen
        name="Cultura"
        component={Culture}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={cultureIcon} style={{ width: 24, height: 24, tintColor: 'black' }} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={profileIcon} style={{ width: 24, height: 24, tintColor: 'black' }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}