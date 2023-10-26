import { View, Text, StyleSheet, KeyboardAvoidingView, Button, Pressable, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FireBaseConfig';

function Profile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');
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
            await setDoc(docRef, {
                firstName: firstName,
                lastName: lastName,
                age: parseInt(age),
                height: parseFloat(height),
                weight: parseFloat(weight),
                sex: sex,
                metricUnits: metricUnits,
            });
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

    useEffect(() => { loadData() }, []); //load initial data on load

    return (
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
                <TextInput
                    value={sex}
                    placeholder='Sex'
                    onChangeText={setSex}
                    placeholderTextColor={'#999'}
                    style={styles.inputField}
                />
            </KeyboardAvoidingView>
            <Button
                title='Save'
                onPress={validateInput}
            />
        </View>
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
    inputField: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        fontSize: 20,
        flexDirection: 'row',
    },
    inputToggle: {
        fontSize: 20,
        flex: 1,
        padding: 10,
        borderRadius: 4,
    },
});