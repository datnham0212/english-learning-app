import React, { useState, useEffect } from 'react';
import { View, Text, Image, Animated, StyleSheet, PanResponder } from 'react-native';

// Shuffle function remains the same
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
  const [score, setScore] = useState(-1);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

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
    setFeedbackMessage(''); // Clear feedback message
  };

  useEffect(() => {
    loadNewWord();
  }, []);

  const handleLetterPress = (letter, index) => {
    setSelectedLetters((prev) => [...prev, letter]);
    setScrambledLetters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (index, panResponder) => {
    return panResponder.panHandlers;
  };

  const handleDrop = (index, gestureState, fromScrambled = true) => {
    if (fromScrambled) {
      setSelectedLetters((prev) => [...prev, scrambledLetters[index]]);
      setScrambledLetters((prev) => prev.filter((_, i) => i !== index));
    } else {
      setScrambledLetters((prev) => [...prev, selectedLetters[index]]);
      setSelectedLetters((prev) => prev.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    const userAnswer = selectedLetters.map(item => item.letter).join('');
    if (userAnswer === currentWord) {
      setScore(prevScore => prevScore + 1); // Increment score by 1
      setFeedbackMessage('Correct! You unscrambled the word!');
      setTimeout(() => {
        setFeedbackMessage(''); // Clear feedback after 0.5 seconds
        loadNewWord(); // Load new word after feedback disappears
      }, 500);
    } else if (selectedLetters.length === currentWord.length) {
      setFeedbackMessage('Wrong! Try again.');
      setTimeout(() => {
        setFeedbackMessage(''); // Clear feedback after 0.5 seconds
        setSelectedLetters([]); // Reset selected letters
        setScrambledLetters(shuffleArray(currentWord.split('').map((letter, index) => ({
          key: `${index}`,
          letter,
        })))); // Shuffle letters for the next attempt
      }, 500); // Delay before resetting
    }
  }, [selectedLetters, currentWord]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>

      {currentImage && (
        <Image source={currentImage} style={styles.image} />
      )}

      {feedbackMessage && (
        <Text style={styles.feedback}>{feedbackMessage}</Text>
      )}

      {/* Display selected letters (Answer Box) */}
      <View style={[styles.answerContainer, { width: currentWord.length * 65, height: 75 }]}>
        {selectedLetters.map((letter, index) => {
          const position = new Animated.ValueXY();

          const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
              position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (e, gestureState) => {
              handleDrop(index, gestureState, false); // Handle drag out of the answer container
              position.setValue({ x: 0, y: 0 }); // Reset position after release
            },
          });

          return (
            <Animated.View
              key={`selected-${letter.key}`}
              style={[styles.letterBoxSelected, { transform: position.getTranslateTransform() }]}
              {...panResponder.panHandlers}
            >
              <Text style={styles.letterText}>{letter.letter}</Text>
            </Animated.View>
          );
        })}
      </View>

      {/* Display scrambled letters */}
      <View style={styles.lettersContainer}>
        {scrambledLetters.map((letter, index) => {
          const position = new Animated.ValueXY();

          const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
              position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (e, gestureState) => {
              handleDrop(index, gestureState); // Handle dragging into the answer box
              position.setValue({ x: 0, y: 0 }); // Reset position after release
            },
          });

          return (
            <Animated.View
              key={`scrambled-${letter.key}`}
              style={[styles.letterBox, { transform: position.getTranslateTransform() }]}
              {...panResponder.panHandlers}
            >
              <Text style={styles.letterText}>{letter.letter}</Text>
            </Animated.View>
          );
        })}
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
    backgroundColor: '#fffbf1', // Light background
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
    color: '#444',
  },
  feedback: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f', // Red color for wrong answer feedback
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
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align letters to the left
    flexWrap: 'nowrap', // Prevent wrapping here
    marginBottom: 20,
    paddingHorizontal: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 6,
  },
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    width: '90%',
    paddingHorizontal: 8,
  },
  letterBox: {
    flexBasis: '18%', // 5 letters per row, adjust accordingly for more space
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  letterBoxSelected: {
    width: 50, // Fixed width for square box
    height: 50, // Fixed height for square box
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a5d8ff',
    borderRadius: 12,
    margin: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  letterText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default UnscrambleWordsGame;
