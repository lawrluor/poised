import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import { defaultStyles } from './styles.js';
import TabBar from './Components/TabBar.js';

const { width, height } = Dimensions.get('window');

class InfoPage extends Component {
  // App Header
  static navigationOptions = {
    header: null
  };

  render() {
    return(
      <View style={defaultStyles.container}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
          <Text style={defaultStyles.titleText}>About Poise</Text>
          <Text style={defaultStyles.examineText}>Developer: Lawrence Luo | Version: 0.5</Text>
        </View>

        <View style={[styles.textContainer, defaultStyles.outline]}>
          <View style={[styles.body, defaultStyles.outline]}>
            <View style={[styles.textBlock, defaultStyles.outline]}>
              <Text style={defaultStyles.paragraphText}>
                Poise is a mobile app that enables you to perform at their best
                during anxiety-inducing tasks. Using Poise, you can overcome your
                performance anxiety and reach the state of calm and confidence you
                need to perform at your best.
              </Text>
            </View>

            <View style={[styles.textBlock, defaultStyles.outline]}>
              <Text style={defaultStyles.bodyText}>How it Works</Text>
              <Text style={defaultStyles.paragraphText}>
                Before an anxiety-inducing task, use a routine that will boost your
                performance. These are typically a short sequence of several physical and
                mental exercises that take a few to several minutes. The routines currently
                available in the app have been curated by experts in performance anxiety,
                but you will also be able to create your own routines and view those Created
                by other users in future versions.
              </Text>
            </View>

            <View style={[styles.textBlock, defaultStyles.outline]}>
              <Text style={defaultStyles.bodyText}>How can I help?</Text>
              <Text style={defaultStyles.paragraphText}>
                Using the app is great, but you can give me feedback at THIS LINK. I am
                also looking for more experts in the field of performance anxiety.
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.footer, defaultStyles.outline]}>
        </View>

        <TabBar navigation={this.props.navigation} currentPage={this.props.navigation.state.routeName}></TabBar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 12,
  },
  textContainer: {
    width: width * 0.85,
    height: height * 0.78,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(119, 136, 153, 0.5)'
  },
  textBlock: {
    paddingTop: 10,
    paddingBottom: 10
  },
  footer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export default InfoPage;
