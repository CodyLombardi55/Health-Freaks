import { useEffect, useState } from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FireBaseConfig';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';


/* [Individual pages for app] */
import Login from './app/screens/Login';
import Dashboard from './app/screens/Dashboard';
import Graphs from './app/screens/Graphs';
import BMICalc from './app/screens/BMICalc';
import Timer from './app/screens/Timer';
import Settings from './app/screens/Settings';
import Profile from './app/screens/Profile';
import Steps from './app/screens/Steps';
import Feed from './app/screens/Feed';
import Feed2 from './app/screens/Feed2';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused
            ? 'globe'
            : 'globe-outline';
        }
        else if (route.name === 'Graphs') {
          iconName = focused ? 'analytics' : 'analytics-outline';
        }
        else if (route.name === 'BMICalc') {
          iconName = focused ? 'calculator' : 'calculator-outline';
        }
        else if (route.name === 'Timer') {
          iconName = focused ? 'alarm' : 'alarm-outline';
        }
        else if (route.name === 'Settings') {
          iconName = focused ? 'ios-list' : 'ios-list-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'deeppink',
      tabBarInactiveTintColor: 'cyan',
      tabBarStyle: { position: 'absolute', borderTopWidth: 0 },
      tabBarBackground: () => (
        <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
      ),

    })} >
      <Tab.Screen name='Dashboard' component={Dashboard} />
      <Tab.Screen name='Graphs' component={Graphs} />
      <Tab.Screen name='Settings' component={Settings} />
      <Tab.Screen name='Feed2' component={Feed2} />
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
  );}
