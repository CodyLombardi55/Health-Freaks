import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ImageBackground, Text, Modal, KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FireBaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export default function ManualInput() {
    const assets = {
        'hitMePunk': require('../../assets/fonts/hitMePunk.ttf'),
        'streetSoul': require('../../assets/fonts/streetSoul.ttf'),
        'background': require('../../assets/BACKGROUND.png')
    }

    // each available modal
    const [stepsVisible, setStepsVisible] = useState(false);
    const [distVisible, setDistVisible] = useState(false);
    const [calVisible, setCalVisible] = useState(false);

    // shared text input var
    const [number, onChangeNumber] = useState('');
    // metric unit toggle
    const [metricUnits, setMetricUnits] = useState(true);
    const docRef = doc(FIRESTORE_DB, 'users', String(FIREBASE_AUTH.currentUser?.email));
    // temp value for calories
    const [cal, setCal] = useState(0);

    // save number data to local storage
    const storeData = async (key: string, value: string, cal: number = 0) => {
        try {
            var newSteps;   // to store final value after addition
            await AsyncStorage.getItem(key).then((result) => newSteps = Number(result) + Number(value)); // newSteps = previousValue + inputValue
            await AsyncStorage.setItem(key, String(newSteps));
            console.log(key, 'changed to', String(newSteps));
            await calcCalories(cal);
            await AsyncStorage.setItem('calories', String(cal));
            setCloudData();
        } catch (e) {
            // saving error
            console.log('Save error for [', key, ']: ', e);
        }
    };

    async function setCloudData() {
        try {
            const steps = await AsyncStorage.getItem('steps');
            const calor = await AsyncStorage.getItem('calories');
            console.log('calor:', calor);
            await updateDoc(docRef, {
                todaySteps: steps,
                todayCalories: calor,
            });
            console.log('Manual input uploaded data successfully');
        } catch (err) {
            console.log('Failed to upload data to cloud:', err);
        }
    }

    async function calcCalories(calGained: number) {
        const steps = await AsyncStorage.getItem('steps');
        const calBurned = Number(steps) * 0.05;
        setCal(Math.round(calBurned - calGained));
        console.log('calories:', cal);
    }

    return (
        <View style={styles.main}>
            <ImageBackground source={assets.background} resizeMode='cover' style={styles.background}>
                <View style={{ flex: 0, marginTop: 40 }}>
                    <Text style={styles.title}>Exercise Input</Text>
                </View>
                <View style={styles.content}>
                    <Pressable style={styles.bubble} onPress={() => { setStepsVisible(true) }}>
                        <Text style={styles.text}>Input Steps</Text>
                    </Pressable>
                    <Pressable style={styles.bubble} onPress={() => { setDistVisible(true) }}>
                        <Text style={styles.text}>Input Distance Walked</Text>
                    </Pressable>
                    <Pressable style={styles.bubble} onPress={() => { setCalVisible(true) }}>
                        <Text style={styles.text}>Input Calories Eaten</Text>
                    </Pressable>
                </View>

                <Modal
                    visible={stepsVisible}
                    onRequestClose={() => { onChangeNumber(''); setStepsVisible(false) }}
                    animationType='fade'
                    transparent={true}
                >
                    <View style={styles.modal}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>Enter Steps</Text>
                        </View>
                        <KeyboardAvoidingView style={{ flex: 1 }}>
                            <TextInput
                                style={[styles.text, styles.input]}
                                onChangeText={onChangeNumber}
                                value={number}
                                placeholder='Steps walked'
                                placeholderTextColor='gray'
                                keyboardType={Platform.OS == 'android' ? 'numeric' : 'default'}
                            />
                        </KeyboardAvoidingView>
                        <Pressable style={styles.bubble} onPress={() => { storeData('steps', number); onChangeNumber(''); setStepsVisible(false) }}>
                            <Text style={styles.text}>Enter</Text>
                        </Pressable>
                        <Pressable style={[styles.bubble, styles.bubbleRed]} onPress={() => { onChangeNumber(''); setStepsVisible(false) }}>
                            <Text style={styles.text}>Cancel</Text>
                        </Pressable>
                    </View>
                </Modal>
                <Modal
                    visible={distVisible}
                    onRequestClose={() => { onChangeNumber(''); setDistVisible(false) }}
                    animationType='fade'
                    transparent={true}
                >
                    <KeyboardAvoidingView style={styles.modal}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>Enter Distance Walked</Text>
                        </View>
                        <TextInput
                            style={[styles.text, styles.input]}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder='Distance walked'
                            placeholderTextColor='gray'
                            keyboardType={Platform.OS == 'android' ? 'numeric' : 'default'}
                        />
                        <Pressable style={[styles.bubble, styles.bubbleBlue]} onPress={() => setMetricUnits(!metricUnits)}>
                            <Text style={styles.text}>Metric unit toggle: {metricUnits ? 'km' : 'mi'}</Text>
                        </Pressable>
                        <Pressable style={styles.bubble} onPress={() => { storeData('steps', String(Number(number) * (metricUnits ? 1408 : 2252))); onChangeNumber(''); setDistVisible(false) }}>
                            <Text style={styles.text}>Enter</Text>
                        </Pressable>
                        <Pressable style={[styles.bubble, styles.bubbleRed]} onPress={() => { onChangeNumber(''); setDistVisible(false) }}>
                            <Text style={styles.text}>Cancel</Text>
                        </Pressable>
                    </KeyboardAvoidingView>
                </Modal>
                <Modal
                    visible={calVisible}
                    onRequestClose={() => { onChangeNumber(''); setCalVisible(false) }}
                    animationType='fade'
                    transparent={true}
                >
                    <View style={styles.modal}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>Enter Calorie Intake</Text>
                        </View>
                        <KeyboardAvoidingView style={{ flex: 1 }}>
                            <TextInput
                                style={[styles.text, styles.input]}
                                onChangeText={onChangeNumber}
                                value={number}
                                placeholder='Calories consumed'
                                placeholderTextColor='gray'
                                keyboardType={Platform.OS == 'android' ? 'numeric' : 'default'}
                            />
                        </KeyboardAvoidingView>
                        <Pressable style={styles.bubble} onPress={() => { storeData('steps', '0', Number(number)) }}>
                            <Text style={styles.text}>Enter</Text>
                        </Pressable>
                        <Pressable style={[styles.bubble, styles.bubbleRed]} onPress={() => { onChangeNumber(''); setCalVisible(false) }}>
                            <Text style={styles.text}>Cancel</Text>
                        </Pressable>
                    </View>
                </Modal>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40,
        rowGap: 16,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    bubble: {
        padding: 10,
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'seagreen',
        shadowColor: 'seagreen',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, .69)',
        alignItems: 'center',
    },
    bubbleRed: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'crimson',
        shadowColor: 'crimson',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
    },
    bubbleBlue: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'cornflowerblue',
        shadowColor: 'cornflowerblue',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
    },
    text: {
        fontSize: 20,
        color: 'deeppink',
        //fontFamily: 'streetSoul', //a bit too hard to read, but front-end's choice on enabling
        textAlign: 'center'
    },
    title: {
        fontSize: 48,
        textAlign: 'center',
        color: 'deeppink',
        fontFamily: 'hitMePunk',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .9)',
        marginVertical: 96,
        marginHorizontal: 36,
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'seagreen',
        shadowColor: 'seagreen',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        rowGap: 16
    },
    input: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'violet',
        shadowColor: 'violet',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        minHeight: 'auto'
    }
})