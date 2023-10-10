import { View, Text, StyleSheet, KeyboardAvoidingView, Button, Pressable } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

function Profile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');
    const [metricUnits, setUnits] = useState(true)


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
                    <Text style={styles.inputToggle}>years</Text>
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
                onPress={() => {
                    console.log('profile settings saved');
                    alert('Profile saved');
                }}
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