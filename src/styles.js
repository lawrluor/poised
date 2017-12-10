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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87AECF',
  },
  outline: {
    // borderWidth: 1
  },

  // Text
  jumboText: {
    ...baseStyles.text,
    fontSize: 36,
    fontWeight: 'bold'
  },
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
  examineText: {
    ...baseStyles.text,
    fontSize: 12,
    textAlign: 'center'
  },
  linkText: {
    ...baseStyles.text,
    fontWeight: 'bold'
  },

  // Wrapper containers
  headerWrapper: {
    width: width * 0.9,
    height: height * 0.10,
    backgroundColor: 'rgba(119, 136, 153, 0.0)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25 // account for status bar (20px)
  },
  // To be used to preserve footer space when tabBar is absent
  footerWrapper: {
    maxHeight: 50
  },
  // Icons
  icon: {
    height: 30,
    width: 30
  },
  iconSmaller: {
    marginTop: 1,
    height: 12,
    width: 12
  },
  iconSmallStandard: {
    height: 16,
    width: 16,
  },
  iconMedium: {
    height: 24,
    width: 24
  },
  iconLarge: {
    height: 64,
    width: 64
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
