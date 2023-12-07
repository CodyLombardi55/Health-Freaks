// basic design imports
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Platform } from "react-native";

// store/access user step data
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FireBaseConfig";

//bar chart and line chart
import React from 'react'
import { BarChart, LineChart } from "react-native-gifted-charts";
import { screenWidth } from "react-native-gifted-charts/src/utils/constants";



export default function Graphs() {
    const today = new Date();   // get current date according to device
    const todayFormatted = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();  // minimal format of date as YYYY-MM-DD
    const docRef = doc(FIRESTORE_DB, 'users', String(FIREBASE_AUTH.currentUser?.email));
    const [dataLoaded, setDataLoaded] = useState(false);

    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);

    // PROBLEMS: 1. everytime I get on the graphs page on the phone, i try to press something else , it freezes.
    const Bdata = [{ value: steps }]  // 2. doesn't show up on graph
    const Ldata = [{ value: calories, label: 'calories', labelcolor: 'white' }] //3. shows up but on the x axis line


    const assets = {
        'hitMePunk': require('../../assets/fonts/hitMePunk.ttf'),
        'streetSoul': require('../../assets/fonts/streetSoul.ttf'),
        'background': require('../../assets/BACKGROUND.png')
    }

    async function getCloudData() {
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists) { // user data exists in firebase db
                AsyncStorage.setItem('steps', String(docSnap.data().todaySteps));
                AsyncStorage.setItem('calories', String(docSnap.data().todayCalories));
                AsyncStorage.setItem('metricUnits', String(docSnap.data().metricUnits));
                console.log('Cloud data successfully loaded into local storage');
            } else {
                console.log('No cloud data\nChecking local data...');
                await getLocalData();
            }
        } catch (err) {
            console.log('Failed to retrieve cloud data:', err);
            console.log('Checking local data...');
            await getLocalData();
        } finally {
            setDataLoaded(true);
        }
    }

    async function getLocalData() {
        try {
            const step = await AsyncStorage.getItem('steps');
            const cal = await AsyncStorage.getItem('calories');
            const metric = await AsyncStorage.getItem('metricUnits');
            if (step == null) {
                AsyncStorage.setItem('steps', '0');
            } else {
                setSteps(Number(step));
            }
            if (cal == null) {
                AsyncStorage.setItem('calories', '0');
            } else {
                setCalories(Number(cal));
            }
            if (metric == null) {
                AsyncStorage.setItem('metricUnits', 'true');
            }
            console.log('Local data successfully loaded');
        } catch (err) {
            console.log('Failed to load local data:', err);
        } finally {
            setCloudData();
        }
    }

    async function setCloudData() {
        try {
            const step = await AsyncStorage.getItem('steps');
            const cal = await AsyncStorage.getItem('calories');
            const cloudDate = await AsyncStorage.getItem('todayDate');

            await updateDoc(docRef, {
                todayDate: (cloudDate == null || cloudDate != todayFormatted) ? todayFormatted : cloudDate,
                todaySteps: step,
                todayCalories: cal,
            });
            console.log('Uploaded data successfully');
        } catch (err) {
            console.log('Failed to upload data:', err);
        }
    }

    useEffect(() => {
        if (!dataLoaded) {
            getCloudData();
        } else {
            getLocalData();
        }
    }, [dataLoaded]);


    return (
        <ImageBackground source={assets.background} resizeMode='cover' style={styles.background}>
            <View style={{ backgroundColor: "purple", padding: 10, height: "auto", width: "100%" }}>
                <Text style={styles.main}>Daily Graph Progress</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ textAlign: "center", fontWeight: "bold", color: "white", fontSize: 18 }}></Text>
                <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}></Text>

                <BarChart
                    data={Bdata}
                    width={screenWidth}
                    yAxisColor={'white'}
                    xAxisColor={'white'}
                    frontColor={'deeppink'}
                    yAxisTextStyle={{color: 'white'}}
                />

                <LineChart
                    data={Ldata}
                    width={screenWidth}
                    yAxisColor={'white'}
                    xAxisColor={'white'}
                    dataPointsColor1="deeppink"
                    yAxisTextStyle={{color: 'white'}}
                />
            </View>
        </ImageBackground >
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
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
        color: 'limegreen',
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
        color: 'cyan',
        //fontFamily: 'streetSoul',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    centerButtons: {
        //marginTop: 128,
        paddingBottom: 48,
        justifyContent: 'space-evenly'
    },
    main: {
        fontSize: 48,
        textAlign: 'center',
        color: 'cyan',
        fontFamily: 'hitMePunk',
        marginTop: 30,
    }
})