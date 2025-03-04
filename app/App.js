import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WordScapesGame from './games/WordScapesGame';
import MultipleChoiceGame from './games/MultipleChoiceGame';
import SentenceBuildingGame from './games/SentenceBuildingGame';
import TrueOrFalseGame from './games/TrueOrFalseGame';
import SchulteTable from './games/SchulteTable';
import MemoryFlipGame from './games/MemoryFlipGame';
import ShapeGame from './games/ShapeGame';
import Online from './tabs/Online';
import Game from './tabs/Game';
import Settings from './tabs/Settings'; 

const { width, height } = Dimensions.get('window');
const Stack = createStackNavigator();

const Main = React.memo(() => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity 
        style={[styles.mode_selection, { backgroundColor: 'dodgerblue' }]} 
        onPress={() => navigation.navigate('Game')}
      >
        <View style={styles.iconTextContainer}>
          <Icon name="play" size={30} color="white" style={styles.icon} />
          <Text style={styles.mode_name}>Start</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.mode_selection, { backgroundColor: '#fa2a55' }]} 
        onPress={() => navigation.navigate('Online')}
      >
        <View style={styles.iconTextContainer}>
          <Icon name="sword-cross" size={30} color="white" style={styles.icon} />
          <Text style={styles.mode_name}>Online Mode</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.settingsButton} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="cog" size={30} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, animation: 'scale_from_center' }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Online" component={Online} />
        <Stack.Screen name="WordScapesGame" component={WordScapesGame} />
        <Stack.Screen name="SentenceBuildingGame" component={SentenceBuildingGame} />
        <Stack.Screen name="MultipleChoiceGame" component={MultipleChoiceGame} />
        <Stack.Screen name="MemoryFlipGame" component={MemoryFlipGame} />
        <Stack.Screen name="SchulteTable" component={SchulteTable} />
        <Stack.Screen name="TrueOrFalseGame" component={TrueOrFalseGame} />
        <Stack.Screen name="ShapeGame" component={ShapeGame} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.3,
  },
  mode_selection: {
    width: width * 0.8,
    height: width * 0.3,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  mode_name: {
    fontSize: 25,
    color: 'white',
  },
  iconTextContainer: {
    flexDirection: 'row',  
    alignItems: 'center', 
  },
  icon: {
    marginRight: 0, 
  },
  settingsButton: {
    position: 'absolute',
    top: 50, 
    left: 20,
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});