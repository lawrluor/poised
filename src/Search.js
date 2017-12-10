import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { defaultStyles } from './styles.js';
import SelectionButton from './Components/SelectionButton.js';
import TabBar from './Components/TabBar.js';

class Search extends Component {
  // App Header
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={defaultStyles.container}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
          <Text style={defaultStyles.titleText}>What's on your mind?</Text>
          <Text style={defaultStyles.examineText}>Browse applicable routines based on topic.</Text>
        </View>

        <View style={[styles.bodyWrapper, defaultStyles.outline]}>
          <View style={[styles.buttonWrapper, defaultStyles.outline]}>
            <SelectionButton navigation={this.props.navigation} name={"Public Speaking"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Competition"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Interview"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Test"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Networking Event"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Presentation"}></SelectionButton>
            <SelectionButton navigation={this.props.navigation} name={"Date"}></SelectionButton>
          </View>
        </View>

        <TabBar navigation={this.props.navigation} currentPage={this.props.navigation.state.routeName}></TabBar>

        <View style={[defaultStyles.footerWrapper, defaultStyles.outline]}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 8,
  },
  // span width of container
  buttonWrapper: {
    flex: 1,
    justifyContent: 'space-around' // spread vertically throughout container
  }
});

export default Search;
