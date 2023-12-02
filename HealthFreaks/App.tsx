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
import { useFonts } from 'expo-font';


/* [Individual pages for app] */
import Login from './app/screens/Login';
import Dashboard from './app/screens/Dashboard';
import Graphs from './app/screens/Graphs';
import Settings from './app/screens/Settings';
import Profile from './app/screens/Profile';
import ManualInput from './app/screens/ManualInput';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBar = () => {
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
        else if (route.name === 'Input') {
          iconName = focused ? 'add' : 'add-outline';
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
      <Tab.Screen name='Input' component={ManualInput} />
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loginState, setLoginState] = useState(false);
  const [fontsLoaded] = useFonts({
    'hitMePunk': require('./assets/fonts/hitMePunk.ttf'),
    'streetSoul': require('./assets/fonts/streetSoul.ttf')
  });

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log('USER STILL LOGGED IN: ', user.email);
        setUser(user);
        setLoginState(true);
      } else {
        console.log('No user logged in');
        setLoginState(true);
      }
    });
  }, [user]);

  if (loginState && fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
          <Stack.Screen name='Home' component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Profile Settings' component={Profile} options={{ title: 'Profile Settings' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
