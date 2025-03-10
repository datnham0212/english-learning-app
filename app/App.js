import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';
import {playBackgroundMusic} from'./sound/BGmusic';

export default function App() {
  React.useEffect(() => {
    playBackgroundMusic();
  }, []);
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
