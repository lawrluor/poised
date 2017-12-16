import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator,
  Image
} from 'react-native';

import { defaultStyles } from './styles.js';
import firebaseApp from './Components/Firebase.js';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routineName: this.props.navigation.state.params.routineName,
      routineKey: this.props.navigation.state.params.routineKey,
      routineRating: this.props.navigation.state.params.routineRating,
      routineDownvotes: this.props.navigation.state.params.routineDownvotes,
      path: "",
      currentRating: 0,
      routinesRef: null
    }
  }

  // Load routines reference, get and store path, current rating, and ref to state
  componentWillMount() {
    let routinesRef = firebaseApp.database().ref('routines');

    // Query routine that matches key, store in this.state.routineRef to access later
    // orderByKey() indicates that key should equal value in equalTo()
    routinesRef.orderByKey().equalTo(this.state.routineKey).on('value', (snap) => {
      // get current Rating at time of query, store path path prefixed by key: 3/overallRating
      this.setState({
        currentRating: snap.val()[this.state.routineKey]['overallRating'],
        path: this.state.routineKey.toString(),
        routinesRef: routinesRef
      })
      console.log(this.state.path, this.state.currentRating);
    });
  }

  static navigationOptions = {
    header: null,
    title: 'poise'
  };

  render() {
    return (
      <View style={defaultStyles.container}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
        </View>

        <View style={[defaultStyles.graphicLayoutBodyContainer, defaultStyles.outline]}>
          <View style={[defaultStyles.graphicLayoutUpperText, defaultStyles.outline]}>
            <Text style={defaultStyles.titleText}>
              Was this routine helpful?
            </Text>
          </View>

          <View style={[styles.iconWrapper, defaultStyles.outline]}>
            <View style={[styles.leftContainer, defaultStyles.outline]}>
              <TouchableOpacity onPress={() => this.navigateToResults(false)}>
                <Image source={require('../static/img/icons/thumbs_down_64.png')} style={{marginTop: 18}}/>
              </TouchableOpacity>
            </View>

            <View style={[styles.rightContainer, defaultStyles.outline]}>
              <TouchableOpacity onPress={() => this.navigateToResults(true)}>
                <Image source={require('../static/img/icons/thumbs_up_64.png')} style={{marginBottom: 18}}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[defaultStyles.graphicLayoutLowerText, defaultStyles.outline]}>
          </View>
        </View>

        <View style={[defaultStyles.footerWrapper, defaultStyles.outline]}>
        </View>
      </View>
    )
  }

  // Navigate to Results page with result of thumbs up or down, increment downvotes or rating
  navigateToResults(result) {
    // Extract routine ref from state
    let routinesRef = this.state.routinesRef;

    if (result) {
      routinesRef.update({[this.state.path + '/overallRating'] : this.state.currentRating + 1 });
    } else {
      routinesRef.update({[this.state.path + '/downvotes'] : this.state.routineDownvotes + 1 });
    }
    this.props.navigation.navigate('Results', {
      result: result,
      routineId: this.state.routineKey
    });
  }
}

const styles = StyleSheet.create({
  iconWrapper: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftContainer: {
    flex: 2,
    alignItems: 'center'
  },
  rightContainer: {
    flex: 2,
    alignItems: 'center'
  },
  likeIcon: {
    borderWidth: 3,
    borderRadius: 150,
    borderColor: '#FFFFFF',
    padding: 10
  }
});

export default Feedback
