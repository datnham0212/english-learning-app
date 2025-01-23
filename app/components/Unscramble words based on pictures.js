import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const shuffleArray = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const UnscrambleWordsGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);

  const words = [
    { word: 'APPLE', image: require('../assets/apple.jpg') },
    { word: 'BANANA', image: require('../assets/banana.jpg') },
    { word: 'ORANGE', image: require('../assets/orange.jpg') },
    { word: 'GRAPE', image: require('../assets/grape.jpg') },
    { word: 'MANGO', image: require('../assets/mango.jpg') }
  ];

  const scrambleWord = (word) => {
    const shuffled = shuffleArray(word.split('')).join('');
    return shuffled === word ? scrambleWord(word) : shuffled;
  };

  const loadNewWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    setCurrentWord(selectedWord.word);
    setScrambledWord(scrambleWord(selectedWord.word));
    setCurrentImage(selectedWord.image);
    setUserInput('');
  };

  useEffect(() => {
    loadNewWord();
  }, []);

  const handleSubmit = () => {
    if (userInput.toUpperCase() === currentWord) {
      setScore(score + 1);
      Alert.alert('Correct!', 'You unscrambled the word!');
      loadNewWord();
    } else {
      Alert.alert('Wrong!', 'Try again!');
    }
    setUserInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unscramble the Word!</Text>
      <Text style={styles.score}>Score: {score}</Text>
      
      {currentImage && (
        <Image source={currentImage} style={styles.image} />
      )}
      
      <Text style={styles.scrambledWord}>{scrambledWord}</Text>
      
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Enter your answer"
        autoCapitalize="characters"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  scrambledWord: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UnscrambleWordsGame;
