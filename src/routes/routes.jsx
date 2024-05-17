import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import App from '../../App';
import FeedScreen from '../layouts/FeedScreen';
import LoginScreen from '../layouts/LoginScreen';
import SignUpScreen from '../layouts/SignUpScreen';


const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
      name="App"
      component={App}
      />

      <Tab.Screen
      name="Home"
      component={FeedScreen}
      />

      <Tab.Screen
      name="LoginScreen"
      component={LoginScreen}
      /> 
      
      <Tab.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      /> 
    </Tab.Navigator>
  )
}