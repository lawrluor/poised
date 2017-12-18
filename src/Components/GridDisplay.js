import React, { Component, PropTypes } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  resizeMode
} from 'react-native';

import { defaultStyles } from '../styles';

import Icon from 'react-native-vector-icons/FontAwesome';

class GridDisplay extends Component {
  // Component Types

  static propTypes = {
    // Routine object with name, totalLength, and poster
    // routine: PropTypes.object.isRequired,
    // Called when user taps on a poster
    // onOpen: PropTypes.func.isRequired
  }

  // if given length in seconds, converts to mm:ss, using no external libraries
  convertLength(seconds) {
    let date = new Date(null);
    date.setSeconds(seconds); // total value of seconds
    let result = date.toISOString().substr(14, 5); // substring to only take MM:SS
    return result;
  }

  // If preview text is over 90 chars (arbitrary), truncate so it doesn't overflow display
  // CHANGE to truncate if more than 3 lines?
  truncatePreview(previewText) {
    if (previewText.length > 100) {
      // remove beginning & trailing whitespace
      return previewText.substring(0, 100).trim() + "...";
    } else {
      return previewText;
    }
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
              <Text style={[styles.bodyText, defaultStyles.outline]}>{name}</Text>
            </View>

            <View style={[styles.previewContainer, defaultStyles.outline]}>
              <Text style={[defaultStyles.paragraphText]}>{this.truncatePreview(preview)}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.lengthContainer, defaultStyles.outline]}>
              <Text style={defaultStyles.paragraphText}>{convertedLength}</Text>
              <View style={[styles.ratingsContainer, defaultStyles.outline]}>
                <View style={defaultStyles.outline}>
                  <Icon style={styles.iconSmaller} name="heart" color="#FFFFFF"></Icon>
                </View>

                <View style={defaultStyles.outline}>
                  <Text style={defaultStyles.paragraphText}>{overallRating}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    height: defaultStyles.screenDimensions.height / 6.5, // with padding, comes to approx 4 rows per screen height
    width: defaultStyles.screenDimensions.width / 1.13, // 1 column per screen width, add padding,
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,   // take up all available space
    backgroundColor: 'rgba(119, 136, 153, 0.7)',
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
  ratingsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  overlaidText: {
    position: 'absolute',
  },
  iconSmaller: {
    ...defaultStyles.iconSmaller,
    marginTop: 3,
    marginRight: 2
  },
  bodyText: {
    ...defaultStyles.bodyText,
    fontWeight: 'bold'
  }
});

export default GridDisplay;
