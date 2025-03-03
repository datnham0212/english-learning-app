import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import QuitGameButton from '../components/quitgame';
import Scoreboard from '../components/score';
// Questions array with sentences and options
const questions = [
  {
    sentence: 'An _____ is red and sweet.',
    image: require('../assets/apple.jpg'),
    options: ['APPLE', 'MANGO', 'BANANA', 'ORANGE'],
    correctAnswer: 'APPLE',
    partOfSpeech: 'Noun',
  },
  {
    sentence: 'She sings _____ in the choir.',
    image: require('../assets/singing_choir.jpg'),
    options: ['LOUDLY', 'LOUD', 'LOUDER', 'LOUDNESS'],
    correctAnswer: 'LOUDLY',
    partOfSpeech: 'Adverb',
  },
  {
    sentence: 'The _____ cat sat on the mat.',
    image: require('../assets/cat.jpg'),
    options: ['BLACK', 'BLACKLY', 'BLACKNESS', 'BLACKEN'],
    correctAnswer: 'BLACK',
    partOfSpeech: 'Adjective',
  },
  {
    sentence: 'He _____ the ball over the fence.',
    image: require('../assets/throwing.jpg'),
    options: ['THREW', 'THROWN', 'THROWING', 'THROW'],
    correctAnswer: 'THREW',
    partOfSpeech: 'Verb',
  },
  {
    sentence: '_____ is the capital of France.',
    image: require('../assets/paris.jpg'),
    options: ['PARIS', 'PARISIAN', 'PARISIANLY', 'PARISIANNESS'],
    correctAnswer: 'PARIS',
    partOfSpeech: 'Noun',
  },
  {
    sentence: 'She is _____ than her brother.',
    image: require('../assets/compared_height.jpg'),
    options: ['TALLER', 'TALL', 'TALLEST', 'TALLNESS'],
    correctAnswer: 'TALLER',
    partOfSpeech: 'Adjective',
  },
  {
    sentence: 'He _____ to the store yesterday.',
    image: require('../assets/walking_store.jpg'),
    options: ['WENT', 'GOES', 'GOING', 'GONE'],
    correctAnswer: 'WENT',
    partOfSpeech: 'Verb',
  },
  {
    sentence: '_____ you like ice cream?',
    image: require('../assets/ice_cream.jpg'),
    options: ['DO', 'DOES', 'DID', 'DOESN\'T'],
    correctAnswer: 'DO',
    partOfSpeech: 'Auxiliary Verb',
  },
  {
    sentence: 'The book is _____ the table.',
    image: require('../assets/book_on_table.jpg'),
    options: ['ON', 'IN', 'UNDER', 'BETWEEN'],
    correctAnswer: 'ON',
    partOfSpeech: 'Preposition',
  },
  {
    sentence: 'She is _____ to help us.',
    image: require('../assets/helping.jpg'),
    options: ['EAGER', 'EAGERLY', 'EAGERNESS', 'EAGERED'],
    correctAnswer: 'EAGER',
    partOfSpeech: 'Adjective',
  },
];

const MultipleChoiceGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Function to shuffle an array
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

  // Load a new random question and shuffle options
  const loadNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];
    setCurrentQuestion({
      ...selectedQuestion,
      options: shuffleArray([...selectedQuestion.options]), // Shuffle options
    });
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  // Handle answer selection and check if it is correct
  const handleAnswerSelection = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    if (selectedOption === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      setIsCorrect(false);
    }
    setTimeout(() => {
      loadNewQuestion();
    }, 1000);
  };

  // Initialize game by loading the first question
  useEffect(() => {
    loadNewQuestion();
  }, []);

  return (
    <View style={styles.container}>
      <QuitGameButton />
      <Scoreboard score={score} />
      {currentQuestion && (
        <>
          <Text style={styles.sentence}>{currentQuestion.sentence}</Text>
          {currentQuestion.image && (
            <Image source={currentQuestion.image} style={styles.image} />
          )}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      selectedAnswer === option
                        ? isCorrect
                          ? '#4ECDC4'
                          : '#FF6B6B'
                        : selectedAnswer !== null && option === currentQuestion.correctAnswer
                        ? '#4ECDC4'
                        : '#fff',
                  },
                ]}
                onPress={() => handleAnswerSelection(option)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fffbf1',
  },
  score: {
    fontSize: 24,
    marginBottom: 20,
    color: '#444',
  },
  sentence: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'left',
    width: '80%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    padding: 25,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MultipleChoiceGame;
