import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Navbar from './components/navbar';

const Stack = createStackNavigator();

const Settings = React.lazy(() => import('./tabs/Settings'));
const Compete = React.lazy(() => import('./tabs/Compete'));
const Dictionary = React.lazy(() => import('./tabs/Dictionary'));
const Leaderboard = React.lazy(() => import('./tabs/Leaderboard'));

const HomeScreen = React.memo(({ navigation }) => {
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

      <Navbar navigation={navigation} />
    </>
  );
});

export default function App() {
  return (
    <NavigationContainer>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            ...TransitionPresets.ModalFadeTransition,
            headerLeft: () => null,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Compete" component={Compete} />
          <Stack.Screen name="Dictionary" component={Dictionary} />
          <Stack.Screen name="Leaderboard" component={Leaderboard} />
        </Stack.Navigator>
      </React.Suspense>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});