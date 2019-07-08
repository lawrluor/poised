import React, { Component } from 'react';
import { TextInput } from 'react-native';

import { defaultStyles } from '../styles.js';

class DefaultTextInput extends Component {
  render() {
    // Currently updates state in parent for every change in text
    // Change to onSubmitEditing, onEndEditing or on keyboard dismiss for more efficiency
    return(
      <TextInput
        style={defaultStyles.input}
        editable={true}
        autoCapitalize='none'
        autoCorrect={false}
        maxLength={this.props.maxLength}
        underlineColorAndroid={'transparent'}
        placeholder={this.props.inputType}
        onChangeText={(text) => {this.props.handler(this.props.inputType, text, this.props.index)}}
      />
    )
  }
}


export default DefaultTextInput;
