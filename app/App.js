import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Settings from './tabs/Settings';
import Compete from './tabs/Compete';
import Dictionary from './tabs/Dictionary';
import Leaderboard from './tabs/Leaderboard';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
      
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button 
            title="Start" 
            onPress={() => console.log('Start button pressed!')}
          />
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Compete')}>
          <Ionicons name="shield" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Leaderboard')}>
          <Ionicons name="trophy" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Dictionary')}>
          <Ionicons name="book" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Compete" component={Compete} />
        <Stack.Screen name="Dictionary" component={Dictionary} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#333',
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
  }
});