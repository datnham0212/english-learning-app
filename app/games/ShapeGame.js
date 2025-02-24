import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Circle, Rect, Polygon } from 'react-native-svg';

// Generate a random shape from the list
const generateRandomShape = () => {
  const shapes = ['triangle', 'square', 'circle', 'rectangle', 'pentagon', 'hexagon', 'octagon', 'nonagon'];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

// Generate a random count for the selected shape (between 1 and 5)
const generateShapeCount = () => Math.floor(Math.random() * 5) + 1;

const ShapeGame = () => {
  const [currentShape, setCurrentShape] = useState(generateRandomShape());
  const [shapeCount, setShapeCount] = useState(generateShapeCount());
  const [score, setScore] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);

  const startNewRound = () => {
    const newShape = generateRandomShape();
    setCurrentShape(newShape);
    const newShapeCount = generateShapeCount();
    setShapeCount(newShapeCount);
    setHasAnswered(false);
    setUserGuess('');
  };

  const handleAnswer = () => {
    if (parseInt(userGuess) === shapeCount) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }

    // After the answer, start a new round
    startNewRound();
  };

  const renderShape = () => {
    let shapesToRender = [];

    for (let i = 0; i < shapeCount; i++) {
      switch (currentShape) {
        case 'triangle':
          shapesToRender.push(
            <Svg key={i} height="100" width="100">
              <Polygon points="50,10 90,90 10,90" fill="none" stroke="black" strokeWidth="2" />
            </Svg>
          );
          break;
        case 'square':
          shapesToRender.push(
            <Svg key={i} height="100" width="100">
              <Rect x="10" y="10" width="80" height="80" fill="none" stroke="black" strokeWidth="2" />
            </Svg>
          );
          break;
        case 'circle':
          shapesToRender.push(
            <Svg key={i} height="100" width="100">
              <Circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="2" />
            </Svg>
          );
          break;
        case 'rectangle':
          shapesToRender.push(
            <Svg key={i} height="100" width="150">
              <Rect x="10" y="10" width="130" height="60" fill="none" stroke="black" strokeWidth="2" />
            </Svg>
          );
          break;
        case 'pentagon':
          shapesToRender.push(
            <Svg key={i} height="100" width="100">
              <Polygon points="50,10 90,35 75,85 25,85 10,35" fill="none" stroke="black" strokeWidth="2" />
            </Svg>
          );
          break;
        case 'hexagon':
          shapesToRender.push(
            <Svg key={i} height="100" width="100">
              <Polygon points="50,10 80,30 80,70 50,90 20,70 20,30" fill="none" stroke="black" strokeWidth="2" />
            </Svg>
          );
          break;
        case 'octagon':
          shapesToRender.push(
            <Svg key={i} height="100" width="100">
              <Polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill="none" stroke="black" strokeWidth="2" />
            </Svg>
          );
          break;
        case 'nonagon':
          shapesToRender.push(
            <Svg key={i} height="100" width="100">
              <Polygon points="50,10 80,20 90,50 80,80 50,90 20,80 10,50 20,20" fill="none" stroke="black" strokeWidth="2" />
            </Svg>
          );
          break;
        default:
          break;
      }
    }

    return shapesToRender;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>

      {/* Render the correct number of shapes */}
      <View style={styles.shapeContainer}>
        {renderShape()}
      </View>

      {/* User input for their guess */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter your guess"
        value={userGuess}
        onChangeText={setUserGuess}
      />

      {/* Submit button to check the answer */}
      <TouchableOpacity style={styles.button} onPress={handleAnswer}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    width: '60%',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
    color: 'black',
  },
});

export default ShapeGame;
