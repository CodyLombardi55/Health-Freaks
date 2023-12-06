// basic design imports
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Platform } from "react-native";
// for nested navigation (ie. the buttons on the dashboard page, but not the tab bar)
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// store/access user step data
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FireBaseConfig";

// the following are nested navigation pages (ie. the dashboard buttons)
import Timer from './Timer';
import BMICalc from "./BMICalc";
import Steps from './Steps';
import Feed from "./Feed2";
import Graphs from "./Feed";

const Stack = createNativeStackNavigator();

function Dashboard({ navigation }) {
    const today = new Date();   // get current date according to device
    const todayFormatted = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();  // minimal format of date as YYYY-MM-DD
    const docRef = doc(FIRESTORE_DB, 'users', String(FIREBASE_AUTH.currentUser?.email));
    const [localExists, setLocalExists] = useState(true);

    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);

    const assets = {
        'hitMePunk': require('../../assets/fonts/hitMePunk.ttf'),
        'streetSoul': require('../../assets/fonts/streetSoul.ttf'),
        'background': require('../../assets/BACKGROUND.png')
    }

    async function setCloudData() {
        try {
            // update values on cloud db
            await updateDoc(docRef, {
                todayDate: todayFormatted,
                todaySteps: steps,
                todayCalories: calories,
            });
            console.log('Uploaded data successfully');
        } catch (err) {
            console.log('Error uploading:', err);
        }
    }

    async function getCloudData() {
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) { // user in db
                if (docSnap.data().todayDate != todayFormatted) { // new day, so reset daily values
                    console.log('New day. Resetting daily values');
                    setLocalData('steps', '0');
                    setLocalData('calories', '0');
                } else {    // same day, just get values
                    console.log('Getting saved daily values');
                    getLocalData('steps');
                    getLocalData('calories');
                }
            }
        } catch (err) {
            console.log('Failed to retrieve cloud data:', err);
            // retrieve last saved local data as fallback
            console.log('Getting saved daily values');
            getLocalData('steps');
            getLocalData('calories');
        }
    }

    // save number data to local storage
    const setLocalData = async (key: string, value: string, reset: boolean = false) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log(key, 'set to', value);
        } catch (e) {
            // saving error
            console.log('Save error for [', key, ']: ', e);
        }
    };

    // retrieve number data from local storage
    const getLocalData = async (key: string) => {
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
            } else {
                console.log('No local data for', key);
                setLocalExists(false);
            }
        } catch (e) {
            // error reading value
            console.log('Read error for [', key, ']: ', e);
        }
    };

    function refreshData() {
        getCloudData().then(() => {
            setCloudData();
        });
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <ImageBackground source={assets.background} resizeMode='cover' style={styles.background}>
            <Pressable style={[styles.bubble, { marginTop: 80 }]} onPress={() => { navigation.navigate('Steps') }}>
                <Text style={[styles.bubbleTitle, { fontSize: 48, fontFamily: 'hitMePunk' }]}>Step Counter</Text>
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
            <View style={[styles.container, styles.centerButtons]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Pressable
                        style={styles.miniBubble}
                        onPress={() => { navigation.navigate('Feed') }}
                    >
                        <Text style={styles.bubbleTitle}>Health Tips</Text>
                    </Pressable>
                    <Pressable
                        style={styles.miniBubble}
                        onPress={() => { navigation.navigate('Graphs') }}
                    >
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
                headerTintColor: '#fff',
            }}>
                <Stack.Screen name='Dashboard' component={Dashboard} />
                <Stack.Screen name='Timer' component={Timer} />
                <Stack.Screen name='BMICalc' component={BMICalc} />
                <Stack.Screen name='Steps' component={Steps} />
                <Stack.Screen name='Feed' component={Feed} />
                <Stack.Screen name='Graphs' component={Graphs} />
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
    }
});