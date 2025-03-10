import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

// Modal Button Component
const ModalButton = React.memo(({ onPress, icon, color, style }) => (
  <TouchableOpacity style={[styles.modalButton, { backgroundColor: color }, style]} onPress={onPress}>
    {icon}
  </TouchableOpacity>
));

// Music and Sound Effects Toggle Button Component
const ToggleButton = React.memo(({ iconName, onPress, IconLibrary, color, style, isToggled }) => (
  <TouchableOpacity style={[styles.toggleButton, style]} onPress={onPress}>
    <IconLibrary name={iconName} size={30} color={color} />
  </TouchableOpacity>
));

// Modal Container Component
const ModalContainer = React.memo(({ title, onResume, onQuit, visible, onClose, onToggleMusic, onToggleSFX, onToggleVibrate, musicOn, sfxState, vibrateOn }) => (
  <Modal
    transparent={true}
    animationType="fade"
    visible={visible}
    onRequestClose={onClose}>
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        
        {/* Music and Sound Effects Icons */}
        <View style={styles.toggleContainer}>
          <ToggleButton
            iconName={musicOn ? "music" : "music-off"}  // Toggle between music and music-off
            onPress={onToggleMusic}
            IconLibrary={MaterialIcon}
            color="green"
            style={styles.toggleButtonMargin}
            isToggled={musicOn}
          />
          
          {/* Dynamic SFX Icons based on sfxState */}
          <ToggleButton
            iconName={sfxState}  // Dynamically change between volume icons
            onPress={onToggleSFX}
            IconLibrary={FeatherIcon}
            color="orange"
          />

          {/* Vibrate Icon */}
          <ToggleButton
            iconName={vibrateOn ? "vibrate" : "vibrate-off"}  // Toggle between vibrate and vibrate-off
            onPress={onToggleVibrate}
            IconLibrary={MaterialIcon}
            color="blue"
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <View style={styles.quitContainer}>
            <ModalButton onPress={onQuit} icon={<MaterialIcon name="exit-run" size={40} color="white" />} color="red" />
          </View>
          
          <ModalButton onPress={onResume} icon={<MaterialIcon name="motion-play-outline" size={40} color="white" />} color="#009E49" />
        </View>
      </View>
    </View>
  </Modal>
));

// Main Button Component (QuitGameButton)
const QuitGameButton = React.memo(() => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [musicOn, setMusicOn] = React.useState(true);  // Toggle state for music
  const [sfxState, setSfxState] = React.useState('volume-2');  // Toggle state for SFX (initially set to 'volume-2')
  const [vibrateOn, setVibrateOn] = React.useState(false);  // Toggle state for vibrate functionality

  const handleQuit = React.useCallback(() => {
    navigation.goBack();
    setModalVisible(false);
  }, [navigation]);

  const handleResume = React.useCallback(() => {
    setModalVisible(false);
  }, []);

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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Quit game button"
      >
        <FeatherIcon name="x" size={25} color="dodgerblue" />
      </TouchableOpacity>

      <ModalContainer
        visible={modalVisible}
        title="Paused"
        onResume={handleResume}
        onQuit={handleQuit}
        onClose={() => setModalVisible(false)}
        onToggleMusic={toggleMusic}
        onToggleSFX={toggleSFX}
        onToggleVibrate={toggleVibrate}  // Pass vibrate toggle function
        musicOn={musicOn}
        sfxState={sfxState}
        vibrateOn={vibrateOn}  // Pass vibrate state to the modal
      />
    </View>
  );
});

// Styles (Updated for new layout, toggle buttons, and text)
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.6,  // Smaller modal width
    height: height * 0.4,  // Slightly bigger modal height
    padding: 30,  // Reduced padding
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  modalTitle: {
    fontSize: 22,  // Slightly smaller title font size
    fontWeight: 'bold',
    marginBottom: 30,  // Reduced margin below the title
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  // Spread the toggle buttons evenly
    width: '100%',  // Make container full width
    marginBottom: 30,  // Add margin between icons and buttons
  },
  toggleButton: {
    width: 50,  // Same size as exit and resume buttons
    height: 50,  // Same size as exit and resume buttons
    backgroundColor: 'white',
    borderRadius: 35,  // Ensure circular buttons
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonContainer: {
    flexDirection: 'row',  // Align buttons side by side
    justifyContent: 'center',  // Center the buttons horizontally
    width: '80%',  // Make the button container slightly wider for better spacing
    gap: 20,  // Create a slight gap between the buttons
  },
  quitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,  // Gap between text and button
  },
  modalButton: {
    width: 70,  // Increase button size
    height: 70,  // Increase button size
    borderRadius: 35,  // Ensure circular buttons
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuitGameButton;
