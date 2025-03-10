import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Scoreboard = ({ score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
  },
  score: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: { width: -1, height: -1 }, 
    textShadowRadius: 10,
  },
});

export default Scoreboard;