import { View, Text, StyleSheet, KeyboardAvoidingView, Button, Pressable, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FireBaseConfig';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('Other');
    const [metricUnits, setUnits] = useState(true)

    const docRef = doc(FIRESTORE_DB, 'users', String(FIREBASE_AUTH.currentUser?.email));

    function validateInput() {
        let valid = true;
        const fields = [firstName, lastName, age, height, weight, sex];

        //check for empty input
        for (let val in fields) {
            if (!fields[val]) {
                valid = false;
                break;
            }
        }

        //check for valid number inputs
        const numbers = [age, height, weight]
        for (let val in numbers) {
            if (isNaN(+numbers[val])) {
                valid = false;
            }
        }

        //all inputs are valid
        if (valid) {
            saveData();
        } else {
            alert('Failed to save: Invalid input!');
        }
    }

    async function saveData() {
        try {
            await updateDoc(docRef, {
                firstName: firstName,
                lastName: lastName,
                age: parseInt(age),
                height: parseFloat(height),
                weight: parseFloat(weight),
                sex: sex,
                metricUnits: metricUnits,
            });
            storeLocalData();
            console.log('Data saved to user: ', FIREBASE_AUTH.currentUser?.email);
            alert('User info saved!');
        } catch (error: any) {
            console.log('Error saving data: ', error);
            alert('Failed to save info: ' + error.message);
        }
    }

    async function loadData() {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('Loaded data from: ', FIREBASE_AUTH.currentUser?.email);
            //overwrite current field values
            setFirstName(docSnap.data().firstName);
            setLastName(docSnap.data().lastName);
            setAge(String(docSnap.data().age));
            setHeight(String(docSnap.data().height));
            setWeight(String(docSnap.data().weight));
            setSex(docSnap.data().sex);
            setUnits(docSnap.data().metricUnits);
        } else {
            console.log('Document unavailable.');
        }
    }

    const storeLocalData = async () => {
        try {
            AsyncStorage.setItem('height', height);
            AsyncStorage.setItem('weight', weight);
            AsyncStorage.setItem('metricUnits', String(metricUnits));
        } catch (e) {
            // saving error
            console.log('Error saving values locally');
        }
    };

    useEffect(() => { loadData() }, []); //load initial data on load

    return (
        <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.background}>
            <View style={styles.container}>
                <KeyboardAvoidingView style={{ rowGap: 16 }}>
                    <TextInput
                        value={firstName}
                        placeholder='First name'
                        onChangeText={setFirstName}
                        placeholderTextColor={'#999'}
                        style={styles.inputField}
                    />
                    <TextInput
                        value={lastName}
                        placeholder='Last name'
                        onChangeText={setLastName}
                        placeholderTextColor={'#999'}
                        style={styles.inputField}
                    />
                    <View style={[styles.inputField, { padding: 0 }]}>
                        <TextInput
                            value={age}
                            placeholder='Age'
                            onChangeText={setAge}
                            placeholderTextColor={'#999'}
                            style={styles.inputToggle}
                            keyboardType='number-pad'
                        />
                        <Pressable>
                            <Text style={styles.inputToggle}>years</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.inputField, { padding: 0 }]}>
                        <TextInput
                            value={height}
                            placeholder='Height'
                            onChangeText={setHeight}
                            placeholderTextColor={'#999'}
                            style={styles.inputToggle}
                            keyboardType='decimal-pad'
                        />
                        <Pressable onPress={() => setUnits(!metricUnits)}>
                            <Text style={styles.inputToggle}>{metricUnits ? 'cm' : 'in'}</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.inputField, { padding: 0 }]}>
                        <TextInput
                            value={weight}
                            placeholder='Weight'
                            onChangeText={setWeight}
                            placeholderTextColor={'#999'}
                            style={styles.inputToggle}
                            keyboardType='decimal-pad'
                        />
                        <Pressable onPress={() => setUnits(!metricUnits)}>
                            <Text style={styles.inputToggle}>{metricUnits ? 'kg' : 'lbs'}</Text>
                        </Pressable>
                    </View>
                    <SelectDropdown
                        data={['Male', 'Female', 'Other']}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setSex(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={[styles.inputField, { width: 'auto' }]}
                        buttonTextStyle={{ textAlign: 'left', color: 'cyan', fontFamily: 'monospace' }}
                        defaultValue={sex}
                        renderDropdownIcon={isOpened => {
                            return <Ionicons name={isOpened ? 'caret-up' : 'caret-down'} size={32} style={{
                                color: 'deeppink',
                                marginRight: 8,
                            }} />
                        }}
                        dropdownIconPosition={'right'}
                    />
                    <Text style={styles.infotxt}>Tap cm/in to toggle between Metric and Imperial units</Text>
                </KeyboardAvoidingView>
                {/*<Button title='Save' onPress={validateInput} />*/}
                <TouchableOpacity style={styles.menuBtn} onPress={() => validateInput()}>
                    <Text style={styles.buttonText}> Save </Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        rowGap: 16,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    inputField: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'white',
        shadowColor: 'deeppink',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, .69)',
        padding: 10,
        fontSize: 20,
        flexDirection: 'row',
        color: 'cyan',
        fontFamily: 'monospace',
    },
    inputToggle: {
        fontSize: 20,
        flex: 1,
        padding: 10,
        borderRadius: 4,
        fontFamily: 'monospace',
        color: 'cyan',
    },
    menuBtn: {
        backgroundColor: 'rgba(0, 0, 0, .69)',
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: 'cyan',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        padding: 10,
        height: 40,
    },
    buttonText: {
        textAlign: 'center',
        color: 'cyan',
        fontFamily: 'monospace',
        fontSize: 16,
    },
    infotxt: {
        color: 'yellow',
        fontFamily: 'hitMePunk',
        fontSize: 20,
    },
});
