import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QuitGameButton from '../components/quitgame';
import Scoreboard from '../components/score';
// Define the functions before the component
const generateRandomColor = () => {
  const colors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink',
    'white', 'black', 'gray', 'brown', 'cyan'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateStatement = (color) => {
  const correctStatement = `This is ${color}`;
  const incorrectStatement = `This is not ${color}`;
  return Math.random() > 0.5 ? correctStatement : incorrectStatement;
};

// Helper function to determine text color based on background color brightness
const getTextColor = (bgColor) => {
  const colorBrightness = {
    red: 0.3,
    blue: 0.3,
    green: 0.4,
    yellow: 0.6,
    purple: 0.4,
    orange: 0.5,
    pink: 0.5,
    white: 0.9,
    black: 0.1,
    gray: 0.5,
    brown: 0.2,
    cyan: 0.6,
  };

  return colorBrightness[bgColor] > 0.5 ? 'black' : 'white';
};

const TrueOrFalseGame = () => {
  const [currentColor, setCurrentColor] = useState(generateRandomColor());
  const [currentStatement, setCurrentStatement] = useState(generateStatement(currentColor));
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  const intervalRef = useRef(null);

  const startNewRound = () => {
    const newColor = generateRandomColor();
    setCurrentColor(newColor);
    setCurrentStatement(generateStatement(newColor));
    setHasAnswered(false); // Reset the answered state for the new round
  };

  useEffect(() => {
    // Create the interval that triggers after 5 seconds if no answer is provided
    intervalRef.current = setInterval(() => {
      if (!hasAnswered) {
        startNewRound(); // If no answer, generate a new round
      }
    }, 5000);

    return () => clearInterval(intervalRef.current); // Clean up the interval on component unmount
  }, [hasAnswered]);

  const handleAnswer = (isTrue) => {
    const correctAnswer = currentStatement === `This is ${currentColor}`;

    // Update the score
    if (isTrue === correctAnswer) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }

    // Reset the interval by clearing and restarting it
    clearInterval(intervalRef.current); // Clear the previous interval
    startNewRound(); // Start a new round immediately after the answer
  };

  const textColor = getTextColor(currentColor); // Determine the text color based on the background color

  return (
    <View style={[styles.container, { backgroundColor: currentColor }]}>
      <QuitGameButton />
      {/* Score Display at the top */}
      <Scoreboard score={score} />
      {/* Statement Text centered and all caps */}
      <View style={[styles.statementContainer, { backgroundColor: `rgba(0, 0, 0, 0.5)` }]}>
        <Text style={[styles.statement, { color: textColor }]}>
          {currentStatement.toUpperCase()}
        </Text>
      </View>

      {/* Button container for True and False */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.trueButton]} onPress={() => handleAnswer(true)}>
          <Text style={styles.buttonText}>True</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.falseButton]} onPress={() => handleAnswer(false)}>
          <Text style={styles.buttonText}>False</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Align content to the center vertically
    alignItems: 'center', // Center horizontally
    paddingTop: 50, // Space at the top for score
  },
  statementContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    maxWidth: '80%', // Limiting width to avoid text from being too wide
    textAlign: 'center', // Center the statement within the box
  },
  statement: {
    fontSize: 36, // Bigger font size for better readability
    fontWeight: 'bold',
    color: 'white', // Default color, will be overridden by dynamic color
    textAlign: 'center', // Ensure the statement is centered
    textTransform: 'uppercase', // Ensure all caps
  },
  buttonsContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Space between the buttons
    width: '100%', // Take full width
    position: 'absolute', // Position buttons at the bottom
    bottom: 50, // Adjust this value for more or less space from the bottom
    paddingHorizontal: 40, // Space on the sides of the buttons
  },
  button: {
    flex: 1, // Allow both buttons to take equal space
    backgroundColor: '#008CBA',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: 'white', // White border for better visibility
  },
  trueButton: {
    backgroundColor: '#4CAF50', // Green for True
  },
  falseButton: {
    backgroundColor: '#F44336', // Red for False
  },
  buttonText: {
    color: 'white',
    fontSize: 22, // Larger text for the buttons
    fontWeight: 'bold',
  },
});

export default TrueOrFalseGame;

//Shape ideas: add triangle, square, circle, rectangle, pentagon, hexagon, octagon, nonagon, cube, sphere, pyramid, cylinder, cone