import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QuitGameButton from '../components/quitgame';
import Scoreboard from '../components/score';
// Helper function to convert a number to its word form
const numberToWords = (num) => {
  const below20 = [
    'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  if (num < 20) return below20[num];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const one = num % 10;
    return one === 0 ? tens[ten] : `${tens[ten]}-${below20[one]}`;
  }
  if (num === 100) return 'One Hundred'; // Handle 100 specifically
  return num.toString();
};

const SchulteTable = () => {
  const [numbersToFind, setNumbersToFind] = useState(Array.from({ length: 25 }, (_, i) => i + 1));
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(null);

  // Shuffle numbers when the level changes
  useEffect(() => {
    const shuffled = shuffleArray([...numbersToFind]);
    setShuffledNumbers(shuffled);
  }, [numbersToFind]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleNumberSelect = (number) => {
    if (numberToWords(number) === targetNumber && !selectedNumbers.includes(number)) {
      setSelectedNumbers(prev => [...prev, number]);
      setScore(prev => prev + 1);
      setTargetNumber(generateRandomTargetNumber());
    }
  };

  useEffect(() => {
    if (selectedNumbers.length === numbersToFind.length) {
      const nextLevel = currentLevel < 4 ? currentLevel + 1 : 1;
      setCurrentLevel(nextLevel);

      setTimeout(() => {
        let newNumbers;
        switch (nextLevel) {
          case 1: newNumbers = Array.from({ length: 25 }, (_, i) => i + 1); break;
          case 2: newNumbers = Array.from({ length: 25 }, (_, i) => i + 26); break;
          case 3: newNumbers = Array.from({ length: 25 }, (_, i) => i + 51); break;
          case 4: newNumbers = Array.from({ length: 25 }, (_, i) => i + 76); break;
          default: newNumbers = [];
        }
        setNumbersToFind(newNumbers);
        setSelectedNumbers([]);
      }, 1000);
    }
  }, [selectedNumbers, numbersToFind.length]);

  const generateRandomTargetNumber = () => {
    const unselected = numbersToFind.filter(num => !selectedNumbers.includes(num));
    if (unselected.length === 0) return null;
    return numberToWords(unselected[Math.floor(Math.random() * unselected.length)]);
  };

  useEffect(() => {
    const target = generateRandomTargetNumber();
    if (target !== null) setTargetNumber(target);
  }, [numbersToFind, selectedNumbers]);

  const renderGrid = () => {
    return Array(5).fill().map((_, i) => (
      <View key={`row-${i}`} style={styles.row}>
        {Array(5).fill().map((__, j) => {
          const number = shuffledNumbers[i * 5 + j];
          if (number === undefined) return null; // Skip if number is undefined
          return (
            <TouchableOpacity
              key={`cell-${number}`}
              style={[styles.cell, selectedNumbers.includes(number) && styles.selectedCell]}
              onPress={() => handleNumberSelect(number)}
              disabled={selectedNumbers.includes(number)}
            >
              <Text style={styles.cellText}>{number}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <QuitGameButton />
      <Scoreboard score={score} />
      <Text style={styles.targetNumberText}>{targetNumber || ' '}</Text>
      <View style={styles.grid}>{renderGrid()}</View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  score: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  targetNumberText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  grid: {
    marginTop: 20,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  cell: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  cellText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  selectedCell: {
    backgroundColor: '#4ECDC4',
  },
});

export default SchulteTable;