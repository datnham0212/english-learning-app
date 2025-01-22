import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const Slide = React.memo(() => {
  const navigation = useNavigation(); // Hook to access navigation

  return (
    <View style={styles.container}>
      <Button title='Play' onPress={() => navigation.navigate('Game')} />
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

export default Slide;
