import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, Navigator, FlatList } from 'react-native';

import ListItem from './ListItem.js';

class SelectionPage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'audition': ['measured breathing', 'limb shake out', 'visualize your performance'],
        'performance': ['measured breathing', 'limb shake out', 'visualize your performance'],
        'recording': ['measured breathing', 'limb shake out', 'visualize your performance']
      ])
    };
  }

  // pass in navigation prop to each listItem
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => this.generateItem(data)}
          renderHeader={this.renderHeader}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        />
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.baseText]}>routines</Text>
      </View>
    )
  }

  generateItem(data) {
    return (
      <ListItem routine={data} navigation={this.props.navigation}></ListItem>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#87AECF',
    flex: 1
  },
  baseText: {
    fontFamily: 'Avenir',
    color: '#FFFFFF'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8F8F8F'
  },
  header: {
    backgroundColor: '#87AECF'
  },
  headerText: {
    fontSize: 32,
    padding: 15,
    fontWeight: 'bold',
    color: '#87AECF'
  }
});

export default SelectionPage
