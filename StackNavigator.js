import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import BantuanScreen from './screens/BantuanScreen';
import BantuinScreen from './screens/BantuinScreen';
import RegisterScrenn from './screens/RegisterScrenn';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name='Register' component={RegisterScrenn} options={{headerShown:false}}/>
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name='Bantuan' component={BantuanScreen} options={{headerShown:false}}/>
      <Stack.Screen name='Bantuin' component={BantuinScreen} options={{headerShown:false}}/>
      <Stack.Screen name='Map' component={MapScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})