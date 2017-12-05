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

// TabNavigator Documentation: https://github.com/aksonov/react-native-tabs
import Tabs from 'react-native-tabs';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {page:'home'}; // placeholder for Tabs to work
  }

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

        <Tabs selected={this.state.page} style={{backgroundColor:'rgba(119, 136, 153, 1.0)'}}
            selectedStyle={{color:'black'}} onSelect={el => this.props.navigation.navigate(el.props.page)}>
          <Text style={defaultStyles.tabTitle} page="Selections">Find Routines</Text>
          <Text style={defaultStyles.tabTitle} page="Saved" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>My Routines</Text>
          <Text style={defaultStyles.tabTitle} page="Info" selectedStyle={{color:'green'}}>Info</Text>
        </Tabs>

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
