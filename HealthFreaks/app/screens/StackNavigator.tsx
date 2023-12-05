import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import WorkoutScreen from './WorkoutScreen';
import FitScreen from './FitScreen';
import RestScreen from './RestScreen';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    
  return (
    
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Workout" component={WorkoutScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Fit" component={FitScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Rest" component={RestScreen} options={{headerShown:false}}/>     
      </Stack.Navigator>
    
  );
};

export default StackNavigator

const styles = StyleSheet.create({})