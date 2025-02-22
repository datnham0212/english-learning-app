import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const users = Array.from({ length: 50 }, (v, k) => ({
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'tomato',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'tomato',
    backgroundColor: '#ffe5e5',
  },
  headerRank: {
    fontSize: 18,
    width: 50,
    fontWeight: 'bold',
    color: 'tomato',
  },
  headerName: {
    fontSize: 18,
    flex: 1,
    fontWeight: 'bold',
    color: 'tomato',
  },
  headerScore: {
    fontSize: 18,
    width: 50,
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'tomato',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff5f5',
  },
  rank: {
    fontSize: 18,
    width: 50,
    color: 'tomato',
  },
  name: {
    fontSize: 18,
    flex: 1,
    color: '#333',
  },
  score: {
    fontSize: 18,
    width: 50,
    textAlign: 'right',
    color: '#333',
  },
});

export default Leaderboard;