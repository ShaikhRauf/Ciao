import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../../common/color';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import font from '../font';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Header = (props) => {
  let [loggedUserProfilePic, setLoggedUserProfilePic] = useState(null);
  const navigation = useNavigation();

  const goBack = () => {
    // navigation.goBack();

    if (props.goBack === undefined) {
      console.log("onBackPress is not defined");
      navigation.goBack();
    } else {
      props.goBack();
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);

  return (
    <View style={{}}>
      {Platform.OS == 'ios' ? (
        <View style={{height: 30, width: width, backgroundColor: 'white'}} />
      ) : null}

      <View
        style={{
          width: width,
          height: 60,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
          <Text
          ellipsizeMode="tail"
          style={[
            {
              // marginTop: 10,
              width: width ,
              position: 'absolute',
              fontSize: 18,
              textAlign: 'center',
              color: '#0D0D0D',
              fontFamily: font.SIGNIKA_REGULAR,
            },
            props.titleTextStyle,
          ]}>
          {props.titleText}
        </Text>
        <TouchableOpacity
          onPress={() => goBack()}
          style={{
            width: 60,
            height: 60,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Image
            style={{height: 18, width: 12, marginLeft: 10}}
            resizeMode="contain"
            source={require('../../assets/back_ic.png')}></Image>
        </TouchableOpacity>
        

        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginRight: 20,
          }}></View>
      </View>
    </View>
  );
};

export default Header;
