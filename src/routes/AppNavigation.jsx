import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../layouts/LoginScreen';
import ThankYouPage from '../layouts/ThankYouPage';
import NewFeedUp from '../layouts/NewFeedUp';
import OnboardingCarousel from '../layouts/OnboardingCarousel';

const AppNavigation = ({ initialRoute }) => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Onboarding" component={OnboardingCarousel} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={BottomTabNavigator} />
                <Stack.Screen name="Thank You" component={ThankYouPage} />
                <Stack.Screen name="NewFeedUp" component={NewFeedUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
