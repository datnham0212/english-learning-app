import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the settings page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});