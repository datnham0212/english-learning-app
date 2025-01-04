import * as React from 'react';
import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Settings = React.memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.option}>
      <Text style={styles.optionName}>Volume</Text>
      <Slider
          style={{ width: width * 0.75}}
          minimumValue={0}
          maximumValue={100}
          value={50}
          thumbTintColor='white'
          minimumTrackTintColor="dodgerblue"
          // maximumTrackTintColor= { isDarkMode ? "#ffffff" : "#000000" }
          maximumTrackTintColor= "#000000" 
        />
      </View>
      <View style={styles.option} />
      <View style={styles.option} />
      <View style={styles.option} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    flexDirection: 'row',
    width: width - 20,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionName: {
    flexDirection: 'column',
    fontSize: 15,
    fontWeight: 'bold',
  }
});

export default Settings;