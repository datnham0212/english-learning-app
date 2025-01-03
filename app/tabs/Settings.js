import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Navbar from '../navbar/navbar';

export default function Settings({ navigation }) {
  return (
  <>
    <View style={styles.container}>
      <Text>This is the settings page!</Text>
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