import * as React from 'react';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Switch } from 'react-native';

const { width, height } = Dimensions.get('window');

const Settings = React.memo(() => {
  const [checked, setChecked] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

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
        <View style={[
          styles.switchContainer,
          { backgroundColor: isDarkMode ? "dodgerblue" : "#767577", alignItems: isDarkMode ? 'flex-end' : 'flex-start' }
        ]}>
          <Switch
            trackColor={{ false: "#767577", true: "dodgerblue" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
            style={styles.iosSwitch}
          />
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  optionName: {
    fontSize: 15,
    fontWeight: 'bold',
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
  iosSwitch: {
    transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }],
  },
  switchContainer: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 5,
  },
});

export default Settings;