import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, Button, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const QuitGameButton = React.memo(() => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleQuit = React.useCallback(() => {
    // Handle quitting the game
    navigation.goBack();
    setModalVisible(false);
  }, [navigation]);

  const handleResume = React.useCallback(() => {
    // Handle resuming the game
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Quit game button"
      >
        <Icon name="close" size={25} color="dodgerblue" />
      </TouchableOpacity>

      {/* Modal to ask user for Resume or Quit */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Paused</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleResume}>
                <Text style={styles.buttonText}>Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleQuit}>
                <Text style={styles.buttonText}>Quit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50, // same as settings button in main.js
    left: 20, // same as settings button in main.js
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background behind modal
  },
  modalContainer: {
    width: width * 0.8, // Still keeping the width for the modal, but it could be half if needed
    height: height * 0.5, // Modal now takes up half of the screen height
    padding: 40, // More spacious padding
    backgroundColor: 'white',
    borderRadius: 20, // More rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15, // Enhanced elevation for a more prominent modal
  },
  modalTitle: {
    fontSize: 28, // Increased title font size
    fontWeight: 'bold', // Make the title more prominent
    marginBottom: 100, // Increase space between title and buttons
    textAlign: 'center', // Center title
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column', // Stack buttons vertically
    alignItems: 'center',
    gap: 40, // More spacing between buttons
  },
  modalButton: {
    width: '100%', // Make the button width 80% of the modal container
    height: 70,
    paddingVertical: 15, // Larger height for the button
    backgroundColor: '#007bff', // Blue background for buttons
    borderRadius: 25, // Rounder edges for buttons
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8, // Add shadow for the buttons as well
  },
  buttonText: {
    color: 'white', // White text for the buttons
    fontSize: 18, // Larger font size
    fontWeight: 'bold', // Make text bold
  },
});

export default QuitGameButton;
