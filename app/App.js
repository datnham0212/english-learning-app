import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';
import { UserProvider } from './context/UserContext';
import { playBackgroundMusic } from './sound/BGmusic';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  React.useEffect(() => {
    playBackgroundMusic();
    NavigationBar.setVisibilityAsync('hidden'); // Hide the navigation bar
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Navigation />
      </NavigationContainer>
    </UserProvider>
  );
}