import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  resizeMode
} from 'react-native';

import { defaultStyles } from './styles';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// How many objects to have in each row and column
const cols = 1, rows = 3;

class GridDisplay extends Component {
  // Component Types

  static propTypes = {
    // // Routine object with name, totalLength, and poster
    // routine: PropTypes.object.isRequired,
    // // Called when user taps on a poster
    // onOpen: PropTypes.func.isRequired
  }

  render() {
    const { routine, routine: { name, totalLength, overallRating }, onOpen } = this.props;
    let convertedLength = this.convertLength(totalLength);

    return (
      //   <ImageBackground source={{ uri: 'https://i.imgur.com/BTexHYJ.jpg' }} style={styles.image}>
      //     <Text style={[styles.name, styles.overlaidText]} numberOfLines={1}>{name}</Text>
      //   </ImageBackground>
      <TouchableOpacity style={[styles.container, styles.outline]} onPress={() => this.navigateToRoutineInfo(name)}>
        <View style={[styles.imageContainer, styles.outline]}></View>

        <View style={styles.textContainer}>
          <View style={[styles.titleContainer, styles.outline]}>
            <Text style={[styles.titleText, styles.outline]}>{name}</Text>
          </View>

          <View style={[styles.bodyContainer, styles.outline]}>
            <Text style={[styles.bodyText, styles.outline]}>{convertedLength}</Text>
          </View>

        </View>
      </TouchableOpacity>
    )
  }

  //           <Text style={[styles.bodyText, styles.outline]}>Rating: {overallRating}</Text>
  //           <Image style={[styles.image, styles.outline]} source={{ uri: 'https://i.imgur.com/BTexHYJ.jpg' }}/>

  // takes length in seconds and converts to minutes
  convertLength(seconds) {
    if (seconds < 60) {
      return seconds + "s";
    } else {
      let minutes = seconds / 60;
      return minutes + "m";
    }
  }

  navigateToRoutineInfo(routineName) {
    this.props.navigation.navigate('RoutineInfo',
    {
      routineName: routineName // from this.state.name
    });
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    height: height / 8, // with padding, comes to approx 4 rows per screen height
    width: width / 1.2, // 1 column per screen width, add padding,
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,   // take up all available space
    backgroundColor: 'rgba(119, 136, 153, 0.5)',
    borderRadius: 10
  },
  image: {
    borderRadius: 10,                 // rounded corners
    ...StyleSheet.absoluteFillObject, // fill up all space in a container
  },
  // overlay textContainer over imageContainer
  textContainer: {
    flex: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  titleText: {
    ...defaultStyles.text,
    fontSize: 22,
  },
  bodyText: {
    ...defaultStyles.text,
    fontSize: 22,
  },
  overlaidText: {
    position: 'absolute',
  },
  titleContainer: {
    flex: 4
  },
  bodyContainer: {
    flex: 1
  },
  outline: {
    // borderWidth: 2
  }
});

export default GridDisplay;
