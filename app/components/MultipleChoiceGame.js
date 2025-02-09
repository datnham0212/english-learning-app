import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const words = [
  { word: 'APPLE', image: require('../assets/apple.jpg'), options: ['APPLE', 'MANGO', 'BANANA', 'ORANGE'] },
  { word: 'BANANA', image: require('../assets/banana.jpg'), options: ['APPLE', 'MANGO', 'BANANA', 'GRAPE'] },
  { word: 'ORANGE', image: require('../assets/orange.jpg'), options: ['PINEAPPLE', 'GRAPE', 'ORANGE', 'APPLE'] },
  { word: 'GRAPE', image: require('../assets/grape.jpg'), options: ['MANGO', 'PEAR', 'GRAPE', 'BANANA'] },
  { word: 'MANGO', image: require('../assets/mango.jpg'), options: ['ORANGE', 'MANGO', 'PEAR', 'APPLE'] },
];

const MultipleChoiceGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentImage, setCurrentImage] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const loadNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    setCurrentWord(selectedWord.word);
    setCurrentImage(selectedWord.image);
    setOptions(shuffleArray([...selectedWord.options]));
    setFeedbackMessage('');
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex, temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const handleAnswerSelection = (selectedAnswer) => {
    if (selectedAnswer === currentWord) {
      setScore(prevScore => prevScore + 1);
      setFeedbackMessage('Correct! Well done.');
    } else {
      setFeedbackMessage('Wrong! Try again.');
    }

    setTimeout(() => {
      loadNewQuestion();
    }, 1000);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>

      {currentImage && (
        <Image source={currentImage} style={styles.image} />
      )}

      {feedbackMessage && (
        <Text style={styles.feedback}>{feedbackMessage}</Text>
      )}

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswerSelection(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
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
    backgroundColor: '#fffbf1',
  },
  score: {
    fontSize: 24,
    marginBottom: 20,
    color: '#444',
  },
  feedback: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 20,
  },
  image: {
    width: 360,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  optionsContainer: {
    width: '90%',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#a5d8ff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MultipleChoiceGame;
