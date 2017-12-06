import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

import { defaultStyles } from '../styles.js';

// TabNavigator Documentation: https://github.com/aksonov/react-native-tabs
import Tabs from 'react-native-tabs';

class TabBar extends Component {
  constructor(props){
    super(props);
    this.state = {name: this.props.currentPage};
  }

  render() {
    console.log(this.props.currentPage);
    return (
      <Tabs
        selected={this.state.name}
        style={{backgroundColor:'rgba(119, 136, 153, 1.0)'}}
        selectedStyle={{fontWeight:'900'}}
        onSelect={el => this.changeTab(el)}>

        <Text style={defaultStyles.tabTitle} name="Search">Search Routines</Text>
        <Text style={defaultStyles.tabTitle} name="Selections">My Routines</Text>
        <Text style={defaultStyles.tabTitle} name="InfoPage">Info</Text>
      </Tabs>
    )
  }

  changeTab(el) {
    // if already on this page, don't reload
    if (el.props.name !== this.state.name) {
      this.props.navigation.navigate(el.props.name);
    };
  }
}

export default TabBar;
