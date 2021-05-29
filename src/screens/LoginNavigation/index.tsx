import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen  from '../LoginScreen';
import LoginIntroScreen from '../LoginScreen/LoginIntroScreen';

import { NavigationContainer } from '@react-navigation/native';

export function LoginNavigation(props: any) {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="LoginIntroScreen"
                component={LoginIntroScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }} />
            
        </Stack.Navigator>
    
        </NavigationContainer>
    );
}