import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function Dashboard() {
    return (
        <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.background}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {'\t\t\t'}Goals{'\n\t'} Steps{'\t\t\t\t'} Calories
                        {'\n\t'} 10782 {'\t\t\t\t'}1992
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 0.1,
        backgroundColor: 'transparent',
        padding: 8,
    },
    textContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.69)',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        shadowColor: 'deeppink',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,

    },
    text: {
        fontSize: 25,
        height: 200,
        width: '100%',
        color: 'red',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
});
