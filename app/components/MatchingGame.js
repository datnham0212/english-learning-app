import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Sample English and Vietnamese pairs
const wordPairs = [
  { english: 'Hello', vietnamese: 'Xin chào' },
  { english: 'Goodbye', vietnamese: 'Tạm biệt' },
  { english: 'Thank you', vietnamese: 'Cảm ơn' },
  { english: 'Please', vietnamese: 'Làm ơn' },
  { english: 'Sorry', vietnamese: 'Xin lỗi' },
];

// Function to shuffle an array
const shuffleArray = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

// Function to get 3 random pairs from the wordPairs
const getRandomPairs = (pairs, numPairs) => {
  const shuffled = [...pairs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numPairs);
};

const MatchingGame = () => {
  const [selectedEnglish, setSelectedEnglish] = React.useState(null);
  const [selectedVietnamese, setSelectedVietnamese] = React.useState(null);
  const [currentPairs, setCurrentPairs] = React.useState([]);
  const [shuffledEnglish, setShuffledEnglish] = React.useState([]);
  const [shuffledVietnamese, setShuffledVietnamese] = React.useState([]);

  // Function to start a new round and shuffle the words
  const startNewRound = () => {
    const pairs = getRandomPairs(wordPairs, 3); // Get 3 random pairs
    setCurrentPairs(pairs); // Store the selected pairs
    setShuffledEnglish(shuffleArray(pairs.map((pair) => pair.english))); // Shuffle English words
    setShuffledVietnamese(shuffleArray(pairs.map((pair) => pair.vietnamese))); // Shuffle Vietnamese words
  };

  React.useEffect(() => {
    startNewRound(); // Start the game by shuffling words on the first load
  }, []);

  // Function to handle selection of English or Vietnamese word
  const handleEnglishSelect = (english) => {
    setSelectedEnglish(english);
  };

  const handleVietnameseSelect = (vietnamese) => {
    setSelectedVietnamese(vietnamese);
  };

  const checkMatch = () => {
    if (selectedEnglish && selectedVietnamese) {
      const match = currentPairs.find(
        (pair) =>
          pair.english === selectedEnglish && pair.vietnamese === selectedVietnamese
      );
      if (match) {
        Alert.alert('Correct!', 'You have matched correctly.');
      } else {
        Alert.alert('Incorrect', 'Try again!');
      }
      // After checking the match, shuffle for the next round
      setSelectedEnglish(null);
      setSelectedVietnamese(null);
      startNewRound(); // Shuffle for the next round
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          {shuffledEnglish.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleEnglishSelect(word)}>
              <Text style={styles.buttonText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.column}>
          {shuffledVietnamese.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleVietnameseSelect(word)}>
              <Text style={styles.buttonText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.checkButton} onPress={checkMatch}>
        <Text style={styles.checkButtonText}>Check Match</Text>
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
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MatchingGame;
