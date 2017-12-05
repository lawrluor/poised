import React, { Component }from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

import { defaultStyles } from './styles.js';

class SelectionButton extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <TouchableHighlight style={defaultStyles.button} onPress={() => this.props.navigation.navigate('Selections')}>
        <Text style={[defaultStyles.bodyText]}>{this.props.name}</Text>
      </TouchableHighlight>
    );
  }
}

export default SelectionButton
