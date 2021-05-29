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
import Footer from '../../common/component/Footer';
import {getUnitCodes, getProgressCardAttendance} from '../../redux/action';
import BottomDrawer from 'react-native-bottom-drawer-view';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const HomeScreen = (props: any) => {
  const [modalVisible, setModalVisible] = useState(true);

  const ProductList = [
    {
      name: 'Pumpkin',
      productImg: require('../../assets/Categories/Pumpkin.jpeg'),
    },
    {
      name: 'Lady finger',
      productImg: require('../../assets/Categories/ladyfinger.jpeg'),
    },
    {
      name: 'Tomatoes',
      productImg: require('../../assets/Categories/tomatoes.jpeg'),
    },
    {
      name: 'Broccoli',
      productImg: require('../../assets/Categories/broccoli.png'),
    },
    {
      name: 'flower',
      productImg: require('../../assets/Categories/flower.jpeg'),
    },
    {
      name: 'Cabbage',
      productImg: require('../../assets/Categories/Cabbage.jpeg'),
    },
  ];

  const renderContent = () => {
    return (
      <View style={styles.modalView}>
        <View style={{alignSelf:'center', marginTop:8, height:7,width:40,borderRadius:15, backgroundColor:'#FFC0B8'}} />
        <View style={styles.manuContainer}>
          <Text
            ellipsizeMode="tail"
            style={[
              styles.listTitleTextStyle,
              {
                width: '100%',
                marginTop: 10,
                marginLeft: 40,
                color: '#FF8473',
                fontSize: 20,
              },
            ]}>
            {'Previous Searches'}
          </Text>
          <FlatList
            style={{
              width: width - 20,
              marginTop: 10,
            }}
            horizontal
            data={ProductList}
            renderItem={({item, index}) => renderListItem(item, index)}
          />
        </View>
      </View>
    );
  };

  const renderListItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen',{prodObj:item})}>
        <View style={styles.menuItemContainerStyle}>
          <Image
            style={{
              width: '100%',
              height: 120,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
            imageStyle={{borderTopRightRadius: 15, borderTopLeftRadius: 15}}
            resizeMode={'cover'}
            source={item.productImg}></Image>

          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              backgroudColor:'gray',
            }}>
            <Text style={[styles.listTitleTextStyle]}>{item.name}</Text>

            <Text style={[styles.subTextStyle]}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Header isHome={true}/> */}

      {/* <ScrollView style={{flex:1, width:'100%',}} contentContainerStyle={{justifyContent:'center', alignItems:'center', alignContent:'center'}}> */}

      <TouchableOpacity
        style={{marginTop: '45%'}}
        onPress={()=> {
          // console.log("props ",props)
            props.navigation.navigate("QRCodeScanScreen")
          }}
        
        >
        <Text
          ellipsizeMode="tail"
          style={{
            fontSize: 25,
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.58)',
            fontFamily: Fonts.SIGNIKA_BOLD,
          }}>
          {'Tap to Scan'}
        </Text>

        <Image
          style={{width: 200, height: 200, marginTop: 18}}
          source={require('../../assets/scan_code_ic.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <BottomDrawer
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        containerHeight={250}
        downDisplay={250/1.5}
        offset={90}
        shadow={false}
        onExpanded = {() => {console.log('expanded')}}
        onCollapsed = {() => {console.log('collapsed')}}
        >
        {renderContent()}
      </BottomDrawer>

      {/* </ScrollView> */}

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
    backgroundColor: 'white'
  },
  listTitleTextStyle: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.BLACK,
    fontFamily: Fonts.SIGNIKA_BOLD,
  },
  subTextStyle: {
    fontSize: 12,
    textAlign: 'left',
    color: Colors.BLACK,
    fontFamily: Fonts.SIGNIKA_REGULAR,
  },
  menuItemContainerStyle: {
    width: 150,
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    minHeight: 180,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6.0,
    elevation: 3,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // position: 'absolute',
    marginTop:5,
    backgroundColor: 'white',
    height: 280,
    borderRadius: 25,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 6,
    // width: width,
    // bottom: 0,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
});

const mapStateToProps = (state) => ({
  unitCodeList: state.progressCard.unitCodeList,
  // progressCardAttendance: state.progressCard.progressCardAttendance,
});

export default connect(mapStateToProps, {
  getUnitCodes,
  // getProgressCardAttendance,
})(HomeScreen);
