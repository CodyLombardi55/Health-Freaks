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
    const [dataLoaded, setDataLoaded] = useState(false);

    const [steps, setSteps] = useState(0);
    const [calories, setCalories] = useState(0);

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
        }
    }

    async function setCloudData() {
        try {
            const step = await AsyncStorage.getItem('steps');
            const cal = await AsyncStorage.getItem('calories');
            await updateDoc(docRef, {
                todayDate: todayFormatted,
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