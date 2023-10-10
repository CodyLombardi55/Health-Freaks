import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FireBaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Settings = ({ navigation }: RouterProps) => {
    return (
        <View style={styles.container}>
            <Button onPress={() => navigation.navigate('Profile Settings')} title="Profile" />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        rowGap: 16,
        marginHorizontal: 20,
        justifyContent: 'center',
        flex: 1,
    }
})