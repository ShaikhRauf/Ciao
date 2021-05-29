import React from "react";
import { View, Image, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import RootNavigation from ".";
import DrawerMenuScreen from "../DrawerMenuScreen";



const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeRootNavigation = (props: any) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="VerifPinScreen"
        drawerStyle={{
          width: "80%",
          height: "75%",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
        // overlayColor="transparent"
        drawerContent={(props) => <DrawerMenuScreen {...props} />}
      >
        
        <Drawer.Screen name="Home" component={RootNavigation} />
        
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default HomeRootNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
