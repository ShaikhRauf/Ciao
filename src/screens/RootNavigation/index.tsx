import React from "react";
import { View, Button, Image, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// import DetailsScreen from '../DetailsScreen';
// import ContactScreen from '../ContactScreen';
import HomeNavigation from "../HomeScreen/HomeNavigation";

import QRCodeScanScreen from "../QRCodeScanScreen";
import SearchNavigation from "../SearchProductScreen/SearchNavigation";
import FavouritesNavigation from "../FavouritesScreen/FavouritesNavigation";
import AboutUsNavigation from "../AboutUsScreen/AboutUsNavigation";

import { createStackNavigator } from "@react-navigation/stack";

import Color from '../../common/color';

const RootNavigation = (props) => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = require("../../assets/TabBar/home_tab_ic.png");
          if (route.name === "Home") {
            iconName = focused
              ? require("../../assets/TabBar/home_tab_active.png")
              : require("../../assets/TabBar/home_tab_ic.png");
          } else if (route.name === "Search") {
            iconName = focused
              ? require("../../assets/TabBar/search_tab_active.png")
              : require("../../assets/TabBar/search_tab_ic.png");
          } else if (route.name === "Favourites") {
            iconName = focused
              ? require("../../assets/TabBar/fav_tab_active.png")
              : require("../../assets/TabBar/fav_tab_selected.png");
          } else if (route.name === "AboutUs") {
            iconName = focused
              ? require("../../assets/TabBar/about_tab_active.png")
              : require("../../assets/TabBar/about_tab_selected.png");
          }
          return (
            <Image
              source={iconName}
              style={{
                height: 20,
                width: 20,
                // activeTintColor: '#355A8C'
              }}
            />
          );

          // let iconName;
          // if (route.name === 'Home') {
          //     iconName = focused
          //       ? 'ios-information-circle'
          //       : 'ios-information-circle-outline';
          // } else if (route.name === 'Action Items') {
          //     iconName = focused ? 'ios-list-box' : 'ios-list';
          // } else if (route.name === 'Notice Board') {
          //     iconName = focused ? 'ios-list-box' : 'ios-list';
          // } else if (route.name === 'Scan') {
          //     iconName = focused ? 'ios-list-box' : 'ios-list';
          // }
          //   return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Color.ACTIVE_TAB_PINK_COLOR, 
        inactiveTintColor: Color.CIAO_THEME_COLOR,
        // style: {
        //     borderWidth: 0,
        //     backgroundColor: 'rgba(53, 90, 140, 0.1)',
        //     // borderTopColor: 'black',
        //     borderRadius:30,
        //   },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={({ route }) => ({
          tabBarVisible: true,
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        // component={QRCodeScanScreen}
        options={({ route }) => ({
          tabBarVisible: true,
        })}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesNavigation}
        options={({ route }) => ({
          tabBarVisible: true,
        })}
      />
      <Tab.Screen
        name="AboutUs"
        component={AboutUsNavigation}
        options={({ route }) => ({
          tabBarVisible: true,
        })}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
