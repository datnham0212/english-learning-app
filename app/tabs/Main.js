import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// Replace with actual images or URLs
const data = [
  { key: '1', text: 'Slide 1', backgroundImage: require('../assets/sample.jpg') }, // Example local image
  { key: '2', text: 'Slide 2', backgroundImage: require('../assets/sample.jpg') }, // Example local image
  { key: '3', text: 'Slide 3', backgroundImage: require('../assets/sample.jpg') }, // Example local image
  { key: '4', text: 'Slide 4', backgroundImage: require('../assets/sample.jpg') }, // Example local image
];

const renderItem = ({ item, onPress }) => (
  <Pressable style={[styles.slide, styles.shadow]} onPress={onPress}>
    <ImageBackground source={item.backgroundImage} style={styles.imageBackground}>
      <Text style={styles.slideText}>{item.text}</Text>
    </ImageBackground>
  </Pressable>
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

const Main = React.memo(() => {
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
        renderItem={({ item }) => renderItem({ item, onPress: handleStartPress })}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination index={currentIndex} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.1,
    marginVertical: 70,
    borderRadius: width * 0.1, // Apply borderRadius to Pressable as well
    overflow: 'hidden', // Ensures child content respects the border radius
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: width * 0.1, // Apply borderRadius to ImageBackground as well
  },
  slideText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Ensure text is visible against images
    textShadowColor: '#000', // Optional: Add text shadow for better visibility
    textShadowOffset: { width: 1, height: 1 }, // Optional: Offset shadow
    textShadowRadius: 5, // Optional: Radius of shadow
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
});

export default Main;
