import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import QuitGameButton from '../components/quitgame';

const wordPairs = [
  { english: 'Cat', vietnamese: 'Mèo' }, // Noun
  { english: 'Dog', vietnamese: 'Chó' }, // Noun
  { english: 'Happy', vietnamese: 'Vui' }, // Adjective
  { english: 'Sad', vietnamese: 'Buồn' }, // Adjective
  { english: 'Run', vietnamese: 'Chạy' }, // Verb
  { english: 'Eat', vietnamese: 'Ăn' }, // Verb
  { english: 'Big', vietnamese: 'Lớn' }, // Adjective
  { english: 'Small', vietnamese: 'Nhỏ' }, // Adjective
  { english: 'Book', vietnamese: 'Sách' }, // Noun
  { english: 'Table', vietnamese: 'Bàn' }, // Noun
  { english: 'Jump', vietnamese: 'Nhảy' }, // Verb
  { english: 'Sleep', vietnamese: 'Ngủ' }, // Verb
  { english: 'Beautiful', vietnamese: 'Đẹp' }, // Adjective
  { english: 'Fast', vietnamese: 'Nhanh' }, // Adjective
  { english: 'Friend', vietnamese: 'Bạn' }, // Noun
  { english: 'Work', vietnamese: 'Làm' }, // Verb
];

const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

const MemoryFlipGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const matchedIndicesRef = useRef([]); // Tracks matched indices persistently without causing re-renders

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const selectedPairs = shuffleArray(wordPairs).slice(0, 8);

    // Initialize each card with a rotateValue for animation
    const newCards = selectedPairs.flatMap((pair, pairIndex) => [
      { ...pair, id: pairIndex * 2, type: 'english', isFlipped: false, rotateValue: new Animated.Value(0) },
      { ...pair, id: pairIndex * 2 + 1, type: 'vietnamese', isFlipped: false, rotateValue: new Animated.Value(0) },
    ]);

    setCards(shuffleArray(newCards));
    setFlippedIndices([]);
    matchedIndicesRef.current = [];
    setGameOver(false);
  };

  const handleCardPress = (index) => {
    if (flippedIndices.length === 2 || gameOver || cards[index].isFlipped || matchedIndicesRef.current.includes(index)) return;

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

    Animated.timing(card.rotateValue, {
      toValue: card.isFlipped ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const checkMatch = (indices) => {
    const [firstIndex, secondIndex] = indices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    const isMatch =
      firstCard.english === secondCard.english &&
      firstCard.vietnamese === secondCard.vietnamese;

    if (isMatch) {
      matchedIndicesRef.current = [...matchedIndicesRef.current, firstIndex, secondIndex];
      setScore((prev) => prev + 1);
      if (matchedIndicesRef.current.length === cards.length) {
        setGameOver(true);
        setTimeout(() => startNewRound(), 2000);
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
        flipCard(firstIndex);
        flipCard(secondIndex);
      }, 1000);
    }

    setFlippedIndices([]);
  };

  const rotateInterpolation = (rotateValue) => {
    return rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'], // Adjusted to rotate around Y-axis properly
    });
  };

  // Function to change the backfaceVisibility based on flipped state
  const getBackfaceVisibility = (isFlipped) => {
    return isFlipped ? 'visible' : 'hidden';
  };

  return (
    <View style={styles.container}>
      <QuitGameButton />
      <Text style={styles.scoreText}>Score: {score}</Text>
      <View style={styles.gridContainer}>
        {cards.map((card, index) => {
          const rotate = rotateInterpolation(card.rotateValue);

          return (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={() => handleCardPress(index)}
              disabled={card.isFlipped || matchedIndicesRef.current.includes(index) || gameOver}
            >
              <Animated.View
                style={[
                  styles.cardInner,
                  {
                    transform: [{ rotateY: rotate }],
                  },
                ]}
              >
                <View
                  style={[
                    styles.cardFace,
                    styles.cardFront,
                    {
                      backfaceVisibility: getBackfaceVisibility(card.isFlipped), // Dynamic visibility
                    },
                  ]}
                >

                </View>
                <View
                  style={[
                    styles.cardFace,
                    styles.cardBack,
                    {
                      backfaceVisibility: getBackfaceVisibility(card.isFlipped), // Dynamic visibility
                    },
                  ]}
                >
                  <Text style={styles.cardText}>
                    {card.isFlipped || matchedIndicesRef.current.includes(index)
                      ? card.type === 'english'
                        ? card.english
                        : card.vietnamese
                      : ''}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
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
    width: '100%',
    perspective: 1000, // This enables 3D transformations
  },
  card: {
    width: '22%', // Adjusted to fit 4 cards per row
    height: 80,
    margin: '1%',
  },
  cardInner: {
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d', // Preserve 3D transformation for flipping
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden', // Default to hidden, will be toggled on flip
    borderRadius: 10,
  },
  cardFront: {
    backgroundColor: '#ccc',
  },
  cardBack: {
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotateY: '180deg' }], // Rotate the back side 180 degrees to be shown
  },
  cardText: {
    fontSize: 18,
  },
});

export default MemoryFlipGame;