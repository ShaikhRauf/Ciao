import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Home from './index';
import QRCodeScanScreen from '../QRCodeScanScreen';
import ProductDetailScreen from '../ProductDetailScreen'

const HomeNavigation = (props) => {
  const Stack = createStackNavigator();

  return (
    
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="QRCodeScanScreen" component={QRCodeScanScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
    </Stack.Navigator>
    
  );
};

export default HomeNavigation;
