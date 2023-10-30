import {LogBox, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Main from './src/Components/Main';
import { Provider } from 'react-redux';
import store from './src/Redux/store';

LogBox.ignoreAllLogs()
const App = () => {

  return (
    <SafeAreaView style={{flex:1}}>
      <Provider store={store}>
      <Main />
      </Provider>
      
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
