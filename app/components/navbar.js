import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Settings from '../tabs/Settings';
import Compete from '../tabs/Compete';
import Dictionary from '../tabs/Dictionary';
import Main from '../tabs/Main';

const Tab = createBottomTabNavigator();

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
              iconName = 'trophy';
            } else if (route.name === 'Dictionary') {
              iconName = 'search';
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
        <Tab.Screen name="Home" component={Main} options={{ headerShown: false }} />
        <Tab.Screen name="Compete" component={Compete} options={{ headerShown: false }} />
        <Tab.Screen name="Dictionary" component={Dictionary} options={{ headerShown: false }} /> 
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}