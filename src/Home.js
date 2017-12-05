import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import { defaultStyles } from './styles.js';
import SelectionButton from './Components/SelectionButton.js';
import TabBar from './Components/TabBar.js';

class Home extends Component {
  // App Header
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, defaultStyles.outline]}>
          <Text style={[defaultStyles.titleText]}>What's on your mind?</Text>
        </View>

        <View style={[styles.bodyWrapper, defaultStyles.outline]}>
          <View style={[styles.buttonWrapper, defaultStyles.outline]}>
            <SelectionButton navigation={this.props.navigation} name={"Competition"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Interview"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Test"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Networking Event"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Presentation"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Date"}></SelectionButton>
          </View>
        </View>

        <TabBar navigation={this.props.navigation}></TabBar>

        <View style={[styles.bottomWrapper, defaultStyles.outline]}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87AECF',
  },
  titleWrapper: {
    ...defaultStyles.headerWrapper,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 14,
  },
  // span width of container
  buttonWrapper: {
    flex: 1,
    justifyContent: 'space-around' // spread vertically throughout container
  },
  bottomWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3
  },
});

export default Home;
