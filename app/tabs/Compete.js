import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoBackButton from '../components/goback';
const Compete = React.memo(() => {
  return (
    <View style={styles.container}>
      <GoBackButton />
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

export default Compete;