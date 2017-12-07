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
    return (
      <Tabs
        selected={this.state.name}
        style={{backgroundColor:'rgba(119, 136, 153, 1.0)'}}
        onSelect={el => this.changeTab(el)}>

        <Image source={require('../../static/img/icons/search_white.png')} style={defaultStyles.iconSmallStandard} name="Search" selectedIconStyle={{borderTopWidth:1,borderTopColor:'white'}}></Image>
        <Image source={require('../../static/img/icons/goal_white.png')} style={defaultStyles.iconSmallStandard} name="Selections" selectedIconStyle={{borderTopWidth:1,borderTopColor:'white'}}></Image>
        <Image source={require('../../static/img/icons/info_white.png')} style={defaultStyles.iconSmallStandard} name="InfoPage" selectedIconStyle={{borderTopWidth:1,borderTopColor:'white'}}></Image>
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

// For future, to be able to render icon and text below it for navigation help
class Tab extends Component {
  render () {
    return (
      <View>
        <Image source={require('../../static/img/icons/search_white.png')} style={defaultStyles.iconSmallStandard} name="Search" selectedIconStyle={{borderTopWidth:1,borderTopColor:'white'}}></Image>
        <Text>Search</Text>
      </View>
    );
  }
}

export default TabBar;
