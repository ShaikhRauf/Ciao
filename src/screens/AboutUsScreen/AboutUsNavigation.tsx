import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import AboutUsScreen from './index';
import QRCodeScanScreen from '../QRCodeScanScreen';

const AboutUsNavigation = (props) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen name="QRCodeScanScreen" component={QRCodeScanScreen} />
    </Stack.Navigator>
  );
};

export default AboutUsNavigation;
