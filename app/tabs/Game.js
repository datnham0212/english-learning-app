import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Game = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('UnscrambleWordsGame')}
                >
                    <Text style={styles.buttonText}>Component 1</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('MultipleChoiceGame')}
                >
                    <Text style={styles.buttonText}>Component 2</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Component3')}
                >
                    <Text style={styles.buttonText}>Component 3</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Component4')}
                >
                    <Text style={styles.buttonText}>Component 4</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Game;