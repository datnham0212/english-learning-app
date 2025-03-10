import * as React from 'react';
import { useState } from 'react';
import { Switch } from 'react-native-switch';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import GoBackButton from '../components/goback';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const Settings = React.memo(() => {
  const [checked, setChecked] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
  const [volume, setVolume] = useState(0.5); // Volume state (range 0 - 1)
  const [timer, setTimer] = useState(60); // Timer state (default 1 min)
  const [musicOn, setMusicOn] = useState(true);  // Toggle state for music
  const [sfxState, setSfxState] = useState('volume-2');  // Toggle state for SFX (initially set to 'volume-2')
  const [vibrateOn, setVibrateOn] = useState(false);  // Toggle state for vibrate functionality

  const incrementTimer = () => {
    if (timer === 30) {
      setTimer(60);
    } else if (timer === 60) {
      setTimer(120);
    }
  };

  const decrementTimer = () => {
    if (timer === 120) {
      setTimer(60);
    } else if (timer === 60) {
      setTimer(30);
    }
  };

  const toggleMusic = () => setMusicOn(prev => !prev);  // Toggle music state

  // Toggle SFX state between 'volume', 'volume-1', 'volume-x'
  const toggleSFX = () => {
    setSfxState(prev => {
      switch (prev) {
        case 'volume':
          return 'volume-1';
        case 'volume-1':
          return 'volume-2';
        case 'volume-x':
          return 'volume';
        default:
          return 'volume-x';
      }
    });
  };

  // Toggle vibrate state
  const toggleVibrate = () => setVibrateOn(prev => !prev);  // Toggle vibrate state

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GoBackButton />

        {/* Sound, Volume, and Vibration Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.control}>
            <Text style={styles.controlText}>Sound</Text>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleMusic}>
              <Icon1 name={musicOn ? "music" : "music-off"} size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.control}>
            <Text style={styles.controlText}>Volume</Text>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleSFX}>
              <FeatherIcon name={sfxState} size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.control}>
            <Text style={styles.controlText}>Vibration</Text>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleVibrate}>
              <Icon1 name={vibrateOn ? "vibrate" : "vibrate-off"} size={30} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dark Mode */}
        <View style={styles.option}>
          <View style={styles.iconAndName}>
            <Icon1 name="theme-light-dark" size={30} color="black" />
            <Text style={styles.optionName}>Dark Mode</Text>
          </View>
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

        {/* Language Selection */}
        <View style={styles.option}>
          <View style={styles.iconAndName}>
            <Icon2 name="earth" size={30} color="black" />
            <Text style={styles.optionName}>Language</Text>
          </View>

          <View style={styles.languageContainer}>
            {checked === 'en' ? (
              <TouchableOpacity onPress={() => setChecked('vi')} style={styles.languageItem}>
                <Image source={require('../assets/en.png')} style={styles.flag} />
                <Text style={styles.languageText}>English</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setChecked('en')} style={styles.languageItem}>
                <Image source={require('../assets/vn.png')} style={styles.flag} />
                <Text style={styles.languageText}>Tiếng Việt</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Timer Selection */}
        <View style={styles.option}>
          <View style={styles.iconAndName}>
            <Icon1 name="timer" size={30} color="black" />
            <Text style={styles.optionName}>Timer</Text>
          </View>
          <View style={styles.timerContainer}>
            <TouchableOpacity onPress={decrementTimer} style={styles.timerButton}>
              <Text style={styles.timerButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.timerValue}>
              {timer === 30 ? '30 sec' : timer === 60 ? '1 min' : '2 min'}
            </Text>
            <TouchableOpacity onPress={incrementTimer} style={styles.timerButton}>
              <Text style={styles.timerButtonText}>+</Text>
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
  iconAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  timerButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  timerButtonText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  timerValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  toggleButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  control: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3 - 20,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  controlText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  languageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Settings;