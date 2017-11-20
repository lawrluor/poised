import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ListView, Navigator, FlatList } from 'react-native';

import ListItem from './ListItem.js';
import GridDisplay from './GridDisplay.js';
import { routines } from './data';

import { defaultStyles } from './styles.js';

class SelectionPage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'calming routine': ['measured breathing', 'shake out your limbs', 'visualize your performance'],
        'positive vibes': ['highlight of your week', 'limb shake out', 'visualize your performance'],
        'get hype': ['limb shake out', 'calming routine', 'visualize your performance']
      ])
    };
  }

  // App Title
  // static navigationOptions = {
  //   title: 'Select a Routine',
  // };

  // pass in navigation prop to each listItem
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.baseText, styles.titleText]}>Select a Routine</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          // Hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {routines.map((routine, index) => <GridDisplay
            routine={routine}
            onOpen={this.openRoutine}
            key={index}
            navigation={this.props.navigation}
          />)}
        </ScrollView>
      </View>
    );
  }

  // <ListView
  //   dataSource={this.state.dataSource}
  //   renderRow={(data) => this.generateItem(data)}
  //   renderHeader={this.renderHeader}
  //   renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
  // />

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.baseText]}>routines</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#87AECF',
    flex: 1,
    padding: 20,
    alignItems: 'center', // center routine boxes
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 36,
    margin: 10,
  },
  baseText: {
    fontFamily: 'Avenir',
    color: '#FFFFFF'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#FFFFFF'
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
