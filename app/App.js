import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './tabs/Main';
import UnscrambleWordsGame from './games/UnscrambleWordsGame';
import MultipleChoiceGame from './games/MultipleChoiceGame';
import SentenceBuildingGame from './games/SentenceBuildingGame';
import OldMatchingGame from './games/OldMatchingGame';
import SchulteTable from './games/SchulteTable';
import MemoryFlipGame from './games/MemoryFlipGame';
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
        <Stack.Screen name="SentenceBuildingGame" component={SentenceBuildingGame} />
        <Stack.Screen name="MultipleChoiceGame" component={MultipleChoiceGame} />
        <Stack.Screen name="MemoryFlipGame" component={MemoryFlipGame} />
        <Stack.Screen name="SchulteTable" component={SchulteTable} />
        <Stack.Screen name="MatchingGame" component={OldMatchingGame} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
