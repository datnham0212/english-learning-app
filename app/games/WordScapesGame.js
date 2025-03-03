import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import QuitGameButton from '../components/quitgame';
import Scoreboard from '../components/score';
// Get device dimensions
const { width, height } = Dimensions.get('window');

const WordScapesGame = () => {
  // Array of letters to display around the circle
  const letters = ['A', 'B', 'C', 'D', 'E'];

  // State to track selected letters
  const [selectedLetters, setSelectedLetters] = useState([]);

  // State to track valid words that have been formed
  const [correctWords, setCorrectWords] = useState([]);

  // Simple word dictionary for validation
  const validWords = ['ABC', 'ACE', 'BAD', 'BED', 'ADD', 'DAD'];

  // Calculate the angle between each letter box
  const angleStep = (2 * Math.PI) / letters.length;

  // Adjust radius to prevent overlap with the circle's edges
  const boxRadius = 100;

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
      {/* Circle */}
      <View style={styles.circle}>
        {/* Render letter boxes */}
        {letters.map((letter, index) => {
          const angle = angleStep * index;
          const x = Math.cos(angle) * boxRadius;
          const y = Math.sin(angle) * boxRadius;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleLetterPress(letter)}
              style={[
                styles.letterBox,
                { transform: [{ translateX: x }, { translateY: y }] },
              ]}
            >
              <Text style={styles.letter}>{letter}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Formed word grid */}
      <View style={styles.wordContainer}>
        {selectedLetters.map((letter, index) => (
          <View key={index} style={styles.letterBoxInWord}>
            <Text style={styles.letter}>{letter}</Text>
          </View>
        ))}
      </View>

      {/* Display the correct words */}
      <View style={styles.correctWordsContainer}>
        {correctWords.map((word, index) => (
          <View key={index} style={styles.correctWordRow}>
            {word.split('').map((letter, letterIndex) => (
              <View key={letterIndex} style={styles.letterBoxInWord}>
                <Text style={styles.letter}>{letter}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  circle: {
    position: 'absolute',
    bottom: height * 0.1,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterBox: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  wordContainer: {
    position: 'absolute',
    top: height * 0.1, // Position it on the top half of the screen
    flexDirection: 'row', // Align letters horizontally
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30, // Some margin below the formed word
  },
  letterBoxInWord: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3498db',
    marginRight: 10, // Space between the letters
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
