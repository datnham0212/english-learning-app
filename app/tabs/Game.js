import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Game = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('SentenceBuildingGame')}
                >
                    <Text style={styles.buttonText}>Sentences Builder</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('MultipleChoiceGame')}
                >
                    <Text style={styles.buttonText}>Fill in the blanks</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('MemoryFlipGame')}
                >
                    <Text style={styles.buttonText}>Matching Translation</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('SchulteTable')}
                >
                    <Text style={styles.buttonText}>Find the number</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('TrueOrFalseGame')}
                >
                    <Text style={styles.buttonText}>True or False</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    // onPress={() => navigation.navigate('')}
                >
                    <Text style={styles.buttonText}>Game 6</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.button} 
                    // onPress={() => navigation.navigate('')}
                >
                    <Text style={styles.buttonText}>Game 7</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    // onPress={() => navigation.navigate('')}
                >
                    <Text style={styles.buttonText}>Game 8</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 60, // Add padding to ensure content is not cut off
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        width: width * 0.4,
        height: height * 0.3,
        margin: 10,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', // Center text inside the button
    },
});

export default Game;
