import * as React from 'react';
import { useState } from 'react';
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

const Pagination = ({ index }) => {
  return (
    <View style={styles.pagination}>
      {data.map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { opacity: i === index ? 1 : 0.3 },
          ]}
        />
      ))}
    </View>
  );
};

const Home = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleStartPress = () => {
    console.log(`Selected Slide ${currentIndex + 1}!`);
  };

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
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination index={currentIndex} />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button 
            title="Start" 
            onPress={handleStartPress}
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
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 150,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 8,
  },
});

export default Home;