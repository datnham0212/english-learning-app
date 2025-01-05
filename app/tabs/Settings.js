import * as React from 'react';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const Settings = React.memo(() => {
  const [checked, setChecked] = useState('en');

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.optionName}>Volume</Text>
        <Slider
          style={{ width: width * 0.75 }}
          minimumValue={0}
          maximumValue={100}
          value={50}
          thumbTintColor='white'
          minimumTrackTintColor="dodgerblue"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionName}>Difficulty</Text>
      </View>
      <View style={styles.option}>
        <Text style={styles.optionName}>Dark Mode</Text>
      </View>
      <View style={styles.option}>
        <Text style={styles.optionName}>Language</Text>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity onPress={() => setChecked('en')} style={styles.radioButtonItem}>
            <Image source={require('../assets/en.png')} style={[styles.flag, checked === 'en' && styles.selectedFlag]} />
            <Text>English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChecked('vi')} style={styles.radioButtonItem}>
            <Image source={require('../assets/vn.png')} style={[styles.flag, checked === 'vi' && styles.selectedFlag]} />
            <Text>Vietnamese</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  flag: {
    width: 40,
    height: 30,
    marginLeft: 5,
    marginRight: 10,
  },
  selectedFlag: {
    borderWidth: 2,
    borderColor: 'dodgerblue',
  },
});

export default Settings;