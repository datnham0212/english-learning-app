import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Leaderboard = React.memo(() => {
  return (
    <View style={styles.container}>
      <Text>This is the leaderboard page!</Text>
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

export default Leaderboard;