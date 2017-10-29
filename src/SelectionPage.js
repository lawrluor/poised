import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, Navigator, FlatList } from 'react-native';

import ListItem from './ListItem.js';

class SelectionPage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Audition', 'Performance']),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => <ListItem name={data}></ListItem>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
      />
    );
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
