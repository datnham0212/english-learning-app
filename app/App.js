import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';
import { UserProvider } from './context/UserContext';
import { playBackgroundMusic } from './sound/BGmusic';

export default function App() {
  React.useEffect(() => {
    playBackgroundMusic();
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserProvider>
  );
}