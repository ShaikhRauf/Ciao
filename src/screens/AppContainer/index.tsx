import React, {Component, useEffect} from 'react';
import {connect} from 'react-redux';
import {View,StyleSheet,Dimensions,ActivityIndicator,Text,Platform,Alert,AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// import {NavigationActions,addNavigationHelpers} from 'react-navigation';
import {bindActionCreators} from 'redux';
// import * as mobileActionCreator from '../../action/mobileActions';
import RootNavigation from '../RootNavigation';
import {LoginNavigation} from '../LoginNavigation';
import HomeNavigation from '../HomeScreen/HomeNavigation'
import DrawerRootNavigation from '../DrawerRootNavigation';
import color from '../../common/color';


const getCurrentRouteName = (navigationState) => {

    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
};

const AppContainer = (props: any) => {


    useEffect(() => {
        SplashScreen.hide()
       }, []);

    
        return (
            <View
                style={{
                flex: 1,
                opacity: 1
                }}>
                    {
                        props.isUserLoggedIn ? <RootNavigation/> : <RootNavigation />
                    }
                    
                    { 
                    props.loading ? 
                        <View style={style.maskBox}>
                                <ActivityIndicator color={color.CIAO_THEME_COLOR} size="large"/>                                
                                
                            </View>
                        : <View/>
                    }
            
            </View>
        )
    
}

const style = StyleSheet.create({
    maskBox: {
        position: 'absolute',
        width: Dimensions
            .get('window')
            .width,
        height: Dimensions
            .get('window')
            .height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
});

const mapStateToProps = state => ({
    isUserLoggedIn : state.login.isUserLoggedIn,
    loading: state.app.loading,
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
