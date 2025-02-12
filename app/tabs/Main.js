import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Main = React.memo(() => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity style={[styles.mode_selection, { backgroundColor: 'dodgerblue' }]} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.mode_name}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.mode_selection, { backgroundColor: 'grey' }]} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.mode_name}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
});

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
  }
});

export default Main;