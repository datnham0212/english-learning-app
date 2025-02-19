import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SchulteTable = () => {
  const [numbersToFind, setNumbersToFind] = useState(Array.from({ length: 25 }, (_, i) => i + 1)); // Numbers 1 to 25
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1); // Keeps track of the current level
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(null); // Target number to find

  // Shuffle the numbers array for a random grid order
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex, temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // Handle number selection
  const handleNumberSelect = (number) => {
    if (number === targetNumber && !selectedNumbers.includes(number)) {
      setSelectedNumbers((prevSelected) => [...prevSelected, number]);
      setScore((prevScore) => prevScore + 1); // Increase score by 1 when a number is found
      // Generate a new target number after the correct number is found
      setTargetNumber(generateRandomTargetNumber());
    }
  };

  // Check if all numbers have been found and go to the next level
  useEffect(() => {
    if (selectedNumbers.length === numbersToFind.length) {
      if (currentLevel < 4) {
        setCurrentLevel((prevLevel) => prevLevel + 1);
      } else {
        setCurrentLevel(1); // Reset back to level 1 after reaching level 4
      }

      // Delay to show level completion
      setTimeout(() => {
        if (currentLevel === 1) {
          setNumbersToFind(Array.from({ length: 25 }, (_, i) => i + 1)); // 1-25
        } else if (currentLevel === 2) {
          setNumbersToFind(Array.from({ length: 25 }, (_, i) => i + 26)); // 26-50
        } else if (currentLevel === 3) {
          setNumbersToFind(Array.from({ length: 25 }, (_, i) => i + 51)); // 51-75
        } else if (currentLevel === 4) {
          setNumbersToFind(Array.from({ length: 25 }, (_, i) => i + 76)); // 76-100
        }
        setSelectedNumbers([]); // Reset selected numbers after each level
      }, 1000);
    }
  }, [selectedNumbers, currentLevel]);

  // Function to generate a random target number from the remaining unselected numbers
  const generateRandomTargetNumber = () => {
    const unselectedNumbers = numbersToFind.filter((num) => !selectedNumbers.includes(num));
    const randomIndex = Math.floor(Math.random() * unselectedNumbers.length);
    return unselectedNumbers[randomIndex];
  };

  // Create a 5x5 grid for the current set of numbers
  const renderGrid = () => {
    const shuffledNumbers = shuffleArray([...numbersToFind]);

    let grid = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        const number = shuffledNumbers[i * 5 + j];
        row.push(
          <TouchableOpacity
            key={number}
            style={[styles.cell, selectedNumbers.includes(number) ? styles.selectedCell : null]}
            onPress={() => handleNumberSelect(number)}
            disabled={selectedNumbers.includes(number)} // Disable after selection
          >
            <Text style={styles.cellText}>{number}</Text> 
          </TouchableOpacity>
        );
      }
      grid.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }
    return grid;
  };

  // Initially set the first random target number
  useEffect(() => {
    setTargetNumber(generateRandomTargetNumber());
  }, [numbersToFind]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text> 
      <Text style={styles.targetNumberText}>Find the number: {targetNumber}</Text> 
      <View style={styles.grid}>{renderGrid()}</View>
    </View>
  );
};

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
