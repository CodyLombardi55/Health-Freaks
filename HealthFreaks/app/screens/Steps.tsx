import React, { useState, useEffect } from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Pressable } from "react-native";
import { Pedometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [PedometerAvailabiity, setPedometerAvailability] = useState("");
    const [currentStepCount, setCurrentStepCount] = useState(0);

    useEffect(() => {
        subscribe();
        getData()
    }, [currentStepCount]);

    const subscribe = () => {
        const subscription = Pedometer.watchStepCount((result) => {
            setCurrentStepCount(result.steps);
        });

        Pedometer.isAvailableAsync().then(
            (result) => {
                setPedometerAvailability(String(result));
                Pedometer.requestPermissionsAsync();
            },
            (error) => {
                setPedometerAvailability(error);
            }
        );
    }

    const setLocalData = async () => {
        try {
            await AsyncStorage.setItem('steps', String(currentStepCount + 1));
            console.log('Updated steps');
        } catch (e) {
            // saving error
            console.log('Save error for [steps]: ', e);
        }
    };

    // retrieve number data from local storage
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('steps');
            if (value !== null) {
                // value previously stored
                setCurrentStepCount(Number(value));
            }
        } catch (e) {
            // error reading value
            console.log('Read error for [steps]: ', e);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                resizeMode='cover'
                source={require('../../assets/BACKGROUND.png')}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                    <Text style={styles.headingDesign}> Step Counter Active :{PedometerAvailabiity}</Text>
                    <CircularProgress
                        value={currentStepCount}
                        maxValue={6500}
                        radius={180}
                        //textColor={'#ECF0F1'}
                        activeStrokeColor={'#F39C12'}
                        inActiveStrokeColor={'#9B59F9'}
                        inActiveStrokeOpacity={0.5}
                        inActiveStrokeWidth={40}
                        activeStrokeWidth={40}
                        title={"Step Count"}
                        titleColor={"#ECF0F1"}
                        titleStyle={{ fontWeight: "bold" }}
                    />
                    <Pressable onPress={() => { setLocalData() }}>
                        <Text>Update steps</Text>
                    </Pressable>
                </View>
            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    headingDesign: {
        color: "white",
        backgroundColor: 'rgba(155,89,182,0.5)',
        alignSelf: "center",
        fontSize: 15,
        fontWeight: "bold",
    },
});