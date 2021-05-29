import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Colors from "../../common/color";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Footer = (props) => {
  let [loggedUserName, setLoggedUserName] = useState("-");
  let [loggedUserProfilePic, setLoggedUserProfilePic] = useState(null);
  const navigation = useNavigation();

  AsyncStorage.getItem("loggedUserName").then((value) => {
    setLoggedUserName(value);
  });

  const changeTab = (tabName) => {
    console.warn("Tab Name ", tabName);
    if (tabName == "Home") {
      navigation.navigate("Home", { date: new Date() }); // HomeScreen
    } else if (tabName == "NoticeBoard") {
      navigation.navigate("NoticeBoard", { date: new Date() }); // Notice tab
    } else {
      navigation.navigate("Scan", { date: new Date() }); // QRCodeScanScreen
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    // if (isFocused) {
    //   AsyncStorage.getItem("loggedUserProfilePic").then((value) => {
    //     setLoggedUserProfilePic(value);
    //   });
    // }
  }, [isFocused]);

  let homeIconName = props.isFromHome
    ? require("../../assets/TabBar/home_tab_active.png")
    : require("../../assets/TabBar/home_tab_ic.png");
  let qrScanIconName = props.isFromQRScan
    ? require("../../assets/TabBar/qr_tab_active.png")
    : require("../../assets/TabBar/qr_scan_selected.png");
  let noticeIconName = props.isFromNoticeBoard
    ? require("../../assets/TabBar/notice_selected.png")
    : require("../../assets/TabBar/notice_tab_ic.png");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => changeTab("Home")}
        style={styles.tabIconContainer}
      >
        <Image source={homeIconName} style={styles.tabIcStyle} />
        <Text
          ellipsizeMode="tail"
          style={[
            styles.tabTitleStyles,
            { color: props.isFromHome ? "#2AB2C7" : "#355A8C" },
          ]}
        >
          {"Home"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => changeTab("Scan")}
        style={styles.tabIconContainer}
      >
        <Image source={qrScanIconName} style={styles.tabIcStyle} />
        <Text
          ellipsizeMode="tail"
          style={[
            styles.tabTitleStyles,
            { color: props.isFromQRScan ? "#2AB2C7" : "#355A8C" },
          ]}
        >
          {"Scan"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => changeTab("NoticeBoard")}
        style={styles.tabIconContainer}
      >
        <Image source={noticeIconName} style={styles.tabIcStyle} />
        <Text
          ellipsizeMode="tail"
          style={[
            styles.tabTitleStyles,
            { color: props.isFromNoticeBoard ? "#2AB2C7" : "#355A8C" },
          ]}
        >
          {"Notice Board"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// activeTintColor: '#2AB2C7',
// inactiveTintColor: '#355A8C',

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: Platform.OS == "ios" ? 80 : 60,
    backgroundColor: "rgba(242,242,242,1)",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  tabIconContainer: {
    // margin: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: width / 3 - 10,
  },
  tabIcStyle: {
    height: 20,
    width: 20,
  },
  tabTitleStyles: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.CIAO_THEME_COLOR,
    marginTop: 5,
  },
});
