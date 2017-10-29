import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, Navigator, FlatList } from 'react-native';

import ListItem from './ListItem.js';

class SelectionPage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'Audition': ['measured breathing', 'limb shake out', 'visualize your performance'],
        'Performance': ['measured breathing', 'limb shake out', 'visualize your performance'],
        'Recording': ['measured breathing', 'limb shake out', 'visualize your performance']
      ])
    };
  }

  // pass in navigation prop to each listItem
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => this.generateItem(data)}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
      />
    );
  }

  generateItem(data) {
    return (
      <ListItem routine={data} navigation={this.props.navigation} name={data}></ListItem>
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  }
});

export default SelectionPage
