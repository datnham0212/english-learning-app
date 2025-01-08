import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faStar } from '@fortawesome/free-solid-svg-icons';

const Dictionary = React.memo(() => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesomeIcon icon={faChevronLeft} size={24} color="#4B4B4B" />
          </TouchableOpacity>
        </View>
        
        <TextInput
          placeholder="Search bar"
          style={styles.searchInput}
        />
        
        <View style={styles.categoryButtonsContainer}>
          {['All', 'Noun', 'Verb', 'Adj', 'Adv'].map((label, index) => (
            <TouchableOpacity key={index} style={styles.categoryButton}>
              <Text>{label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.categoryButton}>
            <FontAwesomeIcon icon={faStar} size={18} color="#4B4B4B" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.wordList}>
          {['apple (táo)', 'strong (mạnh)', 'apple (táo)', 'apple (táo)', 'apple (táo)'].map((word, index) => (
            <View key={index} style={styles.wordItem}>
              <Text>{word}</Text>
              {index !== 1 && <Text style={styles.wordType}>noun</Text>}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9C4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  iconButton: {
    padding: 8,
  },
  searchInput: {
    width: '100%',
    padding: 12,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    width: '100%',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordList: {
    width: '100%',
  },
  wordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1F1F1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  wordType: {
    color: '#B0B0B0',
  },
});

export default Dictionary;