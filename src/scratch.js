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

// CODE FOR CUSTOM COUNTDOWN ANIMATION

// Begin counting on page load
componentDidMount() {
  // Set interval so that every 5000 ms, increment counter by 1
  this.timer = setInterval(() => {
    let startTime = Date.now() // note start time of each interval

    if (!this.finished()) {

      let duration = this.state.duration; // the duration of routine at start

      this.initializeCountdown(startTime, duration);

      let next = this.state.counter + 1;

      this.setState({
        counter: next,
        duration: durations[next],
      });

    } else {
      // move to final screen
      clearTimeout(this.timer);
      this.props.navigation.navigate('Feedback');
    }
  }, this.state.duration);
}

// In the case user closes screen before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
componentWillUnmount() {
  clearTimeout(this.timer);
}

initializeCountdown(startTime, duration) {
  console.log("counting down");
  let interval = setInterval(() => {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    if (elapsedTime > duration) {
      console.log("EXCEEDED");
      clearInterval(interval);

      this.setState({
        percentage: 0
      });

      return;
    } else {
      this.calculatePercentage(elapsedTime, duration);
    }
  }, 500);
}

calculatePercentage(timeElapsed, duration) {
  let percent = Math.trunc((timeElapsed / duration) * 100);

  this.setState({
    percentage: percent
  });

  console.log(timeElapsed.toString() + '/' + duration.toString() + '=' + percent.toString());
  return percent
}
