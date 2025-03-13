import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import QuitGameButton from '../components/quitgame';
import Scoreboard from '../components/score';

const { width, height } = Dimensions.get('window');

const WordScapesGame = () => {
  // Array of all 26 letters
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)); // ['A', 'B', 'C', ..., 'Z']

  // State to track selected letters
  const [selectedLetters, setSelectedLetters] = useState([]);

  // State to track valid words that have been formed
  const [correctWords, setCorrectWords] = useState([]);

  // Simple word dictionary for validation
  const validWords = ['ABC', 'ACE', 'BAD', 'BED', 'ADD', 'DAD', 'FIG', 'JIG', 'HAD', 'FED'];

  // Handle letter box press
  const handleLetterPress = (letter) => {
    setSelectedLetters((prev) => [...prev, letter]);
  };

  // Automatically check if a valid word is formed
  useEffect(() => {
    const formedWord = selectedLetters.join('');
    if (validWords.includes(formedWord)) {
      // If the formed word is valid, add it to correct words and reset selected letters
      setCorrectWords((prev) => [...prev, formedWord]);
      setSelectedLetters([]); // Reset selected letters after forming a word
    } else if (formedWord.length > 3) {
      // If the word length exceeds 3 characters and is not valid
      Alert.alert('Incorrect', 'Try again!');
      setSelectedLetters([]); // Reset selected letters after failure
    }
  }, [selectedLetters]); // This effect runs every time selectedLetters changes

  return (
    <View style={styles.container}>
      <QuitGameButton />
      {/* <Scoreboard score={score} /> */}
      
      {/* Formed word grid */}
      <View style={styles.wordContainer}>
        {selectedLetters.map((letter, index) => (
          <View key={index} style={styles.letterBoxSelected}>
            <Text style={styles.letterText}>{letter}</Text>
          </View>
        ))}
      </View>

      {/* Display the correct words */}
      <View style={styles.correctWordsContainer}>
        {correctWords.map((word, index) => (
          <View key={index} style={styles.correctWordRow}>
            {word.split('').map((letter, letterIndex) => (
              <View key={letterIndex} style={styles.letterBoxSelected}>
                <Text style={styles.letterText}>{letter}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Rectangle */}
      <View style={styles.lettersContainer}>
        {/* Render letter boxes */}
        {letters.map((letter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleLetterPress(letter)}
            style={styles.letterBox}
          >
            <Text style={styles.letterText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#fffbf1',
  },
  lettersContainer: {
    position: 'absolute',
    bottom: height * 0.1, // Position it near the bottom of the screen
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
    paddingHorizontal: 8,
  },
  letterBox: {
    flexBasis: '18%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 6,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  letterText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  wordContainer: {
    position: 'absolute',
    top: height * 0.1, // Position it on the top half of the screen
    flexDirection: 'row', // Align letters horizontally
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30, // Some margin below the formed word
  },
  letterBoxSelected: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a5d8ff',
    borderRadius: 12,
    margin: 6,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  correctWordsContainer: {
    position: 'absolute',
    top: height * 0.25, // Below the formed word
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctWordRow: {
    flexDirection: 'row', // Arrange the letters of the correct word horizontally
    marginTop: 5, // Some margin between each word
  },
});

export default WordScapesGame;
