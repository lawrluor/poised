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

export const defaultStyles = {
  text: {
    fontFamily: 'Avenir',
    color: '#FFFFFF'
  },
  headerWrapper: {
    width: width,
    height: height * 0.1,
    backgroundColor: 'rgba(119, 136, 153, 0.5)'
  }
};
