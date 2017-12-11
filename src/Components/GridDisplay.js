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

import { defaultStyles } from '../styles';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

class GridDisplay extends Component {
  // Component Types

  static propTypes = {
    // Routine object with name, totalLength, and poster
    // routine: PropTypes.object.isRequired,
    // Called when user taps on a poster
    // onOpen: PropTypes.func.isRequired
  }

  render() {
    const { routine, routine: { name, author, preview, convertedLength, overallRating }, onOpen } = this.props;

    return (
      //   Style with Image overlaid behind image, instead of background color
      //   <ImageBackground source={{ uri: 'https://i.imgur.com/BTexHYJ.jpg' }} style={styles.image}>
      //     <Text style={[styles.name, styles.overlaidText]} numberOfLines={1}>{name}</Text>
      //   </ImageBackground>

      <TouchableOpacity style={[styles.container, defaultStyles.outline]} onPress={() => onOpen(routine)}>
        <View style={[styles.imageContainer, defaultStyles.outline]}></View>

        <View style={styles.displayContainer}>
          <View style={styles.textContainer}>
            <View style={[styles.titleContainer, defaultStyles.outline]}>
              <Text style={[defaultStyles.bodyText, defaultStyles.outline]}>{name}</Text>
            </View>

            <View style={[styles.previewContainer, defaultStyles.outline]}>
              <Text style={[defaultStyles.paragraphText]}>{preview}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.lengthContainer, defaultStyles.outline]}>
              <Text style={[defaultStyles.paragraphText, defaultStyles.outline]}>{convertedLength}</Text>
              <Text style={[defaultStyles.paragraphText, defaultStyles.outline]}>
                <Image style={defaultStyles.iconSmaller} source={require('../../static/img/icons/heart_white.png')}></Image>
                {overallRating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  // if given length in seconds, converts to mm:ss, using no external libraries
  convertLength(seconds) {
    let date = new Date(null);
    date.setSeconds(seconds); // total value of seconds
    let result = date.toISOString().substr(14, 5); // substring to only take MM:SS
    return result;
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    height: height / 6.5, // with padding, comes to approx 4 rows per screen height
    width: width / 1.15, // 1 column per screen width, add padding,
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
  displayContainer: {
    flex: 6,
    backgroundColor: 'transparent',
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },
  // overlay textContainer over imageContainer
  textContainer: {
    flex: 5,
  },
  titleContainer: {
    flex: 1
  },
  // for preview text
  previewContainer: {
    flex: 2
  },
  statsContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(119, 136, 153, 0.5)'
  },
  lengthContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  ratingContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  overlaidText: {
    position: 'absolute',
  }
});

export default GridDisplay;
