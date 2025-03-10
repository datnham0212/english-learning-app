import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QuitGameButton from '../components/quitgame';  // Assuming this still exists
import Scoreboard from '../components/score'; // Assuming this still exists
import { playSound } from '../sound/TrueFalse';
import Svg, { Circle, Rect, Polygon, Ellipse, Path } from 'react-native-svg'; // Importing SVG components

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
      // Randomly decide if the statement should be true or false
      const isCorrect = Math.random() > 0.5;
      setCorrectAnswer(isCorrect);
      setCurrentStatement(isCorrect ? newShape : generateRandomShape()); // If false, give a random shape that's not the current one
    } else {
      // Color question
      const newColor = generateRandomColor();
      setCurrentColor(newColor);
      // Randomly decide if the statement should be true or false
      const isCorrect = Math.random() > 0.5;
      setCorrectAnswer(isCorrect);
      setCurrentStatement(isCorrect ? newColor : generateRandomColor()); // If false, give a random color that's not the current one
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
          return (
            <Svg height="100" width="100">
              <Circle cx="50" cy="50" r="40" fill="white" stroke="black" strokeWidth="4" />
            </Svg>
          );
        case 'square':
          return (
            <Svg height="100" width="100">
              <Rect x="10" y="10" width="80" height="80" fill="white" stroke="black" strokeWidth="4" />
            </Svg>
          );
        case 'triangle':
          return (
            <Svg height="100" width="100">
              <Polygon points="50,10 90,90 10,90" fill="white" stroke="black" strokeWidth="4" />
            </Svg>
          );
        case 'rectangle':
          return (
            <Svg height="100" width="150">
              <Rect x="10" y="10" width="130" height="60" fill="white" stroke="black" strokeWidth="4" />
            </Svg>
          );
        case 'star':
          return (
            <Svg height="100" width="100">
              <Path
                d="M50,10 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z"
                fill="white"
                stroke="black"
                strokeWidth="4"
              />
            </Svg>
          );
        case 'diamond':
          return (
            <Svg height="100" width="100">
              <Polygon points="50,10 90,50 50,90 10,50" fill="white" stroke="black" strokeWidth="4" />
            </Svg>
          );
        case 'oval':
          return (
            <Svg height="100" width="150">
              <Ellipse cx="75" cy="50" rx="60" ry="40" fill="white" stroke="black" strokeWidth="4" />
            </Svg>
          );
          case 'heart':
            return (
              <Svg height="100" width="100">
                <Path
                  d="M50,80 L40,70 C25,55 10,40 10,25 C10,10 25,5 40,5 C50,5 55,15 60,20 C65,15 70,5 80,5 C95,5 110,10 110,25 C110,40 95,55 80,70 L50,80 Z"
                  fill="white"
                  stroke="black"
                  strokeWidth="4"
                />
              </Svg>
            );
          
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
});

export default TrueOrFalseGame;
