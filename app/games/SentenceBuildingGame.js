import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

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

const SentenceBuildingGame = () => {
  const [currentSentence, setCurrentSentence] = useState('');
  const [scrambledWords, setScrambledWords] = useState([]);
  const [score, setScore] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const sentences = [
    { sentence: 'The boy is running', image: require('../assets/running boy.jpg') },
    { sentence: 'She is eating a burger', image: require('../assets/girl eating.jpg') },
    { sentence: 'She is walking in the rain with her umbrella', image: require('../assets/girl rain.jpg') },
    { sentence: 'A mom is shopping with her baby', image: require('../assets/shopping mom.jpg') },
    { sentence: 'The boy is drinking orange juice', image: require('../assets/boy orange juice.jpg') }
  ];

  const loadNewSentence = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const selectedSentence = sentences[randomIndex];
    setCurrentSentence(selectedSentence.sentence);
    const words = selectedSentence.sentence.split(' ').map((word, index) => ({
      key: `${index}`,
      word,
    }));
    setScrambledWords(shuffleArray([...words]));
    setSelectedWords([]);
    setCurrentImage(selectedSentence.image);
    setFeedbackMessage('');
  };

  useEffect(() => {
    loadNewSentence();
  }, []);

  const handleWordTap = (word, index, fromScrambled = true) => {
    if (fromScrambled) {
      // Move word from scrambledWords to selectedWords
      setSelectedWords((prev) => [...prev, word]);
      setScrambledWords((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Move word from selectedWords back to scrambledWords
      setScrambledWords((prev) => [...prev, word]);
      setSelectedWords((prev) => prev.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    if (selectedWords.length === 0) return;

    const userAnswer = selectedWords.map(item => item.word).join(' ');
    if (userAnswer === currentSentence) {
      setScore(prevScore => prevScore + 1);
      setFeedbackMessage('Correct! You built the sentence!');
      setTimeout(() => {
        setFeedbackMessage('');
        loadNewSentence();
      }, 500);
    } else if (selectedWords.length === currentSentence.split(' ').length) {
      setFeedbackMessage('Wrong! Try again.');
      setTimeout(() => {
        setFeedbackMessage('');
        setSelectedWords([]);
        setScrambledWords(shuffleArray(currentSentence.split(' ').map((word, index) => ({
          key: `${index}`,
          word,
        }))));
      }, 500);
    }
  }, [selectedWords, currentSentence]);

  // Calculate dynamic width for the answer container
  const calculateAnswerContainerWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    const maxWidth = screenWidth;
    const minWidth = screenWidth * 0.9; // Minimum width for the container
    const wordCount = currentSentence.split(' ').length;
    const averageWordLength = currentSentence.length / wordCount;
    const calculatedWidth = Math.min(maxWidth, Math.max(minWidth, wordCount * averageWordLength * 10));
    return calculatedWidth;
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

      <View style={[styles.answerContainer, { width: calculateAnswerContainerWidth() }]}>
        {selectedWords.map((word, index) => (
          <View
            key={`selected-${word.key}`}
            style={styles.wordBoxSelected}
            onTouchEnd={() => handleWordTap(word, index, false)} // Tap to remove word
          >
            <Text style={styles.wordText}>{word.word}</Text>
          </View>
        ))}
      </View>

      <View style={styles.wordsContainer}>
        {scrambledWords.map((word, index) => (
          <View
            key={`scrambled-${word.key}`}
            style={styles.wordBox}
            onTouchEnd={() => handleWordTap(word, index)} // Tap to add word
          >
            <Text style={styles.wordText}>{word.word}</Text>
          </View>
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
    flexWrap: 'wrap', // Allow words to wrap to the next line
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 6,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    width: '90%',
    paddingHorizontal: 8,
  },
  wordBox: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    paddingHorizontal: 12,
  },
  wordBoxSelected: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a5d8ff',
    borderRadius: 12,
    margin: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    paddingHorizontal: 12,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SentenceBuildingGame;