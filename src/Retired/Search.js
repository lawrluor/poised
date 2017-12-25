import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';

import { defaultStyles } from './styles.js';
import TagButton from './Components/TagButton.js';
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
          <Text style={defaultStyles.titleText}>What is on your mind?</Text>
          <Text style={defaultStyles.examineText}>Browse applicable routines based on topic.</Text>
        </View>

        <View style={[styles.bodyWrapper, defaultStyles.outline]}>
          <ScrollView
            horizontal={true}
          >
            <View style={[styles.buttonWrapper, defaultStyles.outline]}>
              <TagButton navigation={this.props.navigation} name={"Public Speaking"}></TagButton>
              <TagButton navigation={this.props.navigation} name={"Competition"}></TagButton>
              <TagButton navigation={this.props.navigation} name={"Interview"}></TagButton>
              <TagButton navigation={this.props.navigation} name={"Test"}></TagButton>
              <TagButton navigation={this.props.navigation} name={"Networking Event"}></TagButton>
              <TagButton navigation={this.props.navigation} name={"Presentation"}></TagButton>
              <TagButton navigation={this.props.navigation} name={"Date"}></TagButton>
            </View>
          </ScrollView>
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
    flex: 1,
  },
  // span width of container
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between' // spread vertically throughout container
  },

});

export default Search;
