import * as React from 'react';
import { useState } from 'react';
import { Switch } from 'react-native-switch';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

const Settings = React.memo(() => {
  const [checked, setChecked] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
  const [volume, setVolume] = useState(0.5); // Volume state (range 0 - 1)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        
        {/* Volume Control */}
        <View style={styles.option}>
          <Text style={styles.optionName}>Volume</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            onSlidingComplete={(val) => setVolume(val)} // Update on sliding complete
            minimumTrackTintColor="dodgerblue"
            maximumTrackTintColor="gray"
            thumbTintColor="dodgerblue"
          />
        </View>

        {/* Dark Mode */}
        <View style={styles.option}>
          <Text style={styles.optionName}>Dark Mode</Text>
          <View>
            <Switch
              value={isDarkMode} // Set current state here
              onValueChange={(val) => {
                setIsDarkMode(val); // Update state with the new value
              }}
              disabled={false}
              circleSize={30}
              circleBorderWidth={0}
              backgroundActive={'dodgerblue'}
              backgroundInactive={'gray'}
              circleActiveColor={'#ffffff'}
              circleInActiveColor={'#ffffff'}
              changeValueImmediately={true}
              innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
              outerCircleStyle={{}}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={2.01}
              switchBorderRadius={30}
            />
          </View>
        </View>

        {/* Language Selection */}
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
    </GestureHandlerRootView>
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
    height: 120,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    margin: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  optionName: {
    fontSize: 17,
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
    borderWidth: 3,
    borderColor: 'dodgerblue',
  },
  slider: {
    width: 250, 
    height: 40,
  },
});

export default Settings;
