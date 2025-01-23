import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

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
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState([]);

  const words = [
    { word: 'APPLE', image: require('../assets/apple.jpg') },
    { word: 'BANANA', image: require('../assets/banana.jpg') },
    { word: 'ORANGE', image: require('../assets/orange.jpg') },
    { word: 'GRAPE', image: require('../assets/grape.jpg') },
    { word: 'MANGO', image: require('../assets/mango.jpg') }
  ];

  const loadNewWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    setCurrentWord(selectedWord.word);
    const letters = selectedWord.word.split('').map((letter, index) => ({
      key: `${index}`,
      letter,
    }));
    setScrambledLetters(shuffleArray([...letters]));
    setSelectedLetters([]);
    setCurrentImage(selectedWord.image);
  };

  useEffect(() => {
    loadNewWord();
  }, []);

  const handleLetterPress = (letter, index) => {
    setSelectedLetters([...selectedLetters, { ...letter, originalIndex: index }]);
    setScrambledLetters(scrambledLetters.filter((_, i) => i !== index));
  };

  const handleSelectedLetterPress = (letter, index) => {
    setScrambledLetters([...scrambledLetters, letter]);
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const userAnswer = selectedLetters.map(item => item.letter).join('');
    if (userAnswer === currentWord) {
      setScore(score + 1);
      Alert.alert('Correct!', 'You unscrambled the word!');
      loadNewWord();
    } else {
      Alert.alert('Wrong!', 'Try rearranging the letters!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unscramble the Word!</Text>
      <Text style={styles.score}>Score: {score}</Text>
      
      {currentImage && (
        <Image source={currentImage} style={styles.image} />
      )}
      
      <View style={styles.answerContainer}>
        {selectedLetters.map((letter, index) => (
          <TouchableOpacity
            key={`selected-${letter.key}`}
            style={styles.letterBox}
            onPress={() => handleSelectedLetterPress(letter, index)}
          >
            <Text style={styles.letterText}>{letter.letter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.lettersContainer}>
        {scrambledLetters.map((letter, index) => (
          <TouchableOpacity
            key={`scrambled-${letter.key}`}
            style={styles.letterBox}
            onPress={() => handleLetterPress(letter, index)}
          >
            <Text style={styles.letterText}>{letter.letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>Check Answer</Text>
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
  answerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    minHeight: 50,
    marginBottom: 15,
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    width: '90%',
  },
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
    width: '90%',
  },
  letterBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  letterText: {
    fontSize: 20,
    fontWeight: 'bold',
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