import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ImageBackground, Text, Modal, KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    // TODO: sync with user settings
    const [metricUnits, setMetricUnits] = useState(true);

    // save number data to local storage
    const storeData = async (key: string, value: string, reset: boolean = false) => {
        try {
            if (reset) {    // only for testing purposes on this screen
                await AsyncStorage.setItem(key, value);
                console.log(key, 'reset to', value);
            } else {
                var newValue;   // to store final value after addition
                await AsyncStorage.getItem(key).then((result) => newValue = Number(result) + Number(value)); // newValue = previousValue + inputValue
                await AsyncStorage.setItem(key, String(newValue));
                console.log(key, 'changed to', String(newValue));
            }
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
            }
        } catch (e) {
            // error reading value
            console.log('Read error for [', key, ']: ', e);
        }
    };

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
                            keyboardType='numeric'
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
                                keyboardType='numeric'
                            />
                        </KeyboardAvoidingView>
                        <Pressable style={styles.bubble} onPress={() => { storeData('calories', number); onChangeNumber(''); setCalVisible(false) }}>
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