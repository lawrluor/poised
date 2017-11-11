import React, { Component }from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

class SelectionButton extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
        <Text style={[styles.bodyText, styles.baseText]}>{this.props.name}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Avenir',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  bodyText: {
    fontSize: 24,
  },
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
});

export default SelectionButton
