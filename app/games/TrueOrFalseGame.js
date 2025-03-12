import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import QuitGameButton from '../components/quitgame';  // Assuming this still exists
import Scoreboard from '../components/score'; // Assuming this still exists
import { playSound } from '../sound/TrueFalse';

// Importing shape images
import circleImage from '../assets/circle.png';
import squareImage from '../assets/square.png';
import triangleImage from '../assets/triangle.png';
import rectangleImage from '../assets/rectangle.png';
import starImage from '../assets/star.png';
import diamondImage from '../assets/diamond.png';
import ovalImage from '../assets/oval.png';
import heartImage from '../assets/heart.png';

// Generate a random color
const generateRandomColor = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Generate a random shape
const generateRandomShape = () => {
  const shapes = ['circle', 'square', 'triangle', 'rectangle', 'star', 'diamond', 'oval', 'heart'];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

// Helper function to generate a false statement
const generateFalseStatement = (correctValue, generateRandomValue) => {
  let falseValue;
  do {
    falseValue = generateRandomValue();
  } while (falseValue === correctValue);
  return falseValue;
};

const TrueOrFalseGame = () => {
  const [currentColor, setCurrentColor] = useState('');
  const [currentShape, setCurrentShape] = useState('');
  const [currentStatement, setCurrentStatement] = useState('');
  const [score, setScore] = useState(0);
  const [isShapeQuestion, setIsShapeQuestion] = useState(false); // New state to track the type of question
  const [correctAnswer, setCorrectAnswer] = useState(false); // State to track if the answer should be true or false

  // Start a new round with a random color, shape, and random true/false statement
  const startNewRound = () => {
    const questionType = Math.random() > 0.5; // Randomly decide between color or shape question
    setIsShapeQuestion(questionType);

    if (questionType) {
      // Shape question
      const newShape = generateRandomShape();
      setCurrentShape(newShape);
      const isCorrect = Math.random() > 0.5; // Randomly decide if the statement should be true or false
      setCorrectAnswer(isCorrect);
      setCurrentStatement(isCorrect ? newShape : generateFalseStatement(newShape, generateRandomShape));
    } else {
      // Color question
      const newColor = generateRandomColor();
      setCurrentColor(newColor);
      const isCorrect = Math.random() > 0.5; // Randomly decide if the statement should be true or false
      setCorrectAnswer(isCorrect);
      setCurrentStatement(isCorrect ? newColor : generateFalseStatement(newColor, generateRandomColor));
    }
  };

  useEffect(() => {
    startNewRound(); // Start the first round when the component mounts
  }, []); // Empty dependency array ensures it runs only once after the initial render

  const handleAnswer = (isTrue) => {
    // Check if the player's answer is correct
    if (isTrue === correctAnswer) {
      playSound(require('../soundassets/TrueFalsesound/TrueFalsecorrect.mp3'));
      setScore(score + 1);
    } else {
      playSound(require('../soundassets/TrueFalsesound/TrueFalseincorrect.mp3'));
      setScore(score - 1);
    }

    startNewRound(); // Start new round immediately after answering
  };

  // Function to render the shape (if it's a shape question)
  const renderShape = () => {
    if (isShapeQuestion) {
      switch (currentShape) {
        case 'circle':
          return <Image source={circleImage} style={styles.shapeImage} />;
        case 'square':
          return <Image source={squareImage} style={styles.shapeImage} />;
        case 'triangle':
          return <Image source={triangleImage} style={styles.shapeImage} />;
        case 'rectangle':
          return <Image source={rectangleImage} style={styles.shapeImage} />;
        case 'star':
          return <Image source={starImage} style={styles.shapeImage} />;
        case 'diamond':
          return <Image source={diamondImage} style={styles.shapeImage} />;
        case 'oval':
          return <Image source={ovalImage} style={styles.shapeImage} />;
        case 'heart':
          return <Image source={heartImage} style={styles.shapeImage} />;
        default:
          return null;
      }
    }
    return null; // No shape rendered if it's not a shape question
  };

  return (
    <View style={[styles.container, { backgroundColor: isShapeQuestion ? 'white' : currentColor }]}>
      <QuitGameButton />
      <Scoreboard score={score} />
      <View style={[styles.statementContainer, { backgroundColor: `rgba(0, 0, 0, 0.5)` }]}>
        <Text style={styles.statement}>
          {currentStatement.toUpperCase()}
        </Text>
      </View>

      {/* Render the shape if it's a shape question */}
      {renderShape()}

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
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#4CAF50', // Green for True
  },
  falseButton: {
    backgroundColor: '#F44336', // Red for False
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  shapeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default TrueOrFalseGame;