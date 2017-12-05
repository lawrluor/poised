import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window');

const baseStyles = {
  text: {
    fontFamily: 'Avenir',
    color: '#FFFFFF'
  },
};

export const defaultStyles = {
  outline: {
    // borderWidth: 2
  },

  // Text
  titleText: {
    ...baseStyles.text,
    fontSize: 24,
  },
  bodyText: {
    ...baseStyles.text,
    fontSize: 18
  },
  paragraphText: {
    ...baseStyles.text,
    fontSize: 14
  },

  // Wrapper containers
  headerWrapper: {
    width: width,
    height: height * 0.1,
    backgroundColor: 'rgba(119, 136, 153, 0.0)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // TabBar
  icon: {
    height: 30,
    width: 30
  },
  tabTitle: {
    ...baseStyles.text,
    fontSize: 14,
    color: 'white'
  },

  // Buttons
  button: {
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Black with 50% opacity
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
