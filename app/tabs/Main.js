import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import UnscrambleWordsGame from '../components/UnscrambleWordsGame';

const { width } = Dimensions.get('window');


const Main = React.memo(() => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <UnscrambleWordsGame />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;