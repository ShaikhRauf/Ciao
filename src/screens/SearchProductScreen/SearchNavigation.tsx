import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Search from './index';
import QRCodeScanScreen from '../QRCodeScanScreen';
import ProductDetailScreen from '../ProductDetailScreen'

const SearchNavigation = (props) => {
  const Stack = createStackNavigator();

  return (
    
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      {/* <Stack.Screen name="QRCodeScanScreen" component={QRCodeScanScreen} /> */}
      
    </Stack.Navigator>
    
  );
};

export default SearchNavigation;
