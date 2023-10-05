import { useEffect, useState } from 'react';
import React from 'react';

import Login from './app/screens/Login';
import Dashboard from './app/screens/Dashboard';
import Graphs from './app/screens/Graphs';
import HealthTips from './app/screens/HealthTips';
import BMICalc from './app/screens/BMICalc';
import Timer from './app/screens/Timer';
import BottomTab from './app/BottomTab';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from './FireBaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Health Freaks" component={Dashboard} />
      <InsideStack.Screen name="Health Tips" component={HealthTips} />
      <InsideStack.Screen name="Graphs" component={Graphs} />
      <InsideStack.Screen name="BMICalc" component={BMICalc} />
      <InsideStack.Screen name="Timer" component={Timer} />
    </InsideStack.Navigator>
  );
}


export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
    }, []);
    
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false}}/> : <Stack.Screen name='Login' component={Login} options={{ headerShown: false}}/>}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

