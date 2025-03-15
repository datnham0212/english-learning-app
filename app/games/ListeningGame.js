import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';

const words = ['apple', 'banana', 'cherry'];

const ListeningGame = () => {
  const [selectedWord, setSelectedWord] = useState(null);

  const playSound = (word) => {
    Speech.speak(word);
  };

  const handleWordSelection = (word) => {
    setSelectedWord(word);
    // Add logic to check if the selected word is correct
  };

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={() => playSound(words[0])} />
      <View style={styles.optionsContainer}>
        {words.map((word, index) => (
          <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleWordSelection(word)}>
            <Text style={styles.optionText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedWord && <Text>You selected: {selectedWord}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 18,
  },
});

export default ListeningGame;