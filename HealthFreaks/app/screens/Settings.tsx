import {View, Text, Button} from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FireBaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Settings = ({}: RouterProps) => {
    return (
        <View >
            <Button onPress={() => FIREBASE_AUTH.signOut()}title="Logout"/>
        </View>
    );
};

export default Settings;