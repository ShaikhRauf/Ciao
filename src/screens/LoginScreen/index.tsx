import { useLinkProps } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Dimensions, TextInput, Image, StyleSheet, Platform } from 'react-native';
import {connect} from 'react-redux';
import {setLoginSuccess, getSignInToken} from '../../redux/action';

import colors from '../../common/color'

// import {signInToOkta} from '../../redux/action/common/okta'


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height



const LoginScreen = (props : any) => {

    var [userName, setText] = useState('');
    var [userPass, setPass] = useState('');

    //    useEffect(() => {

    //    }, [userName]);
    
    const checkLogin = async ()=>{

        // await signInToOkta()

      //  props.getSignInToken()

//         ClientId: 0oa1s0dkhrRGlN8p14x7
// Okta Domain: dev-963398.okta.com

        // await createConfig({
        //     issuer: "https://dev-963398.okta.com/oauth2/default", // optional
        //     clientId: "0oa1s0dkhrRGlN8p14x7",
        //     redirectUri: "com.phibi.app:/callback",
        //     endSessionRedirectUri: "com.phibi.app:/",
        //     discoveryUri: "https://dev-963398.okta.com",
        //     scopes: ["openid", "profile", "offline_access"],
        //     requireHardwareBackedKeyStore: true,
        //     androidChromeTabColor: "#FF00AA",
        //     httpConnectionTimeout: 15,
        //     httpReadTimeout: 10,
        //   });

        // signIn({ username: "3000002@students.atmc.edu.au", password: "Atmc@1234567" })
        //     .then(token => {
        //         // consume accessToken from token.access_token
        //         console.log("token > >> ", token)
        //     })
        //     .catch(error => {
        //         console.log("token error > >> ", error)
        //         // handle error
        //     })

        if (userName!="") {
            // props.setLoginSuccess(true)   
            props.navigation.navigate('VerifPinScreen') 
        } else {
            props.navigation.navigate('VerifPinScreen')
        }


        
        
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ height: 50, width: '90%', alignItems: 'flex-end', justifyContent: 'center', marginTop:Platform.OS == 'ios' ? 70 : 10 }}>
                <Image source={require('../../assets/cross.png')} style={styles.clearBtnImgStyle} resizeMode='contain'></Image>
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 26, marginTop: 100, textAlign: 'left', width: width - 40, color: colors.GRAY }}>Sign in</Text>

            <View style={{ width: width - 40, alignSelf: 'center', alignContent: 'center', flexDirection: 'row', borderColor: colors.BLACK, borderWidth: 1, borderRadius: 5, marginTop: 40, height: 50, justifyContent: 'center', alignItems: 'center' }}>

                <TextInput
                    style={{fontFamily: 'Quicksand-Regular', width: width - 100, marginTop: 5, padding: 10, fontSize: 18 }}
                    placeholder={'email'}
                    value={userName}
                    onChangeText={text => setText(text)}
                />

                <TouchableOpacity onPress={() => setText("")} style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/cross.png')} style={styles.clearBtnImgStyle} resizeMode='contain'></Image>
                </TouchableOpacity>

            </View>


            <View style={{ width: width - 40, alignSelf: 'center', alignContent: 'center', flexDirection: 'row', borderColor: colors.BLACK, borderWidth: 1, borderRadius: 5, marginTop: 20, height: 50, justifyContent: 'center', alignItems: 'center' }}>

                <TextInput
                    style={{fontFamily: 'Quicksand-Regular', fontSize: 18, width: width - 100, marginTop: 5, padding: 10, fontSize: 18 }}
                    placeholder={'password'}
                    value={userPass}
                    secureTextEntry={true}
                    onChangeText={text => setPass(text)}
                />

                <TouchableOpacity onPress={() => setPass("")} style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/cross.png')} style={styles.clearBtnImgStyle} resizeMode='contain'></Image>
                </TouchableOpacity>

            </View>

            {/* <TouchableOpacity onPress={() => props.setLoginSuccess()} style={{ backgroundColor: colors.CIAO_THEME_COLOR, height: 50, width: width - 40, alignItems: 'center', justifyContent: 'center', borderRadius: 25, marginTop: 40 }}> */}
            <TouchableOpacity onPress={() => checkLogin()} style={{ backgroundColor: colors.CIAO_THEME_COLOR, height: 50, width: width - 40, alignItems: 'center', justifyContent: 'center', borderRadius: 25, marginTop: 40 }}>
            
                <Text style={{ fontFamily: 'Quicksand-Bold', color: colors.WHITE, fontSize: 16 }}>SIGN IN</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 25, marginTop: 10 }}>
                <Text style={{ color: colors.GRAY, fontSize: 14, marginTop: 20, width: width - 40 }}> {'Forgot your password?'.toUpperCase()}</Text>
            </TouchableOpacity> */}


            <View style={{ height: 50, width: width - 40, alignItems: 'center', justifyContent: 'center', bottom: 40, position: 'absolute', flexDirection: 'row' }}>
                <Image source={require('../../assets/outlook.png')} style={{ height: 30, width: 30, marginRight: 10 }} resizeMode='contain'></Image>
                <Text style={{ fontFamily: 'Quicksand-Medium', color: colors.BLACK, fontSize: 16, }}>Sign in with Office Account</Text>
            </View>

        </View>
    );
}


const mapStateToProps = state => ({
    nav: state.nav,
    // isUserLoggedIn : state.login.isUserLoggedIn,
});

// const mapDispatchToProps = dispatch => ({
//     dispatch,
//     // mobileActions: bindActionCreators(mobileActionCreator, dispatch)
// });

export default connect(mapStateToProps, {setLoginSuccess, getSignInToken})(LoginScreen);

const styles = StyleSheet.create({
    container: { height: height, alignItems: 'center', backgroundColor: colors.WHITE },
    clearBtnImgStyle: { height: 12, width: 12, marginRight: 0 }
});