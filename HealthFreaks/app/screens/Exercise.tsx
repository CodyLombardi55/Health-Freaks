import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from 'react-native';
//import { FitnessContext } from "../../Context"

import HomeScreen from './HomeScreen';
import StackNavigator from "./StackNavigator";

export default function Exercise() {
  return (
//<FitnessContext>
<StackNavigator/>
//</FitnessContext>

    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
                    
    },
});

//export default Exercise;
