import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Game = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
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
                    <Text style={styles.buttonText}>Identify Pictures</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('MemoryFlipGame')}
                >
                    <Text style={styles.buttonText}>Matching Pairs</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('SchulteTable')}
                >
                    <Text style={styles.buttonText}>Component 4</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

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
    },
});

export default Game;