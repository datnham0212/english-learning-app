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
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [isCorrect, setIsCorrect] = useState(null); // Track if the answer is correct

  const loadNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    setCurrentWord(selectedWord.word);
    setCurrentImage(selectedWord.image);
    setOptions(shuffleArray([...selectedWord.options]));
    setFeedbackMessage('');
    setSelectedAnswer(null); // Reset selected answer
    setIsCorrect(null); // Reset correctness state
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

  const handleAnswerSelection = (selectedOption) => {
    setSelectedAnswer(selectedOption); // Set the selected answer

    if (selectedOption === currentWord) {
      setIsCorrect(true); // Correct answer
      setScore(prevScore => prevScore + 1);
      // setFeedbackMessage('Correct! Well done.');
    } else {
      setIsCorrect(false); // Incorrect answer
      // setFeedbackMessage('Wrong! Try again.');
    }

    // Reset highlights and load a new question after a delay
    setTimeout(() => {
      loadNewQuestion();
    }, 1000);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  // Function to determine the background color of an option
  const getOptionBackgroundColor = (option) => {
    if (selectedAnswer === null) return '#fff'; // Default white if no answer selected

    if (option === currentWord) {
      return '#4ECDC4'; // Correct answer (highlighted in green)
    } else if (option === selectedAnswer && !isCorrect) {
      return '#FF6B6B'; // Incorrect answer (highlighted in red)
    } else {
      return '#fff'; // Default white for other options
    }
  };

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
            style={[styles.optionButton, { backgroundColor: getOptionBackgroundColor(option) }]}
            onPress={() => handleAnswerSelection(option)}
            disabled={selectedAnswer !== null} // Disable buttons after an answer is selected
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
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    padding: 25,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MultipleChoiceGame;