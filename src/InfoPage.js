import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Linking,
  TouchableHighlight
} from 'react-native';

import { defaultStyles } from './styles.js';
import TabBar from './Components/TabBar.js';

import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from 'firebase';

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

  // Logout method
  async logout() {
    try {
      await firebase.auth().signOut();
      // Automatically navigates back to Login based on Auth state set in SplashScreen
      // this.props.navigation.navigate('LoginPage');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return(
      <View style={defaultStyles.container}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
          <Text style={defaultStyles.titleText}>About Poise<Text style={defaultStyles.examineText}> (v1.0)</Text></Text>
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
              <Text style={defaultStyles.bodyText}>How can I help?</Text>
              <Text style={defaultStyles.paragraphText}>
                I am always looking for more beta testers, so please introduce Poise to your friends! I am also looking
                to talk to experts in the field of performance anxiety, as well as students who suffer acutely from from
                performance anxiety in specific situations.
              </Text>
            </View>

            <View style={[styles.textBlock, defaultStyles.outline]}>
              <Text style={defaultStyles.bodyText}>What do potential updates include?</Text>
              <Text style={defaultStyles.paragraphText}>-Create your own routines</Text>
              <Text style={defaultStyles.paragraphText}>-View routines created by others</Text>
              <Text style={defaultStyles.paragraphText}>-Save and favorite routines</Text>
              <Text style={defaultStyles.paragraphText}>-Edit existing routines to fit your unique needs</Text>
              <Text style={defaultStyles.paragraphText}>-Personal settings page</Text>
              <Text style={defaultStyles.paragraphText}>-More music options and transition sound effects</Text>
            </View>

            <View style={[styles.textBlock, defaultStyles.outline]}>
              <Text style={defaultStyles.bodyText}>Special Thanks to:</Text>
              <Text style={defaultStyles.paragraphText}>-Ziba Cranmer, Chad Pytel, Paul Lightfoot</Text>
              <Text style={defaultStyles.paragraphText}>-Dr. Karin S. Hendricks</Text>
              <Text style={defaultStyles.paragraphText}>-"Performance Anxiety Strategies" by Casey McGrath, Karin S. Hendricks, Tawnya D. Smith for adapted routines and research</Text>
            </View>
          </ScrollView>
        </View>

        <View style={[defaultStyles.footerWrapper, defaultStyles.outline]}>
          <View style={[styles.socialContainer, defaultStyles.outline]}>
            <Icon.Button styles={this.socialButton} name="facebook" backgroundColor="#3b5998" onPress={ () => Linking.openURL('https://www.facebook.com/poisemobileapp/') }>
              <Text style={defaultStyles.paragraphText}>Follow</Text>
            </Icon.Button>

            <TouchableHighlight style={defaultStyles.loginButton} underlayColor='rgba(28, 56, 79, 0.7)' onPress={() => this.logout()}>
              <Text style={[defaultStyles.bodyText]}>Log out</Text>
            </TouchableHighlight>

            <Icon.Button styles={this.socialButton} name="envelope" backgroundColor="#d14836" onPress={ () => Linking.openURL('mailto:luolawrence1@gmail.com') }>
              <Text style={defaultStyles.paragraphText}>Email</Text>
            </Icon.Button>
          </View>
        </View>

        <TabBar navigation={this.props.navigation} currentPage={this.props.navigation.state.routeName}></TabBar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 5
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
  },
  // horizontal container with social icons inside bottomWrapper
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // space apart horizontally in container
    alignItems: 'center',
    margin: 5,
  },
  socialButton: {
    padding: 5
  }
});

export default InfoPage;
