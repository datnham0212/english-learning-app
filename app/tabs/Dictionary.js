import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Dictionary({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the dictionary page!</Text>
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