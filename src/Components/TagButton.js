import React, { Component }from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

import { defaultStyles } from '../styles.js';

class TagButton extends Component {
  render () {
    return (
      <TouchableHighlight underlayColor='rgba(28, 56, 79, 0.7)' style={[defaultStyles.button, styles.tagButton]} onPress={() => {this.props.handler(this.props.name)}}>
        <Text style={defaultStyles.paragraphText}>{this.props.name}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  tagButton: {
    marginRight: 5,
    minWidth: (defaultStyles.screenDimensions.width * 0.25),
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(28, 56, 79, 1.0)', // #1C384F,
    backgroundColor: 'rgba(28, 56, 79, 1.0)', // #1C384F
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TagButton;
