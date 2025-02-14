import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './tabs/Main';
import UnscrambleWordsGame from './components/UnscrambleWordsGame';
import MultipleChoiceGame from './components/MultipleChoiceGame';
import MatchingGame from './components/MatchingGame';
import Online from './tabs/Online';
import Game from './tabs/Game';
import Settings from './tabs/Settings'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, animation: 'scale_from_center' }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Online" component={Online} />
        <Stack.Screen name="UnscrambleWordsGame" component={UnscrambleWordsGame} />
        <Stack.Screen name="MultipleChoiceGame" component={MultipleChoiceGame} />
        <Stack.Screen name="MatchingGame" component={MatchingGame} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
