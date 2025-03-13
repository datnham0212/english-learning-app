import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfile = ({ name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Move to the right end of the screen
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f8ff', // Light blue background color
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default UserProfile;