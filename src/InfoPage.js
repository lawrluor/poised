import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';

import { defaultStyles } from './styles.js';
import TabBar from './Components/TabBar.js';

const { width, height } = Dimensions.get('window');

class InfoPage extends Component {
  // App Header
  static navigationOptions = {
    header: null
  };

  // Not being used currently
  openExternalLink(url) {
    return Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  render() {
    return(
      <View style={defaultStyles.container}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
          <Text style={defaultStyles.titleText}>About Poise<Text style={defaultStyles.examineText}> (v0.8)</Text></Text>
          <Text style={defaultStyles.examineText}>Developer: Lawrence Luo</Text>
        </View>

        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            style={[styles.textContainer, defaultStyles.outline]}
          >

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
                available in the app have been curated by experts in performance anxiety.
              </Text>
            </View>

            <View style={[styles.textBlock, defaultStyles.outline]}>
              <Text style={defaultStyles.bodyText}>What is in the next update?</Text>
              <Text style={defaultStyles.paragraphText}>
                Version 1.0 will have:
              </Text>

              <Text style={defaultStyles.paragraphText}>-Create your own routines</Text>
              <Text style={defaultStyles.paragraphText}>-View routines created by others</Text>
              <Text style={defaultStyles.paragraphText}>-Save and favorite routines</Text>
              <Text style={defaultStyles.paragraphText}>-Edit existing routines to fit your unique needs</Text>
              <Text style={defaultStyles.paragraphText}>-Personal settings page</Text>
              <Text style={defaultStyles.paragraphText}>-More music options and transition sound effects</Text>
            </View>

            <View style={[styles.textBlock, defaultStyles.outline]}>
              <Text style={defaultStyles.bodyText}>How can I help?</Text>
              <Text style={defaultStyles.paragraphText}>
                I am always looking for more beta testers, so please introduce Poise to your friends! I am also looking
                to talk to experts in the field of performance anxiety, as well as students who suffer acutely from from
                performance anxiety in specific situations.
              </Text>
            </View>
          </ScrollView>
        </View>

        <View style={[defaultStyles.footerWrapper, defaultStyles.outline]}></View>

        <TabBar navigation={this.props.navigation} currentPage={this.props.navigation.state.routeName}></TabBar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 6
  },
  scrollContent: {
    paddingVertical: 10
  },
  textContainer: {
    width: width * 0.85,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(119, 136, 153, 0.5)'
  },
  textBlock: {
    paddingBottom: 5
  }
});

export default InfoPage;
