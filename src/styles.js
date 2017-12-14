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
  }
};

export const defaultStyles = {
  screenDimensions: {
    width: width,
    height: height
  },
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
    fontSize: 38,
    fontWeight: 'bold'
  },
  titleText: {
    ...baseStyles.text,
    fontSize: 24
  },
  actionText: {
    ...baseStyles.text,
    fontSize: 22,
    textAlign: 'center'
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
    color: 'rgba(28, 56, 79, 1.0)',
    fontWeight: 'bold'
  },

  // Wrapper containers
  headerWrapper: {
    width: width * 0.9,
    height: height * 0.10,
    backgroundColor: 'rgba(119, 136, 153, 0.0)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20 // account for status bar (20px)
  },
  // To be used to preserve footer space when tabBar is absent
  footerWrapper: {
    flex: 1,
    // minHeight: 50
  },
  // Icons
  icon: {
    height: 30,
    width: 30
  },
  iconSmaller: {
    height: 12,
    width: 12
  },
  iconSmall: {
    height: 16,
    width: 16,
  },
  iconMedium: {
    height: 24,
    width: 24
  },
  iconLarge: {
    height: 32,
    width: 32
  },
  tabTitle: {
    ...baseStyles.text,
    fontSize: 14,
    color: 'white'
  },

  // For title, graphic layout in RoutinePage, Feedback, Results
  graphicLayoutBodyContainer: {
    flex: 4,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  graphicLayoutUpperText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  graphicLayoutLowerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  // Buttons and Input
  input: {
    ...baseStyles.text,
    height: 40,
    width: 270,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'grey',
    textAlignVertical: 'top'
  },
  loginButton: {
    height: 40,
    width: 270,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(28, 56, 79, 1.0)', // #1C384F
    borderWidth: 1,
    borderColor: 'rgba(28, 56, 79, 1.0)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondaryButton: {
    height: 40,
    width: 270,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // "inherits" from login button up to this point
    backgroundColor: 'rgba(28, 56, 79, 0.0)', // transparent
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  // Used in popup Routine
  button: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Black with 50% opacity
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
}
