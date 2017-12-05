import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import { defaultStyles } from '../styles.js';

// TabNavigator Documentation: https://github.com/aksonov/react-native-tabs
import Tabs from 'react-native-tabs';

class TabBar extends Component {
  constructor(props){
    super(props);
    this.state = {page:'home'}; // placeholder for Tabs to work
  }

  render() {
    return (
      <Tabs selected={this.state.page} style={{backgroundColor:'rgba(119, 136, 153, 1.0)'}}
          selectedStyle={{color:'black'}} onSelect={el => this.props.navigation.navigate(el.props.page)}>
        <Text style={defaultStyles.tabTitle} page="Selections">Find Routines</Text>
        <Text style={defaultStyles.tabTitle} page="Saved" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>My Routines</Text>
        <Text style={defaultStyles.tabTitle} page="Info" selectedStyle={{color:'green'}}>Info</Text>
      </Tabs>
    )
  }
}

export default TabBar
