import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Online = React.memo(() => {
  return (
    <View style={styles.container}>
      <Text>This is the compete page!</Text>
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

export default Online;