import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import MainScreen from '../screens/MainScreen'
export default function AppNavigation() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Main" component={MainScreen}/>
        </Stack.Navigator>
   
    </NavigationContainer>
   
  )
}