import React, { useState, useEffect } from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Pedometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {
    const [PedometerAvailabiity, setPedometerAvailability] = useState("");
    const [currentStepCount, setCurrentStepCount] = useState(0);

    useEffect(() => {
        subscribe();
    }, []);

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

    return (
        <View style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                resizeMode='cover'
                source={require('../../assets/BACKGROUND.png')}
            >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.headingDesign}> Step Counter Active :{PedometerAvailabiity}</Text>

                    <View>
                        <CircularProgress
                            value={currentStepCount}
                            maxValue={6500}
                            radius={210}
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
                    </View>

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