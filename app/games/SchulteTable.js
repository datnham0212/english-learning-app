import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QuitGameButton from '../components/quitgame';
import Scoreboard from '../components/score';
import { playSound } from '../sound/FinNum';

// Constants
const GRID_SIZES = { 3: 9, 4: 16, 5: 25, 6: 36 };
const BELOW_20 = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

// Helper functions
const numberToWords = (num) => {
  if (num == null) return '';
  if (num < 20) return BELOW_20[num];
  if (num < 100) {
    const ten = Math.floor(num / 10);
    const one = num % 10;
    return one === 0 ? TENS[ten] : `${TENS[ten]}-${BELOW_20[one]}`;
  }
  return num.toString();
};

const generateRandomNumbers = (count) => {
  const numbers = [];
  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (!numbers.includes(randomNumber)) numbers.push(randomNumber);
  }
  return numbers;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getCellSize = (gridSize) => {
  switch (gridSize) {
    case 6: return 40;
    case 5: return 50;
    case 4: return 60;
    default: return 70;
  }
};

// Main component
const SchulteTable = () => {
  const [numbersToFind, setNumbersToFind] = useState(generateRandomNumbers(9));
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [incorrectSelections, setIncorrectSelections] = useState([]);
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(null);
  const [gridSize, setGridSize] = useState(3);

  // Effects
  useEffect(() => {
    setShuffledNumbers(shuffleArray([...numbersToFind]));
  }, [numbersToFind]);

  useEffect(() => {
    const target = generateRandomTargetNumber();
    if (target !== null) setTargetNumber(target);
  }, [numbersToFind, selectedNumbers]);

  useEffect(() => {
    if (selectedNumbers.length === GRID_SIZES[gridSize]) {
      updateGameAfterSelection();
    }
  }, [selectedNumbers, score]);

  // Game logic
  const handleNumberSelect = (number) => {
    const targetWord = numberToWords(targetNumber);
    if (numberToWords(number) === targetWord && !selectedNumbers.includes(number)) {
      playSound(require('../soundassets/FindNumsound/FiNumcorrect.mp3'));
      setTimeout(() => {
        setSelectedNumbers((prev) => [...prev, number]);
        setScore((prev) => prev + 1);
        setTargetNumber(generateRandomTargetNumber());
      }, 150);
    } else {
      setIncorrectSelections((prev) => [...prev, number]);
      playSound(require('../soundassets/FindNumsound/FiNumincorrect.mp3'));
      setTimeout(() => {
        setIncorrectSelections((prev) => prev.filter((num) => num !== number));
      }, 500);
    }
  };

  const generateRandomTargetNumber = () => {
    const unselected = numbersToFind.filter((num) => !selectedNumbers.includes(num));
    if (unselected.length === 0) return null;
    return unselected[Math.floor(Math.random() * unselected.length)];
  };

  const updateGameAfterSelection = () => {
    const nextGridSize = getNextGridSize();
    setTimeout(() => {
      setSelectedNumbers([]);
      setNumbersToFind(generateRandomNumbers(GRID_SIZES[nextGridSize]));
      setShuffledNumbers(generateRandomNumbers(GRID_SIZES[nextGridSize]));
      setGridSize(nextGridSize);
    }, 1500);
  };

  const getNextGridSize = () => {
    if (score >= 50*8) return 6;
    if (score >= 25*6) return 5;
    if (score >= 9*4) return 4;
    return 3;
  };

  // Grid rendering
  const renderGrid = () => {
    return Array(gridSize).fill().map((_, i) => (
      <View key={`row-${i}`} style={styles.row}>
        {Array(gridSize).fill().map((__, j) => {
          const number = shuffledNumbers[i * gridSize + j];
          if (number === undefined) return null;
          return (
            <TouchableOpacity
              key={`cell-${number}`}
              style={[
                styles.cell,
                { width: getCellSize(gridSize), height: getCellSize(gridSize) },
                selectedNumbers.includes(number) && styles.selectedCell,
                incorrectSelections.includes(number) && styles.incorrectCell,
              ]}
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

  // Render
  return (
    <View style={styles.container}>
      <QuitGameButton />
      <Scoreboard score={score} />
      <Text style={styles.targetNumberText}>Find: {targetNumber} ({numberToWords(targetNumber)})</Text>
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
    marginBottom: 10,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    margin: 5,
  },
  cellText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  selectedCell: {
    backgroundColor: '#4ECDC4',
  },
  incorrectCell: {
    backgroundColor: 'red',
  },
});

export default SchulteTable;
