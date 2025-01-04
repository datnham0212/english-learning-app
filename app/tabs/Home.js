import * as React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// Replace later with actual data
const data = [
  { key: '1', text: 'Slide 1', backgroundColor: '#523' },
  { key: '2', text: 'Slide 2', backgroundColor: '#664' },
  { key: '3', text: 'Slide 3', backgroundColor: '#445' },
  { key: '4', text: 'Slide 4', backgroundColor: '#356' },
];

const renderItem = ({ item }) => (
  <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
    <Text style={styles.slideText}>{item.text}</Text>
  </View>
);

const Home = React.memo(() => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button 
            title="Start" 
            onPress={() => console.log('Start button pressed!')}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Home;