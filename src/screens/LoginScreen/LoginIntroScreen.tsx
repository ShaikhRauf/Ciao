import { useLinkProps } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Dimensions, Image, StyleSheet, Platform } from 'react-native';
import {connect} from 'react-redux';
// import {setLoginSuccess,loginwithGraph,validateUserLogin} from '../../redux/action';

import colors from '../../common/color'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const LoginIntroScreen = (props: any) => {

//   props.validateUserLogin();

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/edfibre_logo.png')} style={{ height: 120, width: 250 }} resizeMode='contain'></Image>
            <Text style={{ fontSize: 18, marginTop: 50, width: width -50, textAlign: 'center', color: colors.GRAY,fontFamily: 'Quicksand-Regular' }}>Manage the studies with your personalised digital assistant. Say hey to Edfibre!</Text>
            <TouchableOpacity onPress={()=> { props.loginwithGraph() }} style={{ backgroundColor: colors.CIAO_THEME_COLOR, height: 50, width: width - 80, alignItems: 'center', justifyContent: 'center', borderRadius: 25, marginTop: 40 }}>
                <Text style={{ fontFamily: 'Quicksand-Bold', color: colors.WHITE, fontSize: 16 }}>SIGN IN</Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Quicksand-Regular',color: colors.GRAY, fontSize: 16, marginTop: 40 }}> Sign in with your institute office account</Text>
        </View>
    );
}

const mapStateToProps = state => ({
    nav: state.nav,
    // isUserLoggedIn : state.login.isUserLoggedIn,
});

export default connect(mapStateToProps, {})(LoginIntroScreen);

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: colors.WHITE }
});