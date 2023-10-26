import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native'

function BMICalc() {
   const [height, setHeight] = useState('');
   const [weight, setWeight] = useState('');
   const [bmi, setBMI] = useState('');
   const [bmiResult, setBMIResult] = useState('');
   const [metricUnits, setUnits] = useState(true);

   function calculate(height: string, weight: string) {
      //calculation
      var result;
      if (metricUnits) {   //using metric units
         let tempHeight = parseFloat(height) / 100.0           //convert cm to m
         result = (parseFloat(weight) / (tempHeight ** 2));    //bmi = weight / (height^2)
      } else {             //using imperial units
         result = ((703 * parseFloat(weight)) / (parseFloat(height) ** 2));   //bmi = (703 * weight) / (height^2)
      }
      //display result
      setBMI(result.toFixed(2));
      if (result < 18.5) {
         setBMIResult('Underweight');
      }
      else if (result >= 18.5 && result < 25) {
         setBMIResult('Normal weight');
      }
      else if (result >= 25 && result < 30) {
         setBMIResult('Overweight');
      }
      else if (result >= 30) {
         setBMIResult('Obese');
      }
      else {
         alert('Incorrect Input!');
         setBMIResult('');
      }
   }
   return (
      <View style={styles.container}>
         <Text style={styles.title}>BMI Calculator</Text>

         <Text style={styles.label}>Height</Text>
         <View style={[styles.inputField, { padding: 0 }]}>
            <TextInput style={styles.inputToggle}
               underlineColorAndroid="transparent"
               placeholder="Height"
               placeholderTextColor={'#999'}
               autoCapitalize="none"
               onChangeText={setHeight} />
            <Pressable onPress={() => setUnits(!metricUnits)}>
               <Text style={styles.inputToggle}>{metricUnits ? 'cm' : 'in'}</Text>
            </Pressable>
         </View>
         <Text style={styles.label}>Weight</Text>
         <View style={[styles.inputField, { padding: 0 }]}>
            <TextInput style={styles.inputToggle}
               underlineColorAndroid="transparent"
               placeholder="Weight"
               placeholderTextColor={'#999'}
               autoCapitalize="none"
               onChangeText={setWeight} />
            <Pressable onPress={() => setUnits(!metricUnits)}>
               <Text style={styles.inputToggle}>{metricUnits ? 'kg' : 'lbs'}</Text>
            </Pressable>
         </View>
         <TouchableOpacity style={styles.submitButton} onPress={() => { calculate(height, weight); }}>
            <Text style={styles.submitButtonText}> Calculate </Text>
         </TouchableOpacity>
         <Text style={styles.output}>{bmi}</Text>
         <Text style={styles.resultText}>{bmiResult}</Text>
      </View>
   )
}
export default BMICalc;

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      marginHorizontal: 20,
      rowGap: 8,
   },
   inputField: {
      //margin: 15,
      //height: 40,
      borderWidth: 1,
      padding: 10,
      flexDirection: 'row',
      fontSize: 20,
   },
   inputToggle: {
      flex: 1,
      padding: 10,
      fontSize: 20,
   },
   submitButton: {
      backgroundColor: '#ff6666',
      padding: 10,
      marginVertical: 15,
      height: 40,
   },
   submitButtonText: {
      textAlign: "center",
      color: 'white',
      // fontWeight:"bold",
      fontSize: 18,
   },
   output: {
      textAlign: "center",
      fontSize: 30,
   },
   title: {
      paddingTop: 30,
      paddingBottom: 10,
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
   },
   resultText: {
      paddingTop: 20,
      paddingBottom: 10,
      textAlign: "center",
      fontSize: 30,
      color: 'blue'
   },
   label: {
      //marginLeft: 15,
      fontSize: 20,
   }
})