import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import Settings from '../tabs/Settings';
import Compete from '../tabs/Compete';
import Dictionary from '../tabs/Dictionary';
import Leaderboard from '../tabs/Leaderboard';
import Main from '../tabs/Main';
import Message from '../tabs/Message';
import UserProfile from '../components/userProfile';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Main" component={Main} options={{ headerTitle: () => <UserProfile /> }} />
      <HomeStack.Screen name="Message" component={Message} />
    </HomeStack.Navigator>
  );
}

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
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Compete" component={Compete} options={{ headerShown: false }} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} options={{ headerShown: false }} />
        <Tab.Screen name="Dictionary" component={Dictionary} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}