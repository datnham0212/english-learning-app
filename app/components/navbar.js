import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import Settings from '../tabs/Settings';
import Compete from '../tabs/Compete';
import Dictionary from '../tabs/Dictionary';
import Leaderboard from '../tabs/Leaderboard';
import Home from '../tabs/Home'; 

const Tab = createBottomTabNavigator();

// User Profile component
const UserProfile = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'dodgerblue', marginRight: 5, marginLeft: -5 }} />
    <Text style={{ fontSize: 20 }}>Username</Text>
  </View>
  <Ionicons name="mail" size={34} color="dodgerblue" onPress={() => console.log('Mail')} />
  </View>
);

export default function Navbar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Compete') {
              iconName = 'shield';
            } else if (route.name === 'Leaderboard') {
              iconName = 'trophy';
            } else if (route.name === 'Dictionary') {
              iconName = 'book';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerTitle: () => <UserProfile /> }} />
        <Tab.Screen name="Compete" component={Compete} options={{ headerShown: false }} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} options={{ headerShown: false }} />
        <Tab.Screen name="Dictionary" component={Dictionary} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}