import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const wordPairs = [
  { english: 'Hello', vietnamese: 'Xin chào' },
  { english: 'Goodbye', vietnamese: 'Tạm biệt' },
  { english: 'Thank you', vietnamese: 'Cảm ơn' },
  { english: 'Please', vietnamese: 'Làm ơn' },
  { english: 'Sorry', vietnamese: 'Xin lỗi' },
];

const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

const MemoryFlipGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    // Select a random subset of word pairs
    const selectedPairs = shuffleArray(wordPairs).slice(0, 3);

    // Create cards with unique IDs and types
    const newCards = selectedPairs.flatMap((pair, pairIndex) => [
      { ...pair, id: pairIndex * 2, type: 'english', isFlipped: false },
      { ...pair, id: pairIndex * 2 + 1, type: 'vietnamese', isFlipped: false },
    ]);

    // Shuffle the cards
    setCards(shuffleArray(newCards));
    setFlippedIndices([]);
    setMatchedIndices([]);
  };

  const handleCardPress = (index) => {
    if (flippedIndices.length === 2 || matchedIndices.includes(index)) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      checkMatch(newFlippedIndices);
    }
  };

  const checkMatch = (indices) => {
    const [firstIndex, secondIndex] = indices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    // Ensure the two cards are not the same card
    if (firstCard.id === secondCard.id) {
      Alert.alert('Invalid', 'You selected the same card twice.');
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
      }, 1000);
      setFlippedIndices([]);
      return;
    }

    // Ensure one card is English and the other is Vietnamese
    if (firstCard.type === secondCard.type) {
      Alert.alert('Invalid', 'You selected two cards of the same type.');
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
      }, 1000);
      setFlippedIndices([]);
      return;
    }

    // Check if the two cards form a valid pair
    const isMatch =
      firstCard.english === secondCard.english &&
      firstCard.vietnamese === secondCard.vietnamese;

    if (isMatch) {
      setMatchedIndices(prev => [...prev, firstIndex, secondIndex]);
      Alert.alert('Correct!', 'You have matched correctly.');

      if (matchedIndices.length + 2 === cards.length) {
        setScore(prev => prev + 1);
        Alert.alert('Round Complete!', 'All pairs matched correctly. Starting a new round.');
        startNewRound();
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
      }, 1000);
      Alert.alert('Incorrect', 'Try again!');
    }

    setFlippedIndices([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <View style={styles.gridContainer}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.card,
              card.isFlipped || matchedIndices.includes(index)
                ? styles.cardFlipped
                : styles.cardFacedown,
            ]}
            onPress={() => handleCardPress(index)}
            disabled={card.isFlipped || matchedIndices.includes(index)}>
            <Text style={styles.cardText}>
              {card.isFlipped || matchedIndices.includes(index)
                ? card.type === 'english'
                  ? card.english
                  : card.vietnamese
                : '?'}
            </Text>
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
    padding: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  cardFacedown: {
    backgroundColor: '#ccc',
  },
  cardFlipped: {
    backgroundColor: '#fff',
  },
  cardText: {
    fontSize: 18,
  },
});

export default MemoryFlipGame;