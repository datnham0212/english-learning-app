import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Game1 = React.memo(() => {
  return (
    <View style={styles.container}>
      <Text>First game!</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Game1;