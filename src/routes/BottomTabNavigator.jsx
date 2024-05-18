import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import NewFeedUp from '../layouts/NewFeedUp';
import Culture from '../layouts/CulturePage';
import FeedScreen from '../layouts/FeedScreen';
import Profile from '../layouts/UserProfile';
import cultureIcon from '../assets/images/menu/cultureIcon.png';
import feedbackIcon from '../assets/images/menu/feedbackIcon.png';
import homeIcon from '../assets/images/menu/homeIcon.png';
import profileIcon from '../assets/images/menu/profileIcon.png';

export default function BottomTabNavigator() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name='Home'
                component={FeedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={homeIcon} style={{ width: 35, height: 35, tintColor: 'black' }} />
                    ),
                }}
            />
            <Tab.Screen
                name='Feedback'
                component={NewFeedUp}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={feedbackIcon} style={{ width: 24, height: 24, tintColor: 'black' }} />
                    ),
                }}
            />
            <Tab.Screen
                name='Cultura'
                component={Culture}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={cultureIcon} style={{ width: 24, height: 24, tintColor: 'black' }} />
                    ),
                }}
            />
            <Tab.Screen
                name='Perfil'
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
