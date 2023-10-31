import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

export default function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [time, setTime] = useState(0);
  //const [timerText, setTimerText] = 

  function toggle() {
    setStartTimer(!startTimer);
    setResetTimer(false);
  }
  function reset() {
    setStartTimer(false);
    setResetTimer(true);
  }
  const options = {     //for timer
    container: {
      borderRadius: 5,
      marginBottom: 20,
    },
    text: {
      fontSize: 60,
      color: '#FFF',
      marginLeft: 7,
    }
  };

  return (
    <View style={styles.container}>
      <Stopwatch msecs
        start={startTimer}
        reset={resetTimer}
        options={options}
      />
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{startTimer ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: '#B9AAFF',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 45,
    color: '#B9AAFF'
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
    marginBottom: 20
  },
  buttonReset: {
    marginTop: 20,
    borderColor: "#FF851B"
  },
  buttonTextReset: {
    color: "#FF851B"
  }
});