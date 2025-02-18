import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

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
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const selectedPairs = shuffleArray(wordPairs).slice(0, 3);

    // Initialize each card with a rotateValue for animation
    const newCards = selectedPairs.flatMap((pair, pairIndex) => [
      { ...pair, id: pairIndex * 2, type: 'english', isFlipped: false, rotateValue: new Animated.Value(0) },
      { ...pair, id: pairIndex * 2 + 1, type: 'vietnamese', isFlipped: false, rotateValue: new Animated.Value(0) },
    ]);

    setCards(shuffleArray(newCards));
    setFlippedIndices([]);
    setMatchedIndices([]);
    setGameOver(false);
  };

  const handleCardPress = (index) => {
    if (flippedIndices.length === 2 || matchedIndices.includes(index) || gameOver) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    flipCard(index);

    if (newFlippedIndices.length === 2) {
      checkMatch(newFlippedIndices);
    }
  };

  const flipCard = (index) => {
    const card = cards[index];

    // Animate the flip
    Animated.timing(card.rotateValue, {
      toValue: card.isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const checkMatch = (indices) => {
    const [firstIndex, secondIndex] = indices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.id === secondCard.id) {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
      }, 1000);
      setFlippedIndices([]);
      return;
    }

    if (firstCard.type === secondCard.type) {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
      }, 1000);
      setFlippedIndices([]);
      return;
    }

    const isMatch =
      firstCard.english === secondCard.english &&
      firstCard.vietnamese === secondCard.vietnamese;

    if (isMatch) {
      setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);

      if (matchedIndices.length + 2 === cards.length) {
        setScore((prev) => prev + 1);
        setGameOver(true);
        setTimeout(() => startNewRound(), 2000);
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
      }, 1000);
    }

    setFlippedIndices([]);
  };

  const rotateInterpolation = (rotateValue) => {
    return rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <View style={styles.gridContainer}>
        {cards.map((card, index) => {
          const rotate = rotateInterpolation(card.rotateValue);

          return (
            <View
              key={card.id}
              style={[styles.card, card.isFlipped || matchedIndices.includes(index) ? styles.cardFlipped : styles.cardFacedown]}
              onStartShouldSetResponder={() => true} // Make the View touchable
              onResponderStart={() => handleCardPress(index)} // Trigger flip on touch
              disabled={card.isFlipped || matchedIndices.includes(index) || gameOver}
            >
              <Animated.View
                style={[
                  styles.cardInner,
                  {
                    transform: [{ rotateY: rotate }],
                  },
                ]}
              >
                <View style={[styles.cardFace, styles.cardFront]}>
                  <Text style={styles.cardText}>
                    {card.isFlipped || matchedIndices.includes(index)
                      ? card.type === 'english'
                        ? card.english
                        : card.vietnamese
                      : '?'}
                  </Text>
                </View>
                <View style={[styles.cardFace, styles.cardBack]}>
                  <Text style={styles.cardText}>?</Text>
                </View>
              </Animated.View>
            </View>
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
    perspective: 1000, // This enables 3D transformations
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
  cardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d', // Preserve 3D transformation for flipping
    backfaceVisibility: 'hidden', // Ensure the back is hidden when flipped
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardBack: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    transform: [{ rotateY: '180deg' }],
  },
  cardText: {
    fontSize: 18,
  },
});

export default MemoryFlipGame;
