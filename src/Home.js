import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.title, styles.baseText]}>I have a...</Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <View style={[styles.buttonWrapper, styles.outline]}>
            <SelectionButton navigation={this.props.navigation} name={"Competition"}></SelectionButton>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Interview</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Test</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Networking Event</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Presentation</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Date</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={[styles.bottomWrapper, styles.outline]}>
        </View>
      </View>
    );
  }
}

export default Home;
