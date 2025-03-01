import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const Main = React.memo(() => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity style={[styles.mode_selection, { backgroundColor: 'dodgerblue' }]} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.mode_name}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.mode_selection, { backgroundColor: '#fa2a55' }]} onPress={() => navigation.navigate('Online')}>
        <Text style={styles.mode_name}>Online Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Icon name="cog" size={30} color="white" style={styles.icon} />
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
  }
});

export default Main;
