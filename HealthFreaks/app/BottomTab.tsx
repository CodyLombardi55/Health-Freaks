/*
import {View, Text, Button, StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Dashboard from './screens/Dashboard';
import Graphs from './screens/Graphs';
import Settings from './screens/Settings';
import Profile from './screens/Profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="white" style={{backgroundColor: 'tomato'}}>
      <Tab.Screen name="Home" component={Dashboard}   
      options={{
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>),
    }}/>
      <Tab.Screen name="Graphs" component={Graphs}     
      options={{
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26}/>),
    }}/>
      <Tab.Screen name="Profile" component={Profile} 
      options={{
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26}/>),
    }}/>
      <Tab.Screen name="Settings" component={Settings}  
      options={{
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26}/>),
    }}/>
    </Tab.Navigator>
  );
  }

  export default BottomTab;
*/

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Dashboard from './screens/Dashboard';
import Graphs from './screens/Graphs';
import Settings from './screens/Settings';
import Profile from './screens/Profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Graphs"
        component={Graphs}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cog"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;

