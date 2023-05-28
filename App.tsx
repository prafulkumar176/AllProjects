import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Example from './components/BottomSheet';
import Maps from './components/Maps';
import MapsInClass from './components/MapsInClass';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView>
        {/* <View>
          <Text> textInComponent </Text>
        </View> */}
        {/* <Example /> */}
        {/* <Maps /> */}
        <MapsInClass />
      </SafeAreaView>
    );
  }
}
