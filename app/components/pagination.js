import React from 'react';
import { View, StyleSheet } from 'react-native';

const Pagination = ({ index, data }) => {
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

const styles = StyleSheet.create({
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
});

export default Pagination;