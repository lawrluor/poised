componentDidMount() {
  this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
      console.log("prints after 5 seconds");
      this.setState({
        counter: this.state.counter + 1
      });
      console.log(this.state.counter);
  }, 5000);
}

<ScrollView>
  <ListItem button onPress={() => console.log("Test")} name="Audition"></ListItem>
  <ListItem name="Performance"></ListItem>
  <ListItem name="Sectional"></ListItem>
</ScrollView>

<TouchableHighlight style={styles.center} onPress={() => this.props.navigation.navigate('Routine')}>
  <View ref={component => this._root = component}>
    <Center></Center>
  </View>
</TouchableHighlight>
