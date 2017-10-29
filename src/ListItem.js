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
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => this.navigateToRoutine(this.props.routine)}>
          <Text style={styles.itemName}>{this.props.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Necessary to put navigation logic outside of render()
  // As this.props in render() doesn't refer to navigation object
  navigateToRoutine(routineName) {
    this.props.navigation.navigate('Routine',
    {
      routineName: routineName // from this.state.name
    })
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
