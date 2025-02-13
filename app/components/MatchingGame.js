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
  const [score, setScore] = React.useState(0); // Add a score state

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

  // Function to check the match and update the score
  const checkMatch = () => {
    if (selectedEnglish && selectedVietnamese) {
      const match = currentPairs.find(
        (pair) =>
          pair.english === selectedEnglish && pair.vietnamese === selectedVietnamese
      );
      if (match) {
        setScore(score + 1); // Increment score on correct match
        Alert.alert('Correct!', 'You have matched correctly.');
        // Reset selection and start a new round
        setSelectedEnglish(null);
        setSelectedVietnamese(null);
        startNewRound(); // Shuffle for the next round
      } else {
        Alert.alert('Incorrect', 'Try again!');
        // Reset selection but do not shuffle
        setSelectedEnglish(null);
        setSelectedVietnamese(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Display score */}
      <Text style={styles.scoreText}>Score: {score}</Text>

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
  buttonText: {
    color: '#000',
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