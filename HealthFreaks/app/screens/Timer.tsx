import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions } from 'react-native';

export default function App() {
  const [elapsedSec, setElapsedSec] = useState(0);
  const [isActive, setIsActive] = useState(false);

  var interval;
  function toggle() {
    setIsActive(!isActive);

    if (isActive) {
      interval = setInterval(() => {
        setElapsedSec(elapsedSec + 1)
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }

  function reset() {
    setElapsedSec(0);
    setIsActive(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.timerText}>{`${elapsedSec}:${elapsedSec}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
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