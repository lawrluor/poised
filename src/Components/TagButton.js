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
    if (this.props.selectedTag===this.props.name) {
      // return highlighted button
      return (
        <TouchableHighlight
          underlayColor='rgba(28, 56, 79, 0.7)'
          style={styles.selectedTagButton}
          onPress={() => {this.props.handler(this.props.name)}}>
          <Text style={defaultStyles.paragraphText}>{this.props.name}</Text>
        </TouchableHighlight>
      );
    } else {
      // return default button
      return (
        <TouchableHighlight
          underlayColor='rgba(28, 56, 79, 0.7)'
          style={styles.tagButton}
          onPress={() => {this.props.handler(this.props.name)}}>
          <Text style={defaultStyles.paragraphText}>{this.props.name}</Text>
        </TouchableHighlight>
      );
    }
  }
}

const styles = StyleSheet.create({
  tagButton: {
    marginRight: 5,
    minWidth: (defaultStyles.screenDimensions.width * 0.25),
    maxHeight: 40,
    marginLeft: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(119, 136, 153, 0.7)', // match grid display but with more opacity
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTagButton: {
    marginRight: 5,
    minWidth: (defaultStyles.screenDimensions.width * 0.25),
    maxHeight: 40,
    marginLeft: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(28, 56, 79, 1.0)', // #1C384F
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TagButton;
