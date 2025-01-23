import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faStar, faSearch } from '@fortawesome/free-solid-svg-icons';

const Dictionary = React.memo(() => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>  
        
        <View style={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} size={18} color="#4B4B4B" style={styles.searchIcon} />
          <TextInput
            placeholder="Search bar"
            style={styles.searchInput}
          />
        </View>
        
        <View style={styles.categoryButtonsContainer}>
          {['All', 'Noun', 'Verb', 'Adj', 'Adv'].map((label, index) => (
            <TouchableOpacity key={index} style={styles.categoryButton}>
              <Text style={{fontSize: 11, fontWeight: 600}}>{label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.categoryButton}>
            <FontAwesomeIcon icon={faStar} size={18} color="#4B4B4B" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.wordList}>
          {[
            { word: 'apple (táo)', pos: 'noun' },
            { word: 'strong (mạnh)', pos: 'adjective' },
            { word: 'run (chạy)', pos: 'verb' },
            { word: 'book (sách)', pos: 'noun' },
            { word: 'fast (nhanh)', pos: 'adjective' },
            { word: 'beautiful (đẹp)', pos: 'adjective' },
            { word: 'dog (chó)', pos: 'noun' },
            { word: 'cat (mèo)', pos: 'noun' },
            { word: 'car (ô tô)', pos: 'noun' },
            { word: 'happy (hạnh phúc)', pos: 'adjective' }
          ].map((item, index) => (
            <View key={index} style={styles.wordItem}>
              <Text>{item.word}</Text>
              <Text style={styles.wordType}>{item.pos}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 12,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    marginVertical: 16,
    marginTop: 20,
    borderWidth: 0.2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    width: '100%',
  },
  categoryButton: {
    width: 51,
    height: 29,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2,
  },
  wordList: {
    width: '100%',
  },
  wordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1F1F1',
    width: '100%',
    height: 73,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 0.2,
  },
  wordType: {
    color: '#B0B0B0',
  },
});

export default Dictionary;