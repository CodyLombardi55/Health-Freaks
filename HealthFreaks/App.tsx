import { useEffect, useState } from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FireBaseConfig';


/* [Individual pages for app] */
import Login from './app/screens/Login';
import Dashboard from './app/screens/Dashboard';
import Graphs from './app/screens/Graphs';
import BMICalc from './app/screens/BMICalc';
import Timer from './app/screens/Timer';
import Settings from './app/screens/Settings';
import Profile from './app/screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Dashboard' component={Dashboard} />
      <Tab.Screen name='Graphs' component={Graphs} />
      <Tab.Screen name='BMICalc' component={BMICalc} options={{ headerShown: false }} />
      <Tab.Screen name='Timer' component={Timer} />
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  );
};


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
        {user ? <Stack.Screen name='Home' component={Main} options={{ headerShown: false }} /> : <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />}
        <Stack.Screen name='Profile Settings' component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

