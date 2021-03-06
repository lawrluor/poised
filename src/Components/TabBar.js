import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  StyleSheet
} from 'react-native';

import { defaultStyles } from '../styles.js';

import firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome';

// TabNavigator Documentation: https://github.com/aksonov/react-native-tabs
import Tabs from 'react-native-tabs';

class TabBar extends Component {
  constructor(props){
    super(props);
    this.state = {name: this.props.currentPage};
  }

  changeTab(el) {
    // Stop users from accessing the "Create" page if not logged in
    if (el.props.name==="Create" && firebase.auth().currentUser===null) {
      return Alert.alert(
        "Please Note",
        "You must be signed in to create and edit routines.",
        [
          {text: "OK", onPress: () => console.log('OK Pressed')},
        ]
      );
    }

    // if already on this page, don't reload
    if (el.props.name !== this.state.name) {
      this.props.navigation.navigate(el.props.name);
    };
  }

  render() {
    return (
        <Tabs
          selected={this.state.name}
          style={styles.tabBar}
          onSelect={el => this.changeTab(el)}>

          <Tab selectedIconStyle={styles.selectedTab} name="CreateRoutine" tabname="Create"></Tab>
          <Tab selectedIconStyle={styles.selectedTab} name="Selections" tabname="Selections"></Tab>
          <Tab selectedIconStyle={styles.selectedTab} name="InfoPage" tabname="Info"></Tab>
        </Tabs>
    )
  }
}

// For future, to be able to render icon and text below it for navigation help
class Tab extends Component {
  constructor(props) {
    super(props);

    this.tabname = this.props.tabname

    if (this.props.tabname === "Info") {
      this.iconName = "info-circle";
    } else if (this.props.tabname === "Selections") {
      this.iconName = "list-ul";
    } else if (this.props.tabname === "Create") {
      this.iconName = "pencil";
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Icon style={styles.tabIcon} name={this.iconName} color="#FFFFFF"></Icon>
        <Text style={[defaultStyles.examineText]}>{this.tabname}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBar: {
    flex: 1,
    backgroundColor:'rgba(119, 136, 153, 1.0)',
    width: defaultStyles.screenDimensions.width
  },
  tabIcon: {
    fontSize: 20
  },
  selectedTab: {
    borderTopWidth: 2,
    borderTopColor: 'white'
  }
});

export default TabBar;
