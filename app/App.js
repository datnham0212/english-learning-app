import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Navbar from './components/navbar';

export default function App() {
  return (
    <Navbar />
  );
}
