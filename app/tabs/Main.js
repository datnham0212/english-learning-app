import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Main = React.memo(() => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.mode_selection} onPress={() => navigation.navigate('Settings')}>
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
  },
  mode_selection: {
    width: width * 0.8,
    height: width * 0.3,
    backgroundColor: '#32ba64',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mode_name: {
    fontSize: 25,
    color: 'white',
  }
});

export default Main;