import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddData from './src/components/AddData';
import UpdateData from './src/components/UpdateData';
import Main from './src/components/Main';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>  
      <Stack.Screen name="Main"component={Main}/>
        <Stack.Screen name="AddData"component={AddData}/>
        <Stack.Screen name="UpdateData"component={UpdateData}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;