import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, ImageBackground, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Timer from './Timer';
import BMICalc from "./BMICalc";
import Steps from './Steps';

const Stack = createNativeStackNavigator();

function Dashboard({ navigation }) {
    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);

    return (
        <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.background}>
            <View style={styles.container}>
                <View style={styles.bubble}>
                    <Pressable
                        onPress={() => { navigation.navigate('Steps') }}
                    >
                        <Text style={styles.bubbleTitle}>
                            Fitness
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.container, { alignItems: 'center' }]}>
                                <Text style={styles.text}>Steps</Text>
                                <Text style={styles.text}>{steps}</Text>
                            </View>
                            <View style={[styles.container, { alignItems: 'center' }]}>
                                <Text style={styles.text}>Calories</Text>
                                <Text style={styles.text}>{calories}</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Pressable style={styles.miniBubble}>
                        <Text style={styles.bubbleTitle}>Health Tips</Text>
                    </Pressable>
                    <Pressable style={styles.miniBubble}>
                        <Text style={styles.bubbleTitle}>Graphs</Text>
                    </Pressable>
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Pressable
                        style={styles.miniBubble}
                        onPress={() => { navigation.navigate('BMICalc') }}
                    >
                        <Text style={styles.bubbleTitle}>BMI Calc</Text>
                    </Pressable>
                    <Pressable
                        style={styles.miniBubble}
                        onPress={() => { navigation.navigate('Timer') }}
                    >
                        <Text style={styles.bubbleTitle}>Timer</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

export default function Main() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen
                    name='Dashboard'
                    component={Dashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name='Timer' component={Timer} />
                <Stack.Screen name='BMICalc' component={BMICalc} />
                <Stack.Screen name='Steps' component={Steps} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'transparent', //makes the background image visible
        padding: 8,
    },
    bubble: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.69)',
        shadowColor: 'deeppink',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
    },
    bubbleTitle: {
        fontSize: 24,
        alignSelf: 'center',
        color: 'red'
    },
    miniBubble: {
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.69)',
        shadowColor: 'deeppink',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
    },
    text: {
        fontSize: 20,
        color: 'red',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
});
