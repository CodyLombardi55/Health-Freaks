import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Timer from './Timer';
import BMICalc from "./BMICalc";
import Steps from './Steps';
import HealthTips from "./HealthTips";
import Feed from "./Feed2";
import { convertToObject } from "typescript";

const Stack = createNativeStackNavigator();

function Dashboard({ navigation }) {
    const today = new Date();
    const todayFormatted = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);
    const assets = {
        'hitMePunk': require('../../assets/fonts/hitMePunk.ttf'),
        'streetSoul': require('../../assets/fonts/streetSoul.ttf'),
        'background': require('../../assets/BACKGROUND.png')
    }

    // save number data to local storage
    const storeData = async (key: string, value: string, reset: boolean = false) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log(key, 'set to', value);
        } catch (e) {
            // saving error
            console.log('Save error for [', key, ']: ', e);
        }
    };

    // retrieve number data from local storage
    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // value previously stored
                console.log('Current', key, 'value:', value);
                if (key === 'steps') {
                    setSteps(Number(value));
                } else if (key === 'calories') {
                    setCalories(Number(value));
                }
            }
        } catch (e) {
            // error reading value
            console.log('Read error for [', key, ']: ', e);
        }
    };

    function refreshData() {
        getData('steps');
        getData('calories');
    };

    useEffect(() => {
        refreshData();
        console.log(todayFormatted);
    }, []);

    return (
        <ImageBackground source={assets.background} resizeMode='cover' style={styles.background}>
            <View style={[styles.container, { marginTop: 40, flex: 0 }]}>
                <View style={styles.bubble}>
                    <Pressable onPress={() => { navigation.navigate('Steps') }}>
                        <Text style={[styles.bubbleTitle, { fontSize: 48, fontFamily: 'hitMePunk' }]}>Fitness</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.container, { alignItems: 'center' }]}>
                                <Text style={styles.text}>Daily Steps</Text>
                                <Text style={styles.text}>{steps}</Text>
                            </View>
                            <View style={[styles.container, { alignItems: 'center' }]}>
                                <Text style={styles.text}>Net Calories</Text>
                                <Text style={styles.text}>{calories}</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={[styles.container, styles.centerButtons]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Pressable
                        style={styles.miniBubble}
                        onPress={() => { navigation.navigate('Feed') }}
                    >
                        <Text style={styles.bubbleTitle}>Health Tips</Text>
                    </Pressable>
                    <Pressable style={styles.miniBubble}>
                        <Text style={styles.bubbleTitle}>Graphs</Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
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
        </ImageBackground >
    );
}

export default function Main() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: '#fff'
            }}>
                <Stack.Screen name='Dashboard' component={Dashboard} />
                <Stack.Screen name='Timer' component={Timer} />
                <Stack.Screen name='BMICalc' component={BMICalc} />
                <Stack.Screen name='Steps' component={Steps} />
                <Stack.Screen name='Feed' component={Feed} />
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
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'deeppink',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.69)',
        shadowColor: 'deeppink',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
    },
    bubbleTitle: {
        fontSize: 24,
        alignSelf: 'center',
        color: 'red',
        fontFamily: 'streetSoul'
    },
    miniBubble: {
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.69)',
        borderWidth: 1,
        borderColor: 'deeppink',
        borderRadius: 8,
        shadowColor: 'deeppink',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        minWidth: 150
    },
    text: {
        fontSize: 20,
        color: 'red',
        fontFamily: 'streetSoul',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    centerButtons: {
        //marginTop: 128,
        paddingBottom: 48,
        justifyContent: 'space-evenly'
    }
});