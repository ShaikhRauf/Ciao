import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';

import { Provider } from "react-redux";
import configureStore from "./src/redux/store";

import AppContainer from './src/screens/AppContainer'

const store = configureStore();

class App extends Component {
  state = { count: 0 };
  
  render() {
    const { count } = this.state;
    return (
      
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;