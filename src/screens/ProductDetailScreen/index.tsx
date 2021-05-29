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
import {Rating} from 'react-native-ratings';
import ReadMore from 'react-native-read-more-text';

import Header from '../../common/component/Header';
import Footer from '../../common/component/Footer';
// import {getUnitCodes, getProgressCardAttendance} from '../../redux/action';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProductDetailScreen = (props: any) => {
  const [isFavProduct, setIsFavProduct] = useState(false);

  const [selectedItem, setSelectedItem] = useState(props.route.params.prodObj);

  const navigation = useNavigation();


  useEffect(() => {
    navigation.addListener('focus', () => {
      console.warn('Use effect focus',props.route.params.prodObj);
      
    });
  });

  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={[
          styles.titleText,
          {
            color: Colors.CIAO_THEME_COLOR,
            marginTop: 5,
            fontSize: 16,
            textAlign: 'left',
          },
        ]}
        onPress={handlePress}>
        Read More...
      </Text>
    );
  };

  const renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={[
          styles.titleText,
          {
            color: Colors.CIAO_THEME_COLOR,
            marginTop: 5,
            fontSize: 16,
            textAlign: 'left',
          },
        ]}
        onPress={handlePress}>
        Show less
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Header
        titleText={'Product Detail'}
        goBack={() => navigation.goBack()}
        titleTextStyle={{fontSize: 14}}
      /> */}

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              marginTop: Platform.OS == 'ios' ? 30 : 10,
              flexDirection: 'row',
              width: width - 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={[styles.openButton, {marginLeft: 0}]}
              onPress={() => {
                //   setModalVisible(false);
                navigation.goBack();
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
            style={{width: width,}}>
            <Image
              style={{
                
                height: 150,
                width: 150,
                alignSelf: 'center',
              }}
              resizeMode="contain"
              source={
                selectedItem
                  ? selectedItem.productImg
                  : require('../../assets/scan_code_ic.png')
              }
            />

            <Text style={[styles.titleText, {marginBottom: 40}]}>
              {selectedItem ? selectedItem.name : '-'}
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
                numberOfLines={2}
                renderTruncatedFooter={renderTruncatedFooter}
                renderRevealedFooter={renderRevealedFooter}
                // onReady={this._handleTextReady}
              >
                <Text style={[styles.contentText]}>
                  A hamburger (also burger for short) is a sandwich consisting
                  of one or more cooked patties of ground meat, usually beef,
                  placed inside a sliced bread  A hamburger (also
                  burger for short) is a sandwich consisting of one or more
                  cooked patties of ground meat, usually beef, placed inside a
                  sliced bread 
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
                  placed inside a sliced bread A hamburger (also burger for
                  short) is a sandwich consisting of one or more cooked patties
                  of ground meat, usually beef, placed inside a sliced bread
                </Text>
              </ReadMore>
            </View>
            
          </ScrollView>

          <View
            style={{width: width, backgroundColor: Colors.CIAO_THEME_COLOR, marginTop:10}}>
            <Text
              style={[styles.contentText, {color: Colors.WHITE, padding: 20}]}>
              A hamburger (also burger for short) is a sandwich consisting of
              one or more cooked patties of ground meat, usually beef, placed
              inside a sliced bread
            </Text>
          </View>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  manuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  listTitleTextStyle: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.BLACK,
    fontFamily: Fonts.SIGNIKA_BOLD,
  },
  subTextStyle: {
    marginLeft: 5,
    marginTop: 2,
    fontSize: 12,
    textAlign: 'left',
    color: Colors.BLACK,
    fontFamily: Fonts.SIGNIKA_REGULAR,
  },
  listItemContainerStyle: {
    // width: 150,
    margin: 10,
    borderRadius: 10,
    minHeight: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.0,
    elevation: 3,
    alignItems: 'center',
  },
  centeredView: {
    // flex: 1,
    // backgroundColor:'pink',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    height: '100%',
    backgroundColor: 'white',
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
  iconStyle: {
    height: 15,
    width: 15,
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
  iconStyle: {
    height: 15,
    width: 15,
  },
});

const mapStateToProps = (state) => ({
  //   unitCodeList: state.progressCard.unitCodeList,
});

export default connect(mapStateToProps, {
  //   getUnitCodes,
})(ProductDetailScreen);
