import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Settings from '../tabs/Settings';
import Compete from '../tabs/Compete';
import Dictionary from '../tabs/Dictionary';
import Main from '../tabs/Main';
import Message from '../tabs/Message';
import UserProfile from '../components/userProfile';
import Slide from '../games/Slide'; // Assuming all slides are the same component
import Game from '../games/Game';
import data from '../data/data'; // Import data

// Dynamically generate slide names based on the length of texts in data.
const totalSlides = data.length; // Define the number of slides based on data length
const slideNames = Array.from({ length: totalSlides }, (_, index) => `Slide${index + 1}`);

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    >
      <HomeStack.Screen name="Main" component={Main} options={{ headerTitle: () => <UserProfile /> }} />
      <HomeStack.Screen name="Message" component={Message} />
      {slideNames.map((slideName) => (
        <HomeStack.Screen
          key={slideName}
          name={slideName}
          component={Slide} // All slides can use the same component
          options={{ title: slideName }}
        />
      ))}
      <HomeStack.Screen name="Game" component={Game} />
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
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Compete" component={Compete} options={{ headerShown: false }} />
        <Tab.Screen name="Dictionary" component={Dictionary} options={{ headerShown: false }} /> 
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}