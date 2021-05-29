import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Favourites from './index';
// import QRCodeScanScreen from '../QRCodeScanScreen';
import ProductDetailScreen from '../ProductDetailScreen'

const FavouritesNavigation = (props) => {
  const Stack = createStackNavigator();

  return (
    
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      {/* <Stack.Screen name="QRCodeScanScreen" component={QRCodeScanScreen} /> */}
      
    </Stack.Navigator>
    
  );
};

export default FavouritesNavigation;
