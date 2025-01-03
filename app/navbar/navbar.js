import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Navbar({ navigation }) {
  const handlePress = (routeName) => {
    const currentRoute = navigation.getState().routes[navigation.getState().index].name;
    if (currentRoute === routeName) {
      navigation.reset({
        index: 0,
        routes: [{ name: routeName }],
      });
    } else {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity style={styles.icon} onPress={() => handlePress('Home')}>
        <Ionicons name="home" size={32} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => handlePress('Compete')}>
        <Ionicons name="shield" size={32} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => handlePress('Leaderboard')}>
        <Ionicons name="trophy" size={32} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => handlePress('Dictionary')}>
        <Ionicons name="book" size={32} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => handlePress('Settings')}>
        <Ionicons name="settings" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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