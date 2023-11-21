import { View, Text, Button, StyleSheet, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FireBaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Settings = ({ navigation }: RouterProps) => {
    return (
        <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Profile Settings')}>
                    <Text style={styles.buttonText}> Profile Settings </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBtn} onPress={() => FIREBASE_AUTH.signOut()}>
                    <Text style={styles.buttonText}> Logout </Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        rowGap: 16,
        marginHorizontal: 20,
        justifyContent: 'center',
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    menuBtn: {
        backgroundColor: 'rgba(0, 0, 0, .69)',
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: 'darkviolet',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 20,
        padding: 10,
        height: 40,
    },
    buttonText: {
        textAlign: 'center',
        color: 'darkviolet',
        fontFamily: 'monospace',
        fontSize: 16,
    },
})