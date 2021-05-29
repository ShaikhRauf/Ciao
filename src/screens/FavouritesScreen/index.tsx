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
  
} from 'react-native';
import Colors from '../../common/color';
import Fonts from '../../common/font';
import {connect} from 'react-redux';
import {Rating} from 'react-native-ratings';

import Header from '../../common/component/Header';
import Footer from '../../common/component/Footer';
// import {getUnitCodes, getProgressCardAttendance} from '../../redux/action';
import {useNavigation, useIsFocused} from '@react-navigation/native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FavouruitesScreen = (props: any) => {
  const [searchText, setSearchText] = useState('');
  const [isComponentLoaded, setComponentLoaded] = useState(false);

  const navigation = useNavigation();

  const searchCateguries = (text) => {
    setSearchText(text);
  };

  const ProductList = [
    {
      name: 'Pumpkin',
      productImg: require('../../assets/Categories/Pumpkin.jpeg'),
      quality:'Good'
    },
    {
      name: 'Lady finger',
      productImg: require('../../assets/Categories/ladyfinger.jpeg'),
      quality:'Ok'
    },
    {
      name: 'Tomatoes',
      productImg: require('../../assets/Categories/tomatoes.jpeg'),
      quality:'Poor'
    },
    {
      name: 'Broccoli',
      productImg: require('../../assets/Categories/broccoli.png'),
      quality:'Poor'
    },
    {
      name: 'flower',
      productImg: require('../../assets/Categories/flower.jpeg'),
      quality:'Poor'
    },
    {
      name: 'Cabbage',
      productImg: require('../../assets/Categories/Cabbage.jpeg'),
      quality:'Poor'
    },
  ];

  const renderListItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen',{prodObj:item})}>
        <View style={styles.listItemContainerStyle}>
          <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
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
                  style={{height: 18, width: 18, marginRight:10, alignSelf: 'flex-end'}}
                  resizeMode="contain"
                  source={ require('../../assets/TabBar/fav_tab_selected.png')
                  }
                />
              <Text style={[styles.subTextStyle,{fontFamily:Fonts.SIGNIKA_REGULAR,fontSize:12, color: item.quality == 'Good' ? Colors.CIAO_THEME_COLOR : item.quality == 'Ok' ? Colors.YELLOW_OK : Colors.RED_DARK_POOR  }]}>{item.quality}</Text>
              <Text style={[styles.subTextStyle,{fontFamily:Fonts.SIGNIKA_REGULAR,fontSize:14}]}>{item.name}</Text>
              <Text style={[styles.subTextStyle,{fontFamily:Fonts.SIGNIKA_REGULAR,fontSize:12, color:Colors.SUB_TEXT_LIGHT_GRAY}]}>{item.name}</Text>
              <View style={{height:20 , marginRight:10, alignSelf: 'flex-end', marginBottom:5}}>
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
        titleText={'Favouruites'}
        goBack={() => navigation.goBack()}
        titleTextStyle={{fontSize: 14}}
      />

      <FlatList
        style={{
          width: width - 100,
          marginTop: 10,
        }}
        data={ProductList}
        renderItem={({item, index}) => renderListItem(item, index)}
      />
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
      marginLeft:5,
      marginTop:2,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
})(FavouruitesScreen);
