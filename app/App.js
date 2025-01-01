import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
  <>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    
    <View style={styles.buttonContainer}>
      <View style={styles.button}>
        <Button 
          title="Start" 
          onPress={() => console.log('Start button pressed!')}
        />
      </View>
    </View>

    <View style={styles.navigationContainer}>
      <TouchableOpacity style={styles.icon} onPress={() => console.log('Icon pressed!')}>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => console.log('Icon pressed!')}>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => console.log('Icon pressed!')}>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => console.log('Icon pressed!')}>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={() => console.log('Icon pressed!')}>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      </TouchableOpacity>
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#333',
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
  }
});