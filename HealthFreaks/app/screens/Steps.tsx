import React, { useState, useEffect } from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, PermissionsAndroid, Platform } from "react-native";
import { Pedometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {
    const [PedometerAvailabiity, setPedometerAvailability] = useState("");
    const [currentStepCount, setCurrentStepCount] = useState(0);

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestPedometerPermission(); // Request permission when the app starts
        }
        subscribe();
    }, []);

    const subscribe = () => {
        const subscription = Pedometer.watchStepCount((result) => {
            setCurrentStepCount(result.steps);
        });

        Pedometer.isAvailableAsync().then(
            (result) => {
                setPedometerAvailability(String(result));
            },
            (error) => {
                setPedometerAvailability(error);
            }
        );
    }

    const requestPedometerPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
                {
                    title: 'Step Counter App Pedometer Permission',
                    message: 'Step Counter App needs access to your step count data.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Pedometer permission granted');
            } else {
                console.log('Pedometer permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
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