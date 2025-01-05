import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = React.memo(() => {
  return (
    <View style={styles.container}>
      <Text>This is the message page!</Text>
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

export default Message;