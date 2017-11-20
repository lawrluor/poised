import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Center from './src/Center.js';
import SelectionPage from './src/SelectionPage.js';
import RoutineInfo from './src/RoutineInfo.js';
import RoutinePage from './src/RoutinePage.js';
import Feedback from './src/Feedback.js';
import Results from './src/Results.js';

import SelectionButton from './src/SelectionButton.js';

import { defaultStyles } from './src/styles.js';

class App extends Component<{}> {
  // Activate native props on Center view to allow returning multiple elements
  // https://stackoverflow.com/questions/31741705/error-invariant-violation-touchable-child-must-either-be-native-or-forward-set
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  // App Title
  static navigationOptions = {
    title: 'App',
    header: null
  }
  //   header: {
  //     style: {
  //       backgroundColor: 'rgba(119, 136, 153, 1)'
  //     }
  //   }
    // headerStyle: 'blue', // 'rgba(119, 136, 153, 1)'
  // };

  // Query database for tags, and pass tag name as a prop
  // <View style={[defaultStyles.headerWrapper, styles.outline]}></View>
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

// Navigation using StackNavigator
export const RootNavigator = StackNavigator(
  {
    Home: {
    screen: App
    },
    Selections: {
      screen: SelectionPage
    },
    RoutineInfo: {
      screen: RoutineInfo
    },
    Routine: {
      screen: RoutinePage
    },
    Feedback: {
      screen: Feedback
    },
    Results: {
      screen: Results
    }
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87AECF',
  },
  baseText: {
    fontFamily: 'Avenir',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  title: {
    fontSize: 48,
    margin: 10,
  },
  bodyText: {
    fontSize: 24,
  },
  titleWrapper: {
    flex: 4,
    justifyContent: 'flex-end', // flush to bottom
  },
  bodyWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 14,
  },
  // span width of container
  buttonWrapper: {
    flex: 1,
    justifyContent: 'space-around' // spread vertically throughout container
  },
  bottomWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
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
  },
  outline: {
    // borderWidth: 2
  }
});

export default RootNavigator
