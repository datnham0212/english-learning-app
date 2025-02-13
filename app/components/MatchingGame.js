import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, PanResponder } from 'react-native';

const wordPairs = [
  { english: 'Hello', vietnamese: 'Xin chào' },
  { english: 'Goodbye', vietnamese: 'Tạm biệt' },
  { english: 'Thank you', vietnamese: 'Cảm ơn' },
  { english: 'Please', vietnamese: 'Làm ơn' },
  { english: 'Sorry', vietnamese: 'Xin lỗi' },
];

const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

const getRandomPairs = (pairs, numPairs) => shuffleArray(pairs).slice(0, numPairs);

const MatchingGame = () => {
  const [currentPairs, setCurrentPairs] = useState([]);
  const [shuffledEnglish, setShuffledEnglish] = useState([]);
  const [shuffledVietnamese, setShuffledVietnamese] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState({ english: null, vietnamese: null });
  const [score, setScore] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const pairs = getRandomPairs(wordPairs, 3);
    setCurrentPairs(pairs);
    setShuffledEnglish(shuffleArray(pairs.map(pair => pair.english)));
    setShuffledVietnamese(shuffleArray(pairs.map(pair => pair.vietnamese)));
    setMatchedPairs([]);
    setSelectedPair({ english: null, vietnamese: null });
  };

  const handleSelect = (word, language) => {
    const newPair = { ...selectedPair, [language]: word };
    setSelectedPair(newPair);

    if (newPair.english && newPair.vietnamese) {
      checkMatch(newPair);
    }
  };

  const checkMatch = (pair) => {
    const match = currentPairs.find(
      p => p.english === pair.english && p.vietnamese === pair.vietnamese
    );

    if (match && !matchedPairs.some(m => m.english === match.english)) {
      setMatchedPairs(prev => [...prev, match]);
      Alert.alert('Correct!', 'You have matched correctly.');

      if (matchedPairs.length + 1 === currentPairs.length) {
        setScore(prev => prev + 1);
        Alert.alert('Round Complete!', 'All pairs matched correctly. Starting a new round.');
        startNewRound();
      }
    } else {
      Alert.alert('Incorrect', 'Try again!');
    }

    setSelectedPair({ english: null, vietnamese: null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          {shuffledEnglish.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={
                matchedPairs.some(pair => pair.english === word)
                  ? styles.matchedButton
                  : styles.button
              }
              onPress={() => handleSelect(word, 'english')}>
              <Text style={styles.buttonText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.column}>
          {shuffledVietnamese.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={
                matchedPairs.some(pair => pair.vietnamese === word)
                  ? styles.matchedButton
                  : styles.button
              }
              onPress={() => handleSelect(word, 'vietnamese')}>
              <Text style={styles.buttonText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    margin: 5,
  },
  matchedButton: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4edda',
    borderRadius: 12,
    padding: 10,
    borderWidth: 2,
    borderColor: '#28a745',
    margin: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default MatchingGame;
