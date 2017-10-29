import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

class ListItem extends React.Component {
  render() {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => console.log('tapped')}>
          <Text style={styles.itemName}>{this.props.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  listItem: {
    justifyContent: 'space-between',
    padding: 10
  },
  itemName: {
    fontSize: 26,
    color: 'black'
  }
});

export default ListItem;
