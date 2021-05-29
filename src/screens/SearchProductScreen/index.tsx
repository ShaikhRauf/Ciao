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
  ImageBackground,
  TextInput,
  Alert,
  BackHandler,
} from 'react-native';
import Colors from '../../common/color';
import Fonts from '../../common/font';
import {connect} from 'react-redux';

import Header from '../../common/component/Header';
// import Footer from '../../common/component/Footer';
// import {getUnitCodes, getProgressCardAttendance} from '../../redux/action';
// import BottomDrawer from 'react-native-bottom-drawer-view';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';

import ReadMore from 'react-native-read-more-text';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SearchProductScreen = (props: any) => {
  const [searchText, setSearchText] = useState('');
  const [isComponentLoaded, setComponentLoaded] = useState(false);
  const [filteredProductList, setFilteredProductList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [isFavProduct, setIsFavProduct] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [recentProductList, setRecentProductList] = useState([]);
  const navigation = useNavigation();

  const ProductList = [
    {
      name: 'Pumpkin',
      productImg: require('../../assets/Categories/Pumpkin.jpeg'),
      quality: 'Good',
    },
    {
      name: 'Lady finger',
      productImg: require('../../assets/Categories/ladyfinger.jpeg'),
      quality: 'Ok',
    },
    {
      name: 'Tomatoes',
      productImg: require('../../assets/Categories/tomatoes.jpeg'),
      quality: 'Poor',
    },
    {
      name: 'Broccoli',
      productImg: require('../../assets/Categories/broccoli.png'),
      quality: 'Poor',
    },
    {
      name: 'flower',
      productImg: require('../../assets/Categories/flower.jpeg'),
      quality: 'Poor',
    },
    {
      name: 'Cabbage',
      productImg: require('../../assets/Categories/Cabbage.jpeg'),
      quality: 'Poor',
    },
  ];

  useEffect(() => {
    navigation.addListener('focus', () => {
      console.warn('Use effect focus');
      setFilteredProductList(ProductList);
      setRecentProductList(ProductList);
    });
  });

  const removeRecentItem = (itemIndex) => {
    let selectedItem = recentProductList[itemIndex];
    let tempRecentProductList = recentProductList.filter(function (item) {
      return item !== selectedItem;
    });

    setRecentProductList(tempRecentProductList);

    console.warn(recentProductList);
  };

  const searchCateguries = (text) => {
    setSearchText(text);
    const newData = ProductList.filter((item) => {
      const itemData = `${item.name.toUpperCase()}   
        ${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setFilteredProductList(newData);
  };

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

  const renderRecentListItem = (item, index, showRemoveItem) => {
    return (
      <TouchableOpacity onPress={() =>{
        setSelectedItem(item)
        props.navigation.navigate('ProductDetailScreen',{prodObj:item})
        // setModalVisible(true)
        //   searchCateguries(item.name)
          }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={styles.recentListItemContainerStyle}>
            <Image
              style={{
                width: 30,
                height: 40,
              }}
              resizeMode={'contain'}
              source={item.productImg}
            />
            <Text style={[styles.recentListTitleTextStyle, {marginLeft: 10}]}>
              {item.name}
            </Text>
          </View>
          {showRemoveItem ? (
            <TouchableOpacity
              onPress={() => removeRecentItem(index)}
              style={{
                height: 20,
                width: 20,
                padding: 5,
                //   marginRight:10
              }}>
              <Image
                style={{
                  width: 10,
                  height: 10,
                }}
                resizeMode={'contain'}
                source={require('../../assets/cross_black.png')}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const renderListItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => console.log(index)}>
        <View style={styles.listItemContainerStyle}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.WHITE,
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 80,
                height: 80,
              }}
              resizeMode={'contain'}
              source={item.productImg}
            />
          </View>

          <View
            style={{
              flex: 2.5,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: '#EFF7EE',
            }}>
            <View
              style={{
                marginTop: 10,
                marginLeft: 10,
                flex: 1,
              }}>
              <Image
                style={{
                  height: 18,
                  width: 18,
                  marginRight: 10,
                  alignSelf: 'flex-end',
                }}
                resizeMode="contain"
                source={require('../../assets/TabBar/fav_tab_selected.png')}
              />
              <Text
                style={[
                  styles.subTextStyle,
                  {
                    fontFamily: Fonts.SIGNIKA_REGULAR,
                    fontSize: 12,
                    color:
                      item.quality == 'Good'
                        ? Colors.CIAO_THEME_COLOR
                        : item.quality == 'Ok'
                        ? Colors.YELLOW_OK
                        : Colors.RED_DARK_POOR,
                  },
                ]}>
                {item.quality}
              </Text>
              <Text
                style={[
                  styles.subTextStyle,
                  {fontFamily: Fonts.SIGNIKA_REGULAR, fontSize: 14},
                ]}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.subTextStyle,
                  {
                    fontFamily: Fonts.SIGNIKA_REGULAR,
                    fontSize: 12,
                    color: Colors.SUB_TEXT_LIGHT_GRAY,
                  },
                ]}>
                {item.name}
              </Text>
              <View
                style={{
                  height: 20,
                  marginRight: 10,
                  alignSelf: 'flex-end',
                  marginBottom: 5,
                }}>
                <Rating
                  type="custom"
                  ratingColor="#FFBC2E"
                  startingValue={3}
                  ratingBackgroundColor="rgba(0, 0, 0, 0.06)"
                  ratingCount={5}
                  imageSize={12}
                  style={{marginTop: 5}}
                  showRating={false}
                  tintColor={'#EFF7EE'}
                  readonly={true}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        titleText={'Search'}
        goBack={() => navigation.goBack()}
        titleTextStyle={{fontSize: 14}}
      />

      {/* <ScrollView style={{flex:1, width:'100%',}} contentContainerStyle={{justifyContent:'center', alignItems:'center', alignContent:'center'}}> */}

      <View
        style={{
          height: 36,
          width: '90%',
          backgroundColor: 'rgba(118, 118, 128, 0.12)',
          margin: 0,
          borderRadius: 5,
          flexDirection: 'row',
          alignSelf: 'center',
          // justifyContent:'center'
        }}>
        <View
          style={{
            height: 36,
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={[styles.iconStyle]}
            source={require('../../assets/search_gray.png')}
          />
        </View>
        <View style={{height: 36, width: '70%', justifyContent: 'center'}}>
          <TextInput
            style={{
              fontFamily: Fonts.SIGNIKA_REGULAR,
              height: 36,
              justifyContent: 'center',
              color: Colors.BLACK,
              fontSize: 14,
            }}
            placeholder={' Search for anything'}
            placeholderTextColor={'rgba(60, 60, 67, 0.6)'}
            value={searchText}
            onChangeText={(value) => {
              searchCateguries(value);
            }}
          />
        </View>
      </View>

      {recentProductList.length > 0 && searchText == '' ? (
        <View
          style={{
            alignSelf: 'center',
            marginTop: 30,
            width: '80%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text
              style={[
                styles.recentListTitleTextStyle,
                {
                  color: Colors.BLACK,
                  fontFamily: Fonts.SIGNIKA_SEMI_BOLD,
                  fontSize: 16,
                },
              ]}>
              {'Recent'}
            </Text>
            <TouchableOpacity onPress={() => searchCateguries(' ')}>
              <Text
                style={[
                  styles.recentListTitleTextStyle,
                  {
                    color: Colors.SUB_TEXT_LIGHT_GRAY,
                    fontFamily: Fonts.SIGNIKA_REGULAR,
                    fontSize: 14,
                  },
                ]}>
                {'See All'}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentProductList}
            renderItem={({item, index}) =>
              renderRecentListItem(item, index, true)
            }
          />
        </View>
      ) : null}

      {filteredProductList.length == 0 && searchText != '' ? (
        <Image
          style={{marginTop: 80, height: 220, width: 260}}
          resizeMode={'contain'}
          source={require('../../assets/no_result_found.png')}
        />
      ) : searchText != '' ? (
        <View
          style={{
            alignSelf: 'center',
            marginTop: 30,
            width: '80%',
          }}>
          <FlatList
            style={{height: height - 250, width: width - 100}}
            data={filteredProductList}
            // renderItem={({item, index}) => renderListItem(item, index,)}
            renderItem={({item, index}) =>
              renderRecentListItem(item, index, false)
            }
          />
        </View>
      ) : null}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                  marginTop: Platform.OS=='ios' ? 120 :80,
                flexDirection: 'row',
                width: width-20,
                justifyContent: 'space-between',
                
              }}>
              <TouchableOpacity
                style={[styles.openButton,{marginLeft:0}]}
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
                source={selectedItem? selectedItem.productImg : require('../../assets/scan_code_ic.png') }
              />

              <Text style={[styles.titleText, {marginBottom: 40}]}>
                
                {selectedItem? selectedItem.name : '-'}
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
                    placed inside a sliced bread A hamburger (also burger for
                    short) is a sandwich consisting of one or more cooked
                    patties of ground meat, usually beef, placed inside a sliced
                    bread
                  </Text>
                </ReadMore>
              </View>
            </ScrollView>
            <View
              style={{width: width, backgroundColor: Colors.CIAO_THEME_COLOR}}>
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
  recentListTitleTextStyle: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.ACTIVE_TAB_PINK_COLOR,
    fontFamily: Fonts.SIGNIKA_REGULAR,
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
  recentListItemContainerStyle: {
    // width: 150,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    // backgroundColor:'pink',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: height,
    marginBottom: 79,
    backgroundColor: 'white',
    
    padding: 0,
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
});

const mapStateToProps = (state) => ({
  //   unitCodeList: state.progressCard.unitCodeList,
});

export default connect(mapStateToProps, {
  //   getUnitCodes,
})(SearchProductScreen);
