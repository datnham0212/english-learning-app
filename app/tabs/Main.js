import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Pressable, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Pagination from '../components/pagination';

const { width } = Dimensions.get('window');

const data = [
  { key: '1', text: 'A', backgroundImage: require('../assets/sample.jpg') },
  { key: '2', text: 'B', backgroundImage: require('../assets/sample.jpg') },
  { key: '3', text: 'C', backgroundImage: require('../assets/sample.jpg') },
  { key: '4', text: 'D', backgroundImage: require('../assets/sample.jpg') },
];

const renderItem = ({ item, onPress }) => (
  <Pressable style={[styles.slide, styles.shadow]} onPress={onPress}>
    <ImageBackground source={item.backgroundImage} style={styles.imageBackground}>
      <Text style={styles.slideText}>{item.text}</Text>
    </ImageBackground>
  </Pressable>
);

const Main = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleStartPress = () => {
    const slideNumber = currentIndex + 1;
    console.log(`Selected Slide ${slideNumber}!`);
    navigation.navigate(`Slide${slideNumber}`);
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
      <Pagination index={currentIndex} data={data} />
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
    borderRadius: width * 0.1,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: width * 0.1,
  },
  slideText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Main;