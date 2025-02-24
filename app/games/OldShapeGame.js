import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Rect, Polygon } from 'react-native-svg';

// Define the functions before the component
const generateRandomShape = () => {
  const shapes = ['triangle', 'square', 'circle', 'rectangle', 'pentagon', 'hexagon', 'octagon', 'nonagon'];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const generateStatement = (shape) => {
  const correctStatement = `This is a ${shape}`;
  const incorrectStatement = `This is not a ${shape}`;
  return Math.random() > 0.5 ? correctStatement : incorrectStatement;
};

// Helper function to determine text color based on background color brightness (same as before)
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

const OldShapeGame = () => {
  const [currentShape, setCurrentShape] = useState(generateRandomShape());
  const [currentStatement, setCurrentStatement] = useState(generateStatement(currentShape));
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  const intervalRef = useRef(null);

  const startNewRound = () => {
    const newShape = generateRandomShape();
    setCurrentShape(newShape);
    setCurrentStatement(generateStatement(newShape));
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
    const correctAnswer = currentStatement === `This is a ${currentShape}`;

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

  const renderShape = () => {
    // All shapes will be monochrome (white fill with black border)
    const fillColor = "white"; // Monochrome color
    const strokeColor = "black"; // Black borders
  
    switch (currentShape) {
      case 'triangle':
        return (
          <Svg height="200" width="200">
            <Polygon points="100,20 180,180 20,180" fill={fillColor} stroke={strokeColor} strokeWidth="5" />
          </Svg>
        );
      case 'square':
        return (
          <Svg height="200" width="200">
            <Rect x="50" y="50" width="100" height="100" fill={fillColor} stroke={strokeColor} strokeWidth="5" />
          </Svg>
        );
      case 'circle':
        return (
          <Svg height="200" width="200">
            <Circle cx="100" cy="100" r="80" fill={fillColor} stroke={strokeColor} strokeWidth="5" />
          </Svg>
        );
      case 'rectangle':
        return (
          <Svg height="200" width="300">
            <Rect x="50" y="50" width="200" height="100" fill={fillColor} stroke={strokeColor} strokeWidth="5" />
          </Svg>
        );
      case 'pentagon':
        return (
          <Svg height="200" width="250">
            <Polygon
              points="125,30 175,70 150,150 100,150 75,70"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
          </Svg>
        );
      case 'hexagon':
        return (
          <Svg height="200" width="250"> 
            <Polygon
              points="125,30 175,50 175,110 125,150 75,110 75,50"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
          </Svg>
        );
      case 'octagon':
        return (
          <Svg height="200" width="200">
            <Polygon
              points="60,30 140,30 170,60 170,140 140,170 60,170 30,140 30,60"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
          </Svg>
        );
      case 'nonagon':
        return (
          <Svg height="200" width="200">
            <Polygon
              points="100,30 140,50 170,90 170,130 140,170 100,190 60,170 30,130 30,90 60,50"
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="5"
            />
          </Svg>
        );
      default:
        return null;
    }
  };
  

  const textColor = getTextColor(currentShape); // Determine text color based on the background shape color

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      {/* Score Display */}
      <Text style={styles.score}>Score: {score}</Text>

      {/* Shape Display */}
      <View style={styles.shapeContainer}>
        {renderShape()}
      </View>

      {/* Statement Display */}
      <View style={[styles.statementContainer, { backgroundColor: `rgba(0, 0, 0, 0.5)` }]}>
        <Text style={[styles.statement, { color: textColor }]}>
          {currentStatement.toUpperCase()}
        </Text>
      </View>

      {/* Buttons to answer True or False */}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  shapeContainer: {
    marginBottom: 20,
  },
  statementContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    maxWidth: '80%',
    textAlign: 'center',
  },
  statement: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 50,
    paddingHorizontal: 40,
  },
  button: {
    flex: 1,
    backgroundColor: '#008CBA',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: 'white',
  },
  trueButton: {
    backgroundColor: '#4CAF50',
  },
  falseButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    top: 30,
    zIndex: 1,
    color: 'white',
  },
});

export default OldShapeGame;
