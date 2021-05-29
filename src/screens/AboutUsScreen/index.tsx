import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView,
} from 'react-native';
import Colors from '../../common/color';
import Fonts from '../../common/font';
import {connect} from 'react-redux';

import Header from '../../common/component/Header';
import Footer from '../../common/component/Footer';
import {getUnitCodes, getProgressCardAttendance} from '../../redux/action';
import BottomDrawer from 'react-native-bottom-drawer-view';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AboutUsScreen = (props: any) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      {/* <Header isHome={true}/> */}

      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: Colors.CIAO_THEME_COLOR,
          marginBottom:80
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <Image
          style={{width: 160, height: 170, marginTop: 100}}
          source={require('../../assets/ciao_title_white.png')}
          resizeMode="contain"
        />

        <View style={{width: '85%', marginTop: 10, alignItems: 'center',}}>
          <Text style={[styles.titleText]}>About Us</Text>

          <Text style={[styles.contentText]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it...
          </Text>

          <Image
            style={{width: 80, height: 80, marginTop: 10}}
            source={require('../../assets/abt_us_img_2.png')}
            resizeMode="contain"
          />

          <Text style={[styles.titleText, {marginTop: 10}]}>Why we did it</Text>

          <Text style={[styles.contentText]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it...
          </Text>

        </View>
      </ScrollView>


      <TouchableOpacity
      onPress={()=> {
        // console.log("props ",props)
          props.navigation.navigate("QRCodeScanScreen")
        }}
      
            style={{
              width: '70%',
              height: 60,
              justifyContent: 'center',
              borderRadius: 25,
              backgroundColor: Colors.ACTIVE_TAB_PINK_COLOR,
              position: 'absolute',
              bottom: 20,
            }}>
            <Text
              style={[
                styles.titleText,
                {textAlign: 'center', color: Colors.WHITE},
              ]}>
              Get Scanning
            </Text>
          </TouchableOpacity>
    
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CIAO_THEME_COLOR,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  manuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleText: {
    width: '100%',
    textAlign: 'left',
    fontFamily: Fonts.SIGNIKA_BOLD,
    fontSize: 20,
    color: Colors.DARK_GREEN,
  },

  contentText: {
    width: '100%',
    textAlign: 'left',
    fontFamily: Fonts.SIGNIKA_REGULAR,
    fontSize: 16,
    marginTop: 10,
    color: Colors.WHITE,
  },
});

const mapStateToProps = (state) => ({
  unitCodeList: state.progressCard.unitCodeList,
  progressCardAttendance: state.progressCard.progressCardAttendance,
});

export default connect(mapStateToProps, {
  getUnitCodes,
})(AboutUsScreen);
