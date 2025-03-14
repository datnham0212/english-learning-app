import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const users = Array.from({ length: 10 }, (v, k) => ({
  id: (k + 1).toString(),
  name: `User ${k + 1}`,
  score: Math.floor(Math.random() * 200) + 1,
}));

const Leaderboard = React.memo(() => {
  const sortedUsers = users.sort((a, b) => b.score - a.score);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.header}>
        <Text style={styles.headerRank}>Rank</Text>
        <Text style={styles.headerName}>Name</Text>
        <Text style={styles.headerScore}>Score</Text>
      </View>
      <FlatList
        data={sortedUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 50, // Move the leaderboard down
    backgroundColor: '#F5F5F5', // Light gray background
    borderRadius: 15, // Rounded container
    overflow: 'hidden', // Ensure the overflow is rounded
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5E5E5E', // Dark gray title
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#9E9E9E', // Medium gray border for header
    backgroundColor: '#BDBDBD', // Slightly darker gray background for header
    borderTopLeftRadius: 15, // Rounded top-left corner
    borderTopRightRadius: 15, // Rounded top-right corner
  },
  headerRank: {
    fontSize: 18,
    width: 50,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text on gray background
  },
  headerName: {
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text on gray background
  },
  headerScore: {
    fontSize: 18,
    width: 50,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#FFFFFF', // White text on gray background
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Light gray divider between items
    backgroundColor: '#FFFFFF', // White background for each item
    borderRadius: 10, // Rounded item corners
    marginVertical: 5, // Space between items
  },
  rank: {
    fontSize: 18,
    width: 50,
    color: '#5E5E5E', // Dark gray rank number
  },
  name: {
    fontSize: 18,
    flex: 1,
    color: '#333333', // Charcoal gray name text
  },
  score: {
    fontSize: 18,
    width: 50,
    textAlign: 'right',
    color: '#333333', // Charcoal gray score text
  },
});

export default Leaderboard;
