import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { StatusBar } from 'expo-status-bar';


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Dashboard = ({navigation}: RouterProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{'\t\t\t'}Goals{'\n\t'} Steps{'\t\t\t\t'} Calories
            {'\n\t'} 10782 {'\t\t\t\t'}1992</Text>

            <Button onPress={() => navigation.navigate("Health Tips")}title="Health Tips"/>
            <Button onPress={() => navigation.navigate("Graphs")}title="Graphs"/>
            <Button onPress={() => navigation.navigate("BMICalc")}title="BMI Calc"/>
            <Button onPress={() => navigation.navigate("Timer")}title="Timer"/>
            
            <Button onPress={() => FIREBASE_AUTH.signOut()}title="Logout"/>
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
     flex: 1,
     flexDirection: "column",
     paddingTop: 0.1,
     backgroundColor: '#ecf0f1',
     padding: 8,
   },
    text: {
        fontSize:25,
        height: 200,
        width: '100%',
        backgroundColor: 'purple',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4
   }
  });