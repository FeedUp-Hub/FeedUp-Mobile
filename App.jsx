// App.js

import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/layouts/LoginScreen';
import FeedScreen from './src/layouts/FeedScreen';
import SignUpScreen from './src/layouts/SignUpScreen';
import UsageTerms from './src/layouts/UsageTerms';
import HomePage from './src/layouts/HomePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Termos de Uso" component={UsageTerms} options={{ headerShown: false }} />

            {/* 1 = funcionario RH | 2 = Lider | 3 = comum */}
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} initialParams={{ personType: 1 }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
