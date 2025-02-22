import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Compete from '../tabs/Compete';
import Leaderboard from '../tabs/Leaderboard';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
      <Tab.Navigator
        initialRouteName="Compete"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Compete') {
              iconName = 'shield';
            } else if (route.name === 'Leaderboard') {
              iconName = 'trophy';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Compete" component={Compete} options={{ headerShown: false }} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} options={{ headerShown: false }} />
      </Tab.Navigator>
  );
}