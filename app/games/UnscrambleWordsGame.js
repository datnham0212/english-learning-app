import React, { useState, useEffect } from 'react';
import { View, Text, Image, Animated, StyleSheet, PanResponder } from 'react-native';
import Scoreboard from '../components/score';
import QuitGameButton from '../components/quitgame';
import { playSound } from '../sound/SenBuild';

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

const getRandomLetter = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
};

const UnscrambleWordsGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [score, setScore] = useState(0);
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

    // Add random letters to make up 8 letters
    while (letters.length < 8) {
      letters.push({
        key: `${letters.length}`,
        letter: getRandomLetter(),
      });
    }

    setScrambledLetters(shuffleArray([...letters]));
    setSelectedLetters([]);
    setCurrentImage(selectedWord.image);
    setFeedbackMessage('');
  };

  useEffect(() => {
    loadNewWord();
  }, []);

  const handleDrop = (index, gestureState, fromScrambled = true) => {
    if (fromScrambled) {
      setSelectedLetters((prev) => [...prev, scrambledLetters[index]]);
      setScrambledLetters((prev) => prev.filter((_, i) => i !== index));
      playSound(require('../soundassets/SentBuildSound/SBclick.mp3'));
    } else {
      setScrambledLetters((prev) => [...prev, selectedLetters[index]]);
      setSelectedLetters((prev) => prev.filter((_, i) => i !== index));
      playSound(require('../soundassets/SentBuildSound/SBremoveclick.mp3'));
    }
  };

  useEffect(() => {
    if (selectedLetters.length === 0) return;
    
    const userAnswer = selectedLetters.map(item => item.letter).join('');
    if (userAnswer === currentWord) {
      setScore(prevScore => prevScore + 1);
      setFeedbackMessage('Correct! You unscrambled the word!');
      playSound(require('../soundassets/SentBuildSound/SBcorrect.mp3'));
      setTimeout(() => {
        setFeedbackMessage('');
        loadNewWord();
      }, 500);
    } else if (selectedLetters.length === currentWord.length) {
      setFeedbackMessage('Wrong! Try again.');
      playSound(require('../soundassets/SentBuildSound/SBincorrect.mp3'));
      setTimeout(() => {
        setFeedbackMessage('');
        setSelectedLetters([]);
        setScrambledLetters(shuffleArray(currentWord.split('').map((letter, index) => ({
          key: `${index}`,
          letter,
        }))));
      }, 500);
    }
  }, [selectedLetters, currentWord]);

  return (
    <View style={styles.container}>
      <QuitGameButton />
      <Scoreboard score={score}/>

      {currentImage && (
        <Image source={currentImage} style={styles.image} />
      )}

      {feedbackMessage && (
        <Text style={styles.feedback}>{feedbackMessage}</Text>
      )}

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
              handleDrop(index, gestureState, false);
              position.setValue({ x: 0, y: 0 });
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
              handleDrop(index, gestureState);
              position.setValue({ x: 0, y: 0 });
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
    backgroundColor: '#fffbf1',
  },
  score: {
    fontSize: 20,
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
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
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
  letterText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default UnscrambleWordsGame;