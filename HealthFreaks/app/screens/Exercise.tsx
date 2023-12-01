// Exercise.tsx
import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from 'react-native';
import HomeScreen from './HomeScreen';

export default function Exercise() {
  return (
    <View style={styles.container}>      
      <HomeScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
});

//export default Exercise;
