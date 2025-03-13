import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Compete from '../tabs/Compete';
import Leaderboard from '../tabs/Leaderboard';
import UserProfile from './userProfile';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
      <Tab.Navigator
        initialRouteName="Compete"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Compete') {
              iconName = 'sword-cross';
            } else if (route.name === 'Leaderboard') {
              iconName = 'medal';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#009e60',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Compete" component={Compete} options={{ headerShown: false }} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} options={{ headerShown: false }} />
      </Tab.Navigator>
  );
}