import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Navbar from '../components/navbar';

export default function Dictionary({ navigation }) {
  return (
  <>
    <View style={styles.container}>
      <Text>This is the dictionary page!</Text>
    </View>
    <Navbar navigation={navigation} />
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});