// @ts-ignore
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  Platform,
  ScrollView,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Colors from '../../common/color';
import {Rating, AirbnbRating} from 'react-native-ratings';

import Fonts from '../../common/font';
// import { RNCamera as Camera } from 'react-native-camera';

import {connect} from 'react-redux';
import {markAttendance} from '../../redux/action';
import {useNavigation} from '@react-navigation/native';
import ReadMore from 'react-native-read-more-text';

import Footer from '../../common/component/Footer';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const QRCodeScanScreen = (props: any) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [isFavProduct, setIsFavProduct] = useState(false);

  var scanQR = true;

  const codeScanSuccess = async (id) => {

    setModalVisible(true);

    // let reqDataObj = {
    //   meetingId: id,
    // };
    // const result = await props.markAttendance(reqDataObj);

    // console.log('mark attendance result ', result.response);

    // if (result && result.response) {
    //   setModalVisible(true);
    // } else if (result.error) {
    //   Alert.alert(
    //     'Error',
    //     result.error,
    //     [{text: 'OK', onPress: () => setModalVisible(false)}],
    //     {cancelable: false},
    //   );
    // }
  };

  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={[styles.titleText,{color: Colors.CIAO_THEME_COLOR, marginTop: 5,fontSize:16,textAlign:'left'}]}
        onPress={handlePress}>
        Read More...
      </Text>
    );
  };

  const renderRevealedFooter = (handlePress) => {
    return (
      <Text style={[styles.titleText,{color: Colors.CIAO_THEME_COLOR, marginTop: 5,fontSize:16,textAlign:'left'}]}
      onPress={handlePress}>
        Show less
      </Text>
    );
  }

  const onSuccess = (e) => {
    // props.navigation.goBack()

    // Linking.openURL(e.data).catch(err =>
    //     console.error('An error occured', err)
    // );

    // let reqDataObj = {
    //     "id" : e.data
    // }

    // props.markAttendance(reqDataObj)

    codeScanSuccess(e.data);

    scanQR = true;
  };

  return (
    <View style={{height: height, width: width}}>
      {scanQR ? (
        <QRCodeScanner
          onRead={onSuccess}
          cameraProps={{flashMode: RNCamera.Constants.FlashMode.auto}}
          topContent={null}
          bottomContent={null}
          reactivate={true}
          cameraStyle={{height: height}}
        />
      ) : (
        <View />
      )}

      <View
        style={{
          position: 'absolute',
          height: Platform.OS == 'ios' ? height : height - 25,
          width: width,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}>
        <ScrollView>
          <View
            style={{
              marginTop: Platform.OS == 'ios' ? 60 : 10,
              width: width,
              height: 60,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 60,
                height: 60,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Image
                style={{height: 20, width: 20, marginLeft: 20}}
                resizeMode="contain"
                source={require('../../assets/cross_white.png')}></Image>
            </TouchableOpacity>
            <Text
              ellipsizeMode="tail"
              style={{
                fontSize: 22,
                textAlign: 'center',
                fontWeight: 'bold',
                color: Colors.WHITE,
                fontFamily: Fonts.SIGNIKA_BOLD,
              }}>
              {''}
            </Text>
            <View style={{alignItems: 'center', marginRight: 20}}>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}></TouchableOpacity>
            </View>
          </View>

          <Image
            style={{
              height: width - 120,
              width: width - 120,
              alignSelf: 'center',
              marginTop: height / 2 - (width - 120),
            }}
            resizeMode="contain"
            source={require('../../assets/scan_frame.png')}></Image>
          
        </ScrollView>
        
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  setModalVisible(false);
                  // navigation.goBack();
                }}>
                <Image
                  style={{height: 20, width: 20, alignSelf: 'center'}}
                  resizeMode="contain"
                  source={require('../../assets/cross_black.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  setIsFavProduct(!isFavProduct);
                  // navigation.goBack();
                }}>
                <Image
                  style={{height: 30, width: 30, alignSelf: 'center'}}
                  resizeMode="contain"
                  source={
                    isFavProduct
                      ? require('../../assets/TabBar/fav_tab_active.png')
                      : require('../../assets/TabBar/fav_tab_selected.png')
                  }
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={{alignItems: 'center'}}
              style={{width: width, marginTop: -20}}>
              <Image
                style={{
                  marginTop: 0,
                  height: 150,
                  width: 150,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
                source={require('../../assets/Categories/flower.jpeg')}
              />

              <Text style={[styles.titleText, {marginBottom: 40}]}>
                Almond Breeze
              </Text>

              <Rating
                type="custom"
                ratingColor="#FADB14"
                startingValue={3}
                ratingBackgroundColor="rgba(0, 0, 0, 0.06)"
                ratingCount={5}
                imageSize={18}
                style={{marginTop: -30}}
                showRating={false}
                readonly={true}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 30,
                  width: '60%',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.titleText,
                      {
                        color: Colors.ACTIVE_TAB_PINK_COLOR,

                        fontSize: 16,
                        top: 0,
                      },
                    ]}>
                    Packaging
                  </Text>
                  <Rating
                    type="custom"
                    ratingColor="#FFBC2E"
                    startingValue={3}
                    ratingBackgroundColor="rgba(0, 0, 0, 0.06)"
                    ratingCount={5}
                    imageSize={12}
                    style={{marginTop: 5}}
                    showRating={false}
                    readonly={true}
                  />
                </View>

                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.titleText,
                      {
                        color: Colors.ACTIVE_TAB_PINK_COLOR,

                        fontSize: 16,
                        top: 0,
                      },
                    ]}>
                    Ingredients
                  </Text>
                  <Rating
                    type="custom"
                    ratingColor="#FFBC2E"
                    startingValue={3}
                    ratingBackgroundColor="rgba(0, 0, 0, 0.06)"
                    ratingCount={5}
                    imageSize={12}
                    style={{marginTop: 5}}
                    showRating={false}
                    readonly={true}
                  />
                </View>
              </View>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: '90%',
                  marginTop: 50,
                  marginBottom: 20,
                }}>
                <Text
                  style={[
                    styles.titleText,
                    {
                      textAlign: 'left',
                      marginBottom: 10,
                      fontFamily: Fonts.SIGNIKA_REGULAR,
                    },
                  ]}>
                  Ingredients
                </Text>

                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={renderTruncatedFooter}
                  renderRevealedFooter={renderRevealedFooter}
                  // onReady={this._handleTextReady}
                >
                  <Text style={[styles.contentText]}>
                    A hamburger (also burger for short) is a sandwich consisting
                    of one or more cooked patties of ground meat, usually beef,
                    placed inside a sliced bread Read More... A hamburger (also
                    burger for short) is a sandwich consisting of one or more
                    cooked patties of ground meat, usually beef, placed inside a
                    sliced bread Read More...
                  </Text>
                </ReadMore>

                <Text
                  style={[
                    styles.titleText,
                    {
                      textAlign: 'left',
                      marginTop: 20,
                      marginBottom: 10,
                      fontFamily: Fonts.SIGNIKA_REGULAR,
                    },
                  ]}>
                  Packaging
                </Text>
                <ReadMore
                  numberOfLines={3}
                  renderTruncatedFooter={renderTruncatedFooter}
                  renderRevealedFooter={renderRevealedFooter}
                  // onReady={this._handleTextReady}
                >
                  <Text style={[styles.contentText]}>
                    A hamburger (also burger for short) is a sandwich consisting
                    of one or more cooked patties of ground meat, usually beef,
                    placed inside a sliced bread A hamburger (also
                    burger for short) is a sandwich consisting of one or more
                    cooked patties of ground meat, usually beef, placed inside a
                    sliced bread 
                  </Text>
                </ReadMore>
              </View>
            </ScrollView>
            <View
              style={{width: width, backgroundColor: Colors.CIAO_THEME_COLOR,}}>
              <Text
                style={[
                  styles.contentText,
                  {color: Colors.WHITE, padding: 20},
                ]}>
                A hamburger (also burger for short) is a sandwich consisting of
                one or more cooked patties of ground meat, usually beef, placed
                inside a sliced bread
              </Text>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const mapStateToProps = (state) => ({
  markAttendanceResponse: state.attendance.markAttendanceResponse,
});

export default connect(mapStateToProps, {
  markAttendance,
})(QRCodeScanScreen);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // backgroundColor:'pink',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: 'white',
    marginTop: 100,
    backgroundColor: 'red',
  },
  textBold: {
    fontWeight: '500',
    color: 'white',
  },
  buttonText: {
    fontSize: 21,
    color: 'white',
  },
  buttonTouchable: {
    padding: 16,
    marginTop: 100,
  },
  modalView: {
    height: height - 200,
    marginBottom: 0,
    backgroundColor: 'white',
    // borderRadius: 15,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width,
  },
  openButton: {
    padding: 15,
    // position: 'absolute',
    // left: 10,
    // top: 20,
    // marginBottom: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: Fonts.SIGNIKA_SEMI_BOLD,
    fontSize: 22,
    color: Colors.BLACK,
  },

  contentText: {
    width: '100%',
    textAlign: 'left',
    fontFamily: Fonts.SIGNIKA_REGULAR,
    fontSize: 16,
    color: Colors.SUB_TEXT_LIGHT_GRAY,
  },
});
