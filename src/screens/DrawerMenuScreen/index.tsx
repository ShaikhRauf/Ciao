import React, { Component, createRef, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Animated,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Linking,
} from "react-native";

import Colors from "../../common/color";

const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";
import { logoutUser } from "../../redux/action";
const DrawerMenuScreen = (props: any) => {
  let [loggedUserName, setLoggedUserName] = useState("-");
  let [loggedUserProfilePic, setLoggedUserProfilePic] = useState(null);
  let [loggedUserId, setLoggedUserId] = useState(null);
  AsyncStorage.getItem("loggedUserName").then((value) => {
    setLoggedUserName(value);
  });
  AsyncStorage.getItem("loggedUserProfilePic").then((value) => {
    setLoggedUserProfilePic(value);
  });
  AsyncStorage.getItem("loggedUserId").then((value) => {
    setLoggedUserId(value);
  });
  const openURL = () => {
    Linking.openURL("https://ithelpdesk.atmc.edu.au/open.php").catch((err) =>
      console.error("An error occurred", err)
    );
  };
  return (
    // <ScrollView style={styles.container}>
    <>
      <View style={{ height: 120, backgroundColor: Colors.CIAO_THEME_COLOR }}>
        <View
          style={{
            marginTop: 30,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          
        </View>

        <View
          style={{
            marginTop: 20,
            width: "100%",
            flexDirection: "row",
            marginLeft: "10%",
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: "gray",
            }}
          >
            {loggedUserProfilePic ? (
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: "gray",
                }}
                resizeMode="cover"
                // source={require("../../assets/ProfilePic.png")}
                source={
                  loggedUserProfilePic
                    ? { uri: loggedUserProfilePic }
                    : require("../../assets/ProfilePic.png")
                }
              />
            ) : (
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: "gray",
                }}
                resizeMode="cover"
                source={require("../../assets/ProfilePic.png")}
              />
            )}
          </View>

          <View style={{ marginLeft: 15, justifyContent: "center" }}>
            <Text style={styles.nameTextStyle}> {loggedUserName}</Text>
            <Text style={styles.idTextStyle}> ID {loggedUserId}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: "white" }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ProfileScreen")}
          style={[styles.menuItemContainer, { marginTop: 20 }]}
        >
          {/* <Image
            style={styles.iconStyle}
            resizeMode="contain"
            source={require("../../assets/SideMenu/user.png")}
          /> */}
          <Text style={styles.menuTextStyle}> Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("VoiceToInstituteScreen")}
          style={styles.menuItemContainer}
        >
          {/* <Image
            style={styles.iconStyle}
            resizeMode="contain"
            source={require("../../assets/SideMenu/message.png")}
          /> */}
          <Text style={styles.menuTextStyle}> Voice to the Institute</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        onPress={() => props.logoutUser()}
        style={[styles.menuItemContainer, { marginTop: Platform.OS=='ios'? "75%" :'50%',marginBottom:50 }]}
      >
        <Image
          style={styles.iconStyle}
          resizeMode="contain"
          source={require("../../assets/SideMenu/logout_ic.png")}
        />
        <Text style={[styles.menuTextStyle, { color: Colors.CIAO_THEME_COLOR }]}>
          {" "}
          Logout2
        </Text>
      </TouchableOpacity> */}

      <View
        style={[
          styles.menuItemContainer,
          {
            marginTop: Platform.OS == "ios" ? "100%" : "75%",
            marginBottom: 15,
            flexDirection: "column",
            marginLeft: 35,
            alignItems: "flex-start",
          },
        ]}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", marginBottom:20 }}
          onPress={() => openURL()}
        >
          {/* <Image
            style={{
              height: 22,
              width: 22,
              margin: 5,
              marginRight: 10,
              marginLeft: 3,
            }}
            resizeMode="contain"
            source={require("../../assets/SideMenu/support.png")}
          /> */}
          <Text style={[styles.menuTextStyle, { paddingTop: 3 }]}>
            {" "}
            Experiencing Technical Issues?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.logoutUser()}
          style={{ flexDirection: "row" }}
        >
          {/* <Image
            style={styles.iconStyle}
            resizeMode="contain"
            source={require("../../assets/SideMenu/logout_ic.png")}
          /> */}
          <Text
            style={[
              styles.menuTextStyle,
              { color: Colors.CIAO_THEME_COLOR, paddingTop: 3 },
            ]}
          >
            {" "}
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </>
    // </ScrollView>
  );
};

export default connect(null, {
  logoutUser,
})(DrawerMenuScreen);

//export default DrawerMenuScreen;

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: "white",
    // flex: 1,
  },
  iconStyle: {
    height: 20,
    width: 20,
    margin: 5,
    marginRight: 10,
  },
  menuItemContainer: {
    marginTop: 12,
    width: "100%",
    flexDirection: "row",
    marginLeft: "10%",
    alignItems: "center",
  },
  nameTextStyle: {
    color: Colors.WHITE,
    fontSize: 14,
    fontFamily: "Quicksand-bold",
  },
  idTextStyle: {
    color: Colors.WHITE,
    fontSize: 12,
    fontFamily: "Quicksand-Regular",
    margin: 3,
  },
  menuTextStyle: {
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: "Quicksand-Regular",
    margin: 3,
    fontWeight: "500",
  },
  inputLabel: {
    paddingHorizontal: 20,
    paddingTop: 70,
    color: "#fff",
    fontSize: 35,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40,
  },
  clearBtnImgStyle: { height: 12, width: 12, marginRight: 0 },

  container: {
    flex: 1,
    backgroundColor: "white",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },

  inputWrapper1: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    // backgroundColor: '#009C92'
  },
});
