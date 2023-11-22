import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Pressable, ImageBackground } from 'react-native'

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
      <ImageBackground source={require('../../assets/BACKGROUND.png')} resizeMode='cover' style={styles.background}>
         <View style={styles.container}>
            <Text style={styles.title}>bmi calculator</Text>

            <Text style={styles.label}>Height</Text>
            <View style={[styles.inputField, { padding: 0 }]}>
               <TextInput style={styles.inputToggle}
                  underlineColorAndroid="transparent"
                  placeholder="Height"
                  placeholderTextColor={'darkblue'}
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
                  placeholderTextColor={'darkblue'}
                  autoCapitalize="none"
                  onChangeText={setWeight} />
               <Pressable onPress={() => setUnits(!metricUnits)}>
                  <Text style={styles.inputToggle}>{metricUnits ? 'kg' : 'lbs'}</Text>
               </Pressable>
            </View>
            <Text style={[styles.label, { fontSize: 16, alignContent: 'center' }]}>Hint: Tap the cm/in text to toggle between Metric and Imperial units</Text>
            <TouchableOpacity style={styles.submitButton} onPress={() => { calculate(height, weight); }}>
               <Text style={styles.submitButtonText}> Calculate </Text>
            </TouchableOpacity>
            <Text style={styles.output}>{bmi}</Text>
            <Text style={styles.resultText}>{bmiResult}</Text>
         </View>
      </ImageBackground>
   )
}
export default BMICalc;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 23,
      marginHorizontal: 20,
      rowGap: 8,
   },
   background: {
      flex: 1,
      resizeMode: 'cover',
   },
   inputField: {
      //margin: 15,
      //height: 40,
      borderWidth: 1,
      borderColor: 'white',
      shadowColor: 'royalblue',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 20,
      padding: 10,
      flexDirection: 'row',
      fontSize: 20,
      fontFamily: 'monospace',
      Color: 'darkgreen',
   },
   inputToggle: {
      flex: 1,
      padding: 10,
      fontSize: 20,
      color: 'royalblue',
      fontFamily: 'monospace',
      backgroundColor: 'rgba(0, 0, 0, .69)',
   },
   submitButton: { //button itself
      backgroundColor: 'rgba(0, 0, 0, .69)',
      borderWidth: 1,
      borderColor: 'white',
      shadowColor: 'violet',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 20,
      padding: 10,
      marginVertical: 15,
      height: 40,
   },
   submitButtonText: { //"Calculate txt"
      textAlign: "center",
      color: 'orchid',
      fontFamily: 'streetSoul',
      // fontWeight:"bold",
      fontSize: 25,
   },
   output: { //BMI Output
      textAlign: "center",
      fontSize: 30,
      color: 'yellow',
      fontFamily: 'streetSoul',
   },
   title: { //" BMI Calculator "
      paddingTop: 30,
      paddingBottom: 10,
      textAlign: "center",
      fontSize: 40,
      fontWeight: "bold",
      color: "limegreen",
      fontFamily: 'hitMePunk'
   },
   resultText: { //" OBESE txt lol"
      paddingTop: 20,
      paddingBottom: 10,
      textAlign: "center",
      fontSize: 30,
      color: 'cyan',
      fontFamily: 'hitMePunk',
   },
   label: { //Height/Weight labels
      //marginLeft: 15,
      fontSize: 30,
      color: 'lime',
      fontFamily: 'streetSoul',
   }
})
