import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, TextInput, Button, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import GoBackButton from '../components/goback';
import { playSound } from '../sound/opensound';
import UserProfile from '../components/userProfile';

const Compete = React.memo(() => {
  const navigation = useNavigation();
  const { name, setName, isOnline } = React.useContext(UserContext);
  const [modalVisible, setModalVisible] = React.useState(isOnline && !name);

  const handlePress = (route) => {
    playSound(require('../soundassets/opensound.mp3'));
    navigation.navigate(route);
  };

  const handleNameSubmit = () => {
    if (name.trim()) {
      setModalVisible(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (!name.trim()) {
      navigation.navigate('Main'); // Replace 'Main' with the actual route name of your main menu
    }
  };

  return (
    <View style={styles.container}>
      <GoBackButton />
      {!modalVisible && <UserProfile name={name} />}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/** Game Buttons Rows */}
        {gameData.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map((game, idx) => (
              <TouchableOpacity 
                key={idx}
                style={styles.button} 
                onPress={() => handlePress(game.route)}
              >
                <View style={styles.playerCountContainer}>
                  <Text style={styles.playerCount}>Player(s): {game.players}</Text>
                </View>
                {game.image ? (
                  <ImageBackground 
                    source={game.image} 
                    resizeMode="center"
                    style={styles.imageBackground}
                  >
                    <View style={styles.buttonTextContainer}>
                      <Text style={styles.buttonText}>{game.label}</Text>
                    </View>
                  </ImageBackground>
                ) : (
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonText}>{game.label}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      {isOnline && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
          onDismiss={handleModalClose}
        >
          <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Enter your name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}
                  />
                  <Button title="Submit" onPress={handleNameSubmit} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
});

// Game Button Data
const gameData = [
  [
    { label: 'Sentence Building', route: 'SentenceBuildingGame', image: require('../assets/game1.png'), players: 0 },
    { label: 'Grammar Practice', route: 'MultipleChoiceGame', image: require('../assets/game2.png'), players: 0 }
  ],
  [
    { label: 'Matching Translation', route: 'MemoryFlipGame', image: require('../assets/game3.png'), players: 0 },
    { label: 'Find the number', route: 'SchulteTable', image: require('../assets/game4.png'), players: 0 }
  ],
  [
    { label: 'True or False', route: 'TrueOrFalseGame', image: require('../assets/game5.png'), players: 0 },
    { label: 'Forming Words', route: 'UnscrambleWordsGame', image: require('../assets/game6.png'), players: 0 }
  ]
];

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light blue background color to distinguish from Game.js
    paddingTop: 100, // Adjust padding to prevent content cutoff on smaller screens
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Add some space at the bottom
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure buttons are evenly spaced
    marginBottom: 20,
  },
  button: {
    width: width * 0.45,
    height: height * 0.45,
    margin: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start', // Align text to the top
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden', // Prevent image overflow in buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow support
  },
  playerCountContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  playerCount: {
    fontSize: 16,
    color: '#555',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center', // Center the text
    alignItems: 'center',
  },
  buttonTextContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default Compete;