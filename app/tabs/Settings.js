import * as React from 'react';
import { useState } from 'react';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Switch } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Settings = React.memo(() => {
  const [checked, setChecked] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.optionName}>Volume</Text>
        <Slider 
        progress={progress} 
        minimumValue={min} 
        maximumValue={max} 
        sliderHeight={20}
        thumbWidth={20}
        thumbHeight={20}
        style={{
          borderRadius: 10,
          borderColor: 'transparent',
          overflow: 'hidden',
        }}
        theme={{
          minimumTrackTintColor: 'dodgerblue',
          maximumTrackTintColor: '#DEDEDE',
          cacheTrackTintColor: 'dodgerblue',
          bubbleBackgroundColor: 'dodgerblue',
        }}
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