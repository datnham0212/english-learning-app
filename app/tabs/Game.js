import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GoBackButton from '../components/goback';

const Game = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <GoBackButton />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/** Game Buttons Rows */}
                {gameData.map((row, index) => (
                    <View key={index} style={styles.row}>
                        {row.map((game, idx) => (
                            <TouchableOpacity 
                                key={idx}
                                style={styles.button} 
                                onPress={() => navigation.navigate(game.route)}
                            >
                                {game.image ? (
                                    <ImageBackground 
                                        source={game.image} 
                                        resizeMode="cover" 
                                        style={styles.imageBackground}
                                    >
                                        <Text style={styles.buttonText}>{game.label}</Text>
                                    </ImageBackground>
                                ) : (
                                    <Text style={styles.buttonText}>{game.label}</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

// Game Button Data
const gameData = [
    [
        { label: 'Sentence Building', route: 'SentenceBuildingGame', image: require('../assets/game1.png') },
        { label: 'Fill in the blanks', route: 'MultipleChoiceGame' }
    ],
    [
        { label: 'Matching Translation', route: 'MemoryFlipGame' },
        { label: 'Find the number', route: 'SchulteTable' }
    ],
    [
        { label: 'True or False', route: 'TrueOrFalseGame' },
        { label: 'Counting Shapes', route: 'ShapeGame' }
    ]
];

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 100, // Adjust padding to prevent content cutoff on smaller screens
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20, // Add some space at the bottom
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensure buttons are evenly spaced
        marginBottom: 20,
    },
    button: {
        width: width * 0.45,
        height: height * 0.35,
        margin: 10,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden', // Prevent image overflow in buttons
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // For Android shadow support
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        // padding: 10, 
    },
});

export default Game;
